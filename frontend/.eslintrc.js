module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // より厳しいルールにするには`plugin:vue/strongly-recommended` もしくは `plugin:vue/recommended` に切り替えることを検討してください。
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: ["vue"],
  // ここにカスタムルールを追加します。
  rules: {
    semi: [2, "never"],
    "vue/html-closing-bracket-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["warn", { semi: false }],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
        },
      },
    ],
  },
}
