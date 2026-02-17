import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async (todo) => {
        try {
            await axios.post('http://localhost:8080/api/todos', todo);
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id, updatedTodo) => {
        try {
            await axios.put(`http://localhost:8080/api/todos/${id}`, updatedTodo);
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <div className="todo-list-container">
            <h1>Todo App</h1>
            <AddTodo onAdd={addTodo} />

            <div className="dashboard">
                <div className="column active-column">
                    <h2>Active Tasks ({activeTodos.length})</h2>
                    <div className="todo-list">
                        {activeTodos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onUpdate={updateTodo}
                                onDelete={deleteTodo}
                            />
                        ))}
                        {activeTodos.length === 0 && <p className="empty-state">No active tasks</p>}
                    </div>
                </div>

                <div className="column completed-column">
                    <h2>Completed ({completedTodos.length})</h2>
                    <div className="todo-list">
                        {completedTodos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onUpdate={updateTodo}
                                onDelete={deleteTodo}
                            />
                        ))}
                        {completedTodos.length === 0 && <p className="empty-state">No completed tasks</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
