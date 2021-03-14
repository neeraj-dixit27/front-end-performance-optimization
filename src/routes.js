import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';

function Loading() {
    return <div>Loading...</div>;
  }

const routesConfig = [{
    path: '/',
    component: Loadable({
        loader: () => import(/* webpackChunkName: "home-bundle" */  './Components/Home'),
        loading: Loading
    }),
    exact: true
},
{
    path: '/aboutus',
    component: Loadable({
        loader: () => import(/* webpackChunkName: "aboutus-bundle" */ './Components/AboutUs'),
        loading: Loading
    }),
    exact: true
}];

const appRoutes = (
    <Switch>
        {routesConfig.map((route, index) => (<Route key={index} {...route} />))}
    </Switch>
)



export default appRoutes;
