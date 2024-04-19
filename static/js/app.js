var notes = {0: "start"};

if(window.navigator.standalone == true)
{
    document.getElementById('instruction').style.display = 'none';
}
else
{
    document.getElementById('main').style.display = 'none';
}


loadNotes();

function loadNotes()
{
    if (localStorage.getItem('notes')) 
    {
        notes = JSON.parse(localStorage.getItem('notes'));
    }

    var notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    for (var i = 1; i < Object.keys(notes).length; i++) {
        var li = document.createElement('li');
        li.innerHTML = notes[i];
        notesList.appendChild(li);
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

function updateDatabase()
{
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote()
{
    var main = document.getElementById('main');

    var div = document.createElement("div");
    div.className = "noteTaking";
    div.id = "noteTaking";


    var button = document.createElement("button");
    button.setAttribute("onclick","getBackButton()");
    button.innerHTML = "&lt; Notes";

    var note = document.createElement("textarea");
    note.id = "note";
    note.setAttribute("onchange","updateNote(" + Object.keys(notes).length + ")");

    div.appendChild(button);
    div.appendChild(note);
    document.getElementById('noteDiv').appendChild(div);

    main.style.display = "none";
}