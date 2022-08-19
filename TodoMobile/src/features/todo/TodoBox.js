import React from 'react'
import { StyleSheet, View } from 'react-native'
import TodoForm from '../../components/TodoForm'
import TodoList from '../../components/TodoList'

export default function TodoBox(props) {

    return (
        <View style={styles.todobox}>
            <TodoForm />
            <TodoList />
        </View>
    )

}

const styles = StyleSheet.create({
    todobox: {
        flex: 1,
        margin: 0
    }
})