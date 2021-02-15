import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import FormCustom from './index'
import store from '../../store'

describe('Teste para o formulario', () => {
  it('Deve renderizar o formulário de cadastro', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Route>
            <FormCustom />
          </Route>
        </MemoryRouter>
      </Provider>,
    )
    expect(screen.getByText('Dados do funcionário')).toBeInTheDocument
  })

  it('Deve adicionar um novo funcionário', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Route>
            <FormCustom />
          </Route>
        </MemoryRouter>
      </Provider>,
    )

    //Buscar o elemento input
    const field = getByTestId('form-custom-field-nome').querySelector('input')

    //Preencher algum valor no input
    const nomeFuncionario = 'Felipe Rangel'
    fireEvent.change(field, { target: { value: nomeFuncionario } })

    //Dispara evento submit no form
    const formCustom = getByTestId('form-custom')
    fireEvent.submit(formCustom)
  })
})
