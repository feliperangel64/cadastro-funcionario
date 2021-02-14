import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from '../pages/main'
import Add from '../pages/add'
import Edit from '../pages/edit'

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
