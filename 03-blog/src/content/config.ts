import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string(),

    // relation
    author: z.string(),

    // relation
    tags: z.array(z.string()),
  }),
});

export const collections = {
  posts: postsCollection,
};
