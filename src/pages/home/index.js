// ** MUI imports
import Grid from '@mui/material/Grid'

// ** Custom Components
import Invoices from './Invoices'
import StatisticsCard from './StatisticsCard'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Invoices />
      </Grid>
      <Grid item xs={6}>
        <StatisticsCard />
      </Grid>
    </Grid>
  )
}

export default Home
