import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.component'
import Form from './components/Form/Form.component'
import ViewForm from './components/ViewForm/ViewForm.component'
import EditForm from './components/EditForm/EditForm.component'
import { useDispatch } from 'react-redux'
import { startGetForms } from './actions/formActions'
function App() {
const dispatch = useDispatch()
useEffect(()=>{
 dispatch (startGetForms())
},[])
  return (
    <>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/form/create' element={<Form/>}/>
        <Route path = '/form/:id' element={<ViewForm/>}/>
        <Route path = '/form/:id/edit' element={<EditForm/>}/>

      </Routes>
    </>
  )
}

export default App
