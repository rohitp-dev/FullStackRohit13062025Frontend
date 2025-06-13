'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme/theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [emotionCache] = useState(() => {
    const cache = createCache({ key: 'css', prepend: true });
    cache.compat = true;
    return cache;
  });

  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(emotionCache);

  useServerInsertedHTML(() => {
    const chunks = extractCriticalToChunks((children as any).toString());
    return (
      <style
        data-emotion={`${chunks.styles.map((style) => style.key).join(' ')}`}
        dangerouslySetInnerHTML={{ __html: constructStyleTagsFromChunks(chunks) }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}