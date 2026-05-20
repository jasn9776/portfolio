---
slug:        "kakurasu-solver"
id:          "SPC-01"
kind:        "project"
size:        "default"
title:       "Kakurasu solver — a side quest"
date:        2025-09-01
displayDate: "2025"
excerpt:     "A constraint-propagation solver for the Kakurasu logic puzzle, written as an excuse to think carefully about exact-cover and bitmask tricks. Wrote up the experience of using Opus 4.7 for the implementation."
tags:        ["solver", "side project", "SAT"]
githubUrl:   "https://github.com/jasn9776"
draft:       false
---

## What is Kakurasu?

Kakurasu is a binary grid puzzle. You're given an n×n grid where each cell is filled or empty. The constraint: the sum of column indices of filled cells in each row must equal the row's target, and vice versa for columns. It's a variant of nonograms but with weighted indices instead of run-lengths.

## Why a solver?

I'd been reading about Algorithm X (Knuth's dancing links approach to exact cover) and wanted a concrete problem to implement it against. Kakurasu reduces cleanly to exact cover, which made it a good test case.

Also: I was curious whether bitmask DP would be competitive with dancing links for small-to-medium grid sizes (≤ 16×16).

## Results

For grids up to 12×12, bitmask DP is faster than dancing links by about 2×, because the constraint structure is dense enough that the bitmask's O(2^n) enumeration beats the dancing links overhead for small n. Above 14×14, dancing links wins decisively.

The constraint-propagation front-end (arc consistency before search) eliminated the need to search in ~40% of the puzzles I tested — they were forced unique solutions once you propagated row-and-column value constraints.

## The Claude experiment

I used Opus 4.7 to help write the dancing links implementation (it's fiddly pointer work). Findings: it got the data structure right on the first attempt, but made a subtle bug in the cover/uncover column methods that only manifested on puzzles with 6+ choices per row. Took about 15 minutes to debug together.

The useful thing wasn't that it wrote correct code on the first try — it's that it wrote *plausible* code quickly, which gave me something concrete to test against rather than starting from a blank file.

Code: [github.com/jasn9776](https://github.com/jasn9776)
