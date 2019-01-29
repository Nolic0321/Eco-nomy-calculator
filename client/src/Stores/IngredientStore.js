import Store from "./Store";

class IngredientStore extends Store {
    constructor(initialState) {
        super(initialState);
        this.state = initialState;
    }

    getFromDB(){
        console.log("getting DB data");
        fetch('/api/ingredients', {
            accept: "application/json"
        })
            .then((response) => {
                console.log("responded")
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                const error = new Error(`HTTP Error ${response.statusText}`);
                error.status = response.statusText;
                error.response = response;
                console.log(error); // eslint-disable-line no-console
                throw error;
            })
            .then((response) => {
                console.log('Found ' + response)
                this.setState(response);
            })
    }

    getIngredients() {
      return this.getState();
    }
}
const ingredientStore = new IngredientStore([]);
export default ingredientStore;