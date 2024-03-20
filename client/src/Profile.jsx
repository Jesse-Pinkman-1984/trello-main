import React, { useEffect } from 'react'
import Header from './components/Header'
import Input from './components/Input'
import './Profile.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from './redux/authSlice'

function Profile(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const id = useSelector((state) => state.auth.id)
    useEffect(() => {
        fetch(`http://localhost:3000/getuser/${id}`)
            .then(res => res.json())
            .then(data => setName(data.user[0].nickname))
    }, [])

    function changeName(name){
        fetch('http://localhost:3000/userchangename', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"user_id": id, "user_name": name})
        })
    }
    return(<>
        <Header />
        <div className='profile_main'>
            <div className='img_block'>
                <img className='profile_img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'/>
            </div>
            <div className='info_block'>
                <input placeholder='Введите имя' className='edited_input' value={name} onChange={(e) => {
                    setName(e.target.value)
                }}/>
                <div className='profile_button_block'>
                    <button className='profile_save_button' onClick={()=>{
                        changeName(name)
                    }}>
                        Сохранить
                    </button>
                    <button className='profile_exit_button' onClick={()=>{
                        dispatch(logOut())
                    }}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    </>)
}
export default Profile