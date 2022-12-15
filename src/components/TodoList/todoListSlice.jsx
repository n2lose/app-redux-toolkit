import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialTodoListstate = {
  status: 'Idle',
  todos: []
}
const reducers = {
    addTodo: (state, action) => {
        // Normally we should push or assign direct into mutable state, but redux-toolkit allow we can do it
        state.push(action.payload)
    },
    toggleTodo: (state, action) => {
        const currentIndex = state.findIndex(todo => todo.id === action.payload)        
        if(currentIndex) state[currentIndex].completed = !state[currentIndex].completed
    },
    deleteTodo: (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload)
        if(index > -1) state.splice(index, 1)
    }
}
 
const todoListSlice =  createSlice({
    name: 'todoList',
    initialState: initialTodoListstate,
    reducers: reducers,
    extraReducers: builder => {
      builder.addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      }).addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'Idle'
        state.todos = action.payload
      }).addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = 'Idle'
        state.todos.push(action.payload)
      }).addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'Idle'
        let currentTodo = state.todos.find(todo => todo.id === action.payload)        
        currentTodo = action.payload
      }).addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'Idle'
        let currentIndex = state.todos.findIndex(todo => todo.id === action.payload)
        console.log('currentIndex === ', currentIndex)
      })
    }
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ()=> {
  const res = await fetch('/api/todos')
  const data = await res.json()
  return data.todos
})

export const addNewTodo = createAsyncThunk('todos/addnewTodo', async (newTodo)=> {
  const res = await fetch('/api/addTodo', {
    method: 'POST',
    body: JSON.stringify(newTodo)
  })
  const data = await res.json()  
  return data.todos
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (id)=> {
  const res = await fetch('/api/updateTodo', {
    method: 'POST',
    body: JSON.stringify(id)
  })
  const data = await res.json()  
  console.log({data})
  return data.todos
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const res = await fetch('/api/deleteTodo', {
    method: 'DELETE',
    body: JSON.stringify(id)
  })

  const data = await res.json()
  console.log({data})
  return data.todos
})

// export const updateTodo = createAsyncThunk('todos/updateTodo', async (id)=> {
//   const res = await fetch('/api/updateTodo', {
//     method: 'POST',
//     body: JSON.stringify(id)
//   })
//   const data = await res.json()
//   return data.todos
// })

// todos/fetchTodos === pending
// todos/fetchTodos === fullfilled
// todos/fetchTodos === rejected

export default todoListSlice

