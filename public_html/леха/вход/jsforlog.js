
  function viewdiv1(){
  var el=document.getElementById("LG");
el.style.display="none";


var el=document.getElementById("RG");
if(el.style.display=="none"){


el.style.display="block";
}

}


 function viewdiv2(){
  var el=document.getElementById("RG");
if(el.style.display=="block"){
el.style.display="none";
}

var el=document.getElementById("LG");
if(el.style.display=="none"){


el.style.display="block";
}


}

 function reg1(){
 //отправлять запрос о регистрации на серв
 
 }

	function log1(){
 //отправлять запрос о регистрации на серв
 
 
 //все прошло
 //document.location.href =index.html;
 }
	
	
	
	
	
	
	
	
	
	
	
	
function getFromServer(id) {
  if (id === undefined) return;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `/getsample?id=${id}`, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;    
    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(JSON.parse(xhr.responseText));
      sampleOnLoad(JSON.parse(xhr.responseText));//функция выполнения какая то
    }
  }  
}

function sendToServer(body) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST','/setsample',true);
  xhr.setRequestHeader('content-type','application/json; charset=utf-8');
  
  xhr.send(body);
  console.log("post");
}
	
	
	
	
	
	
   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
