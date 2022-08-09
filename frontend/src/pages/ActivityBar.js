import styled from './css/ActivityBar.module.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from './AppContext'
import { Link, Spacer } from "@nextui-org/react";

export default function ActivityBar({ option }) {
  const [ongoing, setOngoing] = useState([])

  useEffect(() => {
    axios.get('/api/ongoing/tasks').then((res) => {
      console.log(res.data)
      setOngoing(res.data)
    })
  }, [])

  let { handleHide } = useContext(AppContext)

  return (
    <div>
      <div className={styled.activityContainer}>
        <h3 className={styled.headers}>Ongoing Chups</h3>
        <section className={styled.ongoing}>
          {ongoing.map((ongoing, idx) => (
            <div
              key={idx}
              onClick={(e) => handleHide(e, ongoing.id)}
              className='ongoing-list'
              >
                <p>Address : {ongoing.address}</p>
                <p>Date : {ongoing.date}</p>
            </div>
          ))}
        </section>
      <nav>
<Link className={styled.Link} block color="warning" href="#/completed">
  Chup History
</Link>
</nav>
<br />
<nav>
<Link className={styled.Link} block color="warning" href="#/pending">
  Pending Chups
</Link>
</nav>
      </div>
    </div>
  )
}
