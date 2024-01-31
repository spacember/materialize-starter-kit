// ** React Imports
import { createContext, useState } from 'react'

const InvoicesContext = createContext([])

const InvoicesProvider = ({ children }) => {
  const [files, setFiles] = useState([])

  return <InvoicesContext.Provider value={{ files, setFiles }}>{children}</InvoicesContext.Provider>
}

export { InvoicesContext, InvoicesProvider }
