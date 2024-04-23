if(window.navigator.standalone == true)
{
    document.getElementById('instruction').style.display = 'none';
}
else
{
    document.getElementById('main').style.display = 'none';
}

function collapseToDo()
{
    var toDoListSection = document.getElementById('toDoListSection');
    var toDoListButton = document.getElementById('toDoListButton');

    if(toDoListSection.style.display == 'none')
    {
        toDoListSection.style.display = 'block';
        toDoListButton.innerHTML = '-';
    }
    else
    {
        toDoListSection.style.display = 'none';
        toDoListButton.innerHTML = '+';
    }
}

function collapseNotes()
{
    var notesSection = document.getElementById('notesSection');
    var notesButton = document.getElementById('notesButton');

    if(notesSection.style.display == 'none')
    {
        notesSection.style.display = 'block';
        notesButton.innerHTML = '-';
    }
    else
    {
        notesSection.style.display = 'none';
        notesButton.innerHTML = '+';
    }
}

function updateDatabase()
{
    var database = {"notes": notes, "toDoList": toDoList};
    localStorage.setItem('database', JSON.stringify(database));
}