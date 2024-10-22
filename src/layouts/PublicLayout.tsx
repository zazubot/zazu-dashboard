import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <main id='content'>
      <Outlet />
    </main>
  )
}
