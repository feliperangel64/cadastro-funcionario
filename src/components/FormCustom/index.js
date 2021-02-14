import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  radio: {
    flexDirection: 'row',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

function Form({ funcionarios, dispatch }) {
  const classes = useStyles()
  const history = useHistory()
  const [state, setState] = React.useState({
    Nome: '',
    Cpf: '',
    Salario: '',
    Desconto: '',
    Dependentes: '',
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const actionAddFuncionario = () => {
    return {
      type: 'ADICIONAR_FUNCIONARIO',
      payload: {
        id: funcionarios.length + 1,
        nome: state.Nome,
        cpf: state.Cpf,
        salario: state.Salario,
        desconto: state.Desconto,
        dependentes: state.Dependentes,
        descontoIrpf: 0,
      },
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(actionAddFuncionario())
    history.push('/')
  }

  const { Nome, Cpf, Salario, Desconto, Dependentes } = state

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados do cliente
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="nome"
              name="Nome"
              label="Nome"
              fullWidth
              value={Nome}
              onChange={handleChange}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="cpf"
              name="Cpf"
              label="CPF"
              fullWidth
              value={Cpf}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="salario"
              name="Salario"
              label="Salário"
              fullWidth
              value={Salario}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="desconto"
              name="Desconto"
              label="Desconto"
              fullWidth
              value={Desconto}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="dependentes"
              name="Dependentes"
              label="Dependentes"
              fullWidth
              value={Dependentes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}
export default connect((state) => ({
  funcionarios: state.funcionarioReducer.funcionarios,
}))(Form)
