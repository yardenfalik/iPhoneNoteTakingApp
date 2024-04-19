var notes = [];

function submitNote()
{
    var note = document.getElementById('note');
    notes.push(note.value);

    var notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    for (var i = 0; i < notes.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = notes[i];
        notesList.appendChild(li);
    }
}