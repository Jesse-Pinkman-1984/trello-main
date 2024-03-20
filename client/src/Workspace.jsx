import Header from './components/Header'
import Input from './components/Input'
import './Workspace.css'
import plus from './assets/plus.svg'
import TaskPopup from './components/TaskPopup'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Workspace() {
    const nav = useNavigate();
    const [modalInfoIsOpen, setModalInfoOpen] = useState(false)
    const [ data, setData ] = useState({})
    const id = useSelector((state) => state.auth.id)
    useEffect(() => {
        fetch(`http://localhost:3000/comands_and_tasks/${id}`)
            .then(res => res.json())
            .then(data => setData(data))
        
    },[])
    console.log(data)
    return (
        <>
            
            <Header />
            <div className='grid_block'>
                {
                    data?.comand_list?.map((comand) => {
                        console.log(comand)
                        return(<>
                            <div className='block'>
                                <p style={{ padding: '0px 0px 10px 20px' }} onClick={() => { nav(`/teamworkspace/${comand.team.id}`) }}>{comand.team.name}</p>
                                <div className='line' />
                                <div className='input_block'>
                                    {
                                        comand.tasks.map((task) => {
                                            return <Input text={task.name} active={false} date={task.date} onClickf={false} />
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

export default Workspace