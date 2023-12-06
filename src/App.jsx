
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import BaseRouter from './Routes/BaseRouter'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<BaseRouter/>}/>
      </Routes>
    </BrowserRouter>
    <Toaster/>  
    </>
  )
}

export default App
