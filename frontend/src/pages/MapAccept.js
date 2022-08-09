// import { styled } from '@nextui-org/react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useState } from 'react'
import styled from './css/MapAccept.module.css'

const containerStyle = {
  width: '100%',
  height: '400px',
}

export default function MapAccept({ lat, lng, destLat, destLng }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCRNZvuGQwiWSwYnlSgzwKqRw1xAKPG3w0',
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  let data = [
    [lat, lng],
    [destLat, destLng],
  ]
  let center = getCenter(data)

  function getCenter(data) {
    if (!(data.length > 0)) {
      return false
    }
    var num_coords = data.length
    var X = 0.0
    var Y = 0.0
    var Z = 0.0

    for (let i = 0; i < data.length; i++) {
      var lat = (data[i][0] * Math.PI) / 180
      var lon = (data[i][1] * Math.PI) / 180
      var a = Math.cos(lat) * Math.cos(lon)
      var b = Math.cos(lat) * Math.sin(lon)
      var c = Math.sin(lat)
      X += a
      Y += b
      Z += c
    }

    X /= num_coords
    Y /= num_coords
    Z /= num_coords

    var hyp = Math.sqrt(X * X + Y * Y)
    lat = Math.atan2(Z, hyp)
    lon = Math.atan2(Y, X)

    var newX = (lat * 180) / Math.PI
    var newY = (lon * 180) / Math.PI

    return { newX, newY }
  }

  calculateRoute(lat, lng, destLat, destLng)
  async function calculateRoute(lat, lng, destLat, destLng) {
    if (
      { lat: lat, lng: lng } === '' ||
      { lat: destLat, lng: destLng } === ''
    ) {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: { lat: lat, lng: lng },
      destination: { lat: destLat, lng: destLng },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  return isLoaded ? (
    <div>
      <div className={styled.mapacceptContainer}>
        <div className={styled.box}>
      <h1>Ongoing Chups</h1>
      <div>
        <GoogleMap
          center={center}
          zoom={16}
          mapContainerStyle={containerStyle}
          options={{
            disableDefaultUI: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div className='details-accept'>
        <h3>Driving</h3>
        <h3>Distance : {distance}</h3>
        <h3>Duration : {duration}</h3>
      </div>

        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
