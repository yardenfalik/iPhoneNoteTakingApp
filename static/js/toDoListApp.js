var toDoList = [];

loadList();

function loadList()
{
    if (localStorage.getItem('toDoList')) 
    {
        toDoList = JSON.parse(localStorage.getItem('toDoList'));
    }
    document.getElementById("list").innerHTML = "";
    for (var i = 0; i < toDoList.length; i++) 
    {
        var li = document.createElement("li");
        var node = document.createTextNode("    " + toDoList[i][0]);
        li.appendChild(node);
        li.setAttribute("id", i);
        li.setAttribute("onclick", "markAsDone(" + i + ")");
        
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.setAttribute("class", "deleteButton");
        deleteButton.setAttribute("onclick", "deleteItem(" + i + ")");
        li.appendChild(deleteButton);
        
        document.getElementById("list").appendChild(li);
        if(toDoList[i][1] == true)
        {
            li.style.backgroundColor = "#d1d1d1";
            li.style.textDecoration = "line-through";
        }
    }
}

function addFunction() 
{
    var one = document.getElementById("one").value;
    document.getElementById("one").innerHTML = "";
    toDoList.push([one, false]);
    updateDatabase();
}

function deleteItem(id) 
{
    toDoList.splice(id, 1);
    updateDatabase();
}

function removeAll() 
{
    toDoList = [];
    updateDatabase();
}

function markAsDone(id) 
{
    var item = document.getElementById(id);
    if(toDoList[id][1] == true)
    {
        toDoList[id][1] = false;
        document.getElementById(id).style.backgroundColor = "inherit";
        item.style.textDecoration = "none";
    }
    else
    {
        toDoList[id][1] = true;
        document.getElementById(id).style.backgroundColor = "#d1d1d1";
        item.style.textDecoration = "line-through";
    }
    updateDatabase();
}

function updateDatabase()
{
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    loadList();
}