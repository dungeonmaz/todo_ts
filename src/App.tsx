import React, { ChangeEvent, useState, FormEvent } from 'react';
import './App.css'
import ToDo from './components/ToDo';
import { ITodo } from './interfaces'

function App() {
  const [todoText, setTodoText] = useState<string>("")
  const [todos, setTodos] = useState<ITodo[]>([])
  const [show, setShow] = useState<string>("all")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value)
  }

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (todoText === "") return
    let t_todos = [...todos]
    let newTodo = { name: todoText, completed: false, index: 0 }
    t_todos.push(newTodo)

    t_todos = t_todos.map((todo: ITodo, i: number) => {
      todo.index = i
      return todo
    })

    setTodoText('')
    setTodos(t_todos)
  }

  const changeTodo = (i: number) => {
    setTodos([...todos.map(el => {
      if (el.index === i) {
        el.completed = !el.completed
      }
      return el
    })])
  }

  const handleClear = () => {
    setTodos([...todos.filter(el => !el.completed && el)])
  }

  return (
    <div>
      <h1>todos</h1>
      <form onSubmit={addTodo}>
        <input type="text" className="input" placeholder="What needs to be done?"
          autoComplete="off" onChange={handleChange} value={todoText} />
        <ul className="todolist" >
          {todos.map((it: ITodo) => {
            if (show === 'all') return <ToDo key={it.index} todo={it} changeTodo={changeTodo} />
            if (show === 'active') return !it.completed && <ToDo key={it.index} todo={it} changeTodo={changeTodo} />
            if (show === 'completed') return it.completed && <ToDo key={it.index} todo={it} changeTodo={changeTodo} />
          })}
        </ul>
      </form>
      <div style={{display:'flex', justifyContent:'center', gap:'5px'}}>
          <div>{todos.filter(el => !el.completed && el).length} items left </div>
          <button onClick={() => setShow('all')}>All</button>
          <button onClick={() => setShow('active')}>Active</button>
          <button onClick={() => setShow('completed')}>Completed</button>
          <button onClick={handleClear}>Clear Completed</button>
        </div>
    </div>
  );
}

export default App;
