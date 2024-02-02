// ** React imports
import { useContext, useState } from 'react'

// ** MUI Imports
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'

// ** Custom Components
import FileUploaderMultiple from './FileUploaderMultiple'

// ** Contexts imports
import { AuthContext } from 'src/context/AuthContext'
import { InvoicesContext } from 'src/context/InvoicesContext'

// ** Firebase imports
import { storage } from 'src/firebase'
import { ref, set, uploadBytes } from 'firebase/storage'

const Form = () => {
  // States, not impl as it is structured data
  const [name, setName] = useState('')
  const [grossiste, setGrossiste] = useState('')

  // Contexts
  const { files } = useContext(InvoicesContext)
  const { user } = useContext(AuthContext)

  const handleMultipleFileUpload = async event => {
    event.preventDefault()

    const uploadPromises = files.map(file => {
      const storageRef = ref(storage, `${user.email}/${file.name}`)

      return uploadBytes(storageRef, file)
    })

    try {
      // Wait for all files to be uploaded
      await Promise.all(uploadPromises)

      // for storing form data (which is structured data), you should use Cloud Firestore
      console.log('Files uploaded successfully')
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }

  return (
    <form onSubmit={handleMultipleFileUpload}>
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
        <Divider sx={{ my: '0 !important' }} />
        <Box mt={6}>
          <Button variant='contained' type='submit'>
            Soumettre
          </Button>
        </Box>
      </FormGroup>
    </form>
  )
}

export default Form
