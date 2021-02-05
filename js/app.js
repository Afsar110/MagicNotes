//if user add a note then add it to the local storage
const addBtn = document.getElementById('addBtn');
const images=['IMG_20160627_161131.jpg','Photo0004.jpg','Photo0005.jpg','Photo0006.jpg','sahajahan.jpg'];
function getImg(){
    const index = Math.floor(Math.random()*images.length)
    return 'assets/'+images[index] 
}
const getLocalNotes = () => {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notes = [];
    }
    else {
        notes = JSON.parse(notes)
    }
    return notes;
}

addBtn.addEventListener("click", function (e) {
    const addTxt = document.getElementById("addTxt");
    let notes = getLocalNotes();
    if (addTxt.value.length < 1) {
        return
    }
    const item = {
        head:notes.length+1,
        body:addTxt.value,
        image:getImg()
    }
    notes.push(item);
    localStorage.setItem("notes", JSON.stringify(notes));
    addTxt.value = "";
    showNotes(notes);
});
// funtion to show element from local storage
const showLocalNotes = () => {
    let notes = getLocalNotes()
    showNotes(notes)
}
function showNotes(notes) {
    let html = "";
    notes.forEach((element, index) => {

        html += ` 
    <div class="card my-2 mx-2" style="width: 18rem">
       <div class="card-body">
       <img src="${element.image}" class="card-img-top" alt="...">
        <h5 class="card-title">Note ${element.head}</h5>
        <p class="card-text">${element.body}</p>
      <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
      </div>
      </div> `});
    let notesElm = document.getElementById('notes');
    if (notes.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! use"Add notes"`
    }
}

// funtion to delete note
function deleteNote(index) {
    let notes = getLocalNotes()
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes(notes);
}

//search
document.getElementById('searchTxt').addEventListener("input", function (event) {
    let inputVal = event.target.value
    const notes = getLocalNotes();
    const filteredNotes = notes.filter(item => item.body.toLowerCase().includes(inputVal.toLowerCase()))
    showNotes(filteredNotes);
})

showLocalNotes();

//test
