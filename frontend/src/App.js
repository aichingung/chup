import { Route,Routes } from 'react-router-dom'
import './App.css'
import UserTask from './pages/UserTask'
import Chupper from './pages/Chupper'
import Pending from './pages/Pending'
import Completed from './pages/Completed'
import { Text } from '@nextui-org/react';
import logo from './pages/images/logo.png'

function App() {
  return (
    <div className='App'>
      <img className='logo' src={logo} alt="" />
      <div className='main-Container'>
        <div className='slogan-header'>
      <>
      <Text 
        h1
        size={60}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        Chup! Chup!
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        We Queue For You!
      </Text>
    </>

        </div>
      <Routes>
        <Route path='/' element={<UserTask />} />
        <Route path='/chupper' element={<Chupper />} />
        <Route path='/pending' element={<Pending />} />
        <Route path='/completed' element={<Completed />} />
      </Routes>

        </div>
      </div>
  )
}

export default App