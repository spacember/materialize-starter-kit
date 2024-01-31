// ** React imports
import { useContext, useState } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import { Box } from '@mui/material'

// ** Custom Components
import FileUploaderMultiple from './FileUploaderMultiple'

// ** Contexts
import { InvoicesContext } from 'src/context/InvoicesContext'

// ** Firebase imports
import { storage } from 'src/firebase'
import { ref, set, uploadBytes } from 'firebase/storage'

const Form = () => {
  // States
  const [name, setName] = useState('')
  const [grossiste, setGrossiste] = useState('')

  // Contexts
  const { files } = useContext(InvoicesContext)

  const handleFileUpload = async event => {
    console.log('handleFileUpload')
    event.preventDefault()

    // Handle the file upload
    const uploadPromises = files.map(file => {
      const storageRef = ref(storage, `files/${file.name}`)

      return uploadBytes(storageRef, file)
    })

    try {
      // Wait for all files to be uploaded
      await Promise.all(uploadPromises)

      // After file uploads, save the form data to Firebase
      // Replace 'yourDatabaseRef' with your actual database reference
      const formDataRef = ref(storage, 'formData/')
      await set(formDataRef, { name, grossiste })

      console.log('Files and form data uploaded successfully')
    } catch (error) {
      console.error('Error uploading files and form data:', error)
    }
  }

  return (
    <form onSubmit={handleFileUpload}>
      <FormGroup>
        <Box mb={6}>
          <FormControl>
            <TextField label='Nom' />
          </FormControl>
        </Box>
        <Box mb={6}>
          <FormControl>
            <InputLabel id='grossiste-label'>Grossiste</InputLabel>
            <Select labelId='grossiste-label' defaultValue=''>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'A'}>A</MenuItem>
              <MenuItem value={'B'}>B</MenuItem>
              <MenuItem value={'C'}>C</MenuItem>
              <MenuItem value={'D'}>D</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mb={6}>
          <FormControl>
            <FileUploaderMultiple />
          </FormControl>
        </Box>
        <Box mb={6}>
          <FormControl>
            <Button variant='contained' type='submit'>
              Soumettre
            </Button>
          </FormControl>
        </Box>
      </FormGroup>
    </form>
  )
}

export default Form
