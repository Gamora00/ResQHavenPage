// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({
  children,
  role
}) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className='d-flex justify-content-center
        align-items-center vh-100'
      >
        <div className='spinner-border text-primary' />
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  if (role && user.role !== role) {
    return <Navigate to='/unauthorized' replace />
  }

  return children
}