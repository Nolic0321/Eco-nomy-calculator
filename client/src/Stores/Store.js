import { EventEmitter } from "events";

class Store {
    constructor(initialState) {
        this.state = initialState;
        this.listeners = new EventEmitter();
    }

    componentDidUpdate() {
    this.listeners.emit('stateChanged');
    }

    setState (state){
        this.state = state;
        this.componentDidUpdate()
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