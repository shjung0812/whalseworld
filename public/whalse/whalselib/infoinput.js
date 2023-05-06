Element.prototype.remove=function(){
	this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function(){
	for(var i=this.length -1; i>=0; i--){
		if(this[i]&& this[i].parentElement){
			this[i].parentElement.removeChild(this[i]);
		}
	}
}

var qprbsocket = io('/whalse');

qprbsocket.on('connect',()=>{
	console.log('connection ready');

});

qprbsocket.on('errcontentafter',function(a){
	console.log(a);
	var errpicdiv=document.getElementById(a.a.pc+'errpicdiv');
	while(errpicdiv.firstChild){
		errpicdiv.firstChild.remove();
	}
	var errpicdivimg=document.createElement('img');
	errpicdivimg.src='/whalse/whalseerrorphoto/'+a.a.content;
	errpicdiv.appendChild(errpicdivimg);
});



function uploadZusPic(bodyname,pinfo){
	removeallele(bodyname);
	var uploaddiv=document.createElement('div');
	uploaddiv.id='erroruploaddiv';
	uploaddiv.style.width=100+'%';
	uploaddiv.style.height=100+'%';
	uploaddiv.style.backgroundColor='#eeeeee';

	var bodydiv=document.getElementById(bodyname);

	var formdiv=document.createElement('div');
	var formel=document.createElement('form');
	var form=document.createElement('input');
	formel.setAttribute('enctype','multipart/form-data');
	formel.setAttribute('method','post');
	var formfile=document.createElement('input');
	formfile.id='formfile';
	formfile.onchange=function(){loadImage(event);};
	formfile.setAttribute('type','file');
	formfile.setAttribute('multiple','multiple');

	var sendbutton=document.createElement('button');
	sendbutton.innerHTML='send';
	sendbutton.onclick=function(i){return function(){errsendFile(i)}}(pinfo);


	var retrievebutton=document.createElement('button');
	retrievebutton.innerHTML='BACK'
	retrievebutton.onclick=function(){return function(){
		errpiccon=0;
		document.getElementById('errbodydiv').remove();

	}}();


	var photodiv=document.createElement('div');
	photodiv.style.width=100+'%';
	photodiv.style.height=100*0.617+'%';


	bodydiv.appendChild(photodiv);

	formel.appendChild(formfile);
	formdiv.appendChild(formel);
	formdiv.appendChild(sendbutton);
	formdiv.appendChild(retrievebutton);

	//uploaddiv.appendChild(formdiv);	
	bodydiv.appendChild(formdiv);

	function loadImage(e){
		for(var ia=0; ia<e.target.files.length; ia++){
			var photoimg=document.createElement('img');
			photoimg.style.width=100+'%';
			photoimg.style.height=100+'%';
			photoimg.src='';
			photoimg.src=URL.createObjectURL(e.target.files[ia]);
			
			photodiv.appendChild(photoimg);

		}
	}


}




function afterErrorUpload(pid,fname){

	//callWritingInDiv('bodydiv');
	document.getElementById('errbodydiv').remove();
	piccon=0;
	function wsend(){
		qprbsocket.emit('errcontent',{pclistnumid:pid[1],pc:pid[0],content:fname,mode:'errorpic'});
	}

	setTimeout(wsend,2000);

	
}



function errsendFile(pid){
	var formel=document.getElementById('formfile');
	var formData=new FormData();
	var formfile=formel.files[0];
	var ext=formfile.name.split('.')[formfile.name.split('.').length-1];
	//formData.append('Numid'+pid[0]+'scode'+pid[1],formfile);
	var fname='pclistnumid'+pid[1]+'pc'+pid[0]+'errorphoto'+'_'+Date.now();
	formData.append(fname,formfile);
	formData.append('pc',pid[0]);
	formData.append('pclistnumid',pid[1]);
	formData.append('fname',fname);
	var xhr = new XMLHttpRequest();
	xhr.open('post','/whalseerrorphotoupload',true);
	xhr.send(formData);

	xhr.addEventListener('load',afterErrorUpload(pid,fname+'.'+ext));
	/*
	xhr.addEventListener('readystatechange',function(e){
		if(this.readyState===4){
			afterUpload(pid,fname+'.'+ext);
		}
	});*/
}



function erruploadFile(bodyname,pinfo){
	removeallele(bodyname);
	var uploaddiv=document.createElement('div');
	uploaddiv.id='erroruploaddiv';
	uploaddiv.style.width=100+'%';
	uploaddiv.style.height=100+'%';
	uploaddiv.style.backgroundColor='#eeeeee';

	var bodydiv=document.getElementById(bodyname);

	var formdiv=document.createElement('div');
	var formel=document.createElement('form');
	var form=document.createElement('input');
	formel.setAttribute('enctype','multipart/form-data');
	formel.setAttribute('method','post');
	var formfile=document.createElement('input');
	formfile.id='formfile';
	formfile.onchange=function(){loadImage(event);};
	formfile.setAttribute('type','file');

	var sendbutton=document.createElement('button');
	sendbutton.innerHTML='send';
	sendbutton.onclick=function(i){return function(){errsendFile(i)}}(pinfo);


	var retrievebutton=document.createElement('button');
	retrievebutton.innerHTML='BACK'
	retrievebutton.onclick=function(){return function(){
		errpiccon=0;
		document.getElementById('errbodydiv').remove();

	}}();


	var photodiv=document.createElement('div');
	photodiv.style.width=100+'%';
	photodiv.style.height=100*0.617+'%';
	var photoimg=document.createElement('img');
	photoimg.style.width=100+'%';
	photoimg.style.height=100+'%';
	
	photodiv.appendChild(photoimg);
	uploaddiv.appendChild(photodiv);

	formel.appendChild(formfile);
	formdiv.appendChild(formel);
	formdiv.appendChild(sendbutton);
	formdiv.appendChild(retrievebutton);

	uploaddiv.appendChild(formdiv);	
	bodydiv.appendChild(uploaddiv);

	function loadImage(e){
		photoimg.src='';
		photoimg.src=URL.createObjectURL(e.target.files[e.target.files.length-1]);
	}


}



var errpiccon=0;
function errPicContainer(divwidth,divposx,divposy,pc,pclistnumid){
	if(errpiccon==0){
		var bodydiv=document.createElement('div');
		bodydiv.id='errbodydiv';
		
		const gratio=1;
		//const gratio=0.618;
		const bodywidth=divwidth;
		bodydiv.style.width=bodywidth + '%';
		bodydiv.style.height=bodywidth+'%';
		bodydiv.style.backgroundColor='red';
		bodydiv.style.position='fixed';
		bodydiv.style.top=divposx+'%';
		bodydiv.style.left=divposy+'%';

		document.getElementsByTagName('body')[0].appendChild(bodydiv);



		errpiccon=1;
		//preViewprb('','bodydiv');
		erruploadFile('errbodydiv',[pc,pclistnumid]);	

	}else if(errpiccon==1){
		errpiccon=0;
		document.getElementById('errbodydiv').remove();
	}

		
}




function tempAlert(msg,duration){
	var el = document.createElement("div");
	el.setAttribute("style","position:absolute;top:10%;left:35%;background-color:#eeeeee;padding:5% 10%;z-index:6;");
	el.innerHTML = msg;
	setTimeout(function(){
		el.parentNode.removeChild(el);
	},duration);
	document.body.appendChild(el);
}

var laststat=0;



var editfunc=0;
function editFunc(pinfo,divwidth,divposx,divposy){
	if(editfunc==0){
		var editbodydiv=document.createElement('div');
		editbodydiv.id='editbodydiv';
		
		//const gratio=0.618;
		const gratio=1;
		const editbodywidth=divwidth;
		editbodydiv.style.width=editbodywidth + '%';
		editbodydiv.style.height=editbodywidth+'%';
		editbodydiv.style.backgroundColor='red';
		editbodydiv.style.position='fixed';
		editbodydiv.style.top=divposx+'%';
		editbodydiv.style.left=divposy+'%';

		document.getElementsByTagName('body')[0].appendChild(editbodydiv);
			
	
		var textareadiv = document.createElement('div');
		textareadiv.id='textareadiv';
		textareadiv.style.width=100+'%';
		textareadiv.style.height=90+'%';

		var textareael=document.createElement('textarea');
		textareael.id='textareael';
		textareael.value=pinfo[3];
		textareael.style.width=100+'%';
		textareael.style.height=100+'%';
		textareael.style.padding=5+'%';
		textareael.style.fontSize='2vw';
		textareadiv.appendChild(textareael);



		//sendbuttondiv.onclick=function(i,j){return function(){sendPrb(i,j,0);}}(pinfo,textareacontents);
		var optionbox=document.createElement('div');
		optionbox.style.width=100+'%';
		optionbox.style.height=10+'%';
		optionbox.style.backgroundColor='blue';

		var selectoption0=document.createElement('div');
		selectoption0.style.width=50+'%';
		selectoption0.style.height=100+'%';
		selectoption0.style.backgroundColor='red';
		selectoption0.style.display='inline-block';
		selectoption0.onclick=function(i){return function(){sendPrb(i,textareael.value,0);}}(pinfo)

		var selectoption1=document.createElement('div');
		selectoption1.style.width=50+'%';
		selectoption1.style.height=100+'%';
		selectoption1.style.backgroundColor='green';
		//selectoption1.innerHTML='BACK';
		selectoption1.style.display='inline-block';
		selectoption1.onclick=function(){
			return function(){
				editfunc=0;
				document.getElementById('editbodydiv').remove();

			}
		}();

		optionbox.appendChild(selectoption0);
		optionbox.appendChild(selectoption1);
	

		editbodydiv.appendChild(textareadiv);
		editbodydiv.appendChild(optionbox);
		editfunc=1;


	}else if(editfunc==1){
		editfunc=0;
		document.getElementById('editbodydiv').remove();
	}
}


function callWritingInDiv(bdv){
	removeallele(bdv);
	var bodydiv=document.getElementById(bdv);

	var textareadiv = document.createElement('div');
	textareadiv.id='textareadiv';
	textareadiv.style.width=100+'%';
	textareadiv.style.height=90+'%';

	var textareael=document.createElement('textarea');
	textareael.id='textareael';
	textareael.style.width=100+'%';
	textareael.style.height=100+'%';
	textareael.style.padding=5+'%';
	textareael.style.fontSize='2vw';
	textareael.innerHTML=currprb;
	textareadiv.appendChild(textareael);
	bodydiv.appendChild(textareadiv);

	document.onkeydown = function(e){
		if(e.shiftKey && e.which==115 && !e.ctrlKey){
			e.preventDefault();
			preViewprb('','bodydiv');
		}else if(e.ctrlKey && e.which==32 && !e.shiftKey){
			var el=document.getElementById('textareael');
			//insertAtCursor(el,'\\(\\)',2);
			insertAtCursor(el,'\\(\\displaystyle \\)',2);
		}else if(e.ctrlKey && e.shiftKey && e.which!=32){
			var el=document.getElementById('textareael');
			insertAtCursor(el,'\\[\\displaystyle \\]',2);
			//insertAtCursor(el,'\\[\\]',2);
		}else if(e.shiftKey && e.which==54){
			var el=document.getElementById('textareael');
			e.preventDefault();
			insertAtCursor(el,'^{}',1);
		}else if(e.shiftKey && e.which==113){
			var el=document.getElementById('textareael');
			e.preventDefault();
			insertAtCursor(el,'<br>',0);
		}else if(e.shiftKey && e.which==112){
			var el=document.getElementById('textareael');
			e.preventDefault();
			insertAtCursor(el,'\\frac{}{}',3);

		}


	}



}


var numcon=0;
function NumContainer(divwidth,divposx,divposy,numid,scode){
	var bodyid='nbodydiv'
	if(numcon==0){
		var bodydiv=document.createElement('div');
		bodydiv.id=bodyid


		var arrnumlist=[1,2,3,4,5,6,7,8,9,10]
		
		const gratio=1;
		//const gratio=0.618;
		const bodywidth=divwidth;
		bodydiv.style.width=bodywidth + '%';
		bodydiv.style.height=bodywidth+'%';
		bodydiv.style.backgroundColor='red';
		bodydiv.style.position='fixed';
		bodydiv.style.top=divposx+'%';
		bodydiv.style.left=divposy+'%';

		document.getElementsByTagName('body')[0].appendChild(bodydiv);

		var textareadiv = document.createElement('div');
		textareadiv.id='textareadiv';
		textareadiv.style.width=100+'%';
		textareadiv.style.height=90+'%';


		/*
		var textareael=document.createElement('textarea');
		textareael.id='textareael';
		textareael.style.width=100+'%';
		textareael.style.height=100+'%';
		textareael.style.padding=5+'%';
		textareael.style.fontSize='2vw';
		textareadiv.appendChild(textareael);
		textareael.value='.';*/

		for(var ia=0; ia<arrnumlist.length; ia++){
			var fdiv=document.createElement('div');
			fdiv.style.width=100/(arrnumlist.length+1)+'%';
			fdiv.innerHTML=arrnumlist[ia];
			fdiv.className='arrnumdiv'
			fdiv.onclick=function(i){
				return function(){
					qprbsocket.emit('statusedit',{numid:numid,scode:scode,option:'arrivalnum',prbtext:i});
					numcon=0;
					document.getElementById(bodyid).remove();

				}
			}(arrnumlist[ia]);
			fdiv.style.display='inline-block'
			textareadiv.appendChild(fdiv);
		}


		var backdiv=document.createElement('div');
		backdiv.innerHTML='BACK';
		backdiv.onclick=function(){
			return function(){
				numcon=0;
				document.getElementById(bodyid).remove();
	
			}
		}();
		textareadiv.appendChild(backdiv);


		bodydiv.appendChild(textareadiv);

		numcon=1;
		//preViewprb('','bodydiv');
	}else if(numcon==1){
		numcon=0;
		document.getElementById(bodyid).remove();
	}

		
}





var piccon=0;
function PicContainer(divwidth,divposx,divposy,numid,scode){
	if(piccon==0){
		var bodydiv=document.createElement('div');
		bodydiv.id='bodydiv';
		
		const gratio=1;
		//const gratio=0.618;
		const bodywidth=divwidth;
		bodydiv.style.width=bodywidth + '%';
		bodydiv.style.height=bodywidth+'%';
		bodydiv.style.backgroundColor='red';
		bodydiv.style.position='fixed';
		bodydiv.style.top=divposx+'%';
		bodydiv.style.left=divposy+'%';

		document.getElementsByTagName('body')[0].appendChild(bodydiv);


		/*
		var textareadiv = document.createElement('div');
		textareadiv.id='textareadiv';
		textareadiv.style.width=100+'%';
		textareadiv.style.height=90+'%';

		var textareael=document.createElement('textarea');
		textareael.id='textareael';
		textareael.style.width=100+'%';
		textareael.style.height=100+'%';
		textareael.style.padding=5+'%';
		textareael.style.fontSize='2vw';
		textareadiv.appendChild(textareael);
		textareael.value='.';
		bodydiv.appendChild(textareadiv);*/

		piccon=1;
		//preViewprb('','bodydiv');
		uploadFile('bodydiv',[numid,scode]);	

	}else if(piccon==1){
		piccon=0;
		document.getElementById('bodydiv').remove();
	}

		
}

var currprb;
function uploadFile(bodyname,pinfo){
	removeallele(bodyname);
	var uploaddiv=document.createElement('div');
	uploaddiv.id='uploaddiv';
	uploaddiv.style.width=100+'%';
	uploaddiv.style.height=100+'%';
	uploaddiv.style.backgroundColor='#eeeeee';

	var bodydiv=document.getElementById(bodyname);

	var formdiv=document.createElement('div');
	var formel=document.createElement('form');
	var form=document.createElement('input');
	formel.setAttribute('enctype','multipart/form-data');
	formel.setAttribute('method','post');
	var formfile=document.createElement('input');
	formfile.id='formfile';
	formfile.onchange=function(){loadImage(event);};
	formfile.setAttribute('type','file');

	var sendbutton=document.createElement('button');
	sendbutton.innerHTML='send';
	sendbutton.onclick=function(i){return function(){sendFile(i)}}(pinfo);


	var retrievebutton=document.createElement('button');
	retrievebutton.innerHTML='BACK'
	retrievebutton.onclick=function(){return function(){
		piccon=0;
		document.getElementById('bodydiv').remove();

	}}();


	var photodiv=document.createElement('div');
	photodiv.style.width=100+'%';
	photodiv.style.height=100*0.617+'%';
	var photoimg=document.createElement('img');
	photoimg.style.width=100+'%';
	photoimg.style.height=100+'%';
	
	photodiv.appendChild(photoimg);
	uploaddiv.appendChild(photodiv);

	formel.appendChild(formfile);
	formdiv.appendChild(formel);
	formdiv.appendChild(sendbutton);
	formdiv.appendChild(retrievebutton);

	uploaddiv.appendChild(formdiv);	
	bodydiv.appendChild(uploaddiv);

	function loadImage(e){
		photoimg.src='';
		photoimg.src=URL.createObjectURL(e.target.files[e.target.files.length-1]);
	}


}
function afterUpload(pid,fname){

	//callWritingInDiv('bodydiv');
	document.getElementById('bodydiv').remove();
	piccon=0;
	function wsend(){
		qprbsocket.emit('statusedit',{numid:pid[0],scode:pid[1],option:'pic',prbtext:fname});
	}

	setTimeout(wsend,2000);

	
}
function sendFile(pid){
	var formel=document.getElementById('formfile');
	var formData=new FormData();
	var formfile=formel.files[0];
	var ext=formfile.name.split('.')[formfile.name.split('.').length-1];
	//formData.append('Numid'+pid[0]+'scode'+pid[1],formfile);
	var fname='Numid'+pid[0]+'scode'+pid[1]+'photo'+'_'+Date.now();
	formData.append(fname,formfile);
	formData.append('numid',pid[0]);
	formData.append('scode',pid[1]);
	formData.append('fname',fname);
	var xhr = new XMLHttpRequest();
	xhr.open('post','/whalsephotoupload',true);
	xhr.send(formData);

	xhr.addEventListener('load',afterUpload(pid,fname+'.'+ext));
	/*
	xhr.addEventListener('readystatechange',function(e){
		if(this.readyState===4){
			afterUpload(pid,fname+'.'+ext);
		}
	});*/
}






var inifunc=0;
function iniFunc(divwidth,divposx,divposy){
	if(inifunc==0){
		var bodydiv=document.createElement('div');
		bodydiv.id='bodydiv';
		
		const gratio=1;
		//const gratio=0.618;
		const bodywidth=divwidth;
		bodydiv.style.width=bodywidth + '%';
		bodydiv.style.height=bodywidth+'%';
		bodydiv.style.backgroundColor='red';
		bodydiv.style.position='fixed';
		bodydiv.style.top=divposx+'%';
		bodydiv.style.left=divposy+'%';

		document.getElementsByTagName('body')[0].appendChild(bodydiv);

		var textareadiv = document.createElement('div');
		textareadiv.id='textareadiv';
		textareadiv.style.width=100+'%';
		textareadiv.style.height=90+'%';

		var textareael=document.createElement('textarea');
		textareael.id='textareael';
		textareael.style.width=100+'%';
		textareael.style.height=100+'%';
		textareael.style.padding=5+'%';
		textareael.style.fontSize='2vw';
		textareadiv.appendChild(textareael);
		bodydiv.appendChild(textareadiv);

		inifunc=1;
		document.onkeydown = function(e){
			if(e.shiftKey && e.which==115 && !e.ctrlKey){
				e.preventDefault();
				preViewprb('','bodydiv');
			}else if(e.ctrlKey && e.which==32 && !e.shiftKey){
				var el=document.getElementById('textareael');
				//insertAtCursor(el,'\\(\\)',2);
				insertAtCursor(el,'\\(\\displaystyle \\)',2);
			}else if(e.ctrlKey && e.shiftKey && e.which!=32){
				var el=document.getElementById('textareael');
				insertAtCursor(el,'\\[\\displaystyle \\]',2);
				//insertAtCursor(el,'\\[\\]',2);
			}else if(e.shiftKey && e.which==54){
				var el=document.getElementById('textareael');
				e.preventDefault();
				insertAtCursor(el,'^{}',1);
			}else if(e.shiftKey && e.which==113){
				var el=document.getElementById('textareael');
				e.preventDefault();
				insertAtCursor(el,'<br>',0);
			}else if(e.shiftKey && e.which==112){
				var el=document.getElementById('textareael');
				e.preventDefault();
				insertAtCursor(el,'\\frac{}{}',3);

			}


		}

	}else if(inifunc==1){
		inifunc=0;
		document.getElementById('bodydiv').remove();
		document.onkeydown='';
	}

		
}
function removeallele(parentid){
	var parent=document.getElementById(parentid);
	while(parent.firstChild){
		parent.firstChild.remove();
	}
}
var previewUp=0;
function preViewprbUpload(pinfo,bodyname){

	if(previewUp==0){
		var bodydiv=document.getElementById(bodyname);
		var textareacontents=document.getElementById('textareael').value;
		currprb=textareacontents;

		var previewdiv=document.createElement('div');
		previewdiv.id='previewdiv';
		previewdiv.style.width=100+'%';
		previewdiv.style.height=100+'%';
		previewdiv.style.backgroundColor='pink';

		var previewcontentsdiv=document.createElement('div');
		previewcontentsdiv.style.width=90+'%';
		previewcontentsdiv.style.height=70+'%';
		previewcontentsdiv.style.backgroundColor='grey';
		previewcontentsdiv.style.fontSize='2vw';
		previewcontentsdiv.style.padding='5% 5% 5% 5%';//curious,,,,,,,
		previewdiv.appendChild(previewcontentsdiv);
		
	
		var previewa=document.createElement('div');
		previewa.innerHTML=textareacontents;
		previewcontentsdiv.appendChild(previewa);
	

		removeallele(bodyname);
		bodydiv.appendChild(previewdiv);


		var previewOption=document.createElement('div');
		previewOption.style.width='100%';
		previewOption.style.height='10%';
		previewdiv.appendChild(previewOption);

		var sendbuttondiv=document.createElement('div');
		sendbuttondiv.style.width=50+'%';
		sendbuttondiv.style.height=100+'%';
		sendbuttondiv.style.backgroundColor='blue';
		sendbuttondiv.style.cssFloat='left';
		sendbuttondiv.onclick=function(i,j){return function(){sendPrb(i,j,0);}}(pinfo,textareacontents);
		previewOption.appendChild(sendbuttondiv);

		var uploadPhoto=document.createElement('div');
		uploadPhoto.style.width=50+'%';
		uploadPhoto.style.height=100+'%';
		uploadPhoto.style.backgroundColor='#222222';
		uploadPhoto.style.cssFloat='left';
		uploadPhoto.onclick=function(i){return function(){uploadFileEdit('editbodydiv',i);}}(pinfo);
		previewOption.appendChild(uploadPhoto);

	
		//upsideDown('textareadiv','previewdiv');
		previewUp=1;
	}else if(previewUp==1){
		//upsideDown('previewdiv','textareadiv');
		//document.getElementById('previewdiv').remove();
		previewUp=0;

		removeallele('editbodydiv');
		var editbodydiv=document.getElementById('editbodydiv');
	
		var textareadiv = document.createElement('div');
		textareadiv.id='textareadiv';
		textareadiv.style.width=100+'%';
		textareadiv.style.height=90+'%';

		var textareael=document.createElement('textarea');
		textareael.id='textareael';
		textareael.value=currprb;
		textareael.style.width=100+'%';
		textareael.style.height=100+'%';
		textareael.style.padding=5+'%';
		textareael.style.fontSize='2vw';
		textareadiv.appendChild(textareael);
		editbodydiv.appendChild(textareadiv);
		editfunc=1;
		document.onkeydown = function(e){
			if(e.shiftKey && e.which==115 && !e.ctrlKey){//preview
				e.preventDefault();
				preViewprbUpload(pinfo,'editbodydiv');
			}else if(e.ctrlKey && e.which==32 && !e.shiftKey){
				var el=document.getElementById('textareael');
				//insertAtCursor(el,'\\(\\)',2);
				insertAtCursor(el,'\\(\\displaystyle \\)',2);
			}else if(e.ctrlKey && e.shiftKey && e.which!=32){
				var el=document.getElementById('textareael');
				insertAtCursor(el,'\\[\\displaystyle \\]',2);
				//insertAtCursor(el,'\\[\\]',2);
			}else if(e.shiftKey && e.which==54){
				var el=document.getElementById('textareael');
				e.preventDefault();
				insertAtCursor(el,'^{}',1);
			}else if(e.shiftKey && e.which==113){
				var el=document.getElementById('textareael');
				e.preventDefault();
				insertAtCursor(el,'<br>',0);
			}else if(e.shiftKey && e.which==112){
				var el=document.getElementById('textareael');
				e.preventDefault();
				insertAtCursor(el,'\\frac{}{}',3);

			}


		}



	}
}



function preViewprb(pinfo,bodyname){

	if(laststat==0){
		var bodydiv=document.getElementById(bodyname);
		var textareacontents=document.getElementById('textareael').value;
		currprb=textareacontents;

		var previewdiv=document.createElement('div');
		previewdiv.id='previewdiv';
		previewdiv.style.width=100+'%';
		previewdiv.style.height=100+'%';
		previewdiv.style.backgroundColor='pink';

		var previewcontentsdiv=document.createElement('div');
		previewcontentsdiv.style.width=90+'%';
		previewcontentsdiv.style.height=70+'%';
		previewcontentsdiv.style.backgroundColor='grey';
		previewcontentsdiv.style.fontSize='2vw';
		previewcontentsdiv.style.padding='5% 5% 5% 5%';//curious,,,,,,,
		previewdiv.appendChild(previewcontentsdiv);
		
	
		var previewa=document.createElement('div');
		previewa.innerHTML=textareacontents;
		previewcontentsdiv.appendChild(previewa);
	

		removeallele(bodyname);
		bodydiv.appendChild(previewdiv);


		var previewOption=document.createElement('div');
		previewOption.style.width='100%';
		previewOption.style.height='10%';
		previewdiv.appendChild(previewOption);

		var sendbuttondiv=document.createElement('div');
		sendbuttondiv.style.width=50+'%';
		sendbuttondiv.style.height=100+'%';
		sendbuttondiv.style.backgroundColor='blue';
		sendbuttondiv.style.cssFloat='left';
		sendbuttondiv.onclick=function(i,j){return function(){sendPrb(i,j,0);}}(pinfo,textareacontents);
		previewOption.appendChild(sendbuttondiv);

		var uploadPhoto=document.createElement('div');
		uploadPhoto.style.width=50+'%';
		uploadPhoto.style.height=100+'%';
		uploadPhoto.style.backgroundColor='#222222';
		uploadPhoto.style.cssFloat='left';
		uploadPhoto.onclick=function(i,j){return function(){sendPrb(i,j,1);}}(pinfo,textareacontents);
		previewOption.appendChild(uploadPhoto);
	
		//upsideDown('textareadiv','previewdiv');
		laststat=1;
	}else if(laststat==1){
		//upsideDown('previewdiv','textareadiv');
		//document.getElementById('previewdiv').remove();
		callWritingInDiv('bodydiv');
		laststat=0;
	}
}
function uploadFileEdit(bodyname,pinfo){
	removeallele(bodyname);
	var uploaddiv=document.createElement('div');
	uploaddiv.id='uploaddiv';
	uploaddiv.style.width=100+'%';
	uploaddiv.style.height=100+'%';
	uploaddiv.style.backgroundColor='#eeeeee';

	var bodydiv=document.getElementById(bodyname);

	var formdiv=document.createElement('div');
	var formel=document.createElement('form');
	var form=document.createElement('input');
	formel.setAttribute('enctype','multipart/form-data');
	formel.setAttribute('method','post');
	var formfile=document.createElement('input');
	formfile.id='formfile';
	formfile.setAttribute('type','file');
	formfile.onchange=function(){loadImage(event);};

	var sendbutton=document.createElement('button');
	sendbutton.innerHTML='send';
	sendbutton.onclick=function(i){return function(){sendFile(i)}}(pinfo[0]);

	formel.appendChild(formfile);
	formdiv.appendChild(formel);
	formdiv.appendChild(sendbutton);

	bodydiv.appendChild(uploaddiv);

	var photodiv=document.createElement('div');
	photodiv.style.width=100+'%';
	photodiv.style.height=100*0.617+'%';
	var photoimg=document.createElement('img');
	photoimg.style.width=100+'%';
	photoimg.style.height=100+'%';
	
	if(pinfo[8]!='nofile'){
		photoimg.src='../'+pinfo[8];
	}
	photodiv.appendChild(photoimg);
	uploaddiv.appendChild(photodiv);
	uploaddiv.appendChild(formdiv);	

	function loadImage(e){
		photoimg.src='';
		photoimg.src=URL.createObjectURL(e.target.files[e.target.files.length-1]);
	}

	function sendFile(pid){
		var formel=document.getElementById('formfile');
		var formData=new FormData();
		var formfile=formel.files[0];
		
		formData.append(pid,formfile);
		var xhr = new XMLHttpRequest();
		xhr.open('post','/qprbupload',true);
		xhr.send(formData);

		xhr.addEventListener('load',terminateEdit);
	}

	function terminateEdit(){
		//removeallelement('editbodydiv');
		document.getElementById('editbodydiv').remove();
		editfunc=0;
		previewUp=0;
		tempAlert('Photo Edited',1000)
	}

}

qprbsocket.on('qprbsendprbuploadresult',function(a){
	//uploadFile('bodydiv',a.prbid);	
});
function sendPrb(pinfo,prbtextr,opt){
	var prbtext=prbtextr;

	if(!pinfo){// new prb registered
		if(opt==0){ // No upload
			qprbsocket.emit('qprbsendprbcontents',{prbtext:prbtext,option:'create'})
			if(nextaction==0){
			//	upsideDown('previewdiv','textareadiv');
				callWritingInDiv('bodydiv');
				//document.getElementById('previewdiv').remove();
				laststat=0;
				//alert('problem is registered. Build another problem');
				tempAlert('Problem Registered',1000)
			}else if(nextaction==1){
				removeallele('bodydiv')
				alert('problem is registered');
			}
		}else{ //Upload
			qprbsocket.emit('qprbsendprbupload',{prbtext:prbtext,option:'create'})
			laststat=0;
		}


	}else{
		qprbsocket.emit('statusedit',{prbtext:prbtext,option:pinfo[2],scode:pinfo[1],numid:pinfo[0]})
		editfunc=0;	
		previewUp=0;
		document.getElementById('editbodydiv').remove();
		document.onkeydown='';
		tempAlert('TEXT Edited',1000)

	}
}

function upsideDown(currup,currdown){
	var currdowndiv=document.getElementById(currdown);
	var currupdiv=document.getElementById(currup);
	currdowndiv.style.display='block';
	currupdiv.style.display='none';
}

var nextaction=0;

function insertAtCursor(myField, myValue, mn) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
	const n=myField.value.substring(0,startPos).length+myValue.length;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
	setCaretToPos(myField,n-mn)
    } else {
        myField.value += myValue;
	console.log(myField.value, myValue);
    }
}
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
   setSelectionRange(input, pos, pos);
}

/*
document.onkeydown = function(e){
	if(e.shiftKey && e.which==53 && !e.ctrlKey){
	}else if(e.ctrlKey && e.which==32 && !e.shiftKey){
		var el=document.getElementById('textareael');
		insertAtCursor(el,'\\(\\)',2);
	}else if(e.ctrlKey && e.shiftKey && e.which!=32){
		var el=document.getElementById('textareael');
		insertAtCursor(el,'\\[\\]',2);
	}else if(e.shiftKey && e.which==54){
		var el=document.getElementById('textareael');
		e.preventDefault();
		insertAtCursor(el,'^{}',1);
	}else if(e.shiftKey && e.which==70){
		var el=document.getElementById('textareael');
		e.preventDefault();
		insertAtCursor(el,'\\frac{}{}',1);

	}
}*/				
