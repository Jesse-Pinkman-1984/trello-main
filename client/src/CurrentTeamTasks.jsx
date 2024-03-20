import React, { useEffect } from 'react'
import Header from './components/Header'
import Input from './components/Input'
import TaskPopup from './components/TaskPopup'
import plus from './assets/plus.svg'
import './CurrentTeamTasks.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CurrentTeamTasks() {
    const nav = useNavigate();
    const [modalInfoIsOpen, setModalInfoOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState('')
    const [desck_id, setDesck_id] = useState('')
    const [task_id, setTask_id] = useState('')
    const [modalAddIsOpen, setModalAddOpen] = useState(false)
    const [desckName, setDesckName] = useState('')
    const [taskName, setTaskName] = useState('')
    let { team_id } = useParams();
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/comand_descks_tasks/${team_id}`)
            .then(res => res.json())
            .then(data => setData(data))

    }, [])
    console.log(data)
    useEffect(() => { },)
    function setInfo(title, desc, date, desck_id, task_id) {
        setTask_id(task_id)
        setDesck_id(desck_id)
        setTitle(title)
        setDesc(desc)
        setDate(date)
        setModalInfoOpen(true)
    }

    function complit(task_id) {
        fetch('http://localhost:3000/complitTask', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "task_id": task_id })
        })
    }
    function addDesck(desckName) {
        fetch('http://localhost:3000/addDesck', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "desck_name": desckName, "team_id": team_id })
        })
    }
    function addTask(desck_id, task_name) {
        fetch('http://localhost:3000/addTask', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "desck_id": desck_id, "task_name": task_name })
        })
    }
    function taskEdit(name, description, date, task_id){
        fetch('http://localhost:3000/taskEdit', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "description": description, "task_name": name, "date": date, "task_id": task_id })
        })
    }
    return (
        <>
            <TaskPopup isOpen={modalInfoIsOpen} onClose={() => setModalInfoOpen(false)}>
                <h2><input type='text' value={title} onChange={(e)=>{ setTitle(e.target.value) }}/></h2>
                <h3>Описание:</h3>
                <p><input type='text' value={desc} onChange={(e)=>{ setDesc(e.target.value) }}/></p>
                <div>
                    <p>До <input type='date' value={date} onChange={(e)=>{ setDate(e.target.value) }}/></p>
                    <button className='profile_save_button' onClick={() => {
                        complit(task_id)
                        nav(`/teamworkspace/${team_id}`)
                    }}>Выполнена</button>
                    <button className='profile_save_button' onClick={() => {
                        taskEdit(title, desc, date, task_id)
                    }}>Изменить</button>
                </div>
            </TaskPopup>
            <TaskPopup isOpen={modalAddIsOpen} onClose={() => setModalAddOpen(false)}>
                <h2>Добавить стол</h2>
                <input style={{ width: '400px' }} className='edited_input' value={desckName} onChange={(e) => {
                    setDesckName(e.target.value)
                }} type="text" />
                <button className='reg_log_button' onClick={() => {
                    addDesck(desckName)
                    nav(`/teamworkspace/${team_id}`)
                }}>Добавить</button>
            </TaskPopup>
            <div className='bottom_right'>
                <button className='button_work' onClick={() => {
                    setModalAddOpen(true)
                }}><img src={plus} /></button>
            </div>
            <Header />

            <div className='grid_block'>
                {
                    data?.descks_arr?.map((desck) => {
                        return (<>
                            <div className='block'>
                                <p style={{ padding: '0px 0px 10px 20px' }}>{desck.desck.name}</p>
                                <div className='line' />
                                <div className='input_block'>
                                    <div className='edit_input'>
                                        <input className='main_input' value={taskName} placeholder={"Название задачи"} onChange={(e) => {
                                            setTaskName(e.target.value)
                                        }} />
                                        <button className='square_add' onClick={() => { addTask(desck.desck.id, taskName) }}><img src={plus} /></button>
                                    </div>
                                    {
                                        desck.tasks.map((task) => {
                                            return <Input text={task.name} active={false} date={task.date} complited={task.complited} onClickf={() => setInfo(task.name, task.description, new Date(task.date).toLocaleDateString('en-CA'), desck.desck.id, task.id)} />
                                        })
                                    }
                                </div>
                            </div>
                        </>)
                    })
                }
            </div>
        </>
    )
}

export default CurrentTeamTasks