import React, { useEffect, useState } from 'react'

// ** CustomMUI imports
import Grid from '@mui/material/Grid'
import DocumentCard from './DocumentCard'
import StatisticsCard from './StatisticsCard'

// ** Firebase imports
import { storage } from 'src/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'

const Home = () => {
  const [data, setData] = useState([])

  const handlePageChange = (event, newPage) => {
    if (event && typeof newPage === 'number') {
      // Handle page change logic here
    }
  }

  useEffect(() => {
    const fetchStorageData = async () => {
      const storageRef = ref(storage)
      const items = await listAll(storageRef)
      const data = await Promise.all(items.items.map(item => getDownloadURL(item)))

      console.log(data)
      setData(data)
    }

    fetchStorageData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DocumentCard data={data} handlePageChange={handlePageChange} />
      </Grid>
      <Grid item xs={6}>
        <StatisticsCard />
      </Grid>
    </Grid>
  )
}

export default Home
