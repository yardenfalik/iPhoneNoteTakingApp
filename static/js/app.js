var notes = [];

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

    for (var i = 0; i < notes.length; i++) 
    {
        var li = document.createElement('li');
        li.setAttribute("onclick","changeNote("+ i +")");
        const d = new Date(notes[i][1]);
        var data = notes[i][0]
        if(data.length > 21)
        {
            data = data.substring(0, 21) + "...";
        }
        if((d.getMonth() + 1) < 10)
        {
            li.innerHTML = data + "<br>" + d.getDate() + "/0" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }
        else
        {
            li.innerHTML = data + "<br>" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }
        if(notes[i])
        {
            notesList.appendChild(li);
        }
    }
}

function updateNote(index)
{
    var currentDate = new Date();
    var note = document.getElementById('note').value;
    if(index < notes.length)
    {
        notes[index] = [note, currentDate];
    }
    else
    {
        notes.push([note, currentDate]);
    }
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

function deleteNote(index)
{
    notes.splice(index, 1);
    updateDatabase();
    loadNotes();
    getBackButton();
}

function updateDatabase()
{
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote(index)
{
    var main = document.getElementById('main');

    var div = document.createElement("div");
    div.className = "noteTaking";
    div.id = "noteTaking";

    var p = document.createElement("p");
    p.innerHTML = timeManager();

    var backButton = document.createElement("button");
    backButton.setAttribute("onclick","getBackButton()");
    backButton.innerHTML = "&lt; Notes";

    var deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = "🗑️";

    var note = document.createElement("textarea");
    if(index != -1)
    {
        note.value = notes[index][0];
        note.setAttribute("onchange","updateNote(" + index + ")");
        deleteButton.setAttribute("onclick","deleteNote(" + index + ")");
    }
    else
    {
        note.setAttribute("onchange","updateNote(" + notes.length + ")");
        deleteButton.setAttribute("onclick","deleteNote(" + notes.length + ")");
    }
    note.id = "note";

    div.appendChild(backButton);
    div.appendChild(deleteButton);
    div.appendChild(p);
    div.appendChild(note);
    document.getElementById('noteDiv').appendChild(div);
    
    main.style.display = "none";
}

function changeNote(index)
{
    addNote(index);
}

function timeManager()
{
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var d = new Date();

    if (d.getMinutes() < 10) 
    {
        var time = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear() + " at " + d.getHours() + ":0" + d.getMinutes();
        return time;
    }
    var time = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes();
    return time;
}