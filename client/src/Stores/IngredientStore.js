import Store from "./Store";



const ingredientData = [
  { name: 'ingredient 1', cost: 3 },
  { name: 'ingredient 2', cost: 0 },
  { name: 'ingredient 3', cost: 7 },
  { name: 'ingredient 4', cost: 1 }
]


class IngredientStore extends Store {
    constructor(initialState) {
        super(initialState);
        this.state = {
            data: ingredientData
        };
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
                this.setState({
                    data: response
                });
            })
    }

    getIngredients() {
      return this.state.data;
    }
}
const ingredientStore = new IngredientStore([]);
export default ingredientStore;