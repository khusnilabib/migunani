import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // TypeScript rules — strict, no implicit any
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/no-unused-disable-directive': 'off',

      // React rules
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/purity': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react-compiler/react-compiler': 'off',

      // Next.js rules
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'off',

      // General JavaScript rules
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-const': 'off',
      'no-unused-vars': 'off',
      'no-debugger': 'off',
      'no-empty': 'off',
      'no-irregular-whitespace': 'off',
      'no-case-declarations': 'off',
      'no-fallthrough': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unreachable': 'off',
      'no-useless-escape': 'off',
    },
  },
  // Boundary enforcement: tools cannot import from other contexts' infrastructure (LOCK-06)
  {
    files: ['src/tools/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/identity/infrastructure/*',
                '@/content/infrastructure/*',
                '@/platform-ops/infrastructure/*',
                '@/billing/infrastructure/*',
                '@/analytics/infrastructure/*',
              ],
              message:
                'Tools cannot import other contexts\' infrastructure (LOCK-06 Database Optional). Use server actions or published interfaces instead.',
            },
          ],
        },
      ],
    },
  },
  // Boundary enforcement: domain layers cannot import React/Next.js
  {
    files: ['src/**/domain/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              message: 'Domain layer cannot import React (layer violation per 05_ProjectStructure AD-02).',
            },
            {
              name: 'react-dom',
              message: 'Domain layer cannot import react-dom (layer violation).',
            },
            {
              name: 'next',
              message: 'Domain layer cannot import next (layer violation).',
            },
            {
              name: 'next/router',
              message: 'Domain layer cannot import next/router (layer violation).',
            },
            {
              name: 'next/navigation',
              message: 'Domain layer cannot import next/navigation (layer violation).',
            },
          ],
          patterns: [
            {
              group: ['react/*', 'next/*'],
              message: 'Domain layer cannot import React/Next submodules (layer violation).',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'skills/**',
      'src/generated/**',
      'coverage/**',
      'lighthouse-reports/**',
      'playwright-report/**',
      'test-results.*',
    ],
  },
  // Allow console.log in scripts, db seed, API routes (for log drain), and test setup
  {
    files: ['scripts/**/*', 'db/**/*', 'tests/setup.ts', 'src/app/api/**/*'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // Test files: allow unused vars prefixed with _, allow require imports
  {
    files: ['tests/**/*', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
    },
  },
  // Allow console.warn in shared lib (legitimate warnings)
  {
    files: ['src/shared/lib/**/*'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
];

export default eslintConfig;
