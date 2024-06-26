import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from "./Components/Layout.jsx";
import Authorization from "./Components/Authorization/Authorization.jsx";
import Login from "./Components/Authorization/Login.jsx";
import Registration from "./Components/Authorization/Registration.jsx";
import MainPage from "./Components/Main/MainPage.jsx";
import {authFetch} from "./API/Fetchers.js";
import {useSelector} from "react-redux";

function App() {

  const {currentMonth, currentYear, countDayOfMonth} = useSelector(state => state.date)
  const id = localStorage.getItem('id')
  const profileInfoUrl = import.meta.env.REACT_APP_BACK_URL + import.meta.env.REACT_APP_BACK_URL_PROFILE_INFO + `${id}`
  const getEventUrl = import.meta.env.REACT_APP_BACK_URL + import.meta.env.REACT_APP_BACK_URL_GET_EVENT

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: 'authorization',
        element: <Authorization/>,
        children: [
          {
            path: 'login',
            element: <Login/>
          },
          {
            path: 'registration',
            element: <Registration/>
          }
        ]
      },
      {
        path: 'main',
        element: <MainPage/>,
        loader: async () => {
          const profileResponse = await fetch(profileInfoUrl).then(res => res.json());
          const eventResponse = await authFetch(getEventUrl,{startDate: new Date(currentYear, currentMonth, -4), endDate: new Date(currentYear, currentMonth, countDayOfMonth+14)})
          // console.log(new Date(currentYear, currentMonth, 1), new Date(currentYear, currentMonth, countDayOfMonth-1))
          return {profileResponse, eventResponse}
        }
      },
    ]
  }
])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
