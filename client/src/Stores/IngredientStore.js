import Store from "./Store";


class IngredientStore extends Store {
    constructor(initialState) {
        super(initialState);
        this.getFromDB(data => {
            this.setState({
                data: data
            })
        })
    }

    getFromDB(callback){
        console.log("getting DB data");
        fetch('/api/ingredients')
            .then((response) => {
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
                return response.json()
            })
            .then(callback)
    }

    getIngredients(){
        return this.state.data;
    }

    setIngredients(ingredients){
        this.setState({data: ingredients});
    }
}
const ingredientStore = new IngredientStore([]);
export default ingredientStore;