import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from "@mui/styles";
import {  Collapse } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  colorText: {
    color: '#fbcd14',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  }
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            <span className={classes.colorText}>Fund Management Demo.</span>
          </h1>
        </div>
      </Collapse>
    </div>
  );
}
