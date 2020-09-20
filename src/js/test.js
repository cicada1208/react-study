var ary = [{ na: '1' }]

ary = [
    ...ary,
    { na: '3' }
]

let aryBabelPluginsPrd = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
]

let aryBabelPluginsDev = [
    ...aryBabelPluginsPrd,
    '@babel/plugin-transform-react-jsx-source',
]

console.log(aryBabelPluginsPrd)
console.log('------')
console.log(aryBabelPluginsDev)
