import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  globalIgnores(["**/node_modules/**", "**/.next/**", "**/dist/**"]),

  ...compat.config({
    extends: ["next", "next/typescript", "prettier"],
    settings: {
      next: {
        rootDir: ".",
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }),
];

export default eslintConfig;
