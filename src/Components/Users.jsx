import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { Breadcrumbs, Container } from '@mui/material';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Users() {
  return (
    <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
          users
        </Link>
    
      </Breadcrumbs>
    </div>
  )
}
