import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import RegisterForm from './pages/Register'
import PrivateRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Connection from "./pages/Connection"
import ConnectionLabel from "./components/ConnectionLabel"

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path='/home' element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
        } />

        <Route path='/profile' element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
        } />


        <Route path="/connection" element={<Connection />} />
      </Routes>
      
      <ConnectionLabel />
    </BrowserRouter>
  )
}

export default App
