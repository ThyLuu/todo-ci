const express = require("express");
const path = require("path");
const todoService = require("./todoService");

const app = express();

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// GET /todos
app.get("/todos", (req, res) => {
    res.json(todoService.getTodos());
});

// POST /todos
app.post("/todos", (req, res) => {
    try {
        const todo = todoService.addTodo(req.body.title);

        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// PUT /todos/:id/complete
app.put("/todos/:id/complete", (req, res) => {
    try {
        const todo = todoService.completeTodo(
            Number(req.params.id)
        );

        res.json(todo);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;