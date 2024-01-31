// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import Form from './Form'

// ** Contexts
import { InvoicesProvider } from 'src/context/InvoicesContext'

const Dialogue = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button variant={'contained'} onClick={handleClickOpen}>
        Ajouter des Documents
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Ajouter des Documents</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Veuillez saisir les détails et télécharger les fichiers</DialogContentText>
          <InvoicesProvider>
            <Form />
          </InvoicesProvider>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default Dialogue
