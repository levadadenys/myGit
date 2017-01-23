import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import axios from 'axios';


import './main.scss';

const initState = {text: 'Loading...', textToPrint: 'Loading...', tags: [], cache: ''};

function reducer (state, action) {
    switch (action.type) {
        case 'getText': return {text: action.result, textToPrint: action.result, tags: state.tags, cache: state.cache};
        case 'getTags': return {text: state.text, textToPrint: state.textToPrint, tags: action.result, cache: state.cache};
        case 'select': return {text: state.text, textToPrint: action.result, tags: state.tags, cache: state.cache}; 
        case 'markTags': return {text: state.text, textToPrint: action.result, tags: state.tags, cache: action.result};
        default: return state;
    };
};

const store = createStore(reducer, initState);

class TextField extends React.Component {
    constructor (props) {
        super(props);
        this.dbClick = this.dbClick.bind(this);
        this.addTag = this.addTag.bind(this);
    };

    componentDidMount () {
        store.subscribe(() => this.forceUpdate());

        axios.get(this.props.url + 'document/')
            .then((responseText) => {
                let pulledText = responseText.data[0].content.replace(/(\r\n |\n |\r)/gm, '<br/>');
                store.dispatch({
                    type: 'getText',
                    result: pulledText
                });       
            })
            .then(() => this.updateTags())
            .catch((error) => {
                console.log(error);
            }); 
    };

    updateTags() {
        axios.get(this.props.url + 'tag/')
            .then(responseText => {
                    store.dispatch({
                        type: 'getTags',
                        result: responseText.data
                    });
                })
            .then(() => {
                    let textToPrint = store.getState().text;
                    store.getState().tags.forEach((tag) => {
                                    //if you don`t need case sensetivity - use 'gmi' 
                        textToPrint = textToPrint.replace(new RegExp(tag.name, 'gm'), `<span class = 'tagged'>${tag.name}</span>`);
                    });
                    store.dispatch({
                        type: 'markTags',
                        result: textToPrint
                    });
                })
             .catch((error) => {
                console.log(error);
            });
    };

    addTag() {
        axios.post(this.props.url + 'tag/',{
            name: document.getElementsByClassName('selected')[0].innerHTML,
            document: '1'
        })
        .then(() => this.updateTags())
        .catch( (error) => {
            console.log(error);
        });    
    };

    dbClick(e) {
        let textToPrint = store.getState().cache;
        let selected = window.getSelection().toString();
        if(selected !==' ') {
                        //if you don`t need case sensetivity - use 'gmi' 
            textToPrint = textToPrint.replace(new RegExp(selected, 'gm'), `<span class = 'selected'>${selected}</span>`);        
            store.dispatch({
                type:'select',
                result: textToPrint
            });
        };
    };

    render () {
        const text = store.getState().textToPrint;
        return (
            <div className = 'text' onDoubleClick = {this.dbClick}>
                <button className = 'addTagButton' onClick = {this.addTag}>+</button>
                <span dangerouslySetInnerHTML = {{__html: text}}></span>
            </div>
        );
    };
};

class TextContainer extends React.Component {

    render() {
        return (
            <div className = 'textContainer'>
                <TextField url = 'http://54.187.63.201/api/v1/'/>
            </div>
        );
    };
};

ReactDOM.render(<TextContainer/>, document.getElementById('Root'));