import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import ModalCustom from '../../components/ModalCustom'

const TableCustom = ({ funcionarios }) => {
  return (
    <>
      <Typography>Seus Funcionários</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Salário</TableCell>
            <TableCell>Desconto</TableCell>
            <TableCell>Dependentes</TableCell>
            <TableCell>Desconto IRPF</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funcionarios.map((funcionario) => {
            return (
              <TableRow key={funcionario.id}>
                <TableCell>{funcionario.nome}</TableCell>
                <TableCell>{funcionario.cpf}</TableCell>
                <TableCell>
                  {parseFloat(funcionario.salario, 10).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell>
                  {parseFloat(funcionario.desconto, 10).toLocaleString(
                    'pt-BR',
                    { style: 'currency', currency: 'BRL' },
                  )}
                </TableCell>
                <TableCell>{funcionario.dependentes}</TableCell>
                <TableCell>
                  {parseFloat(funcionario.descontoIrpf, 10).toLocaleString(
                    'pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    },
                  )}
                </TableCell>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Link to={`/edit/${funcionario.id}`}>
                        <Edit color="primary" />
                      </Link>
                    </Grid>
                    <Grid item>
                      <ModalCustom id={funcionario.id} />
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

TableCustom.propTypes = {
  funcionarios: PropTypes.array,
}

export default TableCustom
