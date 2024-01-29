import React, { useState } from 'react'

// ** MUI imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'

// ** Firebase imports
import { storage } from 'src/firebase'
import { ref, uploadBytes } from 'firebase/storage'

const DocumentCard = ({ data, handlePageChange }) => {
  const [fileInput, setFileInput] = useState(null)

  const handleAddDocument = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf'
    input.onchange = handleFileUpload
    input.click()
    setFileInput(input)
  }

  const handleFileUpload = event => {
    const file = event.target.files[0]
    const storageRef = ref(storage, file.name)
    uploadBytes(storageRef, file)
  }

  return (
    <Card>
      <CardHeader
        title='Documents'
        action={
          <Button variant='contained' onClick={handleAddDocument}>
            Ajouter un document
          </Button>
        }
      ></CardHeader>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>DOCUMENTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody xs>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination onPageChange={handlePageChange} />
      </CardContent>
    </Card>
  )
}

export default DocumentCard
