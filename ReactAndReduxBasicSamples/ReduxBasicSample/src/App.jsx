import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import './main.css';

const initialState = {count: 0};

function reducer (state = {count: 0}, action) {
    switch (action.type) {
        case 'INCREMENT': return {count: state.count + action.amount};
        case 'DECREMENT': return {count: state.count - action.amount};
        case 'RESET': return {count: 0};
        default: return state;
    }
}

function incrementAction (amount) {
    return {type: 'INCREMENT', amount};
}

function decrementAction (amount) {
    return {type: 'DECREMENT', amount};
}

function resetAction () {
    return {type: 'RESET'};
}

const store = createStore(reducer, initialState);

class Counter extends React.Component {
    constructor (props){
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    increment () {
        let amount = parseFloat(this.refs.amount.value) || 0;
        store.dispatch(incrementAction(amount));
    }

    reset () {
        store.dispatch(resetAction());
    }

    decrement () {
        let amount = this.refs.amount.value;
        store.dispatch(decrementAction(amount));
    }

    render () {
        const count = store.getState().count;
        return (
            <div className = 'counter'>
                <span className = 'count'>{count}</span>

                <div className = 'buttons'>
                    <button className = 'decrement' onClick = {this.decrement}>-</button>
                    <button className = 'reset' onClick = {this.reset}>R</button>
                    <button className = 'increment' onClick = {this.increment}>+</button>
                </div>
                <input type ='text' ref='amount' defaultValue = '1'></input>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('root'));