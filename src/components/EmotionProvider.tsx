'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

const cache = createCache({ key: 'css' });
cache.compat = true;

const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

export default function EmotionProvider({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    const chunks = extractCriticalToChunks((children as any).toString()); // ✅ Safely stringify
    return (
      <style
        data-emotion={`${chunks.styles.map((style) => style.key).join(' ')}`}
        dangerouslySetInnerHTML={{ __html: constructStyleTagsFromChunks(chunks) }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}