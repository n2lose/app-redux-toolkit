import { Typography, Divider } from 'antd'
import './App.css'
import Filters from './components/Filters'
import TodoList from './components/TodoList'
import { setupServer } from './APIs'
import { useEffect } from 'react'

const { Title } = Typography

if(process.env.NODE_ENV === 'development') {
  setupServer()
}

function App() {
  useEffect(()=> {
    fetch('/api/addTodo', {
      method: 'POST',
      body: JSON.stringify({
        id: 1,
        name: "Learn Javascript",
        priority: "Medium",
        completed: false
      })
    })
      .then(res => {
        // fetch todos after added
        fetch('/api/todos')
        .then(res => res.json())
        .then(data => console.log('Added first todo : ', data))

        // update todo
        fetch('api/updateTodo', {
          method: 'POST',
          body: JSON.stringify({
            id: 1,
            name: "Learn Redux thunk",
            priority: "High",
            completed: true
          })
        })
          .then(() => {
            fetch('/api/todos')
              .then(res => res.json())
              .then(data => console.log('Updated todo : ', data))
          })
      })

   
  }, [])

  return (
    <div className="App">
        <Title style={{ textAlign: 'center' }}>TODO APP USE REDUX TOOLKIT</Title>
        <Divider />
        <Filters />
        <Divider />
        <TodoList />
    </div>
  )
}

export default App
