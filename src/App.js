import React from 'react'
import { Provider } from 'react-redux'
import AppBarCustom from './components/AppBarCustom'
import Routes from './routes'
import store from './store'
import './style.css'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppBarCustom />
        <Routes />
      </Provider>
    </div>
  )
}

export default App
