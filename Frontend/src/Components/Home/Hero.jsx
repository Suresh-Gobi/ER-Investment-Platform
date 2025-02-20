import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `url('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(4),
  },
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <Typography variant="h1" className={classes.heading}>
        Save the Nature with Earth Restoration Investment Platform
      </Typography>
      <Typography variant="h4" className={classes.subheading}>
        Advanced Investment Technology
      </Typography>
    </div>
  );
}
