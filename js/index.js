var nameInp = document.getElementById('name');
var urlInp = document.getElementById('url');
var desInp = document.getElementById('des');
var addBtn = document.getElementById('addBtn');
var addBtn2 = document.getElementById('addBtn2');

var tableBody = document.getElementById('tableBody');
var updateBtn = document.getElementById('updateBtn');
var delBtn = document.getElementById('delBtn');

addBtn.addEventListener('click',addUrl);
addBtn2.addEventListener('click', updateMark);



var markContainer;


if(localStorage.getItem("bookMark")== null)
{
    markContainer = [];
}
else
{
    markContainer = JSON.parse(localStorage.getItem("bookMark"));
    displayBook(markContainer);
}


function addUrl()
{
    var bookMark = {
        names : nameInp.value,
        url : urlInp.value,
        des : desInp.value
    };

    markContainer.push(bookMark);

    localStorage.setItem("bookMark" ,JSON.stringify(markContainer));

    displayBook(markContainer);
    clearForm();
}


function displayBook(arr)
{
    var marks = ``;
    for(var i = 0 ; i < arr.length ; i++)
    {
        marks += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${arr[i].names}</td>
                            <td>${arr[i].des}</td>
                            <td><a target="_blank" href="${arr[i].url}"><button class="visitBtn">visit</button></a></td>
                            <td><button onclick="setFormForUpdate(${i})" id="updateBtn">update</button></td>
                            <td><button onclick="deleteMark(${i})" id="delBtn">delete</button></td>
                        </tr>
        `
        tableBody.innerHTML = marks;
    }
}


function clearForm()
{
    nameInp.value = null;
    urlInp.value = null;
    desInp.value = null;
}

function deleteMark(deletedIndex)
{
    markContainer.splice(deletedIndex,1);
    displayBook(markContainer);
    localStorage.setItem("bookMark" ,JSON.stringify(markContainer));
}


var upindex;
function setFormForUpdate(updatedIndex)
{
    upindex = updatedIndex;
    addBtn2.classList.remove('d-none');
    addBtn.classList.add('d-none');

    nameInp.value = markContainer[upindex].names;
    urlInp.value = markContainer[upindex].url;
    desInp.value = markContainer[upindex].des;
}

function updateMark()
{
    markContainer[upindex].names = nameInp.value;
    markContainer[upindex].url = urlInp.value ; 
    markContainer[upindex].des = desInp.value ; 
    displayBook(markContainer);
    addBtn2.classList.add('d-none');
    addBtn.classList.remove('d-none');
    clearForm();
}


function validationMark(element)
{
    var regex = {
        name : /^[A-Za-z_]{1,}/ ,
        url : /^(https:\/\/)?(http:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[A-za-z]{3}/ ,
        des : /^[A-za-z_\.0-9]{1,}/
    };

    if(regex[element.id].test(element.value))
    {
        addBtn.removeAttribute("disabled")
    }
    else
    {
        addBtn.disabled = "true";
    }
}