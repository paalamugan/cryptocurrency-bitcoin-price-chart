/* eslint-disable import/no-extraneous-dependencies */
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [
        './tests/setupTests.ts',
        './tests/setupMocks.ts',
        './tests/setupServer.ts',
      ],
      mockReset: true,
      restoreMocks: true,
      clearMocks: true,
      include: ['./src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
      ],
      coverage: {
        exclude: [
          '**/__mocks__/**',
          '**/node_modules/**',
          '**/dist/**',
          '**/cypress/**',
          '**/.{idea,git,cache,output,temp}/**',
        ],
      },
    },
  })
);
