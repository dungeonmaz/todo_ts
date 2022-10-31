import React, { useState } from 'react'
import { ITodo } from '../interfaces'

interface Props {
    todo: ITodo,
    changeTodo: (i: number) => void
}

const ToDo = ({ todo, changeTodo }: Props) => {
    const [completed, setCompleted] = useState<boolean>(todo.completed)

    const handleChange = () => {
        setCompleted(!completed)
        changeTodo(todo.index)
    }

    return (
        <li className={completed ? "completed" : ''}>
            <label>
                <input type="checkbox" className='checkButton' checked={completed} onChange={handleChange} />
                {todo.name}
            </label>
        </li>
    )
}

export default ToDo