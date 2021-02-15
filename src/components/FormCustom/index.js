import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as FuncionarioAction from '../../store/actions/funcionario'

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
  const { id } = useParams()

  const [state, setState] = useState({
    Nome: '',
    Cpf: '',
    Salario: '',
    Desconto: '',
    Dependentes: '',
  })

  useEffect(() => {
    if (id) {
      const editFuncionario = funcionarios.filter(
        (funcionario) => funcionario.id == id,
      )[0]
      setState({
        Id: editFuncionario.id,
        Nome: editFuncionario.nome,
        Cpf: editFuncionario.cpf,
        Salario: editFuncionario.salario,
        Desconto: editFuncionario.desconto,
        Dependentes: editFuncionario.dependentes,
      })
    }
  }, [])

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  //Salário Base IR = Salário bruto - Desconto da Previdência - Dedução por Dependente x Quantidade de Dependentes
  const calculaSalarioBase = () => {
    let salarioBase = 0
    const deducaoDependente = 164.56
    const { Salario, Desconto, Dependentes } = state
    salarioBase = Salario - Desconto - deducaoDependente * Dependentes
    return salarioBase
  }

  //Tabela progressiva do IRRF
  const getValoresIrpf = () => {
    const { Salario } = state

    //Até R$ 1.903,98 Isento R$ 0,00
    if (Salario <= 1903.98) {
      return { aliquota: 0, parcela: 0 }
    }

    //De R$ 1.903,99 até R$ 2.826,65 7,5% R$ 142,80
    if (Salario >= 1903.99 && Salario <= 2826.65) {
      return { aliquota: 7.5 / 100, parcela: 142.8 }
    }

    //De R$ 2.826,66 até R$ 3.751,05 15% R$ 354,80
    if (Salario >= 2826.66 && Salario <= 3751.05) {
      return { aliquota: 15.0 / 100, parcela: 354.8 }
    }

    //De R$ 3.751,06 até R$ 4.664,68 22,5% R$ 636,13
    if (Salario >= 3751.06 && Salario <= 4664.68) {
      return { aliquota: 22.5 / 100, parcela: 636.13 }
    }

    //Acima de R$ 4.664,68 27,5% R$869,36
    if (Salario > 4664.68) {
      return { aliquota: 27.5 / 100, parcela: 869.36 }
    }
  }

  //Desconto IRRF = Salário Base IR x Alíquota - Parcela a Deduzir
  const calculaDescontoIprf = () => {
    let descontoIrpf = 0
    const salarioBase = calculaSalarioBase()
    const irpf = getValoresIrpf()
    descontoIrpf = salarioBase * irpf.aliquota - irpf.parcela

    return descontoIrpf
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id) {
      const editFuncionario = {
        id: state.Id,
        nome: state.Nome,
        cpf: state.Cpf,
        salario: state.Salario,
        desconto: state.Desconto,
        dependentes: state.Dependentes,
        descontoIrpf: calculaDescontoIprf(),
      }
      dispatch(FuncionarioAction.Edit(editFuncionario))
    } else {
      const novoFuncionario = {
        id: funcionarios.length + 1,
        nome: state.Nome,
        cpf: state.Cpf,
        salario: state.Salario,
        desconto: state.Desconto,
        dependentes: state.Dependentes,
        descontoIrpf: calculaDescontoIprf(),
      }
      dispatch(FuncionarioAction.Add(novoFuncionario))
    }
    history.push('/')
  }

  const { Nome, Cpf, Salario, Desconto, Dependentes } = state

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados do funcionário
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
