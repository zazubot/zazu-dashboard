import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import PublicRoutes from './PublicRouters'
import DashboardRoutes from './DashboardRoutes'
import { createBrowserRouter } from 'react-router-dom'

/*****Routes******/
const Approuter = createBrowserRouter([
  PublicRoutes,
  {
    element: <AuthOutlet fallbackPath='/' />,
    children: [DashboardRoutes],
  },
])

export default Approuter
