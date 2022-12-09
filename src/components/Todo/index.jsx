import { Button, Checkbox, Col, Row, Tag } from "antd"
import { DeleteOutlined } from '@ant-design/icons'
import { useState } from "react"
import { useDispatch } from "react-redux"
import todoListSlice from "../TodoList/todoListSlice"

const priorityColorMap = {
    High: 'red',
    Medium: 'blue',
    Low: 'grey'
}


export default function TodoItem(props) {
    const { id, name, priority, completed} = props
    const dispatch = useDispatch()

    const [checked, setChecked] = useState(completed)

    const handleToggleTodo = ()=> {
        setChecked(!checked)
        dispatch(todoListSlice.actions.toggleTodo(id))
    }

    const handleDeleteTodo = ()=> {
        dispatch(todoListSlice.actions.deleteTodo(id))
    }
    
    return (
        <Row style={{ marginBottom: '16px'}}>
            <Col span={16} style={{textAlign: 'left', textTransform: 'capitalize'}}>
                <Checkbox style={checked ? 
                    { textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'GrayText'}: {}}
                    checked={checked} onChange={handleToggleTodo}>
                    {name}
                </Checkbox>
            </Col>
            <Col span={8}  style={{textAlign: 'right'}}>
                <Tag color={priorityColorMap[priority]} style={{margin: 0, lineHeight: '30px', width: '60px'}}>{priority}</Tag>
                <Button onClick={handleDeleteTodo} icon={<DeleteOutlined />} />
            </Col>
        </Row>
    )

}