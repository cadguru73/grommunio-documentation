import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  // UI-string overrides per locale (src/content/i18n/<lang>.json). Declared so
  // Starlight 0.42 stops warning that the collection is missing; the files may
  // stay empty objects until a string actually needs overriding.
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
