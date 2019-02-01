import Store from "./Store";


class RecipeStore extends Store {
    constructor(initialState) {
        super(initialState);
        this.getFromDB(responseData => {
            this.setState({
                data: responseData
            })
        })
    }

    getFromDB(callback) {
        console.log("getting DB data");
        fetch('/api/recipes')
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

    getRecipes() {
        return this.state.data;
    }

    setRecipes(recipes) {
        this.setState({
            data: recipes
        })
    }
}
const recipeStore = new RecipeStore([]);
export default recipeStore;