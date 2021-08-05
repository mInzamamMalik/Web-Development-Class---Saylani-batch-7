var input = document.getElementById('input');
var ul = document.getElementById('list');

const facebookLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var accessToken = credential.accessToken;
            location.href = 'TODO.html';
            console.log(user.displayName);
            document.getElementById('welcome').innerHTML = user.displayName;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log('error===>', error.message)
                // ...
        });
}

firebase.database().ref('TODO').on('child_added', (data) => {
    console.log(data.val().value);
    var li = document.createElement('li');
    var liText = document.createElement('input');
    liText.setAttribute("value", data.val().value);
    ul.appendChild(li);
    //creating delete button
    var dltbtn = document.createElement('button');
    var dltbtnText = document.cra
    console.log(li.appendChild(liText));
    var dltbtn = document.createElement('button');
    var dltbtnText = document.createElement('img');
    dltbtnText.setAttribute('src', 'https://toppng.com/uploads/preview/recycling-bin-vector-delete-icon-png-black-11563002079w1isxqyyiv.png')
    dltbtn.setAttribute('onclick', 'delbtn(this)');
    dltbtn.setAttribute('id', data.val().key);
    dltbtn.appendChild(dltbtnText);
    li.appendChild(dltbtn);
    var hr = document.createElement('hr');
    li.appendChild(hr);
})


function add() {
    var database = firebase.database().ref('TODO');
    var key = database.push().key;
    var todo = {
        key: key,
        value: input.value
    }
    database.child(key).set(todo);
    input.value = "";
}

function delbtn(d) {
    firebase.database().ref('TODO/' + d.id).remove();
    console.log(d.id);
    d.parentNode.remove();
}

function delAll(a) {
    firebase.database().ref('TODO').remove();
    ul.innerHTML = "";
}