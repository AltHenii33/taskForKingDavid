import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function BoxCon({ children }) {
  return (
    <Container maxWidth="md">
      <Box my={4}> 
        <Typography variant="h4" component="div" gutterBottom>
        </Typography>
        {children}
      </Box>
    </Container>
  );
}