import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champion-bbada-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const praisesListInDB = ref(database, "praisesList")
const postBtn = document.getElementById("post-btn")
const praiseTxt = document.getElementById("praise-txt")
const praiseListEl = document.getElementById("list-praise")

onValue(praisesListInDB, function (snapshot){
    
    if (snapshot.exists()) {
        let praiseArray = Object.entries(snapshot.val())
        
        clearTextArea()
        clearList()
        
        for (let i = 0; i < praiseArray.length; i++){
            let currentPraise = praiseArray[i]
            let currentPraiseID = currentPraise[0]
            let currentPraiseValue = currentPraise[1]
            
            addToPraiseList(currentPraise)
        }
    } else{ praiseListEl.textContent = ""
        
    }
})

postBtn.addEventListener("click", function() {
    let inputValue = praiseTxt.value
    
    push(praisesListInDB, inputValue)
    
    clearTextArea()
    
})



function clearTextArea(){
    praiseTxt.value = ""
}

function clearList(){
    praiseListEl.innerHTML = ""
}

function addToPraiseList(praise){
    let praiseID = praise[0]
    let praiseValue = praise[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = praiseValue
    
    praiseListEl.append(newEl)
    
    newEl.addEventListener("dblclick", function(){
        let praiseLocInDB = ref(database, `praisesList/${praiseID}`)
    
        remove(praiseLocInDB)
    })
}