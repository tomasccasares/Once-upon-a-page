import React, { useEffect } from 'react'
import { Box, Container, Grid } from '@mui/material'

import books from '../../FakeData/FakeData.js'
import Card from '../../commons/Card/Card.js'

const Red = () => {
  // const [books, setBooks] = React.useState([]);
  useEffect(() => {
    // axios
    //   .get(
    //     "https://localhost:3001/books"
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     return setBooks(res.data);
    //   });
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {books?.map((book, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Card data={book} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Red
