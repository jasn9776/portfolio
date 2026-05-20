# Jason Soo — Portfolio

Built with [Astro](https://astro.build). Deploys automatically to GitHub Pages on push to `main`.

---

## Add a blog post

1. Create a folder: `src/content/posts/your-slug/`
2. Add `index.md` with this frontmatter:

```markdown
---
slug:        "your-slug"
id:          "WRT-03"          # display ID on the card (WRT / SPC / PAP + number)
kind:        "writing"         # "project" | "writing" | "paper"
size:        "default"         # "default" | "feature" | "wide"
title:       "Your Post Title"
date:        2026-06-01        # YYYY-MM-DD — used for sort order
displayDate: "June 2026"       # optional override shown on card & post
excerpt:     "One or two sentences shown on the work card."
tags:        ["tag-one", "tag-two"]
githubUrl:   "https://github.com/..."   # optional
external:    "https://..."              # optional — Read link goes here instead of post page
draft:       false
coverImage:  ./cover.jpg               # optional — place image in this folder
coverCaption: "Fig. 1 — optional caption shown under the cover image"
---

Your post content here in Markdown.
```

3. **Images in the post body:** place them in the same folder and reference with relative paths:
   ```markdown
   ![My figure caption](./my-figure.png)
   ```

4. **Cover image for the post page and feature card:** add `coverImage: ./cover.jpg` to frontmatter and drop `cover.jpg` in the same folder.

5. `git push` — the site rebuilds automatically.

---

## Add an experience entry

1. Create `src/content/experience/06-your-role.md` (prefix controls display order):

```markdown
---
marker:   "VI"
role:     "Your Role Title"
org:      "Organisation Name"
date:     "Jan 2027 — present"
duration: "ongoing"
year:     "2027—"
future:   false          # true = dashed timeline segment
tags:     ["tag-one", "tag-two"]
---

One paragraph description of the role. Plain markdown, no heading needed.
```

2. `git push`.

---

## Deploy

```
git push
```

GitHub Actions builds and deploys automatically. Live at:
`https://jasn9776.github.io/portfolio/`

**One-time setup** (first deploy only):
1. Go to repo Settings → Pages
2. Set Source to **GitHub Actions**
3. Push to `main`
