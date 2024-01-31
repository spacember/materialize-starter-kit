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

// ** Custom Components
import Dialogue from './ui/Dialogue'

const Invoices = ({ data, handlePageChange }) => (
  <Card>
    <CardHeader title='Documents' action={<Dialogue />}></CardHeader>
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

export default Invoices
