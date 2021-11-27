const BASE_URL = "http://localhost:5000";



const createPost = () => {
    // get user id from storage
    const userID = "61116029a4eed425e4742d8a";
    const obj = {
        "title": "ali",
        "discription": "M K A",
        user: userID,
        post_type: "public"
    }
    // Make a request for a user with a given ID
    // post(url,body,headers)
    axios.post(`${BASE_URL}/create`, obj)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
}


const signup = () => {
    const obj = {
        "email": "ali@gmail.com",
        "full_name": "M K A",
        "address": "KHI"
    }
    // Make a request for a user with a given ID
    // post(url,body,headers)
    axios.post(`${BASE_URL}/registration`, obj)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
}


const login = () => {
    const obj = {
        "email": "majid@gmail.com"
    }
    // post(url,body,headers)
    axios.post(`${BASE_URL}/login`, obj)
        .then((response) => {
            if (response.data.email) {
                // store user id in storage
                alert("Go to dashboard")
            }
            console.log(response.data);
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