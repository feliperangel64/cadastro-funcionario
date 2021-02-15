import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import FormCustom from '../../components/FormCustom'
import FooterCustom from '../../components/FooterCustom'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}))

export default function Add() {
  const classes = useStyles()

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Cadastro
          </Typography>
          <FormCustom />
        </Paper>
        <FooterCustom />
      </main>
    </>
  )
}
