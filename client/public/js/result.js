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
    xhttp.open("GET","http://localhost:5000/api/v1/results","true");
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
    <th class="rate participants">Position</th>
</tr>`;
let gap=`<tr id="tableHeadings"></tr>`

    let mainContainer='';
    console.log("key",empData.winners);
    for(let i=0;i<empData.winners.length;i++){
       
            
           
            let empTable=` <tr class="user" id="${empData.winners[i].comp_id}">
            <td class="compname">${empData.winners[i].comp_name}</td>
            <td class="type">${empData.winners[i].comp_type}</td>
            <td class="participants">${empData.winners[i].name}</td>
            <td class="rating">${empData.winners[i].rate?empData.winners[i].rate:"Not Rated"}</td>
            <td class="rating">${empData.winners[i].pos }</td>
            </tr>`;
            mainContainer+=empTable
        
        
       
    }
    mainContainer+=gap;
    mainContainer=empHead+mainContainer;
    document.getElementById('table').innerHTML=mainContainer;

}




