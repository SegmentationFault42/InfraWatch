import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
    {
        ignores: ['node_modules', 'dist', 'prettier.config.cjs'], // pastas ignoradas
    },
    js.configs.recommended, // regras recomendadas do ESLint para JS
    ...tseslint.configs.recommended, // regras recomendadas para TypeScript
    prettier, // integra com Prettier
];
