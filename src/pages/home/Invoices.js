// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import Dialogue from './ui/Dialogue'

// ** Firebase imports
import { storage } from 'src/firebase'
import { ref, listAll } from 'firebase/storage'

// ** Context
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'

const columns = [
  {
    flex: 0.1,
    field: 'file',
    minWidth: 80,
    headerName: 'Fichier'
  }
]

const Invoices = () => {
  // States
  const { user } = useContext(AuthContext)
  const [files, setFiles] = useState([])

  // Get user files from storage
  useEffect(() => {
    const fetchStorageData = async () => {
      const storageRef = ref(storage)
      const folderRef = ref(storageRef, user.email)
      const files = await listAll(folderRef)
      const fileNames = files.items.map((file, index) => ({ file: file.name, id: index }))

      setFiles(fileNames)
    }

    fetchStorageData()
  }, [user.email])

  return (
    <Card>
      <CardHeader title='Documents' action={<Dialogue />}></CardHeader>
      <Box sx={{ height: 300, width: '100%' }}>
        <DataGrid columns={columns} rows={files.slice(0, 10)} />
      </Box>
    </Card>
  )
}

export default Invoices
