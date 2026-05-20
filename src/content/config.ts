import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    marker:   z.string(),
    role:     z.string(),
    org:      z.string(),
    date:     z.string(),
    duration: z.string(),
    year:     z.string(),
    future:   z.boolean().optional().default(false),
    tags:     z.array(z.string()),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    id:           z.string(),
    kind:         z.enum(['project', 'writing', 'paper']),
    size:         z.enum(['default', 'feature', 'wide']).default('default'),
    title:        z.string(),
    date:         z.coerce.date(),
    displayDate:  z.string().optional(),
    excerpt:      z.string(),
    tags:         z.array(z.string()),
    githubUrl:    z.string().url().optional(),
    external:     z.string().url().optional(),
    draft:        z.boolean().default(false),
    coverImage:   image().optional(),
    coverCaption: z.string().optional(),
  }),
});

export const collections = { experience, posts };
