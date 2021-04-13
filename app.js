const newNoteForm = document.querySelector('.new-note-form');
const noteTextArea = document.querySelector('#new-note-content');
const noteDisplayArea = document.querySelector('.note-display-area');
const searchBar = document.querySelector('#search-bar');


let notesArr = [];

displayNotes();

function displayNotes() {
    let notesJsonData = localStorage.getItem("notesData");
    let notesObjData = JSON.parse(notesJsonData);
    
    if (notesObjData === null){
        notesArr = [];
    }
    else {
        notesArr = notesObjData;
        for (note of notesArr){
            createNewNote(note.noteText, note.noteId);
        }
    }
};


newNoteForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const noteContent = noteTextArea.value;
    newNoteObj = {
        noteId: notesArr.length,
        noteText: noteContent
    }
    notesArr.push(newNoteObj);
    const notesData = JSON.stringify(notesArr);
    localStorage.setItem("notesData", notesData);

    let {noteId} = newNoteObj;
    createNewNote(noteContent, noteId);

    newNoteForm.reset();
});



function createNewNote(noteContent, noteId) {
    const newNoteCard = document.createElement('div');
    newNoteCard.classList.add('note-card');
    newNoteCard.id = noteId;
    newNoteCard.innerHTML = `<div class="note-content"><p>${noteContent}</p></div>
    <button class="note-delete-btn">Delete</button>`;
    noteDisplayArea.appendChild(newNoteCard);
}



noteDisplayArea.addEventListener('click', (e) => {
    const targetDeleteBtn = e.target;
    const targetNoteCard = targetDeleteBtn.parentNode;
    
    if (targetDeleteBtn.classList[0] === 'note-delete-btn') {
        targetNoteCard.remove();
        const targetId = Number(targetNoteCard.id);

        notesArr = notesArr.filter(item => item.noteId !== targetId);
        notesData = JSON.stringify(notesArr);
        localStorage.setItem("notesData", notesData);
    }
});




// console.dir(noteCardArr);
// console.log(noteCardCollection)

searchBar.addEventListener('input', (e) => {

    let noteCardCollection = noteDisplayArea.children;
    let noteCardArr = Array.from(noteCardCollection);
    let searchText = searchBar.value;
    for (item of noteCardArr) {
        let noteText = item.children[0].innerText;
        if (noteText.includes(searchText)){
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    }    
})

