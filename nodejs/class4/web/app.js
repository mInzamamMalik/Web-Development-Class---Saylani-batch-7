const BASE_URL = "http://localhost:5000";
const createPost = () => {
    const obj = {
        "title": "JS",
        "description": "JS stand for javascript",
    }
    // Make a request for a user with a given ID
    // post(url,body,headers)
    axios.post(`${BASE_URL}/create`, obj)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
}

const getPost = () => {
    // post(url, headers)
    axios.get(`${BASE_URL}/posts`)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
}

getPost();