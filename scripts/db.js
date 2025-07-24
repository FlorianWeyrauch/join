const BASE_URL = "https://join-f5b75-default-rtdb.europe-west1.firebasedatabase.app/";
let data = {
    name: "Florian Weyrauch",
    age: 30,
    city: "Fambach"
};

let currentData = [];

// async function init() {
//     //await postData("/login", data);
//     await deleteData("/login");
//     showData();
// }

//global variables for form inputs
const username = document.getElementById("username");
const age = document.getElementById("age");
const city = document.getElementById("city");

async function showData() {
    let data = await getData("/login");
    const container = document.getElementById("data-container");
    container.innerHTML = "";
    currentData = Object.values(data || {});
    for (let index = 0; index < currentData.length; index++) {
        const element = currentData[index];
        if (element && element.name) {
            container.innerHTML += element.name + " - " + element.age + " - " + element.city + "<br>";
        }
    }
}

async function getData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
}

async function postData(path = "", data) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let responseData = await response.json();
    return responseData;
}

async function putData(path = "", data) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let responseData = await response.json();
    return responseData;
}

async function deleteData(path = "") {
    const response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE"
    });
    if (response.ok) {
        showData();
    } else {
        console.error("Error deleting data");
    }
}

async function testFunction() {
    if (username && age && city) {
        const data = {
            name: username.value,
            age: age.value,
            city: city.value
        };
        await postData("/login", data);
        showData();
        emptyForm();
    } else {
        alert("Please fill in all fields.");
    }
}

function emptyForm() {
    username.value = "";
    age.value = "";
    city.value = "";
};

