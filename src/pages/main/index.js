import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Button } from '@material-ui/core'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import TableCustom from '../../components/TableCustom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: '400px',
  },
  root2: {
    padding: '2px 4px',
    display: 'flex',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

const Main = ({ funcionarios }) => {
  const classes = useStyles()
  const { push } = useHistory()

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => push('/add')}
                >
                  Adicionar
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TableCustom funcionarios={funcionarios} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

Main.propTypes = {
  funcionarios: PropTypes.array,
}

export default connect((state) => ({
  funcionarios: state.funcionarioReducer.funcionarios,
}))(Main)
