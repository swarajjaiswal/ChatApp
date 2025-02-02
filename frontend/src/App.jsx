import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';

function App() {


  return (
    <>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/chats" element={<ChatPage />} />
    </Routes>

    </>
  )
}

export default App
