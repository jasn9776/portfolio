---
slug:        "hcc-multimodal"
id:          "SPC-04"
kind:        "project"
size:        "feature"
title:       "Multi-modal integration for HCC recurrence prediction"
date:        2025-10-01
displayDate: "Honours · 2025"
excerpt:     "Five data modalities — clinical, transcriptomic, methylation, mutation, miRNA — fused into a single recurrence-risk model for hepatocellular carcinoma. Preprint in preparation; benchmarked against unimodal baselines on TCGA-LIHC and a curated validation cohort."
tags:        ["honours", "HCC", "multi-modal", "scikit-learn"]
githubUrl:   "https://github.com/jasn9776"
draft:       false
coverImage:   ./diagram.jpg
---

## Overview

Hepatocellular carcinoma (HCC) has a high post-resection recurrence rate, yet existing clinical risk models rely on a single modality — usually staging or a handful of serum markers. This project asked whether integrating five molecular data layers could meaningfully improve that risk stratification.

## Data

All data came from TCGA-LIHC (n ≈ 370 samples with matched multi-omic profiling). Modalities:

- **Clinical** — age, tumour grade, AFP, vascular invasion
- **Transcriptomic** — RNA-seq VST-normalised counts, top 500 MAD genes
- **Methylation** — 450k array β-values, CpG sites in promoter regions
- **Mutation** — binary mutation matrix for 50 cancer-driver genes
- **miRNA** — miRNA-seq log2 CPM, top 100 by variance

## Approach

Each modality was reduced independently (PCA, NMF, or autoencoder depending on dimensionality), then concatenated into a joint feature matrix. I compared early fusion (concatenation before classifier) against late fusion (per-modality classifiers with weighted voting) on a 5-fold stratified cross-validation.

The final model uses a gradient-boosted tree on the early-fused representation. AUROC on the held-out test fold: 0.81 vs 0.71 for the best unimodal baseline (transcriptomic alone).

## Key finding

Methylation contributed surprisingly little on its own but consistently improved the ensemble when added to transcriptomic + clinical. The mutation modality was unstable across folds — likely due to the sparsity of the binary matrix at this sample size.

## Status

Preprint in preparation. Code will be released on GitHub on submission.
