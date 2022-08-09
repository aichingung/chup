import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from './AppContext'
import styled from './css/UserTask.module.css'
import PlacesAutocomplete from 'react-places-autocomplete'
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'
import Map from './Map'
import axios from 'axios'
import UserAccount from './UserAccount'
import ActivityBar from './ActivityBar'
import MapAccept from './MapAccept'
import { Button, Grid } from "@nextui-org/react";

let obj = {
  'RM5' : '30min', 
  'RM10': '1 hour',
  'RM20': '2 hours',
  'RM30': '3 hours',
  'RM40': '4 hours',
  'RM50': '5 hours',
  'RM60': '6 hours',
  'RM70': '7 hours',
  'RM72': 'whole day'
}

export default function UserTask() {
  //! Start of Function
  const [address, setAddress] = useState('Kuala Lumpur')
  // const [listTask, setListTask] = useState([])
  const [suggestion, setSuggestion] = useState('')
  const [coord, setCoord] = useState({
    lat: 3.140853,
    lng: 101.693207,
  })
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [remarks, setRemarks] = useState('')
  const [option, setOption] = useState('')
  const [now, setNow] = useState('')

  let { isHide, lat, lng, destLng, destLat, name } = useContext(AppContext)

  const handleSelect = (value, placeId, s) => {
    geocodeByPlaceId(placeId).then((res) => {
      setAddress(
        `${s.formattedSuggestion.mainText}, ${res[0].formatted_address}`
      )
    })

    setSuggestion(value)
    geocodeByAddress(value)
      .then((results) => {
        return getLatLng(results[0])
      })
      .then((latLng) => setCoord(latLng))
      .catch((error) => console.error('Error', error))

    setSuggestion('')
  }

  const handleClick = (suggestions, getSuggestionItemProps) => {
    return suggestions.map((suggestion) => {
      const className = suggestion.active
        ? 'suggestion-item--active'
        : 'suggestion-item'
      const style = suggestion.active
        ? { backgroundColor: '#B6D1E6', cursor: 'pointer' }
        : { backgroundColor: '#ffffff', cursor: 'none' }
      return (
        <div
          key={suggestion.index}
          {...getSuggestionItemProps(suggestion, {
            className,
            style,
          })}
        >
          <div className={styled.list}>
            <h4>{`${suggestion.index + 1}.`}</h4>
            <h4>{suggestion.description}</h4>
          </div>
        </div>
      )
    })
  }

  const handleSuggestion = () => {
    return ({
      getInputProps,
      suggestions,
      getSuggestionItemProps,
      loading,
    }) => (
      <div className='chupTask2'>
        <label htmlFor=''>
          location :
          <input
            {...getInputProps({
              placeholder: 'Enter Location Here',
              className: `${styled.locationSearchInput}`,
            })}
          />
        </label>
        <div className={styled.autocompleteDropdownContainer}>
          {loading && <div>Loading...</div>}
          {handleClick(suggestions, getSuggestionItemProps)}
        </div>
      </div>
    )
  }
  const handleChup = event => {
    event.preventDefault()
    axios.post('/api/new/tasks', {name: '' ,lat: coord.lat , lng: coord.lng, address: address , time: time, date: date, remark: remarks, price: option, duration: obj[option]})
    .then(()=>{
      setNow(new Date())
    })
  }

  return (
    <div>
      <div className={styled.mainContainer}>
        <div
          style={{ display: isHide ? 'none' : 'block' }}
          className={styled.mapContainer}
        >
          <h1>new chup form</h1>
          <section className={styled.map}>
            <Map lat={coord.lat} lng={coord.lng} />
          </section>
          <p className={styled.fullAddress}>{address}</p>
          <div className={styled.formContainer}>
            <form className={styled.form} onChange={handleChup}>
              <PlacesAutocomplete
                value={suggestion}
                onChange={setSuggestion}
                onSelect={handleSelect}
              >
                {handleSuggestion()}
              </PlacesAutocomplete>

              <label htmlFor='date'>
                date :{' '}
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type='date'
                />
              </label>

              <label htmlFor='time'>
                time :{' '}
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  type='time'
                />
              </label>

              <label htmlFor="hour">Hour :
        <select name="pricing" id="" onChange={e => setOption(e.target.value)} >
          <option value='RM5' >30 min</option>
          <option value="RM10">1 hour</option>
          <option value="RM20">2 hours</option>
          <option value="RM30">3 hours</option>
          <option value="RM40">4 hours</option>
          <option value="RM50">5 hours</option>
          <option value="RM60">6 hours</option>
          <option value="RM70">7 hours</option>
          <option value="RM72">1 day</option>
        </select>
        </label>

              <label htmlFor='remarks'>
                remarks :{' '}
                <textarea
                  value={remarks}
                  cols='15'
                  rows='3'
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
              </label>
          <Button>
            Chup Chup
          </Button>
      
            </form>
          </div>
        </div>
        <section
          style={{ display: !isHide ? 'none' : 'block' }}
        >
          <MapAccept
            lat={+lat}
            lng={+lng}
            destLat={+destLat}
            destLng={+destLng}
          />
          <div>
            <h1>chupper name : {name}</h1>
          </div>
        </section>
        <div>
          <ActivityBar />
        </div>
      </div>
    </div>
  )
}
