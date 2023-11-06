import './App.css'
import React, { useState, useEffect } from 'react'
import react from '../../assets/react.svg'
import { Card, CardProps } from '../../components/Card'

type ProfileResponse = {
  name: string,
  avatar_url: string
}

type User = { 
  name: string;
  avatar: string
}

export function Home() {
  const [studentName, setStudentName] = useState('Nome-Lindo')
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
/*    fetch("https://api.github.com/users/Daniel3858")
    .then(response => response.json())
    .then(data => {
      console.log('DADOS ===>', data)
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
    .catch(error => console.log(error)) */

    async function fetchData() {
      const response = await fetch("https://api.github.com/users/Daniel3858")
      const data = await response.json() as ProfileResponse
      console.log('DADOS ===>', data)
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [])

  return (

    <div className="container">
      <header>
      <h1>Usando Vite e React <img src={react} alt="logo" /> </h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de perfil." />
      </div>
      </header>

    <input type="text"
     placeholder='Digite seu nome...'
     onChange={e => setStudentName(e.target.value)}
     />

    <button type="button" onClick={handleAddStudent}>
      Enviar
      </button>

    <Card name="Daniel Albuquerque" time="03:12:00"/>
    <Card name="Douglas Baiano" time="20:39:12"/> 
    <Card name="Neymar Jr." time="10:39:12"/>
    {
      students.map(student => 
        <Card
          key={student.time}
          name={student.name}
          time={student.time}
        />
      )
    }

    </div> // Também pode ser usada a ideia do Fragment.
  )
} // Depois adicionar uma tag e incluir:/= "Lista de presença". E depois tentar ideia de colocar idade.
// Criar estrutura para sempre adicionar um novo ID na chave: "key".


