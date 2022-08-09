import styled from './css/Completed.module.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Completed() {
  const [completed, setCompleted] = useState([])

  useEffect(() => {
    axios.get('/api/completed/tasks').then((res) => {
      setCompleted(res.data)
    })
  }, [])

  return (
    <div>
      <h3>Order History</h3>
      <section className={styled.completed}>
      {completed.map(i => (
        <div className={styled.list}>
          <p>Address : {i.address}</p>
          <p>Date : {i.date}</p>
          <p>Time : {i.time}</p>
        </div>
      ))}
      </section>
    </div>
  )
}