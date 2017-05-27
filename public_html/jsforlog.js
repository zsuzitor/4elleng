
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
  var temp1=document.getElementById("email22");//логин
 var temp2=document.getElementById("email21");//майл
  var temp3=document.getElementById("email23");//пароль
  
 
  //if(/([a-z]|[A-Z]|\-){1,20}/.test(temp1)&&/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*/.test(temp3)&&/[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/.test(temp2))
 
  if(temp1.value.indexOf('@')==-1&&temp3.value.indexOf('@')==-1)
  {
send_server(temp1.value+"@2@"+temp2.value+"@2@"+temp3.value);
//alert(temp1.value+"@2@"+temp2.value+"@2@"+temp3.value);
  }
 
 }

	function log1(){
 //отправлять запрос о регистрации на серв
 var temp1=document.getElementById("email1");//логин
 var temp2=document.getElementById("email12");//пароль

if(temp1.value.indexOf('@')==-1&&temp2.value.indexOf('@')==-1)
  {
 //alert(temp1.value+"@1@"+temp2.value);
send_server(temp1.value+"@1@"+temp2.value);
 //все прошло
 //document.location.href =index.html;
  }
  
 }
	
	
	
	function send_server(obj) {
  
      var xhr = new XMLHttpRequest();

      xhr.open('GET', obj, true);


      xhr.send();


      xhr.onreadystatechange = function() {
		  
        if (xhr.readyState != 4){
			//alert("ERROR 4");
			return;
		}
		

        if (xhr.status != 200) {
          // обработать ошибку
          //alert(xhr.status + ': ' + xhr.statusText);
        } else {
			//alert(xhr.responseText);
			if(xhr.responseText.indexOf("tr1ue")!=-1)
			{
				//регитсрация/логин успешно
				var ID=xhr.responseText.indexOf("!");
				ID=xhr.responseText.substring(ID, xhr.responseText.length);
				send_server("profil.html");
				document.location.href = "http://localhost:8080/public_html/index.html";
				//xhr.open('GET', "profil.html", true);


      //xhr.send();
				
				
				
			}
			else{
				if(xhr.responseText.indexOf("fa1lse")==-1)
				{
					
					//$(".NEW123").html(xhr.responseText);
				}
				
				
				
				//не успешно чет вывести
				
			}
        }

      }

      
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
      //alert(xhr.status + ': ' + xhr.statusText);
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
	
	
	
	
	
	
   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
