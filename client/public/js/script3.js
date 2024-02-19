window.onload = function(){
    fetchUsers();
    var userPlus = document.getElementById("addUser");
    var addModal = document.getElementById("modalAddUser");
    var editModal = document.getElementById("modalEditUser");
    
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
let allData;
function fetchUsers(){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            loadEmp(JSON.parse(this.responseText)); 
        allData= JSON.parse(this.responseText).comps//getting the responce of emp data
        }
    }
    xhttp.open("GET","http://localhost:5000/api/v1/ratings","true");
    xhttp.send();
}

{/* <td class="rating">${empData.comps[j].rating}</td>   */}
//-----------------------------display all user------------------------------------
let globalArr;
function loadEmp(empData){
    // console.log("data",empData)
    let empHead=`<tr id="tableHeadings">
    <th class="compname">Competition Name</th>
    <th class="type">Type</th>
    <th class="participants">Participants</th>
    <th class="rating">Rating</th>
    <th class="rate participants">Rate Participants</th>
    </tr>`;

    let gap=`<tr id="tableHeadings"></tr>`
    let mainContainer='';
    
    for(let j=0;j<empData.comps.length;j++){

        let grpArr= empData.comps[j].comp_participants.split(",");
        let rateArr= empData.comps[j].rating? empData.comps[j].rating.toString().split(""):["0","0","0"]
        // console.log("rate arr",rateArr);
       
        // console.log("arr",empData.comps[j].comp_participants)

        for(let i=0;i<grpArr.length;i++){
           

            let empTable=` <tr class="user" id="${empData.comps[j].comp_id}">
            <td class="compname">${empData.comps[j].comp_name}</td>
            <td class="type">${empData.comps[j].comp_type}</td>    
            <td class="state">${grpArr[i]? grpArr[i]:"No Participants"}</td>
            <td class="state">${rateArr[i]? rateArr[i]:"0"}</td>

            <td class="functions">
                <button class="edit" onclick="editUser(${i});passCompId(${empData.comps[j].comp_id})" type="button" id="1"><i class="fa-solid fa-pen"></i></button>

            </td>
            </tr>`;
         mainContainer+=empTable;

        }
        mainContainer+=gap;
    }
    mainContainer=empHead+mainContainer;
    document.getElementById('table').innerHTML=mainContainer;

}


let compID;
function passCompId(compid) {
    compID=compid
}

let updateUserId;

function editUser(userId){
    // var userPlus = document.getElementById("addUser");
    var addModal = document.getElementById("modalUpdateUser");
    addModal.classList.add("show");
    addModal.style.display = "block";
    updateUserId=userId;
    
}

function updateUser(){

    console.log("all Data",allData);
    let empRating=document.getElementById('inputUpdatedRating').value;
    let idx= allData.findIndex(e=>e.comp_id==compID)
    console.log("idx",idx);
   

    let x= allData[idx].rating;
    console.log("x",x);
    let y=x.toString().split("")
    y[updateUserId]=empRating
    console.log("y",y);
    let newRate=Number(y.join(""))
    // let empName=document.getElementById('inputUpdateName').value;
    // let empAge=document.getElementById('inputUpdateAge').value;
    // let empState=document.getElementById('inputUpdateState').value;
   
    // console.log("emp rate",empRating);
    // console.log("part",);
    // let newEmp={"userName":empName,
    // "age":empAge,
    // "state":empState,
    // "rating":empRating};

 

    
    let newRating={
        rating:newRate,
        comp_id:compID
        
    }
    console.log("newest Rate",newRating);
    // return;
    // for(let i=0;)
    document.getElementById('modalUpdateUser').style.display='none';
    var xhttp=new XMLHttpRequest();
    xhttp.open("PUT",`http://localhost:5000/api/v1/ratings/${compID}`,true)
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