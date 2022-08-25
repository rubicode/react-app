<script setup>
import TodoItem from "./TodoItem.vue";

defineProps({
    todos: {
        type: Object,
        required: true,
    },
});

</script>

<template>
  <table class="table table-striped">
    <thead>
        <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Complete</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <TodoItem v-for="(todo, index) in todos" :no="index + 1" :todo="todo" />
    </tbody>
  </table>
</template>