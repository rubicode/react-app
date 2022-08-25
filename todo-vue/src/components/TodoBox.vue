<script setup>
import TodoList from "./TodoList.vue";
import TodoForm from "./TodoForm.vue";
import { useTodoStore } from '../stores/todo';

const Todo = useTodoStore()
</script>

<template>
  <div class="container-todo">
    <div class="card">
        <div class="card-header">
            <h1>TODO</h1>
        </div>
        <div class="card-body">
            <TodoForm @createTodo="Todo.addItem"/>
        </div>
        <TodoList :todos="Todo.rawItems" />
    </div>
  </div>
</template>

<style scoped>
.container-todo {
    margin: 10px;
}
</style>
