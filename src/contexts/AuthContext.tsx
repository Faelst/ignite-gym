import { UserDto } from '@dtos/UserDTO'
import { api } from '@services/api'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storage'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  user: UserDto
  isLoadingStorage: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDto>({} as UserDto)
  const [isLoadingStorage, setIsLoadingStorage] = useState(true)

  async function userAndTokenUpdate({
    userData,
    token,
  }: {
    token: string
    userData: UserDto
  }) {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
    } catch (error) {
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoadingStorage(true)

      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageAuthTokenSave(data.token)
        await storageUserSave(data.user)
        await userAndTokenUpdate(data)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorage(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingStorage(true)
      setUser({} as UserDto)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorage(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorage(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate({ userData: userLogged, token })
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorage(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingStorage,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
