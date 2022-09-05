module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  importOrder: [
    '^[./]',
    './styles',
    '@/types',
    '@/routes',
    '@/icons|@/assets|@/design|@/layouts|@/component',
    '@/container|@/page',
    '@/redux',
    '@/hooks',
    '@/services',
    '@/common',
    '@/core'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
