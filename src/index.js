import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {TodoAppContainer} from './components/TodoApp';
import Login from './components/auto/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import 'todomvc-app-css/index.css';

const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreDevTools(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        todos: [],
        filter: 'all'
    }
});

ReactDOM.render(
    <Provider store={store}>

        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={TodoAppContainer} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
        </Router>



    </Provider>,
    document.getElementById('app')
);
