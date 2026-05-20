---
slug:        "microbiome-16s"
id:          "SPC-02"
kind:        "project"
size:        "default"
title:       "Microbiome 16S → clinical outcome modelling"
date:        2024-03-01
displayDate: "2023–24"
excerpt:     "ML and statistical modelling on a Sydney clinical cohort of 16S amplicon sequencing data, with feature engineering for downstream classification."
tags:        ["microbiome", "16S", "modelling"]
githubUrl:   "https://github.com/jasn9776"
draft:       false
---

## Project summary

Working with the Microbiome Research Centre at St George Hospital, I developed an ML pipeline to predict clinical outcomes from 16S rRNA amplicon sequencing data in a local Sydney cohort.

The main challenges were: high dimensionality relative to sample size, compositional data constraints (CLR/ILR transforms), batch effects across sequencing runs, and handling class imbalance in the clinical endpoint.

## Feature engineering

Raw OTU tables were processed through:

- CLR transformation (Aitchison geometry)
- Phylogenetic aggregation at genus and family level
- Alpha/beta diversity indices as auxiliary features
- Interaction terms between dominant taxa and clinical covariates

## Modelling

Compared logistic regression (L1), random forest, and gradient boosting on a nested 5-fold cross-validation. Random forest with CLR-transformed genus-level features gave the best calibrated AUROC. Shapley values identified three genera consistently ranked in the top-10 features across folds.

## Notes

This work was exploratory — the cohort size (n ≈ 150) limits generalisability. The pipeline is fully reproducible via Snakemake; I'd treat the findings as hypothesis-generating rather than confirmatory.
