import globals from 'globals';
import tsEsLint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

const tsFiles = ['**/src/**/*.ts'];
const vueFiles = ['**/src/**/*.vue'];
const languageOptions = { globals: { ...globals.browser }, ecmaVersion: 'latest', sourceType: 'module' };

const customTypescriptConfig = {
  files: tsFiles,
  languageOptions: {
    ...languageOptions,
    parser: tsEsLint.parser,
    parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
  },
};

const recommendedTypeScriptConfigs = [
  ...tsEsLint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: [...tsFiles, vueFiles],
  })),
  ...tsEsLint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: [...tsFiles, vueFiles],
  })),
];

const customVueConfig = {
  files: vueFiles,
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsEsLint.parser,
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      extraFileExtensions: ['.vue'],
    },
  },
};

const typescriptRules = {
  files: tsFiles,
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },
};

const vueRules = {
  files: vueFiles,
  rules: {
    ...typescriptRules.rules,
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
  },
};

export default tsEsLint.config(
  {
    ignores: ['**/*.{test,d}.ts', '**/*.css', '**/vite.config.ts', '**/src/assets/**/*'],
  },
  ...recommendedTypeScriptConfigs,
  customTypescriptConfig,
  ...pluginVue.configs['flat/recommended'],
  customVueConfig,
  typescriptRules,
  vueRules
);
