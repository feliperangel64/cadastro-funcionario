import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from '../pages/Main'
import Add from '../pages/Add'
import Edit from '../pages/Edit'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
