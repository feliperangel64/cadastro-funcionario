const initialState = {
  funcionarios: [
    {
      id: 1,
      nome: 'Letícia Aurora Farias',
      cpf: '936.938.039-60',
      salario: 998,
      desconto: 74.85,
      dependentes: 2,
      descontoIrpf: 0,
    },
    {
      id: 2,
      nome: 'Edson Thiago Drumond',
      cpf: '748.517.476-24',
      salario: 1045,
      desconto: 78.38,
      dependentes: 1,
      descontoIrpf: 0,
    },
    {
      id: 3,
      nome: 'Fátima Elza Tereza Castro',
      cpf: '701.118.872-08',
      salario: 5500,
      desconto: 628.95,
      dependentes: 0,
      descontoIrpf: 0,
    },
    {
      id: 4,
      nome: 'Sandra Giovanna Drumond',
      cpf: '715.890.756-25',
      salario: 4522,
      desconto: 492.03,
      dependentes: 3,
      descontoIrpf: 0,
    },
    {
      id: 5,
      nome: 'Valentina Clara Nunes',
      cpf: '101.151.404-41',
      salario: 10000,
      desconto: 713.1,
      dependentes: 4,
      descontoIrpf: 0,
    },
  ],
}

export default function funcionarioReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADICIONAR_FUNCIONARIO':
      return { ...state, funcionarios: [...state.funcionarios, action.payload] }
    case 'EDITAR_FUNCIONARIO':
      return {
        ...state,
        funcionarios: state.funcionarios.map((funcionario) => {
          if (funcionario.id != action.payload.id) {
            return funcionario
          }
          return {
            ...action.payload,
          }
        }),
      }
    case 'EXCLUIR_FUNCIONARIO':
      return {
        ...state,
        funcionarios: state.funcionarios.filter(
          (funcionario) => funcionario.id != action.payload,
        ),
      }
    default:
      return state
  }
}
