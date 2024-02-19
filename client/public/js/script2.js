window.onload = function(){
    fetchUsers();
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

{/* <td class="state">${user.comp_participants? user.comp_participants:"No Participants"}</td> */}

function loadUsers(usersList) {

    // console.log("uuuuu::",usersList);
    //let u=usersList

    let usersTable="";
    let head=` <tr id="tableHeadings">
    <th class="comp_name">Competetion Name</th>
    <th class="type">Type</th>
    <th class="part_name">Participants Name</th>
    <th class="functions">Modification</th>
    </tr>`

    
    // let
    // console.log();

   

    // console.log("dsbjhbdshj",usersList);
    // console.log("fffff",allUsers);
    // let ucom=usersList.comps;
    // console.log("UCOM:::::::::::::;", JSON.stringify(ucom));
    for (const user of usersList.comps) {
        //console.log("rrrrrrrr::::",user, user.comp_participants);
        // if(!(user && user.comp_participants)){
        //     console.log("ERRRRRRRRRRRRRRRRRRRORRRRRRRRRR");
        // }
        // let grpArr= user.comp_participants.split(",");
        // console.log("ggggg::",grpArr);
        // console.log("res",user.comp_participants);
        // console.log(typeof user.comp_participants);
        
        // let grpArr=grpStr.split(",")
        // console.log("res",grpArr);
        // let  grpArr= user.comp_participants.split(",");
        // for(let i=0;i<grpArr.length;i++){
           
        let usr=` <tr class="user" id="${user.comp_id}">
        <td class="name">${user.comp_name}</td>
        <td class="type">${user.comp_type}</td>
        <td class="state">${user.comp_participants? user.comp_participants:"No Participants"}</td>
        
        <td class="functions">
            <button class="edit" onclick="editUser(${user.comp_id});" type="button" id=${user.comp_id}><i class="fa-solid fa-pen"></i></button><button class="deleteB" onclick="deleteUser(${user.comp_id});"type="button" id=${user.comp_id}><i class="fa-solid fa-trash-can"></i></button>
        </td>
    </tr>`;

    usersTable+=usr;
    // }
}
    document.getElementById("table").innerHTML=head+usersTable;
}

 function fetchUsers() {
    let xhttp= new XMLHttpRequest();
    xhttp.open("GET","http://localhost:5000/api/v1/participants",true);
    
    xhttp.onreadystatechange= async function () {
        if(this.readyState==4){
            if(this.status==200){
                allUsers= JSON.parse(this.response);
                // loadUsers(JSON.parse(this.response));
                console.log("all ",allUsers);
                loadUsers(allUsers);

                // console.log("get all",this.response);

            }
        }
    }

    xhttp.send();
}




function addUser() {
    let part_name= document.getElementById("inputName").value;
    let comp_name= document.getElementById("inputComp").value;
    // let state= document.getElementById("inputState").value;

    // let name= document.getElementById("inputName").value;
    // let age= document.getElementById("inputAge").value;
    // let state= document.getElementById("inputState").value;
    if(!part_name || !comp_name){
        alert("Fill All Details !!!");
        return;
    }
    let comp_part={
        comp_participants:part_name,
        comp_name:comp_name
      
    }
    // console.log("add part",comp_part)
    let xhttp= new XMLHttpRequest();
    xhttp.open("POST","http://localhost:5000/api/v1/participants",true);
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(comp_part));
    xhttp.onreadystatechange=function () {
        if(this.readyState==4){
            if(this.status==200){
            fetchUsers();
            // console.log("return add part",this.response);

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

    // console.log("edit id ", userid);
    
    
    
    let newPartNames=document.getElementById("editInputName").value;
    // let newUsrAge=document.getElementById("editInputAge").value;
    // let newUsrState=document.getElementById("editInputState").value;

    if(!newPartNames){
        alert("Fill the Details !!!")
        return;
    }

    let newPartData={
        comp_participants:newPartNames
    }

    // console.log("new part",newPartData);

    let xhttp= new XMLHttpRequest();
        xhttp.open("PUT",`http://localhost:5000/api/v1/participants/${userid}`,true);
        xhttp.setRequestHeader("Content-type","application/json")
        xhttp.send(JSON.stringify(newPartData));
        xhttp.onreadystatechange=function () {
            if(this.readyState==4){
                if(this.status==200){
                fetchUsers();
                console.log("update",this.response);
    
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
    console.log("idx",idx);
    let partNames= allUsers.comps[idx].comp_participants;
    // let usrAge= allUsers.comps[idx].age;
    // let usrState= allUsers.comps[idx].state;


    // console.log(usrName,usrAge,usrState);
    document.getElementById("editInputName").value=partNames;
    // document.getElementById("editInputAge").value=usrAge;
    // document.getElementById("editInputState").value=usrState;
    


}

// function deleteUser(userid){
//     let idx=allUsers.findIndex(e=>e.id==userid);
//     let usrDelName= allUsers[idx].userName
    
//     var modal = document.getElementById("deleteModal");
//     modal.classList.add("show");
//     modal.style.display = "block";
//     document.getElementById("userDeleted").innerHTML=usrDelName;
    
//     var cancelDelete=document.querySelectorAll(".deleteCancel");
//     cancelDelete.forEach((btn)=>{
//         btn.addEventListener("click", ()=>{
//             modal.style.display = "none";
//         });
//     });
    
//     var confirmDelete = document.querySelector(".confirmDelete");
//     confirmDelete.addEventListener("click", ()=>{
        
//         let xhttp= new XMLHttpRequest();
//         xhttp.open("DELETE",`https://650439bec8869921ae24b8ca.mockapi.io/api/v1/users/${userid}`,true);
//         xhttp.setRequestHeader("Content-type","application/json")
//         xhttp.send();
//         xhttp.onreadystatechange=function () {
//             if(this.readyState==4){
//                 if(this.status==200){
//                 fetchUsers();
    
//             }
//          }
//         }

//         modal.style.display = "none";
//     });

// }


function deleteUser(userid){
    let idx=allUsers.comps.findIndex(e=>e.comp_id==userid);
    let partDelName= allUsers.comps[idx].comp_participants
    
    var modal = document.getElementById("deleteModal");
    modal.classList.add("show");
    modal.style.display = "block";
    document.getElementById("userDeleted").innerHTML=partDelName;
    
    var cancelDelete=document.querySelectorAll(".deleteCancel");
    cancelDelete.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            modal.style.display = "none";
        });
    });
    
    var confirmDelete = document.querySelector(".confirmDelete");
    confirmDelete.addEventListener("click", ()=>{


        let newUsrData={
            comp_participants:"No Participants",
        }
        
        // console.log("del part", newUsrData);
        let xhttp= new XMLHttpRequest();
        xhttp.open("DELETE",`http://localhost:5000/api/v1/participants/${userid}`,true);
        xhttp.setRequestHeader("Content-type","application/json")
        xhttp.send(JSON.stringify(newUsrData));
        xhttp.onreadystatechange=function () {
            if(this.readyState==4){
                if(this.status==200){
                    console.log("del",this.response);
                fetchUsers();
    
            }
         }
        }

        modal.style.display = "none";
    });

}

