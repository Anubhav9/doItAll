let uid="";

let taskList="";

//Getting the user ID from the user here

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      uid=user.uid;
      console.log(uid);
    } else {
      // User not logged in or has just logged out.
    }
  });

//Read Function- This reads information from the database using Snapshot. Only for RTDB use

function readData(e)
{

    firebase.database().ref('unfinishedTask').orderByChild("userid").equalTo(uid).once("value", function (snapshot) {
        snapshot.forEach(function(childSnapshot) {
            taskList=childSnapshot.val().task;
            console.log(taskList);
            let getDatabase=document.getElementById("database_list");
            let createListDatabase=document.createElement("LI");
            createListDatabase.appendChild(document.createTextNode(taskList));
            getDatabase.appendChild(createListDatabase);
            createListDatabase.onclick = function(){ 
              
                this.parentNode.removeChild(this); 
                let deletedKey = firebase.database().ref('unfinishedTask');
                let key_to_delete = this.innerText;
                console.log(key_to_delete);
                let query = deletedKey.orderByChild('task').equalTo(key_to_delete);
                query.on('child_added', function(snapshot)
                {
                    snapshot.ref.remove();
                });
              } 
          
         
          
        });
      });
      
      e.preventDefault();
  
}
document.getElementById("database_button").addEventListener('click',readData);


    
//Trigger Event on Submit Button Clicked

function writeUserData(text) {
 
    
    firebase.database().ref('users/' +uid ).set({
      userid: uid,
      [k]:text,

  
     
    });
    
    
  }

document.querySelector("#click_button").addEventListener('click',addItem);
function addItem(e)
{
  if(!navigator.onLine)
  {
    alert("Dear User, you are not connected to the internet.Your task would be synced to the server once you are back online");
  }
   console.log("Hello");
   let textWritten=document.getElementById('exampleInputEmail1').value;
   let list_item=document.getElementById("items");
   console.log(textWritten);
   if(textWritten!="")
   {
 
        
        let createTask=document.createElement("LI");
        createTask.appendChild(document.createTextNode(textWritten)); 
        list_item.appendChild(createTask);    
        const key = firebase.database().ref().child("unfinishedTask").push().key;
        const task = { task: textWritten, userid: uid, key: key };
        const updates = {};
        updates["/unfinishedTask/" + key] = task;
        firebase.database().ref().update(updates);
        //readData();
        
      
    
      textWritten.value="";

      createTask.onclick = function(){ 
        this.parentNode.removeChild(this); 
      } 
      
       
   }
   else{
       alert("Text cannot be left blank");
   }
   
    e.preventDefault();
    
    

}