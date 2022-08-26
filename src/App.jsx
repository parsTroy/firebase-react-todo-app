import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from "./Todo";

import style from './App.module.css';

import { db } from './firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc  } from 'firebase/firestore';


function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === ''){
      alert('Please enter a valid list item...')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  }

  // Read todo from firebase
  useEffect(()=>{
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArr)
    })
    return () => unsubscribe()
  },[])

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.portfolioLink}>
        <a href="https://troyparsons.ca/">
         <button className={style.portfolioBtn}>
          Portfolio
        </button>
       </a>
      </div>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo" />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index)=> (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} item(s) todo`}</p>}
      </div>
    </div>
  );
}

export default App;
