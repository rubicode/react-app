import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './todoAPI';
import {
  READ_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  RESEND_TODO
} from '../../utils/constants';

const initialState = {
  todos: [],
  status: 'idle'
};

export const readTodo = createAsyncThunk(
  READ_TODO,
  async () => {
    try {
      const { data } = await API.read();
      if (data.success) {
        return data.data.map(item => {
          item.sent = true
          return item
        })
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
);

export const createTodoAsync = createAsyncThunk(
  CREATE_TODO,
  async ({ _id, title }) => {
    try {
      const { data } = await API.create(title);
      if (data.success) {
        return { _id, todo: data.data }
      }
    } catch (error) {
      return { _id, todo: false }
    }
  }
);

export const resendTodo = createAsyncThunk(
  RESEND_TODO,
  async ({ _id, title }) => {
    try {
      const { data } = await API.create(title);
      if (data.success) {
        return { _id, todo: data.data }
      }
    } catch (error) {
      return { _id, todo: false }
    }
  }
);

export const removeTodo = createAsyncThunk(
  REMOVE_TODO,
  async (_id) => {
    try {
      const { data } = await API.remove(_id);
      if (data.success) {
        return data.data
      }
    } catch (error) {
      console.log(error, 'gagal')
    }
  }
);

export const updateTodo = createAsyncThunk(
  UPDATE_TODO,
  async ({ _id, title, complete }) => {
    try {
      const { data } = await API.update(_id, title, complete);
      if (data.success) {
        return data.data
      }
    } catch (error) {
      console.log(error, 'gagal')
    }
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    create: (state, action) => {
      state.todos = [
        ...state.todos,
        { _id: action.payload._id, title: action.payload.title, sent: true }
      ]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readTodo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.todo) {
          state.todos = state.todos.map(item => {
            if (item._id === action.payload._id) {
              return { ...action.payload.todo, sent: true }
            }
            return item
          })
        } else {
          state.todos = state.todos.map(item => {
            if (item._id === action.payload._id) {
              item.sent = false
            }
            return item
          })
        }

      }).addCase(resendTodo.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.todo) {
          state.todos = state.todos.map(item => {
            if (item._id === action.payload._id) {
              return { ...action.payload.todo, sent: true }
            }
            return item
          })
        }
      }).addCase(removeTodo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = state.todos.filter(item => item._id !== action.payload._id)
      }).addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = state.todos.map(item => {
          if (item._id === action.payload._id) {
            return { ...action.payload, sent: true }
          }
          return item
        })
      })
  },
});

const { create } = todoSlice.actions;

export const selectTodos = (state) => state.todo.todos;

export const createTodo = (title) => (dispatch, getState) => {
  const _id = Date.now()
  dispatch(create({ _id, title }))
  console.log('dikerjain', _id)
  dispatch(createTodoAsync({ _id, title }))
}

export default todoSlice.reducer;
