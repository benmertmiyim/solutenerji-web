import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

const projeler = defineCollection({
  schema: z.object({
    baslik: z.string(),
    konum: z.string(),
    guc: z.string(),
    tarih: z.date(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, projeler };
