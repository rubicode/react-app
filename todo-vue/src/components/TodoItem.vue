<script>
import { useTodoStore } from '../stores/todo';

export default {
    setup() {
        const Todo = useTodoStore()

        return { Todo }
    },
    props: {
        no: {
            type: Number,
            required: true
        },
        todo: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            isEdit: false,
            title: this.todo.title,
            complete: this.todo.complete
        }
    },
    methods: {
        update(id){
            this.Todo.updateItem({id, title: this.title, complete: this.complete})
            this.isEdit = false
        }
    }
}

</script>

<template>
    <tr>
        <td>{{no}}</td>
        <td v-if="isEdit">
            <input class="form-control" type="text" v-model="title" />
        </td>
        <td v-else>{{todo.title}}</td>
        <td v-if="isEdit">
        <select class="form-control" v-model="complete">
            <option>true</option>
            <option>false</option>
        </select>
        </td>
        <td v-else>{{todo.complete}}</td>
        <td v-if="isEdit">
            <button class="btn btn-primary" type="button" @click="update(todo.id)">
                save
            </button>
            <button class="btn btn-warning" type="button" @click="isEdit = false">
                cancel
            </button>
        </td>
        <td v-else>
            <button class="btn btn-success" type="button" @click="isEdit = true">
                edit
            </button>
            <button class="btn btn-danger" type="button" @click="Todo.removeItem(todo.id)">
                delete
            </button>
        </td>
    </tr>
</template>
