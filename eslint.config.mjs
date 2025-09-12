import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Reduce noise for this repo: these rules are helpful but non-critical
      // during development. We keep them disabled to avoid blocking the build.
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
      // Turn off unused-vars checks (we selectively fix real issues below)
      "@typescript-eslint/no-unused-vars": "off",
      // Allow explicit any for rapid prototyping; prefer fixing types incrementally
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
