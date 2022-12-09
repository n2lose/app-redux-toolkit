import { Button, Col, Input, Row, Select } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {v4 as uuidv4 } from 'uuid'
import { todoListRemainingSelector } from '../../redux-toolkit/selectors'
import TodoItem from '../Todo'
import todoListSlice from './todoListSlice'

export default function TodoList() {

    const dispatch = useDispatch()
    const todoList = useSelector(todoListRemainingSelector)
    
    const [todoName, setTodoName] = useState('')
    const [priority, setPriority] = useState('Medium')

    const handleAddTodo = ()=> {
        const todo = {
            id: uuidv4(),
            name: todoName, 
            priority: priority,
            completed: false
        }
        dispatch(todoListSlice.actions.addTodo(todo))
        setTodoName('')
    }

    return(
        <Row style={{height: 'calc(100% - 40px)'}}>
            <Col span={24}>
                {todoList.map(todo => (
                    <TodoItem key={todo.id} id={todo.id} name={todo.name} completed={todo.completed} priority={todo.priority} />
                ))}
            </Col>
            <Col span={24}>
                <Input.Group compact style={{ display: 'flex'}}>
                    <Input placeholder='Enter your todo...' 
                        value={todoName}
                        onChange={e => setTodoName(e.target.value)}
                        />
                    <Select size='middle' defaultValue={priority} onChange={value => setPriority(value)}>
                        <Select.Option value='High'>High</Select.Option>
                        <Select.Option value='Medium'>Medium</Select.Option>
                        <Select.Option value='Low'>Low</Select.Option>
                    </Select>
                    <Button type='primary' onClick={handleAddTodo}>Add</Button>
                </Input.Group>
            </Col>
        </Row>
    )
}