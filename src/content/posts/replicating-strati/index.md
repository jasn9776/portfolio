---
slug:        "replicating-strati"
id:          "WRT-02"
kind:        "writing"
size:        "wide"
title:       "Replicating Strati et al. on CAR-T cytopenia, in scanpy"
date:        2026-04-01
displayDate: "April 2026"
excerpt:     "A short walk-through of replicating a 2024 single-cell CAR-T paper end-to-end in scanpy — what reproduced cleanly, what didn't, and what I learned about benchmark design in single-cell."
tags:        ["scanpy", "CAR-T", "reproduction"]
draft:       false
---

## Why replicate?

Replication is underrated as a learning method. You read a paper once and think you understand it; you try to reproduce it and discover which parts you actually understood and which you just let slide by.

Strati et al. (2024, *Nature Medicine*) studied CAR-T cell-induced cytopenia using single-cell transcriptomics of bone marrow biopsies. The key claim is that a specific myeloid progenitor subpopulation is selectively depleted post-infusion, identifiable by a transcriptional signature overlapping haematopoietic stress response.

## What I did

I downloaded the raw counts from GEO (GSE——), ran QC and normalisation following the methods section, then attempted to reconstruct:

1. The UMAP embedding coloured by cell type
2. The differential abundance analysis between pre- and post-infusion timepoints
3. The gene signature score for the depleted progenitor population

## What reproduced cleanly

The broad cell-type annotations came out essentially identical — the major populations (HSC, CMP, GMP, erythroid) clustered in the same relative positions and with similar marker gene expression.

The progenitor subcluster also reproduced: I could identify a small cluster of ~400 cells with the described Hsp70/HMOX1/ATF4 signature, depleted post-infusion.

## What didn't

The UMAP layout differed substantially. This is expected — UMAP is not deterministic and the authors didn't fix a seed. The conclusions don't depend on exact layout, so this isn't a problem.

More interesting: the differential abundance analysis used `scCODA`, which I hadn't used before. The paper reports a Bayesian credible interval approach, but the version of scCODA available at GEO upload time had different default priors than the current version. Running the current version gave qualitatively similar but quantitatively different credible intervals. I'd flag this as a minor reproducibility concern — not enough to change the conclusion, but enough to matter for meta-analyses.

## What I learned

**About benchmark design:** The paper compares against a "reference" bone marrow dataset to define depleted populations. The choice of reference is doing a lot of unacknowledged work — a different reference would change which progenitor is identified as "depleted" vs. simply rare in both conditions.

**About scanpy specifically:** `sc.tl.score_genes` is sensitive to the gene list length in a way I hadn't appreciated. Scores from a 20-gene list vs. a 50-gene list from the same pathway are not directly comparable across datasets with different sequencing depths.

**About my own reading habits:** I had mentally compressed the methods section. Actually running the code forced me to read every parameter choice carefully, and I found two places where the paper's description was ambiguous about whether they used raw or log-normalised counts as input. (Context: normalised counts, but it took me an hour to confirm.)

## Bottom line

The paper holds up. The depletion finding is robust across reasonable analytical choices. The main caveat is the reference dataset dependency, which I think warrants a sensitivity analysis that isn't in the paper.

Replication took about three days of focused work for someone reasonably comfortable with scanpy. I'd recommend this paper as a methods exercise — it's well-structured enough that you can debug your own pipeline against the figures.
