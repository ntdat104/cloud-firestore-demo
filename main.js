const firebase = window.firebase;

//TODO firebase config
const config = {
	apiKey: "AIzaSyCo06mkcBtniaRE_-4A4WRxGi7nND-ydn4",
	authDomain: "cloud-firestore-demo-d1622.firebaseapp.com",
	projectId: "cloud-firestore-demo-d1622",
	storageBucket: "cloud-firestore-demo-d1622.appspot.com",
	messagingSenderId: "319786389698",
	appId: "1:319786389698:web:ce3e0ee74db0ea5226ab5b",
};
// Initialize Firebase
firebase.initializeApp(config);

//TODO create dom UI
const bodyELement = document.body;

const h1Element = document.createElement("h1");
h1Element.innerHTML = "Hobbies";

const formElement = document.createElement("form");

const inputElement = document.createElement("input");
inputElement.setAttribute("placeholder", "Enter your hobby");

const buttonElement = document.createElement("button");
buttonElement.setAttribute("type", "submit");
buttonElement.innerHTML = "Add";

formElement.appendChild(inputElement);
formElement.appendChild(buttonElement);

const ulElement = document.createElement("ul");

bodyELement.appendChild(h1Element);
bodyELement.appendChild(formElement);
bodyELement.appendChild(ulElement);

//TODO connect firestore
const db = firebase.firestore();

//TODO form event
formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const hobby = inputElement.value;
    if(!hobby) return;

    addHobbyItem({ name: hobby });

    //! reset value
    inputElement.value = "";
})

//TODO get data from firestore
function getHobbyListFromDB() {
    db.collection("hobbies").onSnapshot(snapshot => {
        let hobbyList = [];
        snapshot.docs.map(doc => {
            let hobby = doc.data();
            hobby.id = doc.id;
            hobbyList.push(hobby);
        });
        renderHobbyList(hobbyList);
    })
}
getHobbyListFromDB();

//TODO render data from firestore to DOM html
function renderHobbyList(hobbyList) {
    //! reset HobbyList
    ulElement.innerHTML = "";

    hobbyList.map(hobby => {
        const liElement = document.createElement("li");
        liElement.innerHTML = hobby.name;
        liElement.style.cursor = "pointer";
        liElement.addEventListener("click", () => deleteHobbyItem(hobby.id));
        ulElement.appendChild(liElement);
    })
}

//TODO add hobby
function addHobbyItem(hobby) { //* { name: "abc" }
    db.collection("hobbies").add(hobby);
}

//TODO delete hobby
function deleteHobbyItem(id) {
    db.collection("hobbies").doc(id).delete();
}

//TODO update hobby
function updateHobbyItem(id, value) { //* value = { name: "Play the piano" }
    db.collection("hobbies").doc(id).set(value);
}
