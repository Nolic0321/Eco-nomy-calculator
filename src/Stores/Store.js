import { EventEmitter } from "events";

class Store extends EventEmitter{
    constructor (initialState){
        this.state = initialState;
        this.listeners = new EventEmitter();
    }

    setState (state){
        this.state = state;
        this.listeners.emit('stateChanged');
    }

    getState (){
        return this.state;
    }

    addListener (listener){
        this.listeners.on('stateChanged',listener);
        return () => {
            this.listeners = this.listeners.removeListener('stateChanged',listener);
        };
    }
}

const store = new Store({});
export default Store;