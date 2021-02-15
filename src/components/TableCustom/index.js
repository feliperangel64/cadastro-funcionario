import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Edit } from '@material-ui/icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from '@material-ui/core'
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
          {funcionarios.map((funcionario) => (
            <TableRow key={funcionario.id}>
              <TableCell>{funcionario.nome}</TableCell>
              <TableCell>{funcionario.cpf}</TableCell>
              <TableCell>{funcionario.salario}</TableCell>
              <TableCell>{funcionario.desconto}</TableCell>
              <TableCell>{funcionario.dependentes}</TableCell>
              <TableCell>{funcionario.descontoIrpf}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </>
  )
}

TableCustom.propTypes = {
  funcionarios: PropTypes.array,
}

export default TableCustom
