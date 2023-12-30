var siteName = document.getElementById('inputSiteName');
var siteUrl = document.getElementById('inputUrl');
var table = document.getElementById('tableContent');
var sitesList = [];
var msg = document.getElementById('message');
if(localStorage.getItem('BookmarkList')){
    sitesList = JSON.parse(localStorage.getItem('BookmarkList'));
    display();
}
function addSite(){ 
    if(validationName() && validationUrl()){
        var site = {
            name:siteName.value,
            url:siteUrl.value,
        };
        sitesList.push(site);
        display();
        clearInput();
        localStorage.setItem('BookmarkList',JSON.stringify(sitesList));
    }
    else {
        msg.classList.remove('d-none');
    }
}
function display(){
    var bookmark = "";
    var Regx = /^https?:\/\//;
    for(var i = 0 ; i < sitesList.length ; i++){
        var userUrl = sitesList[i].url;
        if(Regx.test(userUrl) == false){
            userUrl = `https://${sitesList[i].url}`;
        }
        bookmark += `
        <tr>
        <td>${i+1}</td>
        <td>${sitesList[i].name}</td>
        <td><a target="_blank" href="${userUrl}" class="btn btn-visit"><i class="fa-solid fa-eye me-2"></i>view</a></td>
        <td><button onclick="del(${i})" class="btn bg-danger"><i class="fa-solid fa-trash-can me-2" style="color: #ffffff;"></i>Delete</button></td>
        </tr>`;
    }
    table.innerHTML = bookmark;
}
function del(index){
    sitesList.splice(index,1);
    localStorage.setItem('BookmarkList',JSON.stringify(sitesList));
    display();
}
function clearInput(){
    siteName.value="";
    siteUrl.value="";
}
function validationName(){
    var regexName = /^\w{3,}(\s+\w+)*$/;
    var sName = siteName.value;
    if(regexName.test(sName)){
        siteName.classList.remove('is-invalid')
        siteName.classList.add('is-valid');
        return true;
    }
    else {
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid');
        return false;
    }
}
function validationUrl(){
    var urlRegx = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    var sUrl = siteUrl.value;
    if(urlRegx.test(sUrl)){
        siteUrl.classList.remove('is-invalid')
        siteUrl.classList.add('is-valid');
        return true;
    }
    else {
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid');
        return false;
    }
}
function closealert(){
msg.classList.add('d-none');
}