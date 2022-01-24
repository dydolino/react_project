import ToDoList from "./ToDoList";
import React, { useState, useRef, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
  const [todos, setToDos]=useState([])
  const todoNameRef=useRef()

  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setToDos(storedTodos)
  },[])
  
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])


  function toggleToDo(id){
    const newToDos=[...todos]
    const todo=newToDos.find(todo=>todo.id===id)
    todo.complete=!todo.complete
    setToDos(newToDos)
  }


  function handleAddTodo(e){
    const name=todoNameRef.current.value
    if(name=== '') return
    setToDos(prevTodos =>{
      return [...prevTodos,{id:uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value=null
  }

  function handleClearToDos(){
    const newToDos=todos.filter(todo=>!todos.complete)
    setToDos(newToDos)
  }

  return (
    <>
    <ToDoList todos={todos} toggleToDo={toggleToDo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Add ToDo</button>
    <button onClick={handleClearToDos}>Clear Complete</button>
    <div>{todos.filter(todo=>!todo.complete).length} left ToDo</div>
    </>
    
  );
}

export default App;
