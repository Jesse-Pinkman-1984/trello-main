import './App.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Reg from './reg/Reg'
import Log from './auth/Auth'
import { useSelector } from 'react-redux'
import MainPage from './MainPage'
import CurrentTeam from './CurrentTeam'
import Workspace from './Workspace'
import CurrentTeamTasks from './CurrentTeamTasks'
import Profile from './Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/reg" />
  },
  {
    path: '/reg',
    element: <Reg />
  },
  {
    path: '/auth',
    element: <Log />
  },
  {
    path: '/*',
    element: <Navigate to="/auth" />
  },
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/team/:team_id',
    element: <CurrentTeam />
  },
  {
    path: '/workspace',
    element: <Workspace />
  },
  {
    path: '/teamworkspace/:team_id',
    element: <CurrentTeamTasks />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/auth',
    element: <Navigate to="/" />
  },
  {
    path: '/red',
    element: <Navigate to="/" />
  },
  {
    path: '/*',
    element: <Navigate to="/" />
  },

])

function App() {

  const token = useSelector((state) => state.auth.token)

  console.log(token);


  return (
    token ?  <RouterProvider router={authRouter} /> : <RouterProvider router={router} />
  )
}

export default App

