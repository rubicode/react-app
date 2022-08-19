import React, { useEffect } from "react"
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, readTodo } from '../features/todo/todoSlice'
import { StyleSheet, View, FlatList } from "react-native";

export default function TodoList() {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readTodo())
    }, [dispatch])
    
    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                renderItem={
                    ({ item }) => <TodoItem
                        key={item._id}
                        todo={item} />
                }
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});