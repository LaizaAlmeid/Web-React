import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import UserCrud from '../components/user/UserCrud'
import Home from '../components/home/Home'

//adeterminando rotas
const props = ()=>(
<Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/produtos' component={UserCrud} />
    <Redirect from ='*' to='/' />
</Switch>
)
export default props