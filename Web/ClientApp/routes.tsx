import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Grafana } from './components/Grafana';
import { TicTacToe } from './components/TicTacToe';
import { Store } from './components/Store';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/grafana' component={ Grafana } />
    <Route path='/ticTacToe' component={ TicTacToe } />
    <Route path='/store' component={ Store } />
</Layout>;
