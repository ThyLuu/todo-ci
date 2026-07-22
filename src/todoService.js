const todos = [];

function getTodos() {
    return todos;
}

function addTodo(title) {
    if (!title || title.trim() === "") {
        throw new Error("Title is required");
    }

    const todo = {
        id: todos.length + 1,
        title,
        completed: false
    };

    todos.push(todo);

    return todo;
}

function completeTodo(id) {
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        throw new Error("Todo not found");
    }

    todo.completed = true;

    return todo;
}

module.exports = {
    getTodos,
    addTodo,
    completeTodo
};