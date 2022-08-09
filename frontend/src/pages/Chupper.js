import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from './AppContext'
import axios from 'axios'
import MapAccept from './MapAccept'
// import { styled } from '@nextui-org/react'
import styled from './css/Chupper.module.css'


export default function Chupper() {
  let [acceptTask, setAcceptTask] = useState(true)
  let [taskIdx, setTaskIndex] = useState(0)
  let [name, setName] = useState('')
  let [statusComplete, setStatusComplete] = useState(true)
  let [reset, setReset] = useState(true)
  const [results, setTasks] = useState([])

  let { lat, lng } = useContext(AppContext)

  useEffect(() => {
    setInterval(() => {
      axios.get(`/api/tasks`).then((res) => {
        setTasks(res.data)
      })
    }, 5000)
  }, [])

  const nextTask = () => setTaskIndex(taskIdx + 1)
  const completeTask = (event, id) => {
    event.preventDefault()
    setStatusComplete(!statusComplete)

    axios.post(`/api/completed/${id}`)
  }

  const taskAccept = (event, id) => {
    event.preventDefault()
    setAcceptTask(!acceptTask)
    setReset(reset)
    axios.post(`/api/ongoing/${id}/${name}`)
  }

  const cancelTask = (event, id) => {
    event.preventDefault()
    setAcceptTask(!acceptTask)
    axios.post(`/api/pending/${id}`)
  }

  const handleAfterComplete = () => {
    setReset(!reset)
    setAcceptTask(!acceptTask)
    setStatusComplete(!statusComplete)
  }

  function distanceFromStart(lat1, lon1, lat2, lon2) {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist
  }

  if (results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      let latData = results[i].lat
      let longData = results[i].lng
      results[i].distance = distanceFromStart(lat, lng, latData, longData)
    }
    let closest = results.sort((a, b) => {
      return a.distance - b.distance
    })

    if (taskIdx === closest.length) setTaskIndex(0)
    let { address, distance, id } = closest[taskIdx]
    let destLat = closest[taskIdx].lat
    let destLng = closest[taskIdx].lng

    return (
      <div className={styled.chupperContainer}>
        <section>
          {acceptTask ? (
            <></>
          ) : (
            <div>
              <MapAccept
                lat={+lat}
                lng={+lng}
                destLat={+destLat}
                destLng={+destLng}
              />
            </div>
          )}
        </section>
        <section className='chupper-list'>
          <div>
            <div className={styled.pendingChup}>
            <h3>Pending Chup</h3>
            <p> Address : {address}</p>
            <p> Distance : {distance.toFixed(2)}km</p>
            <p> Lat : {destLat}</p>
            <p> Lng : {destLng}</p>
            <p> id : {id}</p>
            <p> chupper name : {name}</p>

            <label htmlFor='name'>
              name :
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
              />
            </label>
           
            <button color="gradient" auto ghost
              style={{ display: !acceptTask ? 'none' : 'block' }}
              onClick={(event) => taskAccept(event, id)}
            >
              Accept this Task
            </button>
            <button color="gradient" auto ghost
              style={{ display: !acceptTask ? 'none' : 'block' }}
              onClick={nextTask}
            >
              Reject go to Next Task
            </button>
            {
              <button color="gradient" auto ghost
                // disabled={!statusComplete ? true : false}
                style={{
                  display: acceptTask || !statusComplete ? 'none' : 'block',
                }}
                onClick={(event) => cancelTask(event, id)}
              >
                Cancel
              </button>
            }
            {
              <button color="gradient" auto ghost
                // disabled={!statusComplete ? true : false}
                style={{
                  display: acceptTask || !statusComplete ? 'none' : 'block',
                }}
                onClick={(event) => completeTask(event, id)}
              >
                Complete
              </button>
            }
      
            </div>
            
          </div>
          <div
            style={{
              display: !reset || statusComplete ? 'none' : 'block',
            }}
          >
            <h1>Well Done Completed!</h1>
            <button onClick={handleAfterComplete}>Go Back</button>
          </div>
        </section>
      </div>
    )
  }
}
