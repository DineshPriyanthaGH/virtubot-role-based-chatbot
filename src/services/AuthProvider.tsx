// AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  const signup = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
