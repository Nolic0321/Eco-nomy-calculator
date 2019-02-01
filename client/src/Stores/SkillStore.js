import Store from "./Store";


class SkillStore extends Store {
    constructor(initialState) {
        super(initialState);
        this.getFromDB(data => {
            this.setState({
                data: data
            })
        })
    }

    getFromDB(callback) {
        console.log("getting DB data");
        fetch('/api/skills')
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

    getSkills() {
        return this.state.data;
    }

    setSkills(skills) {
        this.setState({
            data: skills
        })
    }
}
const skillStore = new SkillStore([]);
export default skillStore;