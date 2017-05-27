var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});
var common_users = [];
var top_users = [];
var admin_users = [];
var banned_users = [];
var challenges = [];
var GlobalID=0;
var global_index=-1;
var global_flag_zahoda=true;

//для тестов заполнение
challenges.push(new challenge('testovoe_opisanie',function(){
	var photo1 = new Image ();
	photo1.src = 'regexp.png';
	}));

var glavnii_user_test=new User('ADMIN','ADMIN@mail.com',"123");//('ADMIN','ADMIN@mail.com')
glavnii_user_test.info="INFORMACIYA";
glavnii_user_test.complete_challenge.push(challenges[0]);

glavnii_user_test.lenta_challenge.push(challenges[0]);

common_users.push(glavnii_user_test);



var ne_glavnii_user_test=new User('ne_ADMIN','ne_ADMIN@mail.com',"123");//('ADMIN','ADMIN@mail.com')
ne_glavnii_user_test.info="ne_INFORMACIYA";
ne_glavnii_user_test.complete_challenge.push(challenges[0]);

ne_glavnii_user_test.lenta_challenge.push(challenges[0]);

common_users.push(ne_glavnii_user_test);

var ne1_glavnii_user_test=new User('ne1_ADMIN','ne_ADMIN@mail.com',"123");//('ADMIN','ADMIN@mail.com')
ne1_glavnii_user_test.info="ne_INFORMACIYA";
ne1_glavnii_user_test.complete_challenge.push(challenges[0]);

ne1_glavnii_user_test.lenta_challenge.push(challenges[0]);

common_users.push(ne1_glavnii_user_test);

//
function User(login,mail,password1) {
  //конструктор
	this.id = ++GlobalID;
    this.login = login;
	this.mail = mail;
	this.place_in_top = top_users.length;
	this.exp = 0;
	//this.photo = new Image ();
	//this.photo.src = 'regexp.png';
	this.info="pusto"
	this.password = password1;
	
	
	this.friend=[];
	this.lenta_challenge=[];
	this.complete_challenge=[];
	this.not_complete_challenge=[];
	this.followed=[];
}


function challenge(opisanie,image1) {
	this.opisanie = opisanie;
    this.now = new Date();
	this.liked=[];
	//this.photo=image1;
}

















function accept(req, res) {
console.log(req.url);

		 
		 
		 //с точкой если загрузка страницы и отправка целиком
		 if (req.url.indexOf('.')!=-1){
			 if(req.url=="/public_html/favicon.ico")
			 {
				 file.serve("/public_html/1024413.jpg", res);
	console.log("_serve_");
			 }
    file.serve(req, res);
	console.log("_serve_");
	 }
	 else{
		 global_flag_zahoda=true;
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 if(req.url.indexOf("@1@")!=-1)
		 {
			 
			 global_flag_zahoda=false;
			 if(req.url.indexOf("-1@1@-1")!=-1)
			 {
				 global_index=-1;
				 res.end("tr1ue");
			 }
			 else{
			 //запрос на логин
			 //substring(start, end)
			 var arr= req.url.substring(13, req.url.length);
			 
			  arr = arr.split('@1@');
			 //for(var i1=0;i1<arr.length;i1++)
			 //{
				// console.log(arr[i1]+"__");
			 //}
			 for(var i=0;i<common_users.length;++i)
			 {
				 if(common_users[i].login==arr[0]&&common_users[i].password==arr[1]){
					 console.log("tr1ue!"+common_users[i].id);
					 global_index=i;
					 res.end("tr1ue!"+common_users[i].id);
				 }
				 
				 
			 }
			 console.log("fa1lse");
				 res.end("fa1lse");
			 }
			 
		 }
		 else
		 {
			 
			 if(req.url.indexOf("@2@")!=-1)
				 
		 {
			 global_flag_zahoda=false;
			 //запрос на регистрацию
			 var arr= req.url.substring(13, req.url.length);
			   arr = arr.split('@2@');
			   //for(var i1=0;i1<arr.length;i1++)
			 //{
				 //console.log(arr[i1]+"__");
			 //}
			 
			 for(var i=0;i<common_users.length;++i)
			 {
				 if(common_users[i].login==arr[0]&&common_users[i].mail==arr[1]){
					 console.log("fa1lse");
					 res.end("fa1lse");
				 }
			 }
			 
			 
			 accept_new_user(arr[0],arr[1],arr[2]);//log mail pass
			 console.log("tr1ue!"+common_users[common_users.length-1].id);
			 global_index=common_users.length-1;
			 res.end("tr1ue!"+common_users[common_users.length-1].id);
			 
		 }
		 
		 else{
			 if(global_index!=-1)
			 {
			 if(req.url.indexOf("@3@")!=-1)
		 {
			 if(req.url.indexOf("add@3@")!=-1)
			 {
				 global_flag_zahoda=false;
			 //добавление друга
			  var arr= req.url.substring(13, req.url.length);
			   arr = arr.split('@3@');
			 for(var i=0;i<common_users.length;++i)
			 {
				 if(common_users[i].login==arr[1]){
					 common_users[global_index].friend.push(common_users[i]);
					 //var alphaNumeric = alpha.concat(numeric);
common_users[i].followed.push(common_users[global_index]);
					 common_users[global_index].lenta_challenge=common_users[global_index].lenta_challenge.concat(common_users[i].complete_challenge);
					 console.log("tr1ue");
					 res.end("tr1ue");
				 }
			 }
			 res.end("fa1lse");
			 
			 }
			 else{
				 //удаление друга
				 var arr= req.url.substring(13, req.url.length);
			   arr = arr.split('@3@');
			 for(var i=0;i<common_users[global_index].friend.length;++i)
			 {
				 if(common_users[global_index].friend[i].login==arr[1]){
					 common_users[global_index].friend.splice(i, 1);
					 

					 
					 console.log("tr1ue");
					 res.end("tr1ue");
				 }
			 }
			 res.end("fa1lse");
				 
			 }
			 
		 }
		 else{
			 console.log("test_frs1");
			 if(req.url.indexOf("@4@")!=-1)
		 {
			 global_flag_zahoda=false;
			 //отрисовка всех друзей
			 console.log("test_frs2");//friends
			 var arr= req.url.substring(13, req.url.length);
			   arr = arr.split('@4@');
			   var res1="<h3>Друзья</h3><p><input type='button' value='добавить' id='addfriend'  onclick='vote(this)'></p><ol id='DR'>";
			   
			   
			   
			    for(var i=0;i<common_users[global_index].friend.length;++i)
			 {//<input type='button' value='glavnii_user_test.friend[i].login' id='follow_friend'  onclick='vote(this)'>
				 res1+="<li><div id='block_friend_log"+common_users[global_index].friend[i].login+"' class='block_content'><img src='regexp.png' width='30' height='30'><p><input type='button' value='"+common_users[global_index].friend[i].login+"' id='follow_friend'  onclick='vote(this)'></p></p><p><input type='button' id='trmp_knopkadel"+common_users[global_index].friend[i].login+"' value='удалить"+common_users[global_index].friend[i].login+"'  onclick='dell(this)'></p></div></li>";
			 }
			 res1+="</ol></div>";
			 console.log("test_frs3");
			   res.end(res1);
			   
			
		 }
		 
		 
		 else{
			 //запросы на страницы именно с дозагрузкой'
			 //arr.splice(1, 1);
			 if(req.url.indexOf("@5@")!=-1)
			 {
				 
				 var arr= req.url.substring(13, req.url.length);
							 arr = arr.split('@5@');
				 //запрос на челленж
				 if(req.url.indexOf("get@5@")!=-1)
				 {
					 global_flag_zahoda=false;
				 			 //сдесь проверять что что то отправлено
							 var ch22=new challenge(arr[1],null)
				 common_users[global_index].complete_challenge.push(ch22);
				 common_users[global_index].lenta_challenge.push(ch22);
				 
				 for(var i=0;i<common_users[global_index].followed.length;++i)
				 {
					 common_users[global_index].followed[i].lenta_challenge.push(ch22);
					 
				 }
				 common_users[global_index].exp+=1;
				 
				 
				 //Math.floor(Math.random() * (challenges.length - 0)) + 0
				 
				 
				 var res1=common_users[global_index].exp+"tr1ue"+challenges[Math.floor(Math.random() * (challenges.length - 0)) + 0].opisanie;
				 
				 
				 res.end(res1);
				 
				 }
				 else{
					 if(req.url.indexOf("del@5@")!=-1)
					 {
						 global_flag_zahoda=false;
						 
						 
						 //!!!!!!!!!!! проверить свой челленж или чужой
						 
						 
						 
						 
						 
						 
						 
						 
						 
						 
						 switch(arr[1])
						 {
							 case "profil":
							 for(var i=0, i1=0;i<common_users[global_index].lenta_challenge.length&&i1==0;++i)
							 {
								 if(common_users[global_index].lenta_challenge[i]==common_users[global_index].complete_challenge[arr[2]])
								 {
									 common_users[global_index].lenta_challenge.splice(i, 1)
									 i1=1;
								 }
								 
							 }
							 for(var b=0;b<common_users[global_index].followed.length;++b)
							 {
								 for(var i=0,i1=0;i<common_users[global_index].followed[b].lenta_challenge.length&&i1==0;++i)
							 {
								 if(common_users[global_index].followed[b].lenta_challenge[i]==common_users[global_index].complete_challenge[arr[2]])
								 {
									 common_users[global_index].followed[b].lenta_challenge.splice(i, 1)
									 i1=1;
								 }
								 
							 }
								 
								 
							 }
							 
							 common_users[global_index].complete_challenge.splice(arr[2], 1);
							 
							 break;
							 
							 
							 case "index":
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 var i1=0;
							 for(var i=0;i<common_users[global_index].complete_challenge.length&&i1==0;++i)
							 {
								 if(common_users[global_index].lenta_challenge[arr[2]]==common_users[global_index].complete_challenge[i])
								 {
									 common_users[global_index].complete_challenge.splice(i, 1)
									 i1=1;
								 }
								 
							 }
							 if(i1==1)
							 {
								 i1=0;
							 for(var b=0;b<common_users[global_index].followed.length;++b)
							 {
								 for(var i=0,i1=0;i<common_users[global_index].followed[b].lenta_challenge.length&&i1==0;++i)
							 {
								 if(common_users[global_index].followed[b].lenta_challenge[i]==common_users[global_index].lenta_challenge[arr[2]])
								 {
									 common_users[global_index].followed[b].lenta_challenge.splice(i, 1)
									 i1=1;
								 }
								 
							 }
								 
								 
							 }
						 }
							 common_users[global_index].lenta_challenge.splice(arr[2], 1);
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 
							 break;
							 
						 }
						 res.end("");
						 
					 }
					 else{
						 if(req.url.indexOf("like@5@")!=-1)
						 {
							//arr = arr.split('@5@'); 
							 global_flag_zahoda=false;
							 
							 switch(arr[1])
						 {
							 case "profil":
							 var flag=0;
							 
							 for(var i=0;i<common_users[global_index].complete_challenge[arr[2]].liked.length;++i)
							 {
								 if(common_users[global_index].complete_challenge[arr[2]].liked[i]==common_users[global_index])
								 {
									 
									  
									  common_users[global_index].complete_challenge[arr[2]].liked.splice(i, 1);
									  ++flag;
									 res.end("fa1lse");
									 break;
								 }
								 
							 }
							 if(flag==0)
							 {
							 common_users[global_index].complete_challenge[arr[2]].liked.push(common_users[global_index]);
							 /*for(var i=0;i<common_users[global_index].lenta_challenge.length;++i)
							 {
								 if(common_users[global_index].lenta_challenge[i]==common_users[global_index].complete_challenge[arr[2]])
								 {
									 common_users[global_index].lenta_challenge[i].liked.push(common_users[global_index]);
									 res.end("tr1ue");
									 break;
								 }
								 
							 }*/
							 res.end("tr1ue");
						 }
							 break;
							 
							 case "index":
							 var flag=0;
							 
							 
							 
							 for(var i=0;i<common_users[global_index].lenta_challenge[arr[2]].liked.length;++i)
							 {
								 if(common_users[global_index].lenta_challenge[arr[2]].liked[i]==common_users[global_index])
								 {
									 
									  
									  common_users[global_index].lenta_challenge[arr[2]].liked.splice(i, 1);
									  ++flag;
									 res.end("fa1lse");
									 break;
								 }
								 
							 }
							 if(flag==0)
							 {
							 common_users[global_index].lenta_challenge[arr[2]].liked.push(common_users[global_index]);
							 /*for(var i=0;i<common_users[global_index].complete_challenge.length;++i)
							 {
								 if(common_users[global_index].complete_challenge[i]==common_users[global_index].lenta_challenge[arr[2]])
								 {
									 common_users[global_index].complete_challenge[i].liked.push(common_users[global_index]);
									 res.end("tr1ue");
									 break;
								 }
								 
							 }*/
							 }
							 
							 res.end("tr1ue");
							 break;
							 
							 
						 }
							 
							 
							 
							 
							 
							 
							 
							 
							 res.end("error");
						 }
						 
					 }
				 }
				 
			 }
			 else{
 
		 switch(req.url)
		{
			case '/public_html/profil':
			global_flag_zahoda=false;
			var txt=send_profil(common_users[global_index].login)
			res.end(txt);
			 //res.write();
			 
			break;

			case '/public_html/index':
			global_flag_zahoda=false;
			var txt=send_index()
			res.end(txt);
			
			break;


			case '/public_html/chelleng':
			global_flag_zahoda=false;
			var txt=send_chelleng()
			res.end(txt);
			
			
			
			
			break;
			
			
			
		}
		if(req.url.indexOf("/profil/")!=-1)
		 {
			 global_flag_zahoda=false;
			 console.log("отправка чужого профиля");
			 console.log(req.url.substring(req.url.indexOf("/profil/")+8,req.url.length));
			 res.end(send_profil(req.url.substring(req.url.indexOf("/profil/")+8,req.url.length)));
			 
		 }
		
		
		 }
		 }
		 }
		 }
		 
			 
		 
		 }
		 }
		 
	 }

}


function accept_new_user(login,mail,pass)
{
	common_users.push(new User(login,mail,pass));
	
	
	
}


    //'<li><div class="block_content" id="block_content'+i+'"><p>'+glavnii_user_test.lenta_challenge[i].opisanie+'</p><img src="regexp.png" width="500" height="500"><input type="button" id="trmp_knopkalike'+i+'" value="лайк"  onclick="likeconnect(this)"><input size="40" id="like_count'+i+'" value="'+glavnii_user_test.lenta_challenge[i].liked.length+'"disabled><input type="button" id="trmp_knopkadel_zapis'+i+'" value="удалить"  onclick="del_zapis_ch_connect(this,"profil")"></div></li>';


function send_index()
{
	var res="<h2>Лента</h2><ol class='str11' id='str'>";
	
	for(var i=common_users[global_index].lenta_challenge.length-1;i>=0;i--)
	{
		res+="<li><div class='block_content' id='block_content"+i+"'><p>"+common_users[global_index].lenta_challenge[i].opisanie+"</p><img src='regexp.png' width='500' height='500'><input type='button' id='trmp_knopkalike"+i+"' value='лайк'  onclick='likeconnect(this)'><input size='40' id='like_count"+i+"' value='"+common_users[global_index].lenta_challenge[i].liked.length+"'disabled><input type='button' id='trmp_knopkadel_zapis"+i+"' value='удалить'  onclick='del_zapis_ch_connect(this)'></div></li>";
		  //res+='<li><div class="block_content" id="block_content'+i+'"><p>'+glavnii_user_test.lenta_challenge[i].opisanie+'</p><img src="regexp.png" width="500" height="500"><input type="button" id="trmp_knopkalike'+i+'" value="лайк"  onclick="likeconnect(this)"><input size="40" id="like_count'+i+'" value="'+glavnii_user_test.lenta_challenge[i].liked.length+'"disabled><input type="button" id="trmp_knopkadel_zapis'+i+'" value="удалить"  onclick="del_zapis_ch_connect(this,"profil")"></div></li>';
	
	}
	res+="</ol>";
	 return res;
}

function send_chelleng()
{
	var res="<h2>текущий челенж</h2><p id='opisanie_chellenga_1'>"+challenges[0].opisanie+"</p> <img id='list321_img' src = 'regexp.png'/><p><input type='text' id='text_for_ch_ch'><input type='file' id='files' name='files[]' multiple /></p><p><input type='button' value='отправить' id='addch1'  onclick='otprservch1()'></p>"

   

   
   return res;
}



function send_profil(login)
{
	var prof;
	for(var i=0;i<common_users.length;++i)
			 {
				 if(common_users[i].login==login){
					 prof=common_users[i];
					 
				 }
			 }
	
	
	
	
	var res="<h2>профиль</h2><div>";
	
	if(login==common_users[global_index].login)
	{
		res+="<h2><input type='button' id='red_pr_1' class='sub2' value='редактировать'  onclick='vote(this)'></h2>";
		
	}
	res+="<p>"+prof.login+"</p><p>ЭКСПА="+prof.exp+"</p><p>ID="+prof.id+"</p><p>ИНФО:"+prof.info+"</p><img src=regexp.png width='150' height='200'></div><div><ol class='str11' id='str'>";
	for(var i=prof.complete_challenge.length-1;i>=0;i--)
	{
		res+="<li><div class='block_content' id='block_content"+i+"'><p>"+prof.complete_challenge[i].opisanie+"</p><img src='regexp.png' width='500' height='500'><input type='button' id='trmp_knopkalike"+i+"' value='лайк'  onclick='likeconnect(this)'><input size='40' id='like_count"+i+"' value='"+prof.complete_challenge[i].liked.length+"'disabled><input type='button' id='trmp_knopkadel_zapis"+i+"' value='удалить'  onclick='del_zapis_ch_connect(this)'></div></li>";
		
	}
	res+="</ol></div>";
	return res;
	
	//var res="<h2>testtest</h2><p>1test1</p>";
	//console.log(res);
	return res;
	
	
}


// ------ запустить сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}




















//мусор





