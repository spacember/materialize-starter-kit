// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Firebase Import
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'

const AuthGuard = props => {
  const { children, fallback } = props
  const userAuth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      const unsubscribe = onAuthStateChanged(auth, user => {
        if (!user) {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        }
      })

      return unsubscribe
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (userAuth.loading || auth.currentUser === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
