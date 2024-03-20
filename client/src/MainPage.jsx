import './MainPage.css'
import Header from './components/Header'
import Input from './components/Input'
import plus from './assets/plus.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function MainPage() {
    const nav = useNavigate();
    const [ teamName, setTeamName ] = useState('')
    const [ data, setData ] = useState({})
    const id = useSelector((state) => state.auth.id)
    useEffect(() => {
        fetch(`http://localhost:3000/user_teams/${id}`)
            .then(res => res.json())
            .then(data => setData(data))
        
    },[])
    function teamAdd(user_id, teamName){
        fetch('http://localhost:3000/team_add', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"user_id": user_id, "teamName": teamName})
        })
    }
    
    return (
        <>
            <Header />
            <div className='center'>
                <div className='block'>
                    <p style={{ padding: '0px 0px 10px 20px' }}>Мои команды</p>
                    <div className='line' />
                    <div className='edit_input'>
                        <input className='main_input' value={teamName} placeholder={"Название команды"} onChange={(e) => {
                            setTeamName(e.target.value)
                        }}/>
                        <button className='square_add' onClick={() => {teamAdd(id, teamName)}}><img src={plus} /></button>
                    </div>
                    <div className='input_block'>
                        
                        { 
                            data?.user_team?.map((e) => {
                                return(<input className='main_input'  value={e.name} onClick={() => {
                                    nav(`/team/${e.id}`)
                                }} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage