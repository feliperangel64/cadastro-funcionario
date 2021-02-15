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

function FormCustom({ funcionarios, dispatch }) {
  const classes = useStyles()
  const history = useHistory()
  const { id: idParam } = useParams()

  const [state, setState] = useState({
    nome: '',
    cpf: '',
    salario: '',
    desconto: '',
    dependentes: '',
  })

  useEffect(() => {
    if (idParam) {
      const editFuncionario = funcionarios.filter(
        (funcionario) => funcionario.id == idParam,
      )[0]
      setState({ ...editFuncionario })
    }
  }, [])

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  //Salário Base IR = Salário bruto - Desconto da Previdência - Dedução por Dependente x Quantidade de Dependentes
  const calculaSalarioBase = () => {
    let salarioBase = 0
    const deducaoDependente = 164.56
    const { salario, desconto, dependentes } = state
    salarioBase = salario - desconto - deducaoDependente * dependentes
    return salarioBase
  }

  //Tabela progressiva do IRRF
  const getValoresIrpf = () => {
    const { salario } = state

    //Até R$ 1.903,98 Isento R$ 0,00
    if (salario <= 1903.98) {
      return { aliquota: 0, parcela: 0 }
    }

    //De R$ 1.903,99 até R$ 2.826,65 7,5% R$ 142,80
    if (salario >= 1903.99 && salario <= 2826.65) {
      return { aliquota: 7.5 / 100, parcela: 142.8 }
    }

    //De R$ 2.826,66 até R$ 3.751,05 15% R$ 354,80
    if (salario >= 2826.66 && salario <= 3751.05) {
      return { aliquota: 15.0 / 100, parcela: 354.8 }
    }

    //De R$ 3.751,06 até R$ 4.664,68 22,5% R$ 636,13
    if (salario >= 3751.06 && salario <= 4664.68) {
      return { aliquota: 22.5 / 100, parcela: 636.13 }
    }

    //Acima de R$ 4.664,68 27,5% R$869,36
    if (salario > 4664.68) {
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
    if (idParam) {
      dispatch(FuncionarioAction.Edit({ ...state }))
    } else {
      const novoFuncionario = {
        ...state,
        id: funcionarios.length + 1,
        descontoIrpf: calculaDescontoIprf(),
      }
      dispatch(FuncionarioAction.Add(novoFuncionario))
    }
    history.push('/')
  }

  const { nome, cpf, salario, desconto, dependentes } = state

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados do funcionário
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="nome"
              name="nome"
              label="Nome"
              value={nome}
              onChange={handleChange}
              inputProps={{ maxLength: 100 }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="cpf"
              name="cpf"
              label="CPF"
              value={cpf}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="salario"
              name="salario"
              label="Salário bruto"
              value={salario}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="desconto"
              name="desconto"
              label="Desconto da previdência"
              value={desconto}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="dependentes"
              name="dependentes"
              label="Número de dependentes"
              value={dependentes}
              onChange={handleChange}
              fullWidth
              required
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
}))(FormCustom)
