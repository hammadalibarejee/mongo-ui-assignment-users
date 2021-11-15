



let users = [];
function createUser() {
    let name = document.getElementById("inputName").value
    let email = document.getElementById("inputEmail").value
    let address = document.getElementById("inputAddress").value

    axios.post('https://assignment-api-mongo.herokuapp.com/user', {
        name, email, address
    })
        .then(function (response) {
            console.log(response);

            document.getElementById("inputName").value = ""

            getAllUser()

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-success" role="alert">
                            User Created Success!
                        </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);

        })


}
function getAllUser() {

    axios.get('https://assignment-api-mongo.herokuapp.com/users')
        .then(function (response) {
            console.log(response);

            users = response.data;

            document.getElementById("tableBody").innerHTML = ""

            users.map((eachUser, index) => {
                document.getElementById("tableBody").innerHTML +=
                    `<tr id="${eachUser._id}" data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="500"
                    data-aos-offset="0">
                                <th scope="row">${eachUser._id}</th>
                                <td>${eachUser.name}</td>
                                <td>${eachUser.email}</td>
                                <td>${eachUser.address}</td>
                                <td>
                                    <button type="button" onclick="deleteUser('${eachUser._id}')"  class="btn btn-danger hid">delete</button>
                                    <button type="button" class="btn btn-danger "  onclick="editInfo('${eachUser._id}','${index}')" >Edit</button>
                                    
                                </td>
                            </tr>`
            })
        })

}

function deleteUser(_id) {


    axios.delete(`https://assignment-api-mongo.herokuapp.com/user/${_id}`)
        .then(function (response) {
            console.log(response);

            getAllUser();

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-danger animate" role="alert">
                            User Deleted Success!
                        </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);

        })
}
function editInfo(id, index) {
    console.log(id, index);

    const userObject = users[index];
    console.log(userObject);

    document.getElementById(id).innerHTML =
        `<tr id="${id}" class="animate" data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="500"
        data-aos-offset="0">
        <th scope="row">${id}</th>
        <td><input type="text" id ="${id}-name" value="${userObject.name}"></td>
        <td><input type="text" id ="${id}-email" value="${userObject.email}"></td>
        <td><input type="text" id ="${id}-address" value="${userObject.address}"></td>
        <td>
        <button type="button" class="btn btn-success" onclick="updateInfo('${id}','${index}')" >Update</button>
        
        </td>
</tr>`



}

function updateInfo(id, index) {
    console.log(index)
    console.log(id)


    var name = document.getElementById(`${id}-name`).value;
    var email = document.getElementById(`${id}-email`).value;
    var address = document.getElementById(`${id}-address`).value;

    // if (name) { axios.put(`http://assignment-api-mongo.herokuapp.com/user/${id}`, {
    //        name
    //      })
    //      .then(res => location.reload()); }
    // if (email) { axios.put(`http://assignment-api-mongo.herokuapp.com/user/${id}`, {
    //      email }).then(res => location.reload()); }
    // if (address) { axios.put(`http://assignment-api-mongo.herokuapp.com/user/${id}`, { 
    //     address }).then(res => location.reload()); }

    // axios.get("https://assignment-api-mongo.herokuapp.com/users").then((res) => {
    //     document.getElementById(id + "n").value = res.data[index].name;
    //     document.getElementById(id + "e").value = res.data[index].email;
    //     document.getElementById(id + "a").value = res.data[index].address;
    // })


    axios.put(`https://assignment-api-mongo.herokuapp.com/user/${id}`, {

        name,
        email,
        address

    }).then((res) => {


        console.log(res)
        getAllUser();
    }).catch((e) => {
        console.log(e)

    })

}


getAllUser();
