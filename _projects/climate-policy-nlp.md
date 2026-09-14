---
title: "Sampling Strategies for Climate-Policy Text Classification"
short_title: "Climate-Policy NLP with POLIANNA"
slug: climate-policy-nlp
description: "A completed exploratory study of ClimateBERT and sampling strategies for imbalanced policy annotations in the POLIANNA dataset."
type: Student research
status: Completed
period: 2025
role: Model experiments and analysis
stack:
  - ClimateBERT
  - POLIANNA
  - Classification
  - Python
repository: https://github.com/Sven-Lutz/SA_Polianna
repository_public: true
featured: true
order: 4
---

## Research context

Policy documents contain structured ideas—actors, instruments, objectives and relationships—but turning them into labelled data produces a difficult classification problem. Relevant labels can be rare and unevenly distributed, which makes headline accuracy a poor guide to actual model quality.

This student research project explored how transformer-based representations and sampling strategies behave on annotations from the POLIANNA climate-policy dataset.

## Approach

The experiments use ClimateBERT embeddings and compare several ways of addressing class imbalance, including over- and undersampling. The repository contains preprocessing, model experiments and visual evaluation material intended to make those comparisons reproducible.

## How to read the results

The work is exploratory and complete, but it should not be presented as a production benchmark. Some evaluation paths would benefit from stricter separation between resampling, model selection and untouched test data. For that reason, I treat the project as evidence of method exploration and learning rather than making broad performance claims.

## What remains valuable

- Working with a domain-specific language model and annotated policy data
- Understanding how severe class imbalance changes an evaluation problem
- Comparing sampling strategies instead of relying on one aggregate score
- Recognizing methodological limits and making them explicit
