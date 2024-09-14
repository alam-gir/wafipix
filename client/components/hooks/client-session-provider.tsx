'use client'

import { useSession } from 'next-auth/react'
import { FC, useEffect } from 'react'
import { useStore } from './zustant/store'

interface ClientSessionProviderProps {
    children: React.ReactNode
}   

const ClientSessionProvider: FC<ClientSessionProviderProps> = ({children}) => {
    const session = useSession()
    const store = useStore();
    
    useEffect(() => {
        if(session.data?.user) {
            store.setUser(session.data.user)
        }
    }, [session])
    
  return <>
    {children}
  </>

}
export default ClientSessionProvider