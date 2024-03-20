import './components.css'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/authSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    return (<>
        <div className='header_bg'>
            <div>
            <img className='mini_avatar' src='https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-team-work-logo-vector-design-illustration-png-image_5629491.png'/>
            </div>
            <ul className='header_ul' type="none">
                <li onClick={()=>{
                    nav('/workspace')
                }}><p>Моё пространство</p></li>
                <li onClick={()=>{
                    nav('/')
                }}><p>Мои команды</p></li>
                <li><a onClick={()=>{nav('/profile')}}><p>Профиль</p></a></li>

            </ul>
        </div>
    </>)
}
export default Header