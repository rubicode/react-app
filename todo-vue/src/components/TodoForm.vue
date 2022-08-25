<script setup>

const emit = defineEmits(['createTodo'])

import { ref } from 'vue'

const title = ref('')

function addTodo(){
    console.log(title.value)
    emit('createTodo', title.value)
    title.value = ''
}

</script>

<template>
    <form @submit.prevent="addTodo">
        <div class="row mb-3">
            <label for="title" class="col-sm-2 col-form-label">Kerjaan</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="title" v-model="title" />
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Tambah</button>
    </form>   
</template>
