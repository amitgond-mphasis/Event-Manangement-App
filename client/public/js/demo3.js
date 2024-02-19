window.onload = function(){
    fetchUsers();
    var userPlus = document.getElementById("addUser");
    var addModal = document.getElementById("modalAddUser");
    
    // userPlus.addEventListener("click", () => {
    //     addModal.classList.add("show");
    //     addModal.style.display = "block";
    // })
    
    window.addEventListener("click", (event)=> {
        if (event.target == addModal) {
          addModal.style.display = "none";
        }
    });
    
};
let updateUserId;
function editUser(userId){
    // var userPlus = document.getElementById("addUser");
    var addModal = document.getElementById("modalUpdateUser");
    addModal.classList.add("show");
    addModal.style.display = "block";
    updateUserId=userId;
}

// function deleteUser(){
//     var modal = document.getElementById("deleteModal");
//     modal.classList.add("show");
//     modal.style.display = "block";
//     var cancelDelete=document.querySelectorAll(".deleteCancel");
//     cancelDelete.forEach((btn)=>{
//         btn.addEventListener("click", ()=>{
//             modal.style.display = "none";
//         });
//     });
    
//     var confirmDelete = document.querySelector(".confirmDelete");
//     confirmDelete.addEventListener("click", ()=>{
//         modal.style.display = "none";
//     });
// }
//-----------------------fetch user data--------------------------------------
// let allData;
function fetchUsers(){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            loadEmp(JSON.parse(this.responseText)); 
        // allData= JSON.parse(this.responseText).comps//getting the responce of emp data
        }
    }
    xhttp.open("GET","http://localhost:5000/api/v1/ratings","true");
    xhttp.send();
}

//-----------------------------display all user------------------------------------
function loadEmp(empData){
    console.log("data",empData)
    let empHead=`<tr id="tableHeadings">
    <th class="compname">Competition Name</th>
    <th class="type">Type</th>
    <th class="participants">Participants</th>
    <th class="rating">Rating</th>
    <th class="rate participants">Rate Participants</th>
</tr>`;
    let mainContainer='';
    
    for(let i=0;i<empData.comps.length;i++){
        let empTable=` <tr class="user" id="${empData.comps[i].comp_id}">
    <td class="compname">${empData.comps[i].comp_name}</td>
    <td class="type">${empData.comps[i].comp_type}</td>
    <td class="participants">${empData.comps[i].comp_participants}</td>
    <td class="rating">${empData.comps[i].rating?empData.comps[i].rating:"Not Rated"}</td>
    <td class="rate participants">
        <button class="edit" onclick="editUser(${empData.comps[i].comp_id});" type="button" id="1"><i class="fa-solid fa-pen-clip"></i></button>
       
    </td>
    </tr>`;
        mainContainer+=empTable;
    }
    mainContainer=empHead+mainContainer;
    document.getElementById('table').innerHTML=mainContainer;

}


//---------------add user--------------------------------------------

// function addUser(){
//     let empName=document.getElementById('inputName').value;
//     let empAge=document.getElementById('inputAge').value;
//     let empState=document.getElementById('inputState').value;
//     let empRating=document.getElementById('inputRating').value;
//     if(!empAge ||!empName || !empState ||!empRating){
//         alert("Enter all details!");
//     }
//     let newEmp={"userName":empName,
//                 "age":empAge,
//                 "state":empState,
//                 "rating":empRating};
//     var xhttp=new XMLHttpRequest();
   
//     xhttp.open("POST","https://65043a76c8869921ae24ba04.mockapi.io/api/v1/empData","true");
//     xhttp.setRequestHeader("Content-type","application/json");
//     xhttp.send(JSON.stringify(newEmp));

//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4)
//             if( this.status==201){
//             fetchUsers();
//         }
//     };
//     document.getElementById('modalAddUser').style.display='none';
//     document.getElementById('inputName').value='';
//     document.getElementById('inputAge').value='';
//     document.getElementById('inputState').selected.index='0';
//     document.getElementById('inputRating').selected.index='0';
    
// }

// //-------------------------removing-------------------------------------

// // function deleteUser(userId){
// //     let xhttp= new XMLHttpRequest();
   
// //     xhttp.open('DELETE',`https://65043a76c8869921ae24ba04.mockapi.io/api/v1/empData/${userId}`,true);
// //     xhttp.setRequestHeader("Content-type","application/json");
// //     xhttp.send();
// //     xhttp.onreadystatechange=function(){
// //         if(this.readyState==4){
// //             if(this.status==200){
// //                 fetchUsers();
// //             }
// //         }

// //     };
    
// // }

//-----------------updateUser-------------------------
function updateUser(){
    // let empName=document.getElementById('inputUpdateName').value;
    // let empAge=document.getElementById('inputUpdateAge').value;
    // let empState=document.getElementById('inputUpdateState').value;
    let empRating=document.getElementById('inputUpdatedRating').value;
    // let newEmp={"userName":empName,
    // "age":empAge,
    // "state":empState,
    // "rating":empRating};
    let newRating={
        rating:empRating,
        comp_id:updateUserId
    }
    console.log("new Rate",newRating);
    // for(let i=0;)
    document.getElementById('modalUpdateUser').style.display='none';
    var xhttp=new XMLHttpRequest();
    xhttp.open("PUT",`http://localhost:5000/api/v1/ratings/${updateUserId}`,true)
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify(newRating));
    xhttp.onreadystatechange=function(){
        if(this.readyState==4){
            if(this.status==200){
               fetchUsers();
               document.getElementById('inputUpdatedRating').selectedIndex=0;
            }
        }
    };
}

//-----------------