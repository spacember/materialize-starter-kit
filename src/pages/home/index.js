// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
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

const Home = () => {
  const handlePageChange = (event, newPage) => {
    if (event && typeof newPage === 'number') {
      // Handle page change logic here
    }
  }

  const handleAddDocument = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf'; // Only allow PDF files
    fileInput.addEventListener('change', handleFileUpload);
    fileInput.click();
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here
    console.log('Uploaded file:', file);
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Documents' action={
            <Button variant='contained' onClick={handleAddDocument}>
              Ajouter un document
            </Button>
          }>
          </CardHeader>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#ID</TableCell>
                    <TableCell>DOCUMENT</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>ISSUE DATE</TableCell>
                    <TableCell>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Real Document</TableCell>
                    <TableCell>Dummy Name</TableCell>
                    <TableCell>2022-10-01</TableCell>
                    <TableCell>View</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              onPageChange={handlePageChange} // Add onPageChange prop here
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
