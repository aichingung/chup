import { useEffect, useState, createContext } from 'react'
import axios from 'axios'
export const AppContext = createContext()

export function AppProvider(props) {
  let [isHide, setHide] = useState(false)
  let [lat, setLat] = useState('')
  let [lng, setLng] = useState('')
  let [destLat, setDestLat] = useState('')
  let [destLng, setDestLng] = useState('')
  let [name, setName] = useState('')

  const handleHide = (event, id) => {
    event.preventDefault()
    setHide(!isHide)
    axios.get(`/api/ongoing/tasks/${id}`).then((res) => {
      setDestLat(res.data[0].lat)
      setDestLng(res.data[0].lng)
      setName(res.data[0].name)
    })
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPosition)
  }, [])

  const getPosition = (data) => {
    setLat(data.coords.latitude)
    setLng(data.coords.longitude)
  }

  let values = {
    isHide,
    handleHide,
    lat,
    lng,
    destLat,
    destLng,
    name
  }

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  )
}
