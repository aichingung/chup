import styled from './css/Pending.module.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Grid } from "@nextui-org/react";

export default function Pending() {
  const [pending, setPending] = useState([])

  useEffect(() => {
    axios.get('/api/pending/tasks').then((res) => {
      setPending(res.data)
    })
  }, [])

  let cancelTask = (id) => {
    axios.delete(`/api/delete/tasks/${id}`).then((res) => {
      axios.get('/api/pending/tasks').then((res) => {
        setPending(res.data)
      })
    })
  }

  return (
    <div>
      <h3 className={styled.headers}>Pending Orders</h3>
     
      <section className={styled.pendingContainer}>
      {pending.map(i => (

        <div className={styled.pendingList}>
    
            
          <p>Address : {i.address}</p>
          <p>Date : {i.date}</p>
          <p>Time : {i.time}</p>
          <p>Price : {i.price}</p>
          <Grid.Container gap={2}>
            <Grid>
            <Button className={styled.cancelButton} onClick={() => cancelTask(i.id)} color="gradient" auto ghost>
              cancel
            </Button>
            </Grid>
          </Grid.Container>
    
        
        </div>
      ))}
      </section>
      
    </div>
  )
}