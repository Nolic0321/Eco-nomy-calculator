import { EventEmitter } from "events";

class Store {
    constructor(initialState) {
        this.state = initialState;
        this.listeners = new EventEmitter();
        this.setState = this.setState.bind(this)
    }

    componentDidUpdate() {
    this.listeners.emit('stateChanged', this.state);
    }

    setState (newState){
        var tempState = this.state;
        var name = Object.keys(newState)[0]
        tempState[name] = newState[name]
        this.state = tempState
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