var notes = {0: "start"};

// if(window.navigator.standalone == true)
// {
//     document.getElementById('instruction').style.display = 'none';
// }
// else
// {
//     document.getElementById('main').style.display = 'none';
// }


loadNotes();

function loadNotes()
{
    if (localStorage.getItem('notes')) 
    {
        notes = JSON.parse(localStorage.getItem('notes'));
    }

    var notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    for (var i = 1; i <= Object.keys(notes).length; i++) 
    {
        var li = document.createElement('li');
        li.setAttribute("onclick","changeNote("+ i +")");
        li.innerHTML = notes[i];
        if(notes[i])
        {
            notesList.appendChild(li);
        }
    }
}

function updateNote(id)
{
    var note = document.getElementById('note').value;
    notes[id] = note;
}

function getBackButton()
{
    updateDatabase();
    loadNotes();

    var main = document.getElementById('main');
    main.style.display = "block";

    var noteTaking = document.getElementById('noteTaking');
    noteTaking.remove();
}

function deleteNote()
{
    var note = document.getElementById('note').value;
    var index = Object.keys(notes).find(key => notes[key] === note);
    delete notes[index];
    updateDatabase();
    loadNotes();
    getBackButton();
}

function updateDatabase()
{
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote(id)
{
    var main = document.getElementById('main');

    var div = document.createElement("div");
    div.className = "noteTaking";
    div.id = "noteTaking";


    var backButton = document.createElement("button");
    backButton.setAttribute("onclick","getBackButton()");
    backButton.innerHTML = "&lt; Notes";

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick","deleteNote()");
    deleteButton.className = "delete";
    deleteButton.innerHTML = "🗑️";

    var note = document.createElement("textarea");
    if(id != 0)
    {
        note.value = notes[id];
        note.setAttribute("onchange","updateNote(" + id + ")");
    }
    else
    {
        note.setAttribute("onchange","updateNote(" + Object.keys(notes).length + ")");
    }
    note.id = "note";

    div.appendChild(backButton);
    div.appendChild(deleteButton);
    div.appendChild(note);
    document.getElementById('noteDiv').appendChild(div);

    main.style.display = "none";
}

function changeNote(id)
{
    addNote(id);
}