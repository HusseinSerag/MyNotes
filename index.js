import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL : "https://notes-daa4d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const thisRef = ref(database , "notes")


const textarea = document.getElementById('textarea-field')
const submitBtn = document.getElementById('submit-btn')
const saved = document.getElementById('saved')


submitBtn.addEventListener('click',function(){

    
    
    let txt = textarea.value
    if(txt != "")
    {
        push(thisRef , txt)
       
        
        
    }
    textarea.textContent = ""
    
    
    
    
})

onValue(thisRef , function(snapshot){
    saved.textContent = ""
    if(snapshot.exists())
    {
        let Arr = Object.entries(snapshot.val())
        for(let i = 0 ; i < Arr.length ; i++)
        {
           
            appendHereValues(Arr[i])

        }
    }
    else{
        saved.textContent = "Write your notes here!"
    }
})

function appendHereValues(Arr)
{

    let pNew = document.createElement('p')


    pNew.class = 'p-el'
    pNew.draggable = true

    pNew.addEventListener('drag',function(){
        let place = ref(database , `notes/${Arr[0]}`)
        
        remove(place)
        textarea.textContent = ""
    })
    
    let txt = Arr[1]
    

    pNew.addEventListener('click',function(){
        textarea.textContent = txt
        textarea.value = txt
        
    });
    
    let sub =txt.substring(0 , 15)
    if(txt != "")
    {
        if(txt.length < 10)
    {
        
        pNew.textContent = txt
        saved.append(pNew)
    
    
    }
    else{
       
        pNew.textContent = sub +" ..."
        saved.append(pNew)
        
    }
    }
    
}
