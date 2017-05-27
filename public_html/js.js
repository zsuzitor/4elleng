


   function Add1() {
    
	if(temp_add_fr.value.indexOf('@')==-1)
	{
	send_one_friend("add"+"@3@"+temp_add_fr.value);
	}
	
	
   }
   function dell(obj) {
 
	
	dell_send_one_friend("delete"+"@3@"+obj.value.substring(7, obj.value.length));
	
	
	
   }
   
   
   function likeconnect(obj){
	   //trmp_knopkalike+i
	   var id=obj.id.substring(15,obj.id.length);
	   
	   var otkyda="";
	   if(location.href.indexOf("index.html")!=-1)
	   {
		   otkyda="index";
	   }
	   else{
		   otkyda="profil";
	   }
	   
	   
	   
	   var obj1="like@5@"+otkyda+"@5@"+id;
	   
	   
	   
	   var xhr = new XMLHttpRequest();

      xhr.open('GET', obj1, true);


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
			
			alert(xhr.responseText);
			if(xhr.responseText=="tr1ue")
			{
				//лайкнул увеличить
				
				var t=document.getElementById("like_count"+id);
				++t.value;
			}
			if(xhr.responseText=="fa1lse")
			{
				//дизлайкнул уменьшить
				var t=document.getElementById("like_count"+id);
				--t.value;
				
			}
			if(xhr.responseText=="")
			{
				alert("вы забанены или ошибка");
			}
			
		}
	  }
	   
	   
	   
	   
	   
	   
	   
	   
   }
   
   function del_zapis_ch_connect(obj){
	   //alert("1");
	   //block_content"+i
	   //trmp_knopkadel_zapis+i
	   var id=obj.id.substring(20,obj.id.length); 
	   var otkyda="";
	   if(location.href.indexOf("index.html")!=-1)
	   {
		   otkyda="index";
	   }
	   else{
		   otkyda="profil";
	   }
	   
	   var obj1="del@5@"+otkyda+"@5@"+id;
	   
	   
	   
	   var xhr = new XMLHttpRequest();

      xhr.open('GET', obj1, true);


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
			
			//alert(document.getElementById("block_content"+id).id);
	   //str11.removeChild(document.getElementById("block_content"+id));
	   document.getElementById("block_content"+id).remove();
			
		}
	  }
	   
	   
	   
	   
   }
   
   function otprservch1(){
	   var obj="get@5@"+text_for_ch_ch.value;
	   
	   
	   
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
				//придет инфа о новом челленже
				var arr=xhr.responseText.split('tr1ue');
				//0=экспа 1 новый текст челленжа
				var el=document.getElementById("opisanie_chellenga_1");
				el.innerHTML=arr[1];
				
				
			}
			if(xhr.responseText=="")
			{
				alert("вы забанены или ошибка");
			}
		}
	  }
	   
	   
	   
	   
   }
   
   function addphoto(){
	   
	   
	   
	   
   }
   
   
   
	  
  function AddFriend() {


	   var newDiv = document.createElement("div");
	   newDiv.id="temp_id_add_fr";
	   newDiv.class="block_content";
        newDiv.innerHTML = "<p class='parent'><input type='text' id='temp_add_fr'></p><p class='parent'><input type='button' id='trmp_knopkaadd' value='Добавить'  onclick='Add1()'></p>";

    // добавляем только что созданый элемент в дерево DOM
DR.insertBefore(newDiv, DR.children[0]);
   
   
   
   
    }

	
	
	
	
	
	
	function vote(ids) {
		
		
		switch(ids.id)
		{
			
			case 'gg1':
			loadcontent('@profil@','content');
			setLocation('profil.html');
			
			break;

			case 'gg2':
			loadcontent('@index@','content');
			setLocation('index.html');
			break;


			case 'gg3':
			loadcontent('@chelleng@','content');
			setLocation('chelleng.html');
			break;
			
			case 'gg5':
			loadcontent('@top@','content');
			setLocation('top.html');
			break;
			
			case 'gg4':
			exit();
			break;
			
			case 'addfriend':
			AddFriend();
			break;
			
			
			
			
			case 'follow_friend':
			loadcontent("profil/"+ids.value,"content");
			break;
			
			
			case 'red_pr_1':
			redaktor_profila();
			break;
			
		}
     
    }
	
	function setLocation(curLoc){
    try {
      history.pushState(null, null, curLoc);
      return;
    } catch(e) {}
    location.hash = '#' + curLoc;
}
	
	function redaktor_profila(){
		
		//if(kak=="1")
		//{
			
		
		if(!profil_info_str.disabled)// при переходе отрубать
		{
			profil_info_str.value="ИНФО:"+profil_info_str.value;
			//отправлять
			document.getElementById("files_photo_pr").style.visibility='hidden';
			profil_info_str.disabled=true;
			document.getElementById("com_str_user").style.visibility='hidden';
			//com_str_user.disabled=true;
				
				if(profil_info_str.value.indexOf("@")==-1)
				{
				
				var xhr = new XMLHttpRequest();
var obj="red_info@6@"+profil_info_str.value.substring(5,profil_info_str.value.length)+"@6@"+com_str_user.value;
      xhr.open('GET', obj, true);


      xhr.send();


      xhr.onreadystatechange = function() {
		  
        if (xhr.readyState != 4){
			//alert("ERROR 4");
			return;
		}
		

        if (xhr.status != 200) {
          
        } else {
			alert(xhr.responseText);
			var tt=xhr.responseText.split("@6@");
		if(tt[0]!='')
			profil_info_str.value="ИНФО:"+tt[0];
		else{
			alert("нет 10 лвл или ошибка или бан");
		}
          if(tt.length>1)
		  {
			  com_str_user.value+=tt[1];
			  
		  }
		  
        }

      }
				
				
				
		}
		}
		else
		//if(profil_info_str.disabled)
		{
			//все подрубить
			profil_info_str.value=profil_info_str.value.substring(5,profil_info_str.value.length);
			document.getElementById("files_photo_pr").style.visibility='visible';
			profil_info_str.disabled=false;
			document.getElementById("com_str_user").style.visibility='visible';
			//com_str_user.disabled=false;
			//$(".content1").html("new html");
			//alert("2");
			//style.display='none';
			//style.visibility='hidden'
			
		}
		//}
		
    //profil_info_str.disabled=!profil_info_str.disabled;
	
	
	
}
	
	
	
	function loadcontent(obj,sposob) {
  
 
  switch(sposob)
		{
  
  
  case 'content':
			
  
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
			
			//var e=xhr.responseText;
			//var e1=e.getElementById("content");
			//var res_txt=e1.textContent || e1.innerText;
			
          $(".content1").html(xhr.responseText);
		  //if(obj.indexOf("profil/")!=-1)
		  //{
			  //setLocation(obj.substring(obj.indexOf("profil/"),obj.length));
			  
		  //}
		  if(obj=="@chelleng@")
		  {
			  document.getElementById('files').addEventListener('change', handleFileSelect, false);
			  
		  }
		  if(obj=="@profil@")
		  {
			  document.getElementById("files_photo_pr").style.visibility='hidden';
			  document.getElementById("com_str_user").style.visibility='hidden';
		  }
        }

      }
	  
	  
			break;
			
			 case 'friends':
			 
			 
			 
			 
			 
			 
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
			
			//var e=xhr.responseText;
			//var e1=e.getElementById("content");
			//var res_txt=e1.textContent || e1.innerText;
			
			
           //return xhr.responseText;
		   $(".sprava_class").html(xhr.responseText);
        }

      }
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 break;

		}
    }
	
	
	
	function dell_send_one_friend(obj) {
  
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
			alert(xhr.responseText);
			if(xhr.responseText.indexOf("tr1ue")!=-1)
			{
				//удалить див
				loadcontent('id@4@friends','friends');
				
			}
		}
	  }
	}
	
	
	
	
	
	
  
function send_one_friend(obj) {
  
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
			alert(xhr.responseText);
			if(xhr.responseText.indexOf("tr1ue")!=-1)
			{
				//добавление успешно учетка есть
				
				
				loadcontent('id@4@friends','friends');


      //xhr.send();
				
				
				
			}
			else{
				if(xhr.responseText.indexOf("fa1lse")==-1)
				{
					
					//$(".NEW123").html(xhr.responseText);
				}
				
				
				
				//не успешно чет вывести
				
			}
			
			DR.removeChild(document.getElementById("temp_id_add_fr"));
        }

      }

      
    }
   
   
   
   $(document).ready(function() {

loadcontent('id@4@friends','friends');
if(location.href.indexOf("index.html")!=-1)
{
	loadcontent('@index@','content');
}
else{
	if(location.href.indexOf("profil.html")!=-1)
	{
		loadcontent('@profil@','content');
		
		
	}
	else{
		if(location.href.indexOf("chelleng.html")!=-1)
		{
			loadcontent('@chelleng@','content');
			
		}
		
		
	}
	
	
}




});
   
   
function exit(){
	
	var xhr = new XMLHttpRequest();

      xhr.open('GET', "-1@1@-1", true);


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
			
			if(xhr.responseText.indexOf("tr1ue")!=-1)
			{
				//разлогин успешно
				
				                          //http://localhost:8080/public_html/login1.html
				document.location.href = "http://localhost:8080/public_html/login1.html";
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
   
   function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
//files = this.files;
	
	
    // files is a FileList of File objects. List some properties.
    var output = [];
    /*for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
	*/
	
	var ta=document.getElementById('list321_img').src=files[0];
    //ta.innerHTML = '<ul>' + files[0] + '</ul>';
  }

  
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
