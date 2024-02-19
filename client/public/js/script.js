window.onload = function(){
    fetchUsers()
    var userPlus = document.getElementById("addUser");
    var addModal = document.getElementById("modalAddUser");
    var editModal = document.getElementById("modalEditUser");
    
    userPlus.addEventListener("click", () => {
        addModal.classList.add("show");
        addModal.style.display = "block";

    })
    
    window.addEventListener("click", (event)=> {
        if (event.target == addModal) {
          addModal.style.display = "none";
        }
    });


    window.addEventListener("click", (event)=> {
        if (event.target == editModal) {
          editModal.style.display = "none";
        }
    });
    
    
};

let allUsers;

function loadUsers(usersList) {

   
    let usersTable="";
    let head=` <tr id="tableHeadings">
    <th class="name">Competition Name</th>
    <th class="age">Type</th>
    <th class="Functions">Modification</th>
    </tr>`

    usersList=usersList.comps
    for (const user of usersList) {
        let usr=` <tr class="user" id="${user.comp_id}">
        <td class="name">${user.comp_name}</td>
        <td class="age">${user.comp_type}</td>
        <td class="functions">
            <button class="edit" onclick="editUser(${user.comp_id});" type="button" id=${user.comp_id}><i class="fa-solid fa-pen"></i></button><button class="deleteB" onclick="deleteUser(${user.comp_id});"type="button" id=${user.comp_id}><i class="fa-solid fa-trash-can"></i></button>
        </td>
    </tr>`;

    usersTable+=usr;
    }
    document.getElementById("table").innerHTML=head+usersTable;
}

// function fetchUsers() {
//     let xhttp= new XMLHttpRequest();
//     xhttp.open("GET","https://650439bec8869921ae24b8ca.mockapi.io/api/v1/users",true);
//     xhttp.send();
//     xhttp.onreadystatechange=function () {
//         if(this.readyState==4){
//             if(this.status==200){
//             allUsers=JSON.parse(this.response);
//             loadUsers(JSON.parse(this.response));

//         }
//      }
//     }
// }

function fetchUsers() {
    let xhttp= new XMLHttpRequest();
    xhttp.open("GET","http://localhost:5000/api/v1/competitions",true);
    xhttp.send();
    xhttp.onreadystatechange=function () {
        if(this.readyState==4){
            if(this.status==200){
            allUsers=JSON.parse(this.response);
            console.log("all data",allUsers);
            loadUsers(JSON.parse(this.response));

        }
     }
    }
}




function addUser() {
    let name= document.getElementById("inputName").value;
    let age= document.getElementById("inputAge").value;
    let state= document.getElementById("inputState").value;
    if(!name || !state){
        alert("Fill All Details !!!");
        return;
    }
    let user={
        comp_id:age,
        comp_name:name,
        comp_type:state
    }
    let xhttp= new XMLHttpRequest();
    xhttp.open("POST","http://localhost:5000/api/v1/competitions",true);
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(user));
    xhttp.onreadystatechange=function () {
        if(this.readyState==4){
            if(this.status==201){
            fetchUsers();

        }
     }
    }
  
    document.getElementById("modalAddUser").style.display="none";
    document.getElementById("inputName").value="";
    document.getElementById("inputAge").value="";
    document.getElementById("inputState").selectedIndex=0;
   


}


let editID;
function updateUser() {
    let userid=editID;

    console.log("edit id ", userid);
    
    
    
    let newUsrName=document.getElementById("editInputName").value;
    let newUsrAge=document.getElementById("editInputAge").value;
    let newUsrState=document.getElementById("editInputState").value;

    if(!newUsrName || !newUsrAge || !newUsrState){
        alert("Fill All Details !!!")
        return;
    }

    let newUsrData={
        comp_name:newUsrName,
        comp_id:newUsrAge,
        comp_type:newUsrState
    }

    let xhttp= new XMLHttpRequest();
        xhttp.open("PUT",`http://localhost:5000/api/v1/competitions/${userid}`,true);
        xhttp.setRequestHeader("Content-type","application/json")
        xhttp.send(JSON.stringify(newUsrData));
        xhttp.onreadystatechange=function () {
            if(this.readyState==4){
                if(this.status==200){
                fetchUsers();
    
            }
         }
        }

        var editModal = document.getElementById("modalEditUser");
        editModal.classList.add("show");
        editModal.style.display = "none";

    
}


function editUser(userid){
    editID=userid;
    var editModal = document.getElementById("modalEditUser");
    editModal.classList.add("show");
    editModal.style.display = "block";
    let idx=allUsers.comps.findIndex(e=>e.comp_id==userid);
    let usrName= allUsers.comps[idx].comp_name;
    let usrAge= allUsers.comps[idx].comp_id;
    let usrState= allUsers.comps[idx].comp_type;


    console.log(usrName,usrAge,usrState);
    document.getElementById("editInputName").value=usrName;
    document.getElementById("editInputAge").value=usrAge;
    document.getElementById("editInputState").value=usrState;
    


}

function deleteUser(userid){
    let idx=allUsers.comps.findIndex(e=>e.comp_id==userid);
    let usrDelName= allUsers.comps[idx].comp_name
    
    var modal = document.getElementById("deleteModal");
    modal.classList.add("show");
    modal.style.display = "block";
    document.getElementById("userDeleted").innerHTML=usrDelName;
    
    var cancelDelete=document.querySelectorAll(".deleteCancel");
    cancelDelete.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            modal.style.display = "none";
        });
    });
    
    var confirmDelete = document.querySelector(".confirmDelete");
    confirmDelete.addEventListener("click", ()=>{
        
        let xhttp= new XMLHttpRequest();
        xhttp.open("DELETE",`http://localhost:5000/api/v1/competitions/${userid}`,true);
        xhttp.setRequestHeader("Content-type","application/json")
        xhttp.send();
        xhttp.onreadystatechange=function () {
            if(this.readyState==4){
                if(this.status==200){
                fetchUsers();
    
            }
         }
        }

        modal.style.display = "none";
    });

}


