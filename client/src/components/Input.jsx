import './components.css'
import plus from '../assets/plus.svg'
import { useSelector } from 'react-redux'

function Input(props) {
    const { text, active, date, onChangef, placeholder, onClickf, complited } = props
    const id = useSelector((state) => state.auth.id)
    const DateCount = (date) => {
        let currentDate = new Date
        console.log(currentDate)
        let prewDate = new Date(date)
        console.log(prewDate)
        let days_left = ((((prewDate - currentDate) / 1000) / 60) / 60) / 24
        console.log(days_left)
        return days_left
    }
    return (
        <>
            {
                complited ?
                    <input style={{ backgroundColor: '#8CFF79', textDecoration: 'line-through' }} className='main_input' disabled value={text} /> :
                    date ? onClickf ?
                        DateCount(date) < 0 ?
                            <input style={{ backgroundColor: '#9479FF' }} className='main_input' value={text} onClick={() => onClickf()} /> :
                            DateCount(date) < 1 ?
                                <input style={{ backgroundColor: '#FF7979' }} className='main_input' value={text} onClick={() => onClickf()} /> :
                                DateCount(date) < 7 ?
                                    <input style={{ backgroundColor: '#FFB979' }} className='main_input' value={text} onClick={() => onClickf()} /> :
                                    <input style={{ backgroundColor: '#8CFF79' }} className='main_input' value={text} onClick={() => onClickf()} /> :
                        DateCount(date) < 0 ?
                            <input style={{ backgroundColor: '#9479FF' }} className='main_input' value={text} /> :
                            DateCount(date) < 1 ?
                                <input style={{ backgroundColor: '#FF7979' }} className='main_input' disabled value={text} /> :
                                DateCount(date) < 7 ?
                                    <input style={{ backgroundColor: '#FFB979' }} className='main_input' disabled value={text} /> :
                                    <input style={{ backgroundColor: '#8CFF79' }} className='main_input' disabled value={text} /> :
                        onClickf ? <input className='main_input' value={text} onClick={() => onClickf()} /> : <input className='main_input' disabled value={text} />


            }
        </>
    )
}
export default Input