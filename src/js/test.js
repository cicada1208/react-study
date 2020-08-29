var todos = [
    { id: 1, name: 'a', completed: false },
    { id: 2, name: 'b', completed: true },
    { id: 3, name: 'c', completed: false }
]

todos = [
    { id: 4, name: 'd', completed: false },
    ...todos
]

console.log(todos)
