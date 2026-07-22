const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

async function loadTodos() {
    const response = await fetch("/todos");

    const todos = await response.json();

    renderTodos(todos);
}

function renderTodos(todos) {
    const completedTodos = todos.filter(
        todo => todo.completed
    );

    const pendingTodos = todos.filter(
        todo => !todo.completed
    );

    totalCount.textContent = todos.length;

    completedCount.textContent = completedTodos.length;

    pendingCount.textContent = pendingTodos.length;

    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">✓</div>

                <h2>No todos yet</h2>

                <p>
                    Add your first task to get started.
                </p>
            </div>
        `;

        return;
    }

    todoList.innerHTML = todos
        .map(todo => `
            <div
                class="todo-item ${
                    todo.completed ? "completed" : ""
                }"
            >

                <div class="todo-content">

                    <input
                        class="todo-checkbox"
                        type="checkbox"
                        ${todo.completed ? "checked" : ""}
                        onchange="completeTodo(${todo.id})"
                    >

                    <span class="todo-title">
                        ${todo.title}
                    </span>

                </div>

                ${
                    !todo.completed
                        ? `
                            <input
                                class="todo-checkbox"
                                type="checkbox"
                                data-id="${todo.id}"
                                ${todo.completed ? "checked" : ""}
                            >
                        `
                        : ""
                }

            </div>
        `)
        .join("");
}

todoList.addEventListener("click", event => {
    const button = event.target.closest(".complete-button");

    if (!button) {
        return;
    }

    const todoId = button.dataset.id;

    completeTodo(todoId);
});

todoForm.addEventListener("submit", async event => {
    event.preventDefault();

    const title = todoInput.value.trim();

    if (!title) {
        return;
    }

    await fetch("/todos", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title
        })
    });

    todoInput.value = "";

    await loadTodos();
});

async function completeTodo(id) {
    await fetch(`/todos/${id}/complete`, {
        method: "PUT"
    });

    await loadTodos();
}

loadTodos();