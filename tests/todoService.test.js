const {
    getTodos,
    addTodo,
    completeTodo
} = require("../src/todoService");

describe("Todo Service", () => {
    test("should return all todos", () => {
        const todos = getTodos();

        expect(Array.isArray(todos)).toBe(true);
    });

    test("should add a new todo", () => {
        const todo = addTodo("Learn GitHub Actions");

        expect(todo.title).toBe("Learn GitHub Actions");
        expect(todo.completed).toBe(false);
    });

    test("should reject empty todo title", () => {
        expect(() => addTodo("")).toThrow("Title is required");
    });

    test("should complete an existing todo", () => {
        const todo = addTodo("Write CI pipeline");

        const completedTodo = completeTodo(todo.id);

        expect(completedTodo.completed).toBe(true);
    });

    test("should throw error when todo does not exist", () => {
        expect(() => completeTodo(999)).toThrow("Todo not found");
    });
});