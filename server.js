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



//(login,mail,password1,id,place_in_top,exp,info,   friend,lenta_challenge,complete_challenge,not_complete_challenges_arr,not_complete_challenge,followed)
//var glavnii_user_test=new User('ADMIN','ADMIN@mail.com',"12345");//,0,0,0,"admin",
//glavnii_user_test.info="INFORMACIYA_admin";





//this.photo = function(){$.get('/regexp.png', function (data) {
 //return data;
	//});}
	//this.photo.src = 'regexp.png';
function User(login,mail,password1) {
  //конструктор
	this.id = ++GlobalID;
	this.rank =2;//0=админ 1=продви2=обыч3=бан трет 4=бан вт 5=бан перв
    this.login = login;
	this.mail = mail;
	this.place_in_top = top_users.length;
	this.exp = 0;
	this.photo="regexp.png";
	this.info="pusto"
	this.password = password1;
	
	
	this.friend=[];
	this.lenta_challenge=[];
	this.complete_challenge=[];
	this.not_complete_challenges_arr=[];
	this.not_complete_challenge=challenges[0];
	this.followed=[];
	//,id,place_in_top,exp,info
	
	
	

	
}

User.prototype.com_str = function(arr) {
	
	return "";
}


User.prototype.like = function(arr) {
		 switch(arr[1])
		{
			 case "profil":
			 var flag=0;
			 
			 for(var i=0;i<this.complete_challenge[arr[2]].liked.length;++i)
			 {
				 if(this.complete_challenge[arr[2]].liked[i]==this)
				 {
					 
					  
					  this.complete_challenge[arr[2]].liked.splice(i, 1);
					  ++flag;
					  global_flag_zahoda=false;
					 //res.end("fa1lse");
					 return "fa1lse";
					 break;
				 }
				 
			 }
			 if(flag==0)
			 {
			 this.complete_challenge[arr[2]].liked.push(this);
			 /*for(var i=0;i<common_users[global_index].lenta_challenge.length;++i)
			 {
				 if(common_users[global_index].lenta_challenge[i]==common_users[global_index].complete_challenge[arr[2]])
				 {
					 common_users[global_index].lenta_challenge[i].liked.push(common_users[global_index]);
					 res.end("tr1ue");
					 break;
				 }
				 
			 }*/
			 global_flag_zahoda=false;
			 //res.end("tr1ue");
			 return "tr1ue";
		 }
			 break;
			 
			 case "index":
			 var flag=0;
			 
			 
			 
			 for(var i=0;i<this.lenta_challenge[arr[2]].liked.length;++i)
			 {
				 if(this.lenta_challenge[arr[2]].liked[i]==this)
				 {
					 
					  
					  this.lenta_challenge[arr[2]].liked.splice(i, 1);
					  ++flag;
					  global_flag_zahoda=false;
					 //res.end("fa1lse");
					 return "fa1lse";
					 break;
				 }
				 
			 }
			 if(flag==0)
			 {
			 this.lenta_challenge[arr[2]].liked.push(this);
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
			 global_flag_zahoda=false;
			 //res.end("tr1ue");
			 return "tr1ue";
			 break;
		 
		 
	 }
	 
	 if(arr[1].indexOf("profil_")!=-1)
	 {
		 var t=arr[1].substring(arr[1].indexOf("profil_")+7,arr[1].length);//логин
		 console.log(t);
		 var index=0;
		 var flag=0;
		 //получить юзера у которого лайкнул
		 /*for(;index<common_users.length;++index)
		 {
			 if(common_users[index].login==t)
			 {
				 console.log(common_users[index]);
				 //нашли юзера у которого смотрим лайки
				 //for(var i=0;i<common_users[index].complete_challenge.length;++i)
					 for(var i=0;i<common_users[index].complete_challenge[arr[2]].liked.length;++i)
			 {
				 
				 if(common_users[index].complete_challenge[arr[2]].liked[i]==this)
				 {
					  console.log(common_users[index]);
					  
					  common_users[index].complete_challenge[arr[2]].liked.splice(i, 1);
					  ++flag;
					  global_flag_zahoda=false;
					 //res.end("fa1lse");
					 return "fa1lse";
					 break;
				 }
				 
			 }
				 
			 }
			 
			 
		 }*/
		 
		 
		 for(;common_users[index].login!=t;++index);
		 
		 
		 
		 
		 
		 for(var i=0;i<common_users[index].complete_challenge[arr[2]].liked.length;++i)
			 {
				 
				 if(common_users[index].complete_challenge[arr[2]].liked[i]==this)
				 {
					  //console.log(common_users[index]);
					  
					  common_users[index].complete_challenge[arr[2]].liked.splice(i, 1);
					  ++flag;
					  global_flag_zahoda=false;
					 //res.end("fa1lse");
					 return "fa1lse";
					 break;
				 }
				 
			 }
		 
		 
		 
		 
		 
		 
		 //лайкнуть
		 
		 
		 
		 if(flag==0)
			 {
				 console.log(common_users[index].login);
				 console.log(common_users[index]);
			 common_users[index].complete_challenge[arr[2]].liked.push(this);
			 }
		 
		 
		 global_flag_zahoda=false;
		 return "tr1ue";
	 }
	 
	 
		 
		 global_flag_zahoda=false;
		 return "error";
		 //res.end("error");

  }

  User.prototype.delete_ch = function(arr) {
			
		 switch(arr[1])
		 {
			 case "profil":
			 for(var i=0, i1=0;i<this.lenta_challenge.length&&i1==0;++i)
			 {
				 if(this.lenta_challenge[i]==this.complete_challenge[arr[2]])
				 {
					 this.lenta_challenge.splice(i, 1)
					 
					 i1=1;
				 }
				 
			 }
			 for(var b=0;b<this.followed.length;++b)
			 {
				 for(var i=0,i1=0;i<this.followed[b].lenta_challenge.length&&i1==0;++i)
			 {
				 if(this.followed[b].lenta_challenge[i]==this.complete_challenge[arr[2]])
				 {
					 this.followed[b].lenta_challenge.splice(i, 1)
					 
					 i1=1;
				 }
				 
			 }
			 }
			 this.complete_challenge.splice(arr[2], 1);
			 
			 break;
			 
			 
			 case "index":
			 
			 var i1=0;
			 for(var i=0;i<this.complete_challenge.length&&i1==0;++i)
			 {
				 if(this.lenta_challenge[arr[2]]==this.complete_challenge[i])
				 {
					 this.complete_challenge.splice(i, 1)
					 i1=1;
				 }
				 
			 }
			 if(i1==1)
			 {
				 i1=0;
			 for(var b=0;b<this.followed.length;++b)
			 {
				 for(var i=0,i1=0;i<this.followed[b].lenta_challenge.length&&i1==0;++i)
			 {
				 if(this.followed[b].lenta_challenge[i]==this.lenta_challenge[arr[2]])
				 {
					 this.followed[b].lenta_challenge.splice(i, 1)
					 i1=1;
				 }
				 
			 }
				 
				 
			 }
		 }
			 this.lenta_challenge.splice(arr[2], 1);
			 
			 
			 break;
			 
		 }
		 global_flag_zahoda=false;
return "tr1ue";
		

	}



User.prototype.add_new_fr = function(url1) {
		
		
		//добавление друга
			  var arr= url1.substring(13, url1.length);
			   arr = arr.split('@3@');
			 for(var i=0;i<common_users.length;++i)
			 {
				 if(common_users[i].login==arr[1]){
					 this.friend.push(common_users[i]);
					 //var alphaNumeric = alpha.concat(numeric);
						common_users[i].followed.push(this);
					 this.lenta_challenge=this.lenta_challenge.concat(common_users[i].complete_challenge);
					 console.log("tr1ue");
					 global_flag_zahoda=false;
					 return "tr1ue";
				 }
			 }
			 global_flag_zahoda=false;
			 return "fa1lse";
			 //res.end("fa1lse");
	}


User.prototype.dell_fr = function(url1) {
		
		
		
		
		 global_flag_zahoda=false;
				 //удаление друга
				 var arr= url1.substring(13, url1.length);
			   arr = arr.split('@3@');
			 for(var i=0;i<this.friend.length;++i)
			 {
				 if(this.friend[i].login==arr[1]){
					 for(var i1=0;i1<this.friend[i].followed.length;++i1)
					 {
						 if(this==this.friend[i].followed[i1])
						 {
							 this.friend[i].followed.splice(i1, 1);
							 
						}
						 
					 }
					 
					 this.friend.splice(i, 1);
					 

					 
					 console.log("tr1ue");
					 
					 return "tr1ue";
				 }
			 }
			 
		
		
		return "fa1lse";
	}



User.prototype.add_ch = function(arr) {
		//сдесь проверять что что то отправлено
							 var ch22=new challenge(arr[1],null,"regexp.png")
				 this.complete_challenge.push(ch22);
				 this.lenta_challenge.push(ch22);
				 
				 for(var i=0;i<this.followed.length;++i)
				 {
					 this.followed[i].lenta_challenge.push(ch22);
					 
				 }
				 this.exp+=1;
				 //Math.floor(Math.random() * (challenges.length - 0)) + 0
				 var a=challenges[Math.floor(Math.random() * (challenges.length - 0)) + 0];
				 var res1=this.exp+"tr1ue"+a.opisanie;
				 this.not_complete_challenge=a;
				 global_flag_zahoda=false;
				 return res1;	
	}



User.prototype.redactirov_pr = function(arr) {
		return "";
	}



function User_prodv(login,mail,password1,id,place_in_top,exp,info,friend,lenta_challenge,complete_challenge,not_complete_challenges_arr,not_complete_challenge,followed,str_ph) {
	this.id = id;
	this.rank =1;//0=админ 1=продви2=обыч3=бан трет 4=бан вт 5=бан перв
    this.login = login;
	this.mail = mail;
	this.place_in_top = place_in_top;
	this.exp = exp;
	this.info=info;
	this.photo="regexp.png";
	this.password = password1;
	this.photo=str_ph;
	
	//slice()
	this.friend=friend.slice();
	this.lenta_challenge=lenta_challenge.slice();
	this.complete_challenge=complete_challenge.slice();
	this.not_complete_challenges_arr=not_complete_challenges_arr.slice();
	this.not_complete_challenge=not_complete_challenge;
	this.followed=followed.slice();
	

}

User_prodv.prototype = Object.create(User.prototype);
User_prodv.prototype.constructor = User_prodv;

User_prodv.prototype.redactirov_pr =function(arr) {
		var res="";
		
		 switch(arr[0])
		{
			case 'red_info':
		global_flag_zahoda=false;
		if(arr[1].indexOf("@")==-1)
				{
					this.info=arr[1];
					
					res=this.info;
				}
		
		
		break;
		
		
		}
		return res;
	}

	
	
function User_Admin(login,mail,password1,id,place_in_top,exp,info,friend,lenta_challenge,complete_challenge,not_complete_challenges_arr,not_complete_challenge,followed,str_ph) {
	this.id = id;
	this.rank =0;//0=админ 1=продви2=обыч3=бан трет 4=бан вт 5=бан перв
    this.login = login;
	this.mail = mail;
	this.place_in_top = place_in_top;
	this.exp = exp;
	this.info=info;
	this.password = password1;
	this.photo=str_ph;
	
	//slice()
	this.friend=friend.slice();
	this.lenta_challenge=lenta_challenge.slice();
	this.complete_challenge=complete_challenge.slice();
	this.not_complete_challenges_arr=not_complete_challenges_arr.slice();
	this.not_complete_challenge=not_complete_challenge;
	this.followed=followed.slice();
	

}
	User_Admin.prototype = Object.create(User_prodv.prototype);
User_Admin.prototype.constructor = User_Admin;

User_Admin.prototype.com_str =function(arr) {
	console.log("test"+arr);
	var hh=arr.split("@");
	
	switch(hh[0])
	{
		case "-ban1":
		var tek;
		for(var i=0;i<common_users.length;++i)
		{
			if(common_users[i].login==hh[1])
			{
				tek=common_users[i];
				var a=new User_banned_lvl_1(tek.login,tek.mail,tek.password,tek.id,tek.rank,tek.place_in_top,tek.exp,tek.info,tek.friend,tek.lenta_challenge,tek.complete_challenge,tek.not_complete_challenges_arr,tek.not_complete_challenge,tek.followed)
			
		common_users[i]=a;
		console.log("ban="+common_users[i].login+common_users[i].rank);
		return "true";
			}
			
		}
		
		break;
		case "-ban2":
		
		var tek;
		for(var i=0;i<common_users.length;++i)
		{
			if(common_users[i].login==hh[1])
			{
				tek=common_users[i];
				var a=new User_banned_lvl_2(tek.login,tek.mail,tek.password,tek.id,tek.rank,tek.place_in_top,tek.exp,tek.info,tek.friend,tek.lenta_challenge,tek.complete_challenge,tek.not_complete_challenges_arr,tek.not_complete_challenge,tek.followed)
			
		common_users[i]=a;
		console.log("ban="+common_users[i].login+common_users[i].rank);
		return "true";
			}
			
		}
		
		
		break;
		case "-ban3":
		var tek;
		for(var i=0;i<common_users.length;++i)
		{
			if(common_users[i].login==hh[1])
			{
				tek=common_users[i];
				var a=new User_banned_lvl_3(tek.login,tek.mail,tek.password,tek.id,tek.rank,tek.place_in_top,tek.exp,tek.info,tek.friend,tek.lenta_challenge,tek.complete_challenge,tek.not_complete_challenges_arr,tek.not_complete_challenge,tek.followed)
			
		common_users[i]=a;
		console.log("ban="+common_users[i].login+common_users[i].rank);
		return "true";
			}
			
		}
		
		break;
		
		case "-up":
		var tek;
		for(var i=0;i<common_users.length;++i)
		{
			if(common_users[i].login==hh[1])
			{
				tek=common_users[i];
				var a=new User_prodv(tek.login,tek.mail,tek.password,tek.id,tek.place_in_top,tek.exp,tek.info,tek.friend,tek.lenta_challenge,tek.complete_challenge,tek.not_complete_challenges_arr,tek.not_complete_challenge,tek.followed)
			
		common_users[i]=a;
		return "true";
			}
			
		}
					
						
		break;
		
		
	}
	
	return "false";
}
	
	
	
	
	
function User_banned_lvl_3(login,mail,password1,id,bivsh_rank,place_in_top,exp,info,friend,lenta_challenge,complete_challenge,not_complete_challenges_arr,not_complete_challenge,followed,str_ph) {	
	//конструктор
	this.id = id;
	this.rank =3;//0=админ 1=продви2=обыч3=бан трет 4=бан вт 5=бан перв
	this.bivsh_rank=bivsh_rank;
    this.login = login;
	this.mail = mail;
	this.place_in_top = place_in_top;
	this.exp = exp;
	this.info=info;
	this.password = password1;
	this.photo=str_ph;
	
	//slice()
	this.friend=friend.slice();
	this.lenta_challenge=lenta_challenge.slice();
	this.complete_challenge=complete_challenge.slice();
	this.not_complete_challenges_arr=not_complete_challenges_arr.slice();
	this.not_complete_challenge=not_complete_challenge;
	this.followed=followed.slice();
	
}
	User_banned_lvl_3.prototype = Object.create(User.prototype);
User_banned_lvl_3.prototype.constructor = User_banned_lvl_3;

	//запрет комментов
	
	
	
	
	
function User_banned_lvl_2(login,mail,password1,id,bivsh_rank,place_in_top,exp,info,friend,lenta_challenge,complete_challenge,not_complete_challenges_arr,not_complete_challenge,followed,str_ph) {	
	//конструктор
	this.id = id;
	this.rank =4;//0=админ 1=продви2=обыч3=бан трет 4=бан вт 5=бан перв
	this.bivsh_rank=bivsh_rank;
    this.login = login;
	this.mail = mail;
	this.place_in_top = place_in_top;
	this.exp = exp;
	this.info=info;
	this.password = password1;
	this.photo=str_ph;
	
	//slice()
	this.friend=friend.slice();
	this.lenta_challenge=lenta_challenge.slice();
	this.complete_challenge=complete_challenge.slice();
	this.not_complete_challenges_arr=not_complete_challenges_arr.slice();
	this.not_complete_challenge=not_complete_challenge;
	this.followed=followed.slice();
	
	
	
}
User_banned_lvl_2.prototype = Object.create(User_banned_lvl_3.prototype);
User_banned_lvl_2.prototype.constructor = User_banned_lvl_2;


User_banned_lvl_2.prototype.like = function(arr) {
		
		return "";
	}
	
	
	
	
	
	
	
	
	
	
function User_banned_lvl_1(login,mail,password1,id,bivsh_rank,place_in_top,exp,info,friend,lenta_challenge,complete_challenge,not_complete_challenges_arr,not_complete_challenge,followed,str_ph) {	
	//конструктор
	this.id = id;
	this.rank =5;//0=админ 1=продви2=обыч3=бан трет 4=бан вт 5=бан перв
	this.bivsh_rank=bivsh_rank;
    this.login = login;
	this.mail = mail;
	this.place_in_top = place_in_top;
	this.exp = exp;
	this.info=info;
	this.password = password1;
	this.photo=str_ph;
	
	//slice()
	this.friend=friend.slice();
	this.lenta_challenge=lenta_challenge.slice();
	this.complete_challenge=complete_challenge.slice();
	this.not_complete_challenges_arr=not_complete_challenges_arr.slice();
	this.not_complete_challenge=not_complete_challenge;
	this.followed=followed.slice();
}

User_banned_lvl_1.prototype = Object.create(User_banned_lvl_2.prototype);
User_banned_lvl_1.prototype.constructor = User_banned_lvl_1;

User_banned_lvl_1.prototype.add_ch = function(arr) {


return "";
}




	
	
function challenge(opisanie,image1,image1) {
	this.opisanie = opisanie;
    this.now = new Date();
	this.liked=[];
	this.photo=image1;
}


//var tt1=183+i;
	//return 

//для тестов заполнение
for(var i=0;i<50;++i)
{
	var tt1=183+i;
	challenges.push(new challenge('testovoe_opisanie'+i,function(){
	//var photo1 = new Image ();
	///bd/image/Фото №183.jpg
	
	},'bd/image/photo'+tt1+'.jpg'));
	
}

var hfhfh=[];
var glavnii_user_test1=new User_Admin('ADMIN','ADMIN@mail.com',"12345",0,0,0,"admin",hfhfh,hfhfh,hfhfh,hfhfh,challenges[0],hfhfh,"admin.jpg");

common_users.push(glavnii_user_test1);
top_users.push(glavnii_user_test1);


var ne_glavnii_user_test=new User('ne_ADMIN','ne_ADMIN@mail.com',"123");//('ADMIN','ADMIN@mail.com')
ne_glavnii_user_test.info="ne_INFORMACIYA";
ne_glavnii_user_test.complete_challenge.push(challenges[0]);
ne_glavnii_user_test.photo="bd/image/photo264.jpg";
ne_glavnii_user_test.lenta_challenge.push(challenges[0]);

common_users.push(ne_glavnii_user_test);
top_users.push(ne_glavnii_user_test);

var ne1_glavnii_user_test=new User('ne1_ADMIN','ne_ADMIN@mail.com',"123");//('ADMIN','ADMIN@mail.com')
ne1_glavnii_user_test.info="ne_INFORMACIYA";
ne1_glavnii_user_test.complete_challenge.push(challenges[0]);
ne1_glavnii_user_test.photo="bd/image/photo256.jpg";
ne1_glavnii_user_test.lenta_challenge.push(challenges[0]);

common_users.push(ne1_glavnii_user_test);
top_users.push(ne1_glavnii_user_test);













function accept(req, res) {
console.log(req.url);

		 
		 
		 //с точкой если загрузка страницы и отправка целиком
		 if (req.url.indexOf('.')!=-1){
			 if(req.url=="/public_html/favicon.ico")
			 {
				 file.serve("/public_html/1024413.jpg", res);
	console.log("_serve_");
			 }
			 if(req.url.indexOf('&')==-1)
			 {
    file.serve(req, res);
	console.log("_serve_");
			 }
			 else{
				 console.log("_-_");
				 console.log(req.url);
				 var t=req.url.substring(0,req.url.indexOf('&'));
				 file.serve("/public_html/profil.html", res);
				 //file.serve(req, res);
	console.log(t);
	console.log("/public_html/profil.html");
	 console.log("_-_");
				 
			 }
	 }
	 else{
		 global_flag_zahoda=true;
		 
		 if(req.url=="/public_html/[object%20File]"&&global_flag_zahoda)
		 {
			 console.log(req.name);
			 global_flag_zahoda=false;
		 }
		
		 if(req.url.indexOf("@1@")!=-1&&global_flag_zahoda)
		 {
			 
			 
			 if(req.url.indexOf("-1@1@-1")!=-1)
			 {
				 global_index=-1;
				 global_flag_zahoda=false;
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
					 global_flag_zahoda=false;
					 res.end("tr1ue!"+common_users[i].id);
				 }
				 
				 
			 }
			 global_flag_zahoda=false;
			 console.log("fa1lse");
				 res.end("fa1lse");
			 }
			 
		 }
		 
		 if(req.url.indexOf("@2@")!=-1&&global_flag_zahoda)
				 
		 {
			 
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
					 global_flag_zahoda=false;
					 res.end("fa1lse");
				 }
			 }
			 
			 
			 accept_new_user(arr[0],arr[1],arr[2]);//log mail pass
			 console.log("tr1ue!"+common_users[common_users.length-1].id);
			 global_index=common_users.length-1;
			 global_flag_zahoda=false;
			 res.end("tr1ue!"+common_users[common_users.length-1].id);
			 
		 }
		 
		 if(global_index!=-1&&global_flag_zahoda)
			 {
		 
		 if(req.url.indexOf("@3@")!=-1&&global_flag_zahoda)
		 {
			 if(req.url.indexOf("add@3@")!=-1)
			 {
				 res.end(common_users[global_index].add_new_fr(req.url));
			 
			 }
			 if(req.url.indexOf("delete@3@")!=-1){
				
				res.end(common_users[global_index].dell_fr(req.url));
				
			 //res.end("fa1lse");
				 
			 }
			 
		 }
		 
		 if(req.url.indexOf("@4@")!=-1&&global_flag_zahoda)
		 {
			 
			 //отрисовка всех друзей
			 console.log("test_frs2");//friends
			 var arr= req.url.substring(13, req.url.length);
			   arr = arr.split('@4@');
			   var res1="<h3>Друзья</h3><p><input type='button' value='добавить' id='addfriend'  onclick='vote(this)'></p><ol id='DR'>";
			   
			   
			   
			    for(var i=0;i<common_users[global_index].friend.length;++i)
			 {//<input type='button' value='glavnii_user_test.friend[i].login' id='follow_friend'  onclick='vote(this)'>
				 //res1+="<li><div id='block_friend_log"+common_users[global_index].friend[i].login+"' class='block_content'><img src='regexp.png' width='50' height='50'><p><input type='button' style='width:100x;height:40px' value='"+common_users[global_index].friend[i].login+"' id='follow_friend_sprava'  onclick='vote(this)'></p><p><input type='button' style='width:50x;height:40px'  id='trmp_knopkadel"+common_users[global_index].friend[i].login+"' class='ydalit_sprava_dr_1' value='удалить'  onclick='dell(this)'></p></div></li>";
			 
			 res1+="<li><div id='block_friend_log"+common_users[global_index].friend[i].login+"' class='block_content'><img src='"+common_users[global_index].friend[i].photo+"' width='50' height='50'><p><input type='button' style='width:100x;height:40px' value='"+common_users[global_index].friend[i].login+"' id='follow_friend_sprava'  onclick='vote(this)'></p><p><input type='button' style='width:50x;height:40px'  id='trmp_knopkadel"+common_users[global_index].friend[i].login+"' class='ydalit_sprava_dr_1' value='удалить'  onclick='dell(this)'></p></div></li>";
			 
			 }
			 res1+="</ol></div>";
			 console.log("test_frs3");
			 global_flag_zahoda=false;
			   res.end(res1);
			   
			
		 }
		 
		 if(req.url.indexOf("@5@")!=-1&&global_flag_zahoda)
			 {
				 
				 var arr= req.url.substring(13, req.url.length);
							 arr = arr.split('@5@');
				 //запрос на челленж
				 if(req.url.indexOf("get@5@")!=-1&&global_flag_zahoda)
				 {
					 
					 if(common_users[global_index].exp>=10&&common_users[global_index].rank==2)
					 {
						 var tek=common_users[global_index];
						 //var a=new User_prodv(common_users[global_index].login,common_users[global_index].mail,common_users[global_index].password);
						 //User_prodv(login,mail,password1,id,place_in_top,exp,info,friend,lenta_challenge,complete_challenge,not_complete_challenges_arr,not_complete_challenge,followed);
						 
						console.log("-------------");
						
						var a=new User_prodv(tek.login,tek.mail,tek.password,tek.id,tek.place_in_top,tek.exp,tek.info,tek.friend,tek.lenta_challenge,tek.complete_challenge,tek.not_complete_challenges_arr,tek.not_complete_challenge,tek.followed,tek.photo)
						console.log("-------------");
						//return a;
						
						
						common_users[global_index]=a;
	
						
						 
					 }
					 
					 //var thth=common_users[global_index];
					 //console.log(thth);
					 
					 res.end(common_users[global_index].add_ch(arr));	
				 		//res.end(thth.add_ch(arr));	 

				 }
				 
				 if(req.url.indexOf("del@5@")!=-1&&global_flag_zahoda)
					 {
						 global_flag_zahoda=false;
						 
						common_users[global_index].delete_ch(arr);
						 res.end("");
						 
					 }
					 
					 
					 
					 if(req.url.indexOf("like@5@")!=-1&&global_flag_zahoda)
						 {
							//arr = arr.split('@5@'); 
							 res.end(common_users[global_index].like(arr));
						
						 }
					 
			 }
			 
			 
			 if(req.url.indexOf("@6@")!=-1&&global_flag_zahoda)
			 {
				 console.log(common_users[global_index].rank);
				 console.log(common_users[global_index].login);
				 //редактор профиля информацию
				 
				 var arr= req.url.substring(13, req.url.length);
							 arr = arr.split('@6@');
							 var tyt_res="";
				 //if(common_users[global_index].exp>=10)//проверка не обязательна
				 //{
					 
					 
					 
				  tyt_res=common_users[global_index].redactirov_pr(arr);
				 
				 
				 
				 
				 tyt_res+="@6@"+common_users[global_index].com_str(arr[2]);
				 
				 
				 
				 
				 
			 
				 
				 res.end(tyt_res);
				 
			 }
		 
		 if(global_flag_zahoda)
		 {
			 switch(req.url)
		{
			case '/public_html/@profil@':
			
			var txt=send_profil(common_users[global_index].login);
			global_flag_zahoda=false;
			res.end(txt);
			 //res.write();
			 
			break;
			
			case '/public_html/@vihod@':
			
			var txt=send_vihod();
			global_flag_zahoda=false;
			res.end(txt);
			 //res.write();
			 
			break;

			case '/public_html/@index@':
			
			var txt=send_index();
			global_flag_zahoda=false;
			res.end(txt);
			
			break;


			case '/public_html/@chelleng@':
			
			var txt=send_chelleng();
			global_flag_zahoda=false;
			res.end(txt);
			break;
			
			
			case '/public_html/@top@':
			
			var txt=send_top();
			global_flag_zahoda=false;
			res.end(txt);
			
			break;
			
		}
		if(req.url.indexOf("/@profil@/")!=-1&&global_flag_zahoda)
		 {
			
			 console.log("отправка чужого профиля");
			 console.log(req.url.substring(req.url.indexOf("/@profil@/")+10,req.url.length));
			 global_flag_zahoda=false;
			 res.end(send_profil(req.url.substring(req.url.indexOf("/@profil@/")+10,req.url.length)));
			 
		 } 
		 }
			 }
	 }
}
		 
		 
		 
		 

function accept_new_user(login,mail,pass)
{
	var a=new User(login,mail,pass);
	common_users.push(a);
	top_users.push(a);
}

function send_vihod(){
	
	
	return "<h3 id='id_for_header_exit_gaba'>УВЕРЕН???</h3><p><img src=44d580b26c8f.gif width='300' height='300' id='id_for_image_exit_gaba'></p><input type='button' id='go_ex' value='да'  onclick='exit()'><input type='button' id='not_ex' value='нет'  onclick='go_profil()'>";
}
function send_index()
{
	var res="<h2>Лента</h2><ol class='str11' id='str'>";
	
	for(var i=common_users[global_index].lenta_challenge.length-1;i>=0;i--)
	{//photo
		res+="<li><div class='block_content' id='block_content"+i+"'><p>"+common_users[global_index].lenta_challenge[i].opisanie+"</p><img src='"+common_users[global_index].lenta_challenge[i].photo+"' width='500' height='500'><input type='button' id='trmp_knopkalike"+i+"' class='like_del_knopka' value='лайк'  onclick='likeconnect(this)'><input  type='text' size='10' id='like_count"+i+"' value='"+common_users[global_index].lenta_challenge[i].liked.length+"'disabled><input type='button' id='trmp_knopkadel_zapis"+i+"' class='like_del_knopka' value='удалить'  onclick='del_zapis_ch_connect(this)'></div></li>";
		  //res+='<li><div class="block_content" id="block_content'+i+'"><p>'+glavnii_user_test.lenta_challenge[i].opisanie+'</p><img src="regexp.png" width="500" height="500"><input type="button" id="trmp_knopkalike'+i+'" value="лайк"  onclick="likeconnect(this)"><input size="40" id="like_count'+i+'" value="'+glavnii_user_test.lenta_challenge[i].liked.length+'"disabled><input type="button" id="trmp_knopkadel_zapis'+i+'" value="удалить"  onclick="del_zapis_ch_connect(this,"profil")"></div></li>';
	
	}
	res+="</ol>";
	 return res;
}

function send_chelleng()
{
	var res="<h2>текущий челенж</h2><p id='opisanie_chellenga_1'>"+common_users[global_index].not_complete_challenge.opisanie+"</p> <img id='list321_img' src = 'regexp.png'/><p><input type='text' id='text_for_ch_ch'><input type='file' id='files' name='files[]'  /></p><p><input type='button' value='отправить' id='addch1'  onclick='otprservch1()'></p>";
   return res;
}

function send_top()
{
	
	top_users.sort(function(a, b) {
  if(a.exp>b.exp) return 1;
  else return -1;
  
});
	
	var res="<h2>Топ</h2><ol class='str11' id='str'>";
	
	for(var i=top_users.length-1;i>=0;i--)
	{
		
		res+="<li><div class='block_content' id='block_content"+i+"'><p><input type='button' id='follow_friend' value='"+top_users[i].login+"'  onclick='vote(this)'></p><p>ЭКСПА="+top_users[i].exp+"</p><img src='"+top_users[i].photo+"' width='500' height='500'></div></li>";
		 
	}
	res+="</ol>";
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

	var res="<h2>профиль</h2>";//<div>
	var t65="";
	if(login==common_users[global_index].login)
	{
		res+="<h2><input type='button' id='red_pr_1' class='sub2' value='редактировать'  onclick='vote(this)'></h2>";
		if(common_users[global_index].rank==0)
		t65="<input  size='40' id='com_str_user' value='komandnaya stroka'>";
	}
	
	
	//res+="";
	//res+="<p>"+prof.login+"</p><p>ЭКСПА="+prof.exp+"</p><p>ID="+prof.id+"</p><p><input  size='40' id='profil_info_str' value='ИНФО:"+prof.info+" 'disabled>"+t65+"</p><img src=regexp.png width='150' height='200'></div><div><ol class='str11' id='str'>";
	
	res+="<div class='layer1'><img src='"+prof.photo+"' width='300' height='450'><input type='file' id='files_photo_pr'/></div><div class='layer2'><p>"+prof.login+"</p><p>ЭКСПА="+prof.exp+"</p><p>ID="+prof.id+"</p><p><input  size='40' id='profil_info_str' value='ИНФО:"+prof.info+" 'disabled></p><p>"+t65+"</p>";
	
	//if(common_users[global_index].rank==0&&(login==common_users[global_index].login))
	//{
		//t65="<input  size='40' id='com_str_user' value='komandnaya stroka'>";
	//}
	
	res+="</div><div class='layer3'></div><ol class ='str11' id='str'>";//<div class='to_4to_nige_pro_ch'>
	
	// index   res+="<li><div class='block_content' id='block_content"+i+"'><p>"+common_users[global_index].lenta_challenge[i].opisanie+"</p><img src='regexp.png' width='500' height='500'><input type='button' id='trmp_knopkalike"+i+"' class='like_del_knopka' value='лайк'  onclick='likeconnect(this)'><input  type='text' size='10' id='like_count"+i+"' value='"+common_users[global_index].lenta_challenge[i].liked.length+"'disabled><input type='button' id='trmp_knopkadel_zapis"+i+"' class='like_del_knopka' value='удалить'  onclick='del_zapis_ch_connect(this)'></div></li>";
		
	
	
	
	
	
	//res+="<p>ЭКСПА="+prof.exp+"</p><p><input  size='40' id='profil_info_str' value='ИНФО:"+prof.info+" 'disabled>"+t65+"</p></div><div><ol class='str11' id='str'>";
	//res+="<p>"+prof.login+"</p><p>ID="+prof.id+"</p><img src=regexp.png width='150' height='200'>";
	for(var i=prof.complete_challenge.length-1;i>=0;i--)
	{
		//res+="<div><li><div class='block_content' id='block_content"+i+"'><p>"+prof.complete_challenge[i].opisanie+"</p><img src='regexp.png' width='500' height='500'><input type='button' id='trmp_knopkalike"+i+"' value='лайк'  onclick='likeconnect(this)'><input size='40' id='like_count"+i+"' value='"+prof.complete_challenge[i].liked.length+"'disabled>";
		res+="<li><div class='block_content' id='block_content"+i+"'><p>"+prof.complete_challenge[i].opisanie+"</p><img src='"+prof.complete_challenge[i].photo+"' width='500' height='500'><input type='button' id='trmp_knopkalike"+i+"' value='лайк' class='like_del_knopka'  onclick='likeconnect(this)'><input type='text' size='10' id='like_count"+i+"' value='"+prof.complete_challenge[i].liked.length+"'disabled>";
		
		
		if(login==common_users[global_index].login)
	res+="<input type='button' id='trmp_knopkadel_zapis"+i+"' class='like_del_knopka' value='удалить'  onclick='del_zapis_ch_connect(this)'>";
		
		res+="</div></li>";
		
	}
	res+="</ol>";//
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
		 
		 
	 