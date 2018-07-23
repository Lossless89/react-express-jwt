import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import TodoList from './TodoList'
import TodoHeader from './TodoHeader'
import TodoTools from './TodoTools'
import Footer from './Footer'
import AuthService from "./auto/AuthServise";
import './auto/style/loginStyle.css';

const Auth = new AuthService();

export class TodoApp extends React.Component {

    handleLogout(){
        Auth.logout()
        this.props.history.replace('/login');
    }


    getNbActiveItems() {
        if (this.props.todos) {
            const activeItems = this.props.todos.filter(item => item.get('status') === 'active');
            return activeItems.size;
        }
        return 0;
    }

    render() {
        return <div>
            <section className="todoapp">
                <TodoHeader addItem={this.props.addItem}/>
                <TodoList {...this.props} />
                <TodoTools changeFilter={this.props.changeFilter}
                           filter={this.props.filter}
                           nbActiveItems={this.getNbActiveItems()}
                           clearCompleted={this.props.clearCompleted}/>
            </section>


            <Footer/>
            <button type="button" className="button" onClick={this.handleLogout.bind(this)}>Logout</button>

        </div>
    }
}

function mapStateToProps(state) {
    return {
        todos: state.get('todos'),
        filter: state.get('filter')
    };
}

export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);
