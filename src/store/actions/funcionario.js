export const Add = (payload) => {
  return {
    type: 'ADICIONAR_FUNCIONARIO',
    payload: payload,
  }
}

export const Edit = (payload) => {
  return {
    type: 'EDITAR_FUNCIONARIO',
    payload: payload,
  }
}
