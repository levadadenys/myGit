import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {createStore} from 'redux';

import './main.scss';

const initState = {firebase: []};

function reducer (state,action) {
    switch (action.type) {
        case 'addData': return {firebase : state.firebase.concat(action.data)};
        default: return state;
    }
}

const store = createStore(reducer, initState);

class AddressForm extends React.Component {
    constructor (props){
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
    };

    componentWillMount(){
        store.subscribe(() => this.forceUpdate());
    }

    _handleSubmit(e) {
        e.preventDefault();

        let data = {
            origins : this.refs.pickUp.value.replace(' ', '+'),
            destinations : this.refs.dropOff.value.replace(' ', '+'),
            mode: 'driving',
            key: 'AIzaSyC61_JT_d8zXewr4h9v0BcqOeFzpr15Vgw'
        };

        axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${data.origins}&destinations=${data.destinations}&key=${data.key}`)
        .then((response) => {
            let distance = response.data.rows[0].elements[0].distance.value;

            if (distance <= parseFloat(32186,8)) { // 32186,8 meters = 20 miles
                let uploadingData = [{
                    origin_addresses: response.data.origin_addresses[0],
                    destination_addresses: response.data.destination_addresses[0],
                    distance: distance
                }];

                store.dispatch({
                    type : 'addData',
                    data : uploadingData
                });
                console.log('Data added successfully');
            } else alert('Sorry, the distance is too long');           
        })
        .catch(e => console.log(e))
        .then(() => {
            this.refs.pickUp.value = '';
            this.refs.dropOff.value = '';
        })
    }

    render() {
        return (
            <form className = 'address form' onSubmit = {this._handleSubmit}>
                <ul>
                    <li>
                        <label>Pick-up address: <input ref = 'pickUp'/></label>
                    </li>
                    <li>
                        <label>Drop off address: <input ref = 'dropOff'/></label>                        
                    </li>
                    <li>
                        <button ref = 'submitBut'>Submit</button>
                    </li>
                </ul>
            </form>
                        
        )
    }
}

class FormContainer extends React.Component {
    render () {
        return (
            <div className = 'formContainer'>
            <AddressForm />
            </div>
        )
    }
}

ReactDOM.render(<FormContainer />, document.getElementById('root'));