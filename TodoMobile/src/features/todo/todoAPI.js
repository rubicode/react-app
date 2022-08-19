// A mock function to mimic making an async request for data
import { request } from '../../utils/api'

export const read = () => request.get('todos')

export const create = title => request.post('todos', { title })

export const update = (_id, title, complete) => request.put(`todos/${_id}`, { title, complete })

export const remove = _id => request.delete(`todos/${_id}`)
