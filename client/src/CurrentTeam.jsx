import { useEffect, useState } from 'react'
import './CurrentTeam.css'
import Header from './components/Header'
import Input from './components/Input'
import plus from './assets/plus.svg'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function CurrentTeam() {
    const [ teamUserName, setTeamUserName] = useState('')
    const [ data, setData ] = useState({})
    let { team_id } = useParams();
    const id = useSelector((state) => state.auth.id)
    useEffect(() => {
        fetch(`http://localhost:3000/users_to_team/${team_id}`)
            .then(res => res.json())
            .then(data => setData(data))
        
    },[])
    function userAdd(user_name, team_id){
        fetch('http://localhost:3000/add_user_to_team', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"user_name": user_name, "team_id": team_id})
        })
    }
    return (
        <>
            <Header />
            <div className='center'>
                <div className='block'>
                    <p style={{ padding: '0px 0px 10px 20px' }}>Участники команды</p>
                    <div className='line' />
                    <div className='edit_input'>
                        <input className='main_input' value={teamUserName} placeholder={"Ник"} onChange={(e) => {
                            setTeamUserName(e.target.value)
                        }}/>
                        <button className='square_add' onClick={() => {userAdd(teamUserName, team_id)}}><img src={plus} /></button>
                    </div>
                    <div className='input_block'>
                        {console.log(data)}
                        {
                            data?.list_users?.map((elem) => {
                                return <Input text={elem.nickname} active={false} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default CurrentTeam