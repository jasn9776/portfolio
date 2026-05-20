---
slug:        "merscope-vta"
id:          "SPC-03"
kind:        "project"
size:        "default"
title:       "MERSCOPE spatial atlas: mouse VTA"
date:        2025-03-01
displayDate: "2024–25"
excerpt:     "Single-cell and spatial analysis of MERSCOPE imaging of the mouse ventral tegmental area. cNMF clustering, MapMyCells annotation, comparison to Allen Brain Atlas reference taxonomies."
tags:        ["spatial", "MERSCOPE", "cNMF"]
githubUrl:   "https://github.com/jasn9776"
draft:       false
---

## Background

This project was part of my RA work with the McNally Lab. The goal was to build a high-resolution cell-type atlas of the mouse ventral tegmental area (VTA) using MERSCOPE spatial transcriptomics — capturing both the molecular identity and the spatial organisation of dopaminergic and GABAergic circuits.

## Methods

MERSCOPE data (~500 genes, ~80k cells per section) was processed with a custom Snakemake pipeline. Key steps:

1. **Quality control** — filter by transcript count, nuclear DAPI overlap, and cell area
2. **Normalisation** — scran pooling normalisation then log1p
3. **Clustering** — consensus NMF (cNMF) at k = 15, 30, 50; final k chosen by stability score
4. **Annotation** — MapMyCells hierarchical mapping against the Allen Brain Atlas CCN20230722 reference
5. **Spatial analysis** — neighbourhood enrichment and co-occurrence scores between annotated cell types

## Results

We recovered seven transcriptionally distinct VTA populations, including a previously uncharacterised Th+/Slc17a6+ co-expressing cluster. Spatial co-occurrence analysis confirmed known dopaminergic–GABAergic spatial relationships and identified a novel boundary zone at the VTA/SNc interface.

## Code & data

Code is available on GitHub. MERSCOPE raw data deposited in GEO (accession pending).
