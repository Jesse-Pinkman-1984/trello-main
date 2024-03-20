import React from 'react'
import './components.css'
import IconClose from '../assets/close.svg'

function TaskPopup({ isOpen, onClose, children }) {
    return (
        <>
            {
                isOpen && (
                    <div className='modal_wrapper'>
                        <div className='modal_content'>
                            <button className='modal_close_button' onClick={() => onClose()}>
                                <img src={IconClose} />
                            </button>
                            {children}
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default TaskPopup