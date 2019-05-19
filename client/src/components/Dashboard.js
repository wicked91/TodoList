import React, { Component } from 'react'
import Header from './Header';
import TodoList from './TodoList';
import '../styles/CreatePostStyle.css'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <Header />
                <TodoList />
            </div>
        );
    }
}

export default Dashboard;