import React, { useState } from "react"
import {Picker} from '@react-native-picker/picker';
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { updateTodo, removeTodo, resendTodo } from '../features/todo/todoSlice'

export default function TodoItem(props) {

    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false)
    const [todo, setTodo] = useState({
        title: props.todo.title,
        complete: props.todo.complete
    })

    const handleUpdate = () => {
        dispatch(updateTodo({ _id: props.todo._id, ...todo }))
        setIsEdit(false)
    }


    if (isEdit) {
        return (
            <View style={{display: "flex", flexDirection: 'row', justifyContent: "space-between"}}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Masukkan Kerjaan"
                    onChangeText={value => setTodo({
                        ...todo,
                        title: value
                    })}
                    defaultValue={todo.title}
                />
                <Picker
                    selectedValue={todo.complete}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(value) => setTodo({
                        ...todo,
                        complete: value
                    })}
                >
                    <Picker.Item label="Sudah" value={true} />
                    <Picker.Item label="Belum" value={false} />
                </Picker>
                <TouchableOpacity onPress={handleUpdate}>
                    <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsEdit(false)}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={{display: "flex", flexDirection: 'row', justifyContent: "space-between", marginBottom: 20}}>
                <Text style={{width: '50%'}}>{props.todo.title}</Text>
                <Text style={{width: '20%'}}>{props.todo.complete ? 'sudah' : 'belum'}</Text>
                <TouchableOpacity onPress={() => setIsEdit(true)}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.todo.sent ? () => dispatch(removeTodo(props.todo._id)) : () => dispatch(resendTodo(props.todo))}>
                    <Text>{props.todo.sent ? 'hapus' : 'kirim ulang'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}