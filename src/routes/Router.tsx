import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import PublicRoutes from './PublicRouters'
import DashboardRoutes from './DashboardRoutes'

/*****Routes******/
const ThemeRoutes = [
  PublicRoutes,
  {
    element: <AuthOutlet fallbackPath='/' />,
    children: [DashboardRoutes],
  },
]

export default ThemeRoutes
