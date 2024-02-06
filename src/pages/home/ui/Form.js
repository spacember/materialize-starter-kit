// ** React imports
import { useContext, useEffect, useState } from 'react'

// ** Contexts imports
import { AuthContext } from 'src/context/AuthContext'
import { InvoicesContext } from 'src/context/InvoicesContext'

// ** Firebase imports
import { storage, app } from 'src/firebase'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { collection, addDoc, getFirestore } from 'firebase/firestore'

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

const db = getFirestore(app)
const userRef = collection(db, 'users')
const submissionsRef = collection(db, 'submissions')

const Form = () => {
  // States
  const [name, setName] = useState('')
  const [grossiste, setGrossiste] = useState('')

  // Contexts
  const { files } = useContext(InvoicesContext)
  const { user } = useContext(AuthContext)

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleGrossisteChange = event => {
    setGrossiste(event.target.value)
  }

  const handleMultipleFileUpload = async event => {
    event.preventDefault()

    const uploadPromises = files.map(async file => {
      const storageRef = ref(storage, `${user.email}/${file.name}`)
      await uploadBytes(storageRef, file)

      return getDownloadURL(storageRef)
    })

    try {
      const downloadURLs = await Promise.all(uploadPromises)

      await addDoc(submissionsRef, {
        email: user.email,
        nom: name,
        grossiste: grossiste,
        documents: downloadURLs
      })
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }

  return (
    <form onSubmit={handleMultipleFileUpload}>
      <FormGroup>
        <Box mb={6}>
          <FormControl>
            <TextField label='Nom' value={name} onChange={handleNameChange} />
          </FormControl>
        </Box>
        <Box mb={6}>
          <FormControl>
            <InputLabel id='grossiste-label'>Grossiste</InputLabel>
            <Select labelId='grossiste-label' defaultValue='' value={grossiste} onChange={handleGrossisteChange}>
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
