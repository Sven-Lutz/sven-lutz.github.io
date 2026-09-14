---
title: "A GraphRAG Knowledge System for Municipal Climate Policy"
short_title: "Municipal Climate-Policy GraphRAG"
slug: climate-policy-knowledge-system
description: "An end-to-end pipeline that collects public municipal information and turns it into a graph-backed corpus for climate-policy analysis."
type: Applied AI
status: Work in progress
period: 2026—present
role: Independent research and development
stack:
  - GraphRAG
  - NLP
  - Neo4j
  - Python
repository: https://github.com/Sven-Lutz/Klima_GraphRAG
repository_public: false
featured: true
order: 2
---

## The question

Climate-policy information is distributed across municipal websites, plans, funding pages and public documents. The information exists, but comparing measures, targets and local priorities across municipalities remains difficult.

This project asks how public material can be collected, structured and queried without erasing its local context or the evidence behind an answer.

## System design

The pipeline is designed to cover the official web presence of all 2,056 Bavarian municipalities. It moves from focused crawling and text segmentation to embeddings, entity and relation extraction, a Neo4j knowledge graph, community detection and a query layer.

The work combines conventional data engineering with language-model components. SQLite provides a traceable intermediate store; graph structures preserve relationships between municipalities, measures, concepts and targets; and evaluation routines make retrieval quality a first-class part of development.

## What I am focusing on

- Reliable collection from heterogeneous public websites
- Evidence-preserving retrieval instead of context-free generation
- Graph structure that supports both local questions and comparisons
- Evaluation at pipeline and answer level
- A reproducible path from small local demonstrations to larger runs

## Current state

The crawler and GraphRAG pipeline are running, with continued work on evaluation, retrieval quality and the interface between source evidence and generated answers. The repository remains private while the research and data workflow are being developed.
