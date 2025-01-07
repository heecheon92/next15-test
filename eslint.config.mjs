import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      /* 0: off, 1: warn, 2: error */
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-useless-catch": "off",
      /* 
        https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-useless-escape.html
        https://www.npmjs.com/package/eslint-plugin-regexp?activeTab=readme
      */
      "no-useless-escape": "warn",
      "react-hooks/exhaustive-deps": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": [2, { checkFragmentShorthand: true }],
      "react/jsx-props-no-spreading": "off",
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
      "react/no-unstable-nested-components": [
        "error", // <-- 성능 이슈를 일으키는 항목 발견시 에러로 처리
        {
          allowAsProps: true,
        },
      ],
      "react/prop-types": [
        0,
        {
          ignore: "className",
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
