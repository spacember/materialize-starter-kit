// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Firebase Import
import { auth } from 'src/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import { app } from 'src/firebase'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)
const db = getFirestore(app)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setLoading(false)
        setUser({ ...user, role: 'admin' })
      } else {
        setUser(null)
        setLoading(false)

        // If no user is logged in, stay on the login page
        router.replace('/login')
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = async (params, errorCallback) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password)
      const user = userCredential.user

      // Set the user data in the context state
      setUser({ ...user, role: params.role || 'admin' })

      // Redirect the user to a return URL or the root URL
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL)
    } catch (error) {
      // Call the errorCallback function if one is provided
      if (errorCallback) errorCallback(error)
    }
  }

  const handleLogout = async () => {
    try {
      setUser(null)
      await auth.signOut()
      router.replace('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Should handle user role in register form
  const handleRegister = async (params, errorCallback) => {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, params.email, params.password)
      const user = userCredential.user

      // Create a new document in Firestore with the user's ID as the document ID
      await setDoc(doc(db, 'users', user.uid), {
        role: params.role || 'admin'
      })

      // Set the user data in the context state
      setUser({ ...user, role: params.role || 'admin' })

      // Redirect the user to a return URL or the root URL
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL)
    } catch (error) {
      // Call the errorCallback function if one is provided
      if (errorCallback) errorCallback(error)
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
