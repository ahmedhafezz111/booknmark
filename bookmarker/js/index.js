var siteNameInput = document.getElementById('siteName')
var siteUrlInput = document.getElementById('siteUrl')
var regex;

var bookMarkStorage;
if( localStorage.getItem("marks")== null){
    bookMarkStorage =[]
   
}else{
    bookMarkStorage=JSON.parse(localStorage.getItem('marks'))
    display(bookMarkStorage)
}


function addBookmark(){
   var bookMark = {
    name:siteNameInput.value,
    url:siteUrlInput.value,
   }

if(siteNameInput.value == '' && siteUrlInput.value == ''){

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you should enter site name and site url",
      });
}else if(urlValidator() && nameValidator() ){
    bookMarkStorage.push(bookMark)

}else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you should enter vaild name and valid url",
      });
}
    localStorage.setItem('marks',JSON.stringify(bookMarkStorage))
    display(bookMarkStorage)
    clearInput()
    
}

function display(){
    var markContainer = ''
    for(var i=0;i < bookMarkStorage.length; i++){
        markContainer += `
      <tr>

                    <td>${i+1}</td>
                    <td>${bookMarkStorage[i].name}</td>
                    <td><button onclick="visitUrl(${i})" class="btn btn-success"><i class="fa-solid fa-eye"></i>Visit</button></td>
                    <td><button onclick="deleteMark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
      </tr>              
        `
    }
    document.getElementById('tBody').innerHTML = markContainer
}

function urlValidator(){

  regex = /^(https?:\/\/|ftp:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(:\d+)?(\/[^\s]*)?$/
    return   regex.test(siteUrlInput.value)
}
function nameValidator(){
    regex =/^[A-Z][a-z]{2,15}( [a-z]{2,15})*$/

    return regex.test(siteNameInput.value)
}

function deleteMark(deletedIndex){
    bookMarkStorage.splice(deletedIndex,1)
    localStorage.setItem('marks',JSON.stringify(bookMarkStorage))
    display(bookMarkStorage)
}

function visitUrl(index){
    var visit = bookMarkStorage[index].url
    window.open(visit,"_blank")
}
function clearInput(){
    siteNameInput.value=null;
    siteUrlInput.value=null;
}