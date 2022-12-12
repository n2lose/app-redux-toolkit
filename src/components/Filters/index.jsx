import { Col, Input, Radio, Row, Select, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import filtersSlice from "./filtersSlice";


const { Paragraph } = Typography

const priorityOptions = [
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'}
]

export default function Filters() {
    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState('')
    const [status, setStatus] = useState('All')
    const [priorities, setPriorities] = useState([])

    const handleSearchText = (txtSearch)=>  {
        setSearchText(txtSearch)
        dispatch(filtersSlice.actions.filterSearch(txtSearch))
    }

    const handleFilterStatus = (status)=> {
        setStatus(status)
        dispatch(filtersSlice.actions.filterStatus(status))
    }


    const handleFilterPriorities = (prioritySelected)=> {
        setPriorities(prioritySelected)     
        dispatch(filtersSlice.actions.filterPriorities(prioritySelected))   
    }

    return (
        <Row style={{textAlign: 'left'}}>
            <Col span={24} style={{ marginBottom: '1.5rem'}}>
                <Paragraph>Search</Paragraph>
                <Input placeholder="Enter your search" 
                    style={{width: '100%'}}
                    value={searchText} 
                    onChange={e => handleSearchText(e.target.value)} />
            </Col>
            <Col span={24} style={{ marginBottom: '1.5rem'}}>
                <Paragraph>Filter by Status</Paragraph>
                <Radio.Group value={status} onChange={e => handleFilterStatus(e.target.value)}>
                    <Radio value="All">All</Radio>
                    <Radio value="Completed">Completed</Radio>
                    <Radio value="Todo">Todo</Radio>
                </Radio.Group>
            </Col>
            <Col span={24} style={{ marginBottom: '1.5rem'}}>
                <Paragraph>Filter by Priority</Paragraph>
                <Select mode="multiple"
                    allowClear
                    placeholder="Please select"
                    style={{width: '100%'}}
                    options={priorityOptions}
                    value={priorities}
                    onChange={value => handleFilterPriorities(value)}
                />                               
            </Col>
        </Row>
    )
}