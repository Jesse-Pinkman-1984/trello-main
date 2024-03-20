import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { regThunk } from '../redux/regSlice'
import { useNavigate } from 'react-router-dom'

const Reg = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const regState = useSelector((state) => state.reg)
    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(() => {
        if (regState.message) {
            nav('/auth')
        }
    }, [regState])

    return (
        regState.error ? <p>{regState.error}</p> :
            regState.loading ? <p>Loading...</p> :
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    gap: '8px'
                }}>
                    <h1 style={{color: 'white', marginBottom: '20px'}}>Регистрация</h1>
                    <input style={{width: '400px'}} placeholder='Придумайте логин' className='edited_input' value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} type="text" />
                    <input style={{width: '400px'}} placeholder='Придумайте пароль' className='edited_input' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="text" />
                    <button className='reg_log_button' onClick={() => {
                        dispatch(regThunk({
                            username: username,
                            password: password
                        }))
                    }}>Регистрация</button>
                    <a className='reg_log_nav' onClick={() => {
                        nav('/log')
                    }}>Войти</a>
                </div>
    )
}

export default Reg