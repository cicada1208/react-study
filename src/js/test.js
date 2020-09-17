var ary = [{ na: '1' }]
console.log(ary.push({ na: '2' }))
console.log(ary)

ary = [
    ...ary,
    { na: '3' }
]
console.log(ary)

ary.pop()
console.log(ary)
