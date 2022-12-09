import { Typography, Divider } from 'antd'
import './App.css'
import TodoList from './components/TodoList'

const { Title } = Typography

function App() {
  return (
    <div className="App">
        <Title style={{ textAlign: 'center' }}>TODO APP USE REDUX TOOLKIT</Title>
        <Divider />
        <TodoList />
    </div>
  )
}

export default App
