---
slug:        "bifurcation-trajectories"
id:          "WRT-01"
kind:        "writing"
size:        "default"
title:       "Bifurcation vs archetypal trajectories — a primer"
date:        2026-03-01
displayDate: "March 2026"
excerpt:     "Why these two ways of thinking about cell-fate continua are not the same thing, and which methods belong to which family."
tags:        ["trajectory", "single-cell", "methods"]
draft:       false
---

There are two genuinely different conceptual models for how cells change state over time, and a lot of the confusion in trajectory analysis papers comes from not being clear about which model you're working in.

## Bifurcation: cells choose

In the bifurcation model, a progenitor population sits in a metastable state and eventually commits to one of two (or more) fates. The canonical picture is Waddington's epigenetic landscape — a ball rolling down a hillside, passing a ridge, and settling into one of two valleys.

Methods in this family: Monocle (DDRTree/UMAP pseudotime), PAGA, RNA velocity. These methods assume a tree-like topology: every cell can be placed on a lineage, and the lineages branch but don't merge.

**What they're good at:** committed differentiation, haematopoiesis, development.

**What they struggle with:** reprogramming (which reverses along a lineage), cycling cells (which have a circular topology), and any system where cells genuinely occupy intermediate positions that aren't "on the way" to a single endpoint.

## Archetypal: cells mix

In the archetypal model, there are no clean lineages. Cells are mixtures of a small number of extreme phenotypes (archetypes), and the observed transcriptional space is the convex hull spanned by those extremes.

Methods in this family: Archetypal Analysis (AA), cNMF (non-negative matrix factorisation), topic modelling (LDA/NNSVD). These don't require a tree — they're comfortable with circular topologies, continuous gradients, or contexts where a cell genuinely co-expresses two fate programmes simultaneously.

**What they're good at:** tumour microenvironments (where malignant cells simultaneously express multiple stress/proliferative/immune-evasion programmes), exhaustion spectra in T cells, or any setting where you suspect the "cell types" are better described as poles of a continuum.

**What they struggle with:** they don't inherently give you directionality. You can name the archetypes post-hoc, but AA doesn't tell you which way time flows.

## Why the distinction matters

The mistake I see most often is using RNA velocity (a bifurcation-family method) on data that has an archetypal structure. RNA velocity gives you arrows, which look authoritative. But if the underlying topology is a simplex rather than a tree, those arrows are telling you "movement within the mixing space" not "commitment to a fate." The biological interpretation is completely different.

Similarly: using cNMF and then forcing the factors into a pseudotime ordering by projecting onto the first principal component of the factor scores. This works if the factors happen to be ordered along a single axis of variation — but that's a strong assumption you should test, not assume.

## A rough decision guide

| | Tree topology? | Directionality needed? | Cells as mixtures? |
|---|---|---|---|
| Monocle/PAGA | Yes | Yes | No |
| RNA velocity | Yes | Yes (intrinsic) | No |
| Archetypal Analysis | No | No | Yes |
| cNMF | No | No | Yes |
| scVelo + PAGA | Yes | Yes | Partial |

The right tool depends on your biological question first, the data topology second, and the available method third — not the other way around.

---

*If you're trying to decide which applies to your dataset: look at the UMAP. Does it look like a tree with clean branches? Bifurcation methods. Does it look like a filled triangle or a gradient smear with no obvious branch points? Archetypal methods. Does it look like a circle? You probably have cycling cells and need a dedicated cycling-aware method.*
