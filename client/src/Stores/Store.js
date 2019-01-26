import {Component} from 'react';
import { EventEmitter } from "events";

class Store extends Component{
    constructor(initialState) {
        super(initialState);
        this.state = initialState;
        this.listeners = new EventEmitter();
    }

    componentDidUpdate(prevProps, prevState,snapshot) {
        this.listeners.emit('stateChanged');
    }

    getState() {
        return this.state;
    }

    addListener(listener) {
        this.listeners.on('stateChanged', listener);
        return () => {
            this.listeners = this.listeners.removeListener('stateChanged', listener);
        };
    }
}

export default Store;