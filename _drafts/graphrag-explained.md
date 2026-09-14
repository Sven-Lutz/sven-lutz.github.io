---
title: "GraphRAG explained: from documents to a queryable knowledge graph"
description: "How graph-based retrieval augments RAG — the indexing pipeline, community summarisation, and when the added cost is worth it."
date: 2026-09-14
category: Explainers
tags:
  - GraphRAG
  - Retrieval
  - Knowledge graphs
  - LLM
toc: true
math: true
project: climate-policy-knowledge-system
---

Retrieval-augmented generation works well when an answer sits in one or two passages. It works badly when the answer has to be assembled from evidence scattered across hundreds of documents — "which measures do these municipalities have in common?" is not a question any single chunk answers.

GraphRAG is one response to that failure mode: instead of retrieving text chunks alone, build a knowledge graph over the corpus first, summarise its communities, and query that structure. This article walks through the pipeline, the parts that are expensive, and the cases where plain vector search remains the better choice.

<div class="panel" markdown="1">

#### Prerequisites

- Familiarity with embeddings and vector similarity search
- A working mental model of standard RAG: chunk → embed → retrieve → generate
- Basic graph vocabulary: nodes, edges, communities

</div>

## Why plain vector RAG falls short

Standard RAG treats a corpus as a bag of independent passages. A query is embedded, the nearest chunks are retrieved, and the model answers from them. Two properties follow from that design.

First, **retrieval is local**. The top-$k$ chunks are those closest to the query in embedding space. If the answer requires combining a statement in document 3 with a definition in document 190, there is no mechanism that puts both in the context window unless both happen to be individually similar to the query.

Second, **there is no corpus-level view**. Questions of the form "what are the main themes?" or "how do these cases differ?" have no single nearest neighbour. They are questions about the collection, and the retriever has no representation of the collection — only of its parts.

<div class="callout callout--note" markdown="1">

This is a limitation of the retrieval strategy, not of the embeddings. Better embeddings improve which chunks come back; they do not create a structure that spans chunks.

</div>

## The indexing pipeline

GraphRAG shifts work from query time to index time. The corpus is processed once into a graph plus summaries, and queries then run against that structure.

### 1. Segmentation

Documents are split into text units — small enough for reliable extraction, large enough to retain context. Unit size is a real parameter: smaller units raise extraction recall per unit but multiply the number of language-model calls.

```python
def segment(document: str, size: int = 1200, overlap: int = 150) -> list[str]:
    """Split a document into overlapping text units."""
    units, start = [], 0
    while start < len(document):
        end = start + size
        units.append(document[start:end])
        start = end - overlap
    return units
```

### 2. Entity and relation extraction

Each text unit is passed to a language model that returns typed entities and the relations between them, with a short description and the source unit for each. The source reference is what later makes an answer traceable back to a document.

```python
EXTRACTION_PROMPT = """Extract entities and relationships from the text.
Return JSON: {"entities": [{"name", "type", "description"}],
              "relations": [{"source", "target", "description"}]}
Use only information stated in the text."""

def extract(unit: str, client) -> dict:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        system=EXTRACTION_PROMPT,
        messages=[{"role": "user", "content": unit}],
    )
    return json.loads(response.content[0].text)
```

### 3. Resolution and graph construction

The same entity appears under different surface forms across units — "Stadtwerke München", "SWM", "the municipal utility". These are merged, their descriptions are combined, and repeated relations become weighted edges.

```cypher
// One node per resolved entity, one edge per relation, weighted by evidence count
MERGE (source:Entity {id: $source_id})
MERGE (target:Entity {id: $target_id})
MERGE (source)-[r:RELATES_TO {type: $relation_type}]->(target)
  ON CREATE SET r.weight = 1, r.units = [$unit_id]
  ON MATCH  SET r.weight = r.weight + 1, r.units = r.units + $unit_id
```

### 4. Community detection

The graph is partitioned into communities of densely connected entities, hierarchically, so that the same corpus can be viewed at several levels of granularity. The Leiden algorithm is the usual choice; it optimises modularity while guaranteeing that every community is internally connected.

Modularity compares observed edge weight inside communities against what random wiring would produce:

$$Q = \frac{1}{2m} \sum_{i,j} \left[ A_{ij} - \frac{k_i k_j}{2m} \right] \delta(c_i, c_j)$$

where $A_{ij}$ is the edge weight between nodes $i$ and $j$, $k_i$ the weighted degree of node $i$, $m$ the total edge weight, and $\delta(c_i, c_j)$ is 1 when both nodes share a community.

### 5. Community summarisation

Each community is summarised by a language model into a report: what it is about, which entities matter, which claims are supported. These reports are the structure that corpus-level questions are answered from.

<div class="callout callout--warning" markdown="1">

This step dominates the indexing cost. Every community at every hierarchy level is one generation call. On a corpus of a few thousand documents this is the difference between an afternoon and a week — budget it before you start.

</div>

## Querying: local and global

The two query modes answer different question shapes.

| | Local search | Global search |
|---|---|---|
| Question type | About specific entities | About the corpus as a whole |
| Entry point | Entities matched to the query | Community reports at a chosen level |
| Mechanism | Expand to neighbours, gather their text units | Map over reports, then reduce to one answer |
| Cost per query | Comparable to standard RAG | Higher — scales with community count |
| Example | "What did municipality X commit to?" | "Which measures recur across municipalities?" |

Local search resembles standard RAG with a graph-shaped expansion step: match entities, walk to their neighbourhood, collect the attached text units, answer from them. Global search is a map–reduce: each relevant community report produces a partial answer, and those are reduced into a final response.

<div class="callout callout--tip" markdown="1">

Route queries before answering them. A cheap classifier that separates entity-scoped from corpus-scoped questions saves most of the global-search cost, because most questions users actually ask are local.

</div>

## When it is worth the cost

GraphRAG is a heavier index, not a universally better one. The honest decision rule:

- **Use it** when questions span documents, when relationships between entities are the subject, or when the corpus has to be summarised at multiple levels.
- **Do not use it** when questions are lookups against a passage, when the corpus changes faster than it can be re-indexed, or when the extraction step would introduce more error than the structure removes.

The last point deserves emphasis. Extraction quality bounds everything downstream: a relation the model invented becomes a graph edge, and a graph edge becomes a confident, well-cited, wrong answer. Sampling extraction output against human annotation before building anything on top of it is not optional.

<div class="panel" markdown="1">

#### Key takeaways

- GraphRAG moves work from query time to index time: a graph plus community summaries built once.
- Local search answers entity questions; global search answers corpus questions via map–reduce over community reports.
- Community summarisation is the dominant cost; question routing is the main lever to control it.
- Extraction quality is the ceiling on answer quality — measure it first.

</div>

## References

1. Edge, D. et al. (2024). *From Local to Global: A Graph RAG Approach to Query-Focused Summarization*. [arXiv:2404.16130](https://arxiv.org/abs/2404.16130)
2. Traag, V. A., Waltman, L., van Eck, N. J. (2019). *From Louvain to Leiden: guaranteeing well-connected communities*. [Scientific Reports 9, 5233](https://www.nature.com/articles/s41598-019-41695-z)
3. Microsoft Research. [GraphRAG implementation](https://github.com/microsoft/graphrag)
