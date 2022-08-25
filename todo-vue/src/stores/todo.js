import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => ({
        rawItems: [],
    }),
    getters: {
        items: (state) =>
            state.rawItems,
    },
    actions: {
        addItem(title) {
            this.rawItems.push({ id: Date.now(), title, complete: false })
            // axios
        },

        removeItem(id) {
            this.rawItems = this.rawItems.filter(item => item.id === id)
        },

        updateItem(todo) {
            this.rawItems = this.rawItems.map(item => {
                if (item.id === todo.id) {
                    return todo
                }
                return item
            })
        }
    },
})
