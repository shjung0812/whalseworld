var express = require('express');
var app = express();
var md5=require('md5');
var https=require('https');

var fs = require('fs');
var sf = require('./bin/serverflow.js');

var server=require('http').createServer(app);
//var server=https.createServer(app);
//var server=https.createServer(options,app);
var io = require('socket.io')(server);

/*
app.all('*',(req,res,next)=>{
	let protocol = req.headers['x-forwarded-proto']||req.protocol;
	if(protocol == 'https'){
		next();
	}else{
		let from ='${protocol}://${req.hostname}${req.url}';
		let to = 'https://${req.hostname}${req.url}';
		console.log('[${req.method]:${from} -> ${to}');
		res.redirect(to);
	}
});*/
var formidable = require('formidable');
var readChunk = import('read-chunk');
var fileType = import('file-type');

//var formidable = require('formidable');
//import {readChunk} from 'read-chunk';
//import {fileTypeFromFile} from 'file-type';



const multer = require('multer');
//const upload=multer({dest:__dirname+'/public'});
var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,__dirname+'/public');
	},
	filename:function(req,file,cb){
		cb(null,file.originalname)
	}
});
var upload=multer({storage:storage});


app.get('/uploadfile',function(req,res){
        res.render('hana/uploadfile');
});
app.post('/uploadfile',upload.single('myFile'),function(req,res){
        res.send('succeed:'+req.file);
});


var session = require('express-session');
const FileStore = require('session-file-store')(session);

app.set('port', process.env.PORT || 80);
//app.set('port', process.env.PORT || 443);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(session({
	secret: 'mylovesoojung',
	resave: false,
	saveUninitialized: true,
	store: new FileStore()
}));

var flash = require('connect-flash');

app.use(flash());

var passport = require('passport')
,LocalStrategy = require('passport-local').Strategy;


var User = require('./bin/user');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){
	console.log('serialize');
	console.log(user,done);
	done(null,user.username);
});

passport.deserializeUser(function(id,done){
	console.log('deserialize');
	User.findById(id,function(err,user){	
		done(null,user);
	})
});

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username:username.toLowerCase()},function(err,user){
		if(err){return done(err);}
		if(!user){
		
			return done(null,false,{message:'Incorrect username.'});
		}
		user.validPassword(md5(password)).then(ps=>{
			if(!ps){
				return done(null, false, {message:'Incorrect password.'});
			}else{
				return done(null, user);
			}
		});
		});
	}
));




app.get('/admin/register',function(req,res){
	res.render('hana/register',{registercode:req.query.registercode});
});
var regi=io.of('/regi');


regi.on('connection',function(socket){
	socket.on('checkusernameduplicate',function(a){
		sf.whalsegetinfodb('select * from whalseusers',function(b){
			var chk=0;
			for(var ia=0; ia<b.length; ia++){
				if(b[ia].username==a.username){
					chk=1;	
					break;
				}
			}
			socket.emit('checkusernameduplicateafter',{chk:chk});
		});
	});
});

app.get('/login',function(req,res){
	res.render('hana/login');
});


app.post('/login',
	//passport.authenticate('local',{successRedirect:'/',
	passport.authenticate('local',{
					failureRedirect: '/login',
					failureFlash: true}),function(req,res){
		var msg=sf.nodetime()+' - username: '+req.user.username+',  position: '+req.user.position+'\n';
		if(req.user.position===0){
			res.redirect('/admin/functionlist');
			//fs.appendFile('./log/userlogin.log',msg,function(err){
				//if(err) throw err;
				console.log('Saved');
			//});

		}else if(req.user.position===11){//11
			res.redirect('/vdrg/userstart');
			//res.redirect('/vdrg/userinterface');
			//fs.appendFile('./log/userlogin.log',msg,function(err){
				//if(err) throw err;
				//console.log('Saved');
			//});


		}else if(req.user.position===11){
			res.redirect('/nusd/mentee/gospace');
		}else if(req.user.position===12){
			res.redirect('/mmcp/interface');
		}else if(req.user.position===1){//1
			//res.redirect('/vdrg/mentorcenter');
			res.redirect('/admin/functionlist');
				
			//fs.appendFile('./log/userlogin.log',msg,function(err){
				//if(err) throw err;
			//});

		}else if(req.user.position===1){
			//res.redirect('/admin/functionlist');
		}else {
			res.send('system error in login field');
		}

});
app.post('/auth/register',function(req,res){
var username = req.body.username;
var upassword = md5(req.body.password);
var apassword = md5(req.body.passwordagain);
var udipname= req.body.displayName;
var uaffiliation=req.body.affiliation;
var register = {username:username, password:upassword,DisplayName:udipname,position:11,createdate:sf.nodetime()};

//var register = {username:username, password:upassword, email:uemail, DisplayName:udipname, affiliation:uaffiliation};


	sf.whalsegetinfodb_par('insert into whalseusers SET ?',register,function(err,result){
		if(err.warningCount){
			res.send(err);
		}else{
			res.send('<h2>Id Created successfully.... </h2><div><a href="/"> Click to Login </a></div>');
			//res.redirect('/st/ecufrontpg?userid='+username+'&displayname='+udipname);
		}
	});

});




var ss=require('socket.io-stream');
var path = require('path');

//chart
app.get('/chart',function(req,res){
	res.render('chart/charthome');
});


app.get('/studentinfo',function(req,res){

	res.render('vdrg/studentinfo/studentinfo');
});

app.get('/quatertimer/createindex',function(req,res){
	res.render('util/createindex');
});
app.get('/quatertimer',function(req,res){
	res.render('util/quaterwriting');
});

var whalse_storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,__dirname+'/public/whalse');
	},
	filename:function(req,file,cb){
		cb(null,file.originalname)
	}
});
var whalse_upload=multer({storage:whalse_storage});




app.get('/hana/whalse/input',function(req,res){
	res.render('hana/whalse_input');
});

app.get('/whalse/selectoutput',function(req,res){
	console.log(typeof req.query.fieldstring);
	if(typeof req.query.fieldstring !== 'undefined'){
	//if(Object.keys(req.query).length===0){
		var fieldstring=req.query.fieldstring;

		var tooutput=JSON.parse(req.query.tooutputstr);
		console.log(tooutput);
		//var spclist=JSON.parse(req.query.selectpclist);
		//console.log(JSON.stringify(req.query.fieldstring));
		/*
		var wh=''
		for(var ia=0; ia< spclist.length; ia++){
			if(ia!=spclist.length-1){
				wh=wh+'(pclistnumid="'+spclist[ia].pclistnumid+'" and errparcelcode="'+spclist[ia].pc+'") or ';
			}else{
				wh=wh+'(pclistnumid="'+spclist[ia].pclistnumid+'" and errparcelcode="'+spclist[ia].pc+'")';
			}
		}*/

		//sf.whalsegetinfodb('select * from errorboard where '+wh,function(a){
		sf.whalsegetinfodb('select distinct madaename from madaeitemconnect as m left join madaetagprocessing as p on m.madaename = p.parentcol where p.childcol is not null',function(b){

			res.render('hana/whalse_selectoutput',{fieldstring:fieldstring,selectpclist:req.query.selectpclist,tagmadae:b,tooutput:tooutput});
			//res.render('hana/whalse_selectoutput',{fieldstring:fieldstring,selectpclist:req.query.selectpclist,errboard:a,tagmadae:b});

		});
		//});
	}else{
		res.render('hana/whalse_selectoutput',{fieldstring:null,selectpclist:req.query.selectpclist});
	}

});
app.get('/hana/whalse/output',function(req,res){
	console.log(typeof req.query.fieldstring);
	if(typeof req.query.fieldstring !== 'undefined'){
	//if(Object.keys(req.query).length===0){
		var fieldstring=req.query.fieldstring;
		res.render('hana/whalse_output',{fieldstring:fieldstring});

	}else{
		res.render('hana/whalse_output',{fieldstring:null});
	}
});
app.get('/hana/whalse/orderlistedit',function(req,res){
	res.render('hana/orderlistedit');
});
app.get('/hana/whalse/backdatareview',function(req,res){
	res.render('hana/backdatareview');
});

app.get('/',function(req,res){
//app.get('/hana/whalse/board',function(req,res){
	res.render('hana/frontpage');
	//res.render('hana/whalseboard');
});

app.get('/admin/functionlist',function(req,res){
	res.render('hana/whalseboard');
});
app.get('/hana/whalse/processinglist',function(req,res){

//	sf.whalsegetinfodb('select parcelcodelist from processinglist',function(a){
	//sf.whalsegetinfodb('select parcelcodelist,arrivaldate,roundnum from processinglist',function(a){
		res.render('hana/processinglist');
	//});
});


app.get('/hana/whalse/superior',function(req,res){
	sf.whalsegetinfodb('select * from errorboard', function(a){
		res.render('hana/whalsesuperior',{err:a});
	});
});


app.get('/hana/whalse/madaeinfo',function(req,res){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid', function(a){
	res.render('hana/madaeinfo',{a:a});
	})
});

app.get('/hana/whalse/gurumiconnect',function(req,res){
	//sf.whalsegetinfodb('select * from madaeitemconnect', function(a){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid', function(a){
		res.render('hana/gurumiconnect',{a:a});
	});
});

app.get('/whalse/webtagdefine',function(req,res){
	sf.whalsegetinfodb('select * from webpagedefine', function(a){
			console.log(a);
		res.render('hana/webtagdefine',{wpd:a});
	});
});

app.get('/whalse/taglistdefine',function(req,res){
	sf.whalsegetinfodb('select * from taglisttable', function(a){
		res.render('hana/taglistdefine',{wpd:a});
	});
});
app.get('/whalse/tagattach/tagtest',function(req,res){
	var tagnumid=[1,2];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}
	sf.whalsegetinfodb('select * from taglisttable where '+wh, function(a){
		res.render('hana/tagattach/tagtest',{wpd:a});
	});
});

app.get('/whalse/tagattach/taginitialprocess',function(req,res){
	var tagnumid=[1];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}

	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where p.parentcol is null', function(a){
		res.render('hana/tagattach/taginitialprocess',{a:a,tag:tag});
	});
	});
});

app.get('/whalse/tagattach/taginbetweenprocess',function(req,res){
	var tagnumid=[2];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}


	var allowedtag=[1];
	var awh='';
	for(var ia=0; ia<allowedtag.length; ia++){
		if(allowedtag.length-1!=ia){
			awh+=awh+'p.childcol="'+allowedtag[ia]+'" or ';
		}else{
			awh+=awh+'p.childcol="'+allowedtag[ia]+'"';
		}
	}



	sf.whalsegetinfodb('select * from taglisttable where '+ wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where (p.parentcol is not null) and ('+awh+')', function(a){
		res.render('hana/tagattach/taginbetweenprocess',{tag:tag[0],a:a});
	});
	});

});



app.get('/whalse/tagattach/zsmadaerelease',function(req,res){
	var tagnumid=[4];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}

	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where p.parentcol is null', function(a){
		res.render('hana/tagattach/zsmadaerelease',{a:a,tag:tag});
	});
	});
});



app.get('/whalse/tagattach/jsmadaepickup',function(req,res){
	var tagnumid=[5];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}



	var allowedtag=[4];
	/*
	var awh='';
	for(var ia=0; ia<allowedtag.length; ia++){
		if(allowedtag.length-1!=ia){
			awh+=awh+'p.childcol="'+allowedtag[ia]+'" or ';
		}else{
			awh+=awh+'p.childcol="'+allowedtag[ia]+'"';
		}
	}*/


	var notallowedtag=[5];
	/*
	var bwh='';
	for(var ia=0; ia<notallowedtag.length; ia++){
		if(notallowedtag.length-1!=ia){
			bwh+=bwh+'NOT p.childcol="'+notallowedtag[ia]+'" or ';
		}else{
			bwh+=bwh+'NOT p.childcol="'+notallowedtag[ia]+'"';
		}
	}

	console.log(bwh);*/


	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	//sf.whalsegetinfodb('select m.madaename,data.w_orderday,parentcol , group_concat(p.childcol separator ",") as pchildcol from  madaetagprocessing as p left join madaeitemconnect as m on p.parentcol= m.madaename right join initialdata as data on m.childcol=data.numid group by p.parentcol', function(a){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where (p.parentcol is not null)', function(a){
		/*
		var filtered=[];
		for(var ia=0; ia<a.length; ia++){

				var chk=0;
				a[ia].childcol.split(',').forEach(function(m){	
					chk=0;
					for(var ib=0; ib<notallowedtag.length; ib++){
						if(notallowedtag[ib]==m){
							chk=1;	
							break;
						}
		
					}
					if(chk==1){	
						return false;
					}
				});



				var chk1=0;
				a[ia].childcol.split(',').forEach(function(m){
					chk1=0;
					for(var ib=0; ib<allowedtag.length; ib++){
						if(allowedtag[ib]==m){
							chk1=1;	
							break;
						}
		
					}
					if(chk1==1){	
						return false;
					}
				});


			if(chk!=1 && chk1==1){
				filtered.push(a[ia])
			}
		}*/


		/*	
		var allowedpi=[];
		for(var ib=0;ib<a.length; ib++){
			var chk=0;
		for(var ia=0; ia<prohibitmadaelist.length; ia++){
				if(a[ib].parentcol==prohibitmadaelist[ia]){
					chk=1;
					break;
				}
		}
			if(chk==0){
				releasemadae.push(a[ib])
			}
		}
		//console.log(filtered);*/

		/*
		var releasemadae=[];

		var allowedmadae=[];
		for(var ia=0; ia<a.length; ia++){
			var chk0=0;
			for(var ib=0;ib<allowedtag.length; ib++){
				if(allowedtag[ib]==a[ia].childcol){
					chk0=1;
					break;
				}
			}
			if(chk0==1){
				allowedmadae.push(a[ia]);
			}
		}

		var prohibitmadae=[];

		for(var ia=0; ia<a.length; ia++){
			var chk0=0;
			for(var ib=0;ib<notallowedtag.length; ib++){
				if(notallowedtag[ib]==a[ia].childcol){
					chk0=1;
					break;
				}
			}
			if(chk0==1){
				prohibitmadae.push(a[ia]);
			}
		}



		for(var ia=0; ia<allowedmadae.length; ia++){
			var chk=0;
			for(var ib=0; ib<prohibitmadae.length; ib++){
				if(allowedmadae[ia].madaename==prohibitmadae[ib].madaename){
					chk=1;
					break;
				}
			}
			if(chk!=1){
				releasemadae.push(allowedmadae[ia]);
			}
		}*/
		res.render('hana/tagattach/jsmadaepickup',{a:sf.releaseMadae(a,allowedtag,notallowedtag),tag:tag});
		//res.render('hana/tagattach/jsmadaepickup',{a:filtered,tag:tag});
	});
	});
});





app.get('/whalse/tagattach/customentry',function(req,res){
	var tagnumid=[6];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}



	var allowedtag=[5];


	var notallowedtag=[6];

	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where (p.parentcol is not null)', function(a){
		res.render('hana/tagattach/customentry',{a:sf.releaseMadae(a,allowedtag,notallowedtag),tag:tag});
	});
	});
});



app.get('/whalse/tagattach/korjstoquick',function(req,res){
	var tagnumid=[7];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}



	var allowedtag=[6];


	var notallowedtag=[7];

	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where (p.parentcol is not null)', function(a){
		res.render('hana/tagattach/korjstoquick',{a:sf.releaseMadae(a,allowedtag,notallowedtag),tag:tag});
	});
	});
});


app.get('/whalse/tagattach/zuspicconfirm',function(req,res){
	
	sf.whalsegetinfodb('select i.numid as numid, i.picassign as picassign, i.createdate as createdate, i.originalname as originalname, i.picoption as picoption from itemupload as i left join madaetagprocessing as m on i.numid=m.tagoption where (m.childcol<>8 or m.childcol is null)', function(u){
		res.render('hana/tagattach/zuspicconfirm',{u:u});
	});
});
app.get('/whalse/tagattach/zusitemconfirm',function(req,res){
	var tagnumid=[8];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}



	var allowedtag=[6];


	var notallowedtag=[8];

	//sf.whalsegetinfodb('select * from itemupload where picoption <> "hide" or picoption is null', function(u){
	sf.whalsegetinfodb('select i.numid as numid, i.picassign as picassign, i.createdate as createdate, i.originalname as originalname, i.picoption as picoption from itemupload as i left join madaetagprocessing as m on i.numid=m.tagoption where (m.childcol<>8 or m.childcol is null) and (i.picoption<>"hide" or i.picoption is null)', function(u){
	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where (p.parentcol is not null)', function(a){
		res.render('hana/tagattach/zusitemconfirm',{a:sf.releaseMadae(a,allowedtag,notallowedtag),tag:tag,u:u});
	});
	});
	});
});


app.get('/whalse/tagattach/zusitemcheck',function(req,res){
	var tagnumid=[9];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}



	var allowedtag=[8];


	var notallowedtag=[9,10];

	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol join itemupload as i on p.tagoption=i.numid where (p.parentcol is not null)', function(a){
		res.render('hana/tagattach/zusitemcheck',{a:sf.releaseMadae(a,allowedtag,notallowedtag),tag:tag});
	});
	});
});

app.get('/whalse/tagattach/dwsitemfinalize',function(req,res){
	var tagnumid=[10];

	var wh='';
	for(var ia=0; ia<tagnumid.length; ia++){
		if(tagnumid.length-1!=ia){
			wh+=wh+'numid="'+tagnumid[ia]+'" or ';
		}else{
			wh+=wh+'numid="'+tagnumid[ia]+'"';
		}
	}



	var allowedtag=[8];


	var notallowedtag=[10];

	sf.whalsegetinfodb('select * from taglisttable where ' + wh, function(tag){
	sf.whalsegetinfodb('select * from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol join itemupload as i on p.tagoption=i.numid where (p.parentcol is not null)', function(a){
	sf.whalsegetinfodb('select * from finalitem',function(c){
		res.render('hana/tagattach/dwsitemfinalize',{a:sf.releaseMadae(a,allowedtag,notallowedtag),tag:tag,c:c});
	});
	});
	});
});
app.get('/whalse/scanstatus',function(req,res){
	sf.whalsegetinfodb('select * from processinglist',function(a){
	sf.whalsegetinfodb('select * from orderlist',function(c){
	sf.whalsegetinfodb('select * from errorboard where erroption="errorwaiting"',function(e){
		res.render('hana/scanstatus',{pcl:a,orderlist:c,e:e});
	});
	});
	});
});

app.get('/whalse/pcwaitinglist',function(req,res){
	//sf.whalsegetinfodb('select parcelcodelist from processinglist',function(a){
		//res.render('hana/pcwaitinglist',{pcl:a});
	//});

		res.render('hana/pcwaitinglist');


});






app.get('/whalse/admin/madaetagconnectdisplay',function(req,res){
	sf.whalsegetinfodb('select * from madaetagprocessing',function(a){
		res.render('hana/admin/madaetagconnectdisplay',{a:a});
	});
});
app.get('/whalse/admin/madaeitemconnectdisplay',function(req,res){
	sf.whalsegetinfodb('select * from madaeitemconnect',function(a){
		res.render('hana/admin/madaeitemconnectdisplay',{a:a});
	});
});
app.get('/whalse/admin/initialdatadisplay',function(req,res){
	sf.whalsegetinfodb('select * from initialdata',function(a){
		res.render('hana/admin/initialdata',{a:a});
	});
});
app.get('/whalse/admin/itemuploaddisplay',function(req,res){
	sf.whalsegetinfodb('select * from itemupload',function(a){
		res.render('hana/admin/itemuploaddisplay',{a:a});
	});
});
app.get('/whalse/admin/logendpointdisplay',function(req,res){
	sf.whalsegetinfodb('select * from logendpoint',function(a){
		res.render('hana/admin/logendpointdisplay',{a:a});
	});
});

app.get('/whalse/admin/finalitemdisplay',function(req,res){
	sf.whalsegetinfodb('select * from finalitem',function(a){
		res.render('hana/admin/finalitemdisplay',{a:a});
	});
});
app.get('/whalse/admin/whalseusersdisplay',function(req,res){
	sf.whalsegetinfodb('select * from whalseusers',function(a){
		res.render('hana/admin/whalseusersdisplay',{a:a});
	});
});
app.get('/whalse/admin/errorboarddisplay',function(req,res){
	sf.whalsegetinfodb('select * from errorboard',function(a){
		res.render('hana/admin/errorboarddisplay',{a:a});
	});


});

app.get('/whalse/admin/processinglistdisplay',function(req,res){
	sf.whalsegetinfodb('select * from processinglist',function(a){
		res.render('hana/admin/processinglistdisplay',{a:a});
	});


});






app.post('/whalse_uploadinvoice',whalse_upload.single('whalse_data'),function(req,res){
	var invoicefile = fs.readFile(req.file.path,'utf8',function(err,data){
		if(err) throw err;
		res.send('',{data:data});
		//console.log(req.file.path);
		//socket.emit('whalseinvoiceafter',{data:data});
	});
});

app.post('/whalsephotoupload',function(req,res){
	console.log('whalsephotoupload xhr');
	var form = new formidable.IncomingForm();
	form.keepExtensions= true;

	form.on('fileBegin',function(name,file){
		var ext=file.originalFilename.split('.')[file.originalFilename.split('.').length-1]
		file.filepath = __dirname+'/public/whalse/whalsephoto/'+name+'.'+ext;
		file.newFilename=name+'.'+ext;

	});

	
	form.on('file',function(name,file){
		//console.log(name);
		//console.log(file);

	});
	form.parse(req,function(a,b,c){//err,key_value1, keyvalue2;
		//console.log(a)
		//console.log(b)
		//console.log(c)
		//sf.whalsegetinfodb('update statusconnect set status'+b.scode+'pic="'+c[b.fname].newFilename+'" where initialdataconnect="'+b.numid+'"',function(){
		//});
		//console.log(c[b.fname].filepath)




	});
	form.on('end',function(){
		//res.send('xhr qprb succeed');
	});
});


app.post('/whalseparcelwaitingupload',function(req,res){
	console.log('whalse parcelwaiting photoupload xhr');
	var form = new formidable.IncomingForm();
	form.keepExtensions= true;

	form.on('fileBegin',function(name,file){
		var ext=file.originalFilename.split('.')[file.originalFilename.split('.').length-1]
		file.filepath = __dirname+'/public/whalse/whalsewaiting/'+name+'.'+ext;
		file.newFilename=name+'.'+ext;
		//console.log(name,file);

	});

	
	form.on('field',function(name,value){
		var e=JSON.parse(value);
		var sqlvalue='';
		for(var ia=0; ia<e.length; ia++){
			if(e.length-1==ia){
				console.log('sa0t1');
				sqlvalue+='("'+e[ia][0]+'","'+e[ia][4]+'","'+sf.nodetime()+'","errorwaiting","'+e[ia][1]+'","'+Number(name)+'","'+e[ia][5]+'","ini","'+e[ia][2]+'")'
			}else{
				console.log('sa0t2');
				sqlvalue+='("'+e[ia][0]+'","'+e[ia][4]+'","'+sf.nodetime()+'","errorwaiting","'+e[ia][1]+'","'+Number(name)+'","'+e[ia][5]+'","ini","'+e[ia][2]+'"),'
				//sqlvalue+='("'+e.pcdata[ia][0]+'","'+e.pcdata[ia][4]+'","'+sf.nodetime()+'","errorwaiting","'+e.pcdata[ia][2]+'","'+a.roundnum+'","'+e.pcdata[ia][5]+'","ini"),'
			}
		}

		console.log('sa1');
		console.log(sqlvalue);
		sf.whalsegetinfodb('insert into errorboard (errparcelcode,errorpic,createdate,erroption,branchoffice,roundnum,registereddate, transform,registernum) values '+sqlvalue,function(s){
			console.log('sa2');
			console.log(s);
		});
			
	})
	form.on('file',function(name,file){
		//console.log(name);
		//console.log(file);

		//sf.whalsegetinfodb('insert into errorboard',function(b){


	});
	form.parse(req,function(a,b,c){//err,key_value1, keyvalue2;
		//console.log(a)
		//console.log(b)
		//console.log(c)
		//sf.whalsegetinfodb('update statusconnect set status'+b.scode+'pic="'+c[b.fname].newFilename+'" where initialdataconnect="'+b.numid+'"',function(){
		//});
		//console.log(c[b.fname].filepath)




	});
	form.on('end',function(){
		//res.send('xhr qprb succeed');
	});
});



app.post('/whalseerrorphotoupload',function(req,res){
	console.log('whalse error photoupload xhr');
	var form = new formidable.IncomingForm();
	form.keepExtensions= true;

	form.on('fileBegin',function(name,file){
		var ext=file.originalFilename.split('.')[file.originalFilename.split('.').length-1]
		file.filepath = __dirname+'/public/whalse/whalseerrorphoto/'+name+'.'+ext;
		file.newFilename=name+'.'+ext;

	});

	
	form.on('file',function(name,file){
		//console.log(name);
		//console.log(file);

	});
	form.parse(req,function(a,b,c){//err,key_value1, keyvalue2;
		//console.log(a)
		//console.log(b)
		//console.log(c)
		//sf.whalsegetinfodb('update statusconnect set status'+b.scode+'pic="'+c[b.fname].newFilename+'" where initialdataconnect="'+b.numid+'"',function(){
		//});
		//console.log(c[b.fname].filepath)




	});
	form.on('end',function(){
		//res.send('xhr qprb succeed');
	});
});
app.post('/whalsezusarrivedphotoupload',function(req,res){
	console.log('whalse zus arrived photo upload xhr');
	var form = new formidable.IncomingForm();
	form.keepExtensions= true;

	form.on('fileBegin',function(name,file){
		var ext=file.originalFilename.split('.')[file.originalFilename.split('.').length-1]
		file.filepath = __dirname+'/public/whalse/whalsezusphoto/'+name+'.'+ext;
		file.newFilename=name+'.'+ext;

	});

	
	form.on('file',function(name,file){
		//console.log(name);
		//console.log(file);

	});
	form.parse(req,function(a,b,c){//err,key_value1, keyvalue2;
		//sf.whalsegetinfodb('update statusconnect set status'+b.scode+'pic="'+c[b.fname].newFilename+'" where initialdataconnect="'+b.numid+'"',function(){
		//});
		//console.log(c[b.fname].filepath)




	});
	form.on('end',function(){
		//res.send('xhr qprb succeed');
	});
});




var XLSX=require('xlsx');

var validdata=['numid','operationid','ordernum','engid','chid','sellid','sellername','payment','deliveryfee','discount','sku_price','order_status','order_date','pay_date','shipment','w_orderday','url','post_code','contact_num','phonenum','pro_name','quantity','unit','pro_num','model','offer_id','sku_id','material_number','item_name','item_color','item_size','match_id','search_name','search_color','search_size','order_name','order_color','order_size','order_quantity','parcel_code','depart_time','delivery_status','barcode','kor_item_name','kor_option','img_url','plcode','totalpayment','statuscode','arrival0num','arrival1num','arrival2num','arrival3num','status0text','status1text','status2text','status3text','status0pic','status1pic','status2pic','status3pic','parcelnumbering','madenum','category']

app.post('/whalse_uploadfile',whalse_upload.single('whalse_data'),function(req,res){
	//res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
	res.send('succeed:'+req.file);
	var workbook = XLSX.readFile(req.file.path);
	var sheet_name_list = workbook.SheetNames;
	var xlData=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


	var whalsedata=[];
	//for(var ia=0; ia<xlData.length; ia++){
		//whalsedata.push(Object.values(xlData[ia]))	
	//}





	//server setting and datasetting harmonic test
	for(let v of validdata){
		var stchk=0;
		for(s in xlData[0]){
			if(v == s){
				stchk=1;
				break;
			}
		}
		if(stchk==0){
			console.log('(validdata referenced)missing variable: '+v);
		}
	}

	for(let v in xlData[0]){
		var stchk=0;
		for(s of validdata){
			if(v == s){
				stchk=1;
				break;
			}
		}
		if(stchk==0){
			console.log('(backdata referenced)missing variable: '+v);
		}
	}


	console.log(xlData);
	//creating test
	var wb=XLSX.utils.book_new();
	var wsheet=XLSX.utils.aoa_to_sheet([
		[1,2,3,],
		[4,5,6],
		[7,8,9]
	]);
	XLSX.utils.book_append_sheet(wb,wsheet,'sheettest');
	XLSX.writeFile(wb,'shhettest.xlsx');
	


	
	sf.whalsegetinfodb('select match_id as mid from initialdata',function(k){



		var validrow=[];
		var chk1=0;
		for(var ib=0; ib<xlData.length ; ib++){
			var chk=0;
			for(var ia=0; ia<k.length; ia++){
				if(k[ia].mid==xlData[ib].match_id){
					chk=1;
					break;
				}
			}
			if(chk==0 || chk==1){//both chk==0, chk==1 allowed means data overwritting function
			//if(chk==0){//both chk==0, chk==1 allowed means data overwritting function
				chk1=1;
				validrow.push(ib)
			}		
		}


		var matchidcheck=0;
		for(var ij=0; ij<xlData.length; ij++){
			if(xlData[ij].match_id==undefined){
				matchidcheck=0;
			}else{
				matchidcheck=1;
			}
			if(matchidcheck==0){
				break;
			}
		}


		console.log(xlData.length, matchidcheck)	

		matchidcheck=0;

		//if chk1 is 1 then inserting process is started otherwise cancled. 
		if(matchidcheck*(chk1==1 || k.length==0)){
			sf.WhalseGetObjId('operationid','backdatamanage',10,function(fid){
				var bdata={operationid:fid,createdate:sf.nodetime(),originalfilename:req.file.originalname,trialresult:'succeed'}
				sf.whalsegetinfodb_par('insert into backdatamanage set ?',bdata,function(){});
				var exec = require('child_process').exec;
				var child0=exec('cp ./public/whalse/'+req.file.originalname+' ./public/whalse/validrowdata/'+fid+'_'+req.file.originalname,function(err,stdout,stderr){if(err){throw err;}});


				console.log('process on going');
				var inserthead='';
				for(var ia=0; ia<validdata.length; ia++){
					if(ia==0){
						inserthead='('+validdata[ia]+',';
					}else if(ia!=validdata.length-1){
						inserthead=inserthead+validdata[ia]+',';
					}else{
						inserthead=inserthead+validdata[ia]+')';
					}
				}

				var wh='';
				var count=0;
				for(let t in validrow){
				//for(var ic=0; ic<xlData.length; ic++){

					var whalsedata=[];
					for(let v of validdata){
						var stchk=0;
						for(s in xlData[0]){
							if(v == s){
								stchk=1;
								whalsedata.push([v,'"'+xlData[t][v]+'"'])
								break;
							}
						}
						if(stchk==0){
							console.log('(validdata referenced)missing variable: '+v);
							if(v=='statuscode'){
								whalsedata.push([v,0])
							//}else if(v=='arrival0num' || v=='arrival1num' || v=='arrival2num' || v=='arrival3num'){
								//whalsedata.push([v, null])
							}else if(v=='operationid'){
								whalsedata.push([v,'"'+fid+'"'])
								
							}else{
								whalsedata.push([v,null])
							}
						}
					}


					var sqlstc='';
					for(var ia=0; ia<whalsedata.length; ia++){
						if(ia==0){
							sqlstc='('+whalsedata[ia][1]+',';
						}else if(ia!=whalsedata.length-1){
							sqlstc=sqlstc+whalsedata[ia][1]+',';	
						}else{
							sqlstc=sqlstc+whalsedata[ia][1]+')';
						}
					}

					if(count!=validrow.length-1){
						wh=wh+sqlstc+',';
					}else{
						wh=wh+sqlstc;
					}

					count++;



				}

				var dupcon='';
				var dupcount=0;
				for(let v of validdata){
					if(v != 'numid'){
						if(dupcount==0 && validdata.length!=0){
							dupcon=v+' = Values('+v+')'
							dupcount+=1;
						}else if(dupcount!=0 && validdata.length!=0){
							dupcon+=','+v+' = Values('+v+')'
						}
				
					}
				}
				//console.log(wh);

				//console.log(sqlstc);
				//console.log(inserthead);
				//console.log(whalsedata);




					

					sf.whalsegetinfodb('insert into initialdata '+inserthead+' values '+wh+' on duplicate key update '+dupcon,function(){
						//res.redirect('/nusd/createtext');
				});

			})

			
		}else{
			console.log('process is stop');
			var msg='fail_';
			if(matchidcheck){
				if(chk1==0){
					msg=msg+'NoMatchid';
				}
			
			}else{
				msg=msg+'Matchidempty';
			}
			sf.WhalseGetObjId('operationid','backdatamanage',10,function(fid){
				var bdata={operationid:fid,createdate:sf.nodetime(),originalfilename:req.file.originalname,trialresult:msg}
				sf.whalsegetinfodb_par('insert into backdatamanage set ?',bdata,function(){});
			});
		}
	});

	/*

	for(var ia=0; ia<whalsedata.length; ia++){
		//sqlstc='("'+whalsedata[ia][1]+'","'+whalsedata[ia][5]+'","'+whalsedata[ia][22]+'","'+whalsedata[ia][23]+'","'+whalsedata[ia][24]+'","'+whalsedata[ia][25]+'","'+whalsedata[ia][26]+'","'+whalsedata[ia][27]+'","'+whalsedata[ia][28]+'","'+whalsedata[ia][39]+'","'+whalsedata[ia][40]+'","'+whalsedata[ia][43]+'")';
		sqlstc='("'+whalsedata[ia][1]+'","'+whalsedata[ia][5]+'","'+whalsedata[ia][14]+'","'+whalsedata[ia][22]+'","'+whalsedata[ia][23]+'","'+whalsedata[ia][24]+'","'+whalsedata[ia][25]+'","'+whalsedata[ia][26]+'","'+whalsedata[ia][27]+'","'+whalsedata[ia][28]+'","'+whalsedata[ia][39]+'","'+whalsedata[ia][40]+'","'+whalsedata[ia][42]+'","'+whalsedata[ia][43]+'","'+whalsedata[ia][44]+'","'+whalsedata[ia][45]+'","'+whalsedata[ia][46]+'","'+whalsedata[ia][47]+'","'+whalsedata[ia][48]+'")';


		if(ia!=whalsedata.length-1){
			wh=wh+sqlstc+',';
		}else{
			wh=wh+sqlstc;
		}
	}
	//var sst='(5,5,5,5,5,5,5,5,5,5,5,5)'
//	sf.whalsegetinfodb('insert into whalseworld.initialdata (ordernum,compnum,documentnum,product,optioncode,chineseproduct,chineseoption, chinesesize, invoicenummatch,invoicenum,timedeparture,orderdate) values '+sqlstc,function(){
	sf.whalsegetinfodb('insert into initialdata (ordernum,compnum,ordernum2,documentnum,product,optioncode,chineseproduct,chineseoption, chinesesize, invoicenummatch,invoicenum,timedeparture,departureoption,orderdate,barcodenum,productname,optiondetail,countnum,imageaddr) values '+wh,function(){
		//res.redirect('/nusd/createtext');
	});*/

	
});



var whalse=io.of('/whalse');

//var statedata=['arrival0num','arrival1num','arrival2num','arrival3num','status0text','status1text','status2text','status3text','status0pic','status1pic','status2pic','status3pic']
whalse.on('connection',function(socket){
	console.log('vdrg connected');


	socket.on('logendpoint',function(a){
			sf.whalsegetinfodb('insert into logendpoint (receivedplace,logcontent,contentopt1,createtime) values ("'+a.receivedplace+'","'+a.logcontent+'","'+a.contentopt1+'","'+sf.nodetime()+'")',function(){
			});
	});

	socket.on('registeritem',function(a){
			//sf.whalsegetinfodb('insert into itemupload (picassign,originalname,createdate) values '+sqlvalues,function(){
		if(a.itemdata.option=='iteminsert'){
			sf.whalsegetinfodb('insert into finalitem (receivedplace,barcode,createtime,madaename,ininumid) values ("'+a.itemdata.receivedplace+'","'+a.itemdata.barcode+'","'+sf.nodetime()+'","'+a.itemdata.madaename+'","'+a.itemdata.ininumid+'")',function(){
			sf.whalsegetinfodb('select * from finalitem',function(b){
				socket.emit('registeritemafter',{b:b});
			});
			});
		}else if(a.itemdata.option=='getinfo'){
			sf.whalsegetinfodb('select * from finalitem',function(b){
				socket.emit('registeritemafter',{b:b});
			});
		}
	});

	socket.on('itemupload',function(a){
		if(a.option=='hide'){
			sf.whalsegetinfodb('update itemupload set picoption="hide" where numid="'+a.numid+'"',function(){
				
				socket.emit('itemuploadafter',{a:a});
			});

		}
	});

	socket.on('zusarrivedcontent',function(a){
		if(a.mode=='zusarrived'){
			console.log('zusarrivedmsg')



			var sqlvalues='';
			
			for(var ia=0; ia<a.content.length; ia++){
				if(a.content.length-1!=ia){
					sqlvalues+='("'+a.content[ia][1]+'.'+a.content[ia][2]+'","'+a.content[ia][0]+'","'+sf.nodetime()+'"),'
				}else{
					sqlvalues+='("'+a.content[ia][1]+'.'+a.content[ia][2]+'","'+a.content[ia][0]+'","'+sf.nodetime()+'")'
				}
			}



			sf.whalsegetinfodb('insert into itemupload (picassign,originalname,createdate) values '+sqlvalues,function(){
				socket.emit('errcontentafter',{a:a});
			});
		}
	});



	socket.on('madaetagprocessing',function(a){
		if(a.option=='zssimpleinsert'){
			var sqlvalues='';
			
			for(var ia=0; ia<a.madaelist.length; ia++){
				if(a.madaelist.length-1!=ia){
					sqlvalues+='("'+a.madaelist[ia]+'","'+a.tagnumid+'","'+sf.nodetime()+'","'+a.entrykind+'"),'
				}else{
					sqlvalues+='("'+a.madaelist[ia]+'","'+a.tagnumid+'","'+sf.nodetime()+'","'+a.entrykind+'")'
				}
			}

			//sf.whalsegetinfodb('insert into errorboard (pclistnumid,errparcelcode,errorpic,createdate) values ("'+a.pclistnumid+'","'+a.pc+'","'+a.content+'","'+sf.nodetime()+'") on duplicate key update errorpic="'+a.content+'", createdate="'+sf.nodetime()+'"',function(){
			sf.whalsegetinfodb('insert ignore into madaetagprocessing (parentcol,childcol,createtime,tagoption) values '+sqlvalues,function(b,e){
				if(e){
					console.log('error');
				}
			})
			
		}else if(a.option=='zuspicmadaeconnect'){
			var sqlvalues='';
			
			for(var ia=0; ia<a.madaelist.length; ia++){
				if(a.madaelist.length-1!=ia){
					sqlvalues+='("'+a.madaelist[ia]+'","'+a.tagnumid+'","'+sf.nodetime()+'","'+a.tagoption+'"),'
				}else{
					sqlvalues+='("'+a.madaelist[ia]+'","'+a.tagnumid+'","'+sf.nodetime()+'","'+a.tagoption+'")'
				}
			}
			console.log(sqlvalues);
			sf.whalsegetinfodb('insert into madaetagprocessing (parentcol,childcol,createtime,tagoption) values '+sqlvalues,function(b,e){
				if(e){
					console.log('error');
				}
			})

		}
	});

	socket.on('tagmanagement',function(a){
		if(a.opt=='create'){
			sf.whalsegetinfodb('insert into taglisttable (tagname,tagnote,taginfo,createtime) values("'+a.taginfo[0]+'","'+a.taginfo[1]+'","'+a.taginfo[2]+'","'+sf.nodetime()+'")',function(b){
				socket.emit('tagmanagementafter')
			});
		}
	});


	socket.on('webtagcontrol',function(a){
		if(a.opt=='create'){
			sf.whalsegetinfodb('insert into webpagedefine (webpageurl,webpageinfo,createtime) values("'+a.wpurl+'","'+a.wpinfo+'","'+sf.nodetime()+'")',function(b){
				socket.emit('webtagcontrolafter')
			});
		}
	});

	socket.on('customosmadaeinfo',function(a){

		if(a.selectmadae.length!=0){
			var wh='';
			for(var ia=0; ia<a.selectmadae.length; ia++){
				if(ia==a.selectmadae.length-1){
					wh+='madaename = "'+a.selectmadae[ia]+'";'
				}else{
					wh+='madaename = "'+a.selectmadae[ia]+'" or '
				}
			}

		
			sf.whalsegetinfodb('select category,initialdata.numid from madaeitemconnect join initialdata on initialdata.numid=madaeitemconnect.childcol where '+wh,function(b){
					
				socket.emit('customosmadaeinfoafter',{madaeinfo:b});
			});
		}else{
				socket.emit('customosmadaeinfoafter',{madaeinfo:[]});
		}
	});

	socket.on('madaeitemconnect',function(a){
		console.log(a);
		var querytext='insert into madaeitemconnect (madaename,childcol,createdate) values '
		for(var ia=0; ia<a.numidlist.length; ia++){
			if(ia!=a.numidlist.length-1){
				querytext=querytext+'("'+a.madaename+'","'+a.numidlist[ia]+'","'+sf.nodetime()+'"),'
			//querytext=querytext+' insert into madaeitemconnect(madaename,childcol,createdate) values("'+a.madaename+ia+'",'+ia+',"'+sf.nodetime()+'") on duplicate key update madaename="'+a.madaename+'", childcol='+a.numidlist[ia]+', createdate="'+sf.nodetime()+'";'
			}else{
				querytext=querytext+'("'+a.madaename+'","'+a.numidlist[ia]+'","'+sf.nodetime()+'") as info on duplicate key update madaename=info.madaename, childcol=info.childcol, createdate=info.createdate'
			}
			
		}

		console.log(querytext);
		sf.whalsegetinfodb(querytext,function(b){
		});
	});

	socket.on('errorboard',function(a){
		if(a.option=='call'){
			sf.whalsegetinfodb('select w_orderday, ordernum, match_id,parcel_code from initialdata',function(e){
			sf.whalsegetinfodb('select * from errorboard where erroption="errorwaiting"', function(a){
				socket.emit('errorboardafter',{option:'call',a:e,err:a})
			});


			});
		}else if(a.option=='complete'){
			var wh='';
			for(var ia=0; ia<a.errstr.length; ia++){	
				if(ia==a.errstr.length-1){
					wh+='numid='+a.errstr[ia];
				}else{
					wh+='numid='+a.errstr[ia]+' or '
				}
			}
			console.log('complete');
			sf.whalsegetinfodb('update errorboard set transform="edited" where '+wh, function(b){
				socket.emit('errorboardafter',{option:'complete'})
			});

		}else if(a.option=='remove'){
			sf.whalsegetinfodb('delete from errorboard where numid='+a.numid, function(b){
				socket.emit('errorboardafter',{option:'remove'})
			});
		};
	});
	socket.on('outgoingdata',function(a){
		if(a.option=='insert'){
			console.log(a);
			sf.whalsegetinfodb('insert into processinglist (createdate, parcelcodelist,branchoffice,roundnum,madenum,arrivaldate) values ("'+sf.nodetime()+'","'+a.pcdata+'","'+a.officebranch+'","'+a.roundnum+'","'+a.madenum+'","'+a.arrivaldate+'")',function(){
				socket.emit('outgoingdataafter',{option:'insert'})
			});
		}else if(a.option=='call'){
			//sf.whalsegetinfodb('select parcel_code from madaeitemconnect as m join initialdata as data on m.childcol=data.numid left join madaetagprocessing as p on m.madaename=p.parentcol where p.parentcol is null', function(d){// send unoccupied list
			sf.whalsegetinfodb('select w_orderday, parcel_code from initialdata',function(e){
			sf.whalsegetinfodb('select * from processinglist',function(b){
			//sf.whalsegetinfodb('select * from orderlist',function(c){
				socket.emit('outgoingdataafter',{option:'call',a:b,e:e})
				//socket.emit('outgoingdataafter',{option:'call',a:b,orderlist:c, e:e})
			//});
			//});
			});
			});
		}else if(a.option=='update'){
			sf.whalsegetinfodb('update processinglist set outgoingdate="'+a.outgoingdate+'" where numid="'+a.numid+'"',function(b){
				console.log(b);
				socket.emit('outgoingdataafter',{option:'update',a:b})
			});

		}else if(a.option=='insertpc'){

			var sqlvalue='';
			for(var ia=0; ia<a.pcdata.length; ia++){
				if(a.pcdata.length-1==ia){
					sqlvalue+='("'+a.arrivaldate+'","'+a.pcdata[ia][0]+'","'+a.pcdata[ia][1]+'","'+a.roundnum+'","'+sf.nodetime()+'","'+a.pcdata[ia][4]+'")'
				}else{
					sqlvalue+='("'+a.arrivaldate+'","'+a.pcdata[ia][0]+'","'+a.pcdata[ia][1]+'","'+a.roundnum+'","'+sf.nodetime()+'","'+a.pcdata[ia][4]+'"),'
				}
			}

			sf.whalsegetinfodb('insert into processinglist (arrivaldate, parcelcodelist,branchoffice,roundnum,createdate, registerseq) values '+sqlvalue,function(b){

			sf.whalsegetinfodb('select w_orderday, parcel_code from initialdata',function(e){
			sf.whalsegetinfodb('select * from processinglist',function(b){

			//sf.whalsegetinfodb('insert into processinglist (createdate, parcelcodelist,branchoffice,roundnum,madenum,arrivaldate) values ("'+sf.nodetime()+'","'+a.pcdata+'","'+a.officebranch+'","'+a.roundnum+'","'+a.madenum+'","'+a.arrivaldate+'")',function(){
			
				//socket.emit('outgoingdataafter',{option:'insert'})
				socket.emit('outgoingdataafter',{option:'call',a:b,e:e})
			});
			});
			});

		}
	});

	socket.on('quatertimeindex',function(a){
		console.log(a);
		if(a.mode=='create'){
		sf.whalsegetinfodb('insert into quatertimeindex (teacherid,indexinfo) values ("'+a.teacherid+'","'+a.operationinfo+'")',function(b){});
		}else if(a.mode=='update'){
			sf.whalsegetinfodb('update quatertimer set oindex="'+a.idxnumid+'" where numid="'+a.quaternumid+'"',function(b){});
		}
	});

	socket.on('getindexlist',function(a){
		sf.whalsegetinfodb('select * from quatertimeindex where teacherid="'+a.teacherid+'"',function(b){
			socket.emit('getindexlistafter',{a:b});
		});
	});


	socket.on('errcontent',function(a){
		if(a.mode=='errormsg'){
			console.log('errormsg')
			sf.whalsegetinfodb('insert into errorboard (pclistnumid,errparcelcode,errormsg,createdate) values ("'+a.pclistnumid+'","'+a.pc+'","'+a.content+'","'+sf.nodetime()+'") on duplicate key update errormsg="'+a.content+'", createdate="'+sf.nodetime()+'"',function(){
				socket.emit('errcontentafter',{a:a});
			});
		}else if(a.mode=='errorpic'){
			sf.whalsegetinfodb('insert into errorboard (pclistnumid,errparcelcode,errorpic,createdate) values ("'+a.pclistnumid+'","'+a.pc+'","'+a.content+'","'+sf.nodetime()+'") on duplicate key update errorpic="'+a.content+'", createdate="'+sf.nodetime()+'"',function(){
				socket.emit('errcontentafter',{a:a});
			});
		}else if(a.mode=='errorwaitingpic'){
			sf.whalsegetinfodb('insert into errorboard (errparcelcode,errorpic,createdate,erroption,branchoffice,roundnum,registereddate, transform) values ("'+a.pc[0]+'","'+a.content+'","'+sf.nodetime()+'","errorwaiting","'+a.pc[1]+'","'+a.pc[3]+'","'+a.pc[2]+'","ini")',function(){
			//sf.whalsegetinfodb('insert into errorboard (errparcelcode,errorpic,createdate,erroption) values ("'+a.pc+'","'+a.content+'","'+sf.nodetime()+'","errorwaiting") on duplicate key update errorpic="'+a.content+'", createdate="'+sf.nodetime()+'"',function(){
				socket.emit('errcontentafter',{a:a});
			});

		}
	});

	socket.on('contentchange',function(a){
		sf.whalsegetinfodb('update initialdata set '+a.item+'="'+a.content+'" where numid="'+a.numid+'"',function(b){
			socket.emit('contentchangeafter',{a:a})
		});
	});

	socket.on('callbackdatadetail',function(a){
		if(a.mode==1){
			sf.whalsegetinfodb('select * from initialdata join backdatamanage on backdatamanage.operationid collate utf8mb4_general_ci = initialdata.operationid where initialdata.operationid="'+a.operationid+'"',function(b){
				socket.emit('callbackdatadetailafter',{a:b});
			});
		}else if(a.mode==0){
			sf.whalsegetinfodb('select * from initialdata join backdatamanage on backdatamanage.operationid collate utf8mb4_general_ci = initialdata.operationid',function(b){
				socket.emit('callbackdatadetailafter',{a:b});
			});
		}
	});


	socket.on('backdatainfo',function(a){
		sf.whalsegetinfodb('select * from backdatamanage',function(b){
		//sf.whalsegetinfodb('select * from initialdata join backdatamanage on backdatamanage.operationid collate utf8mb4_general_ci = initialdata.operationid',function(a){
			socket.emit('backdatainfoafter',{a:b});
		});
	});

	socket.on('quatertimer',function(a){
		if(a.option=='insert'){
			var textl = {operationid:a.operationid,operationinfo:a.operationinfo,operationkind:a.mode,createdate:sf.nodetime(),durationtime:a.durationtime,oindex:a.chosenindex};
			sf.whalsegetinfodb_par('insert into quatertimer set ?',textl,function(a){
				socket.emit('quatertimerafter',{a:a});
			});
		}else if(a.option=='remove'){
			sf.whalsegetinfodb('delete from quatertimer where operationid="'+a.operationid+'"',function(a){
				socket.emit('quatertimerafter',{a:a});
			});

		}else if(a.option=='update'){
			sf.whalsegetinfodb('update quatertimer set operationinfo="'+a.operationinfo+'" where numid="'+a.numid+'"',function(a){
				socket.emit('quatertimerafter',{a:a});
			});

		}


	});
	socket.on('quatertimerstart',function(k){
		sf.whalsegetinfodb('select q.numid,q.operationinfo,q.createdate,q.oindex,q.durationtime,q.operationid, i.indexinfo, i.numid as idxid from quatertimer as q left join quatertimeindex as i on q.oindex=i.numid order by q.createdate asc',function(a){
			if(k.option=='quaterstart'){
				socket.emit('quatertimerstartafter',{a:a,servertime:sf.nodetime()})
			}else if(k.option=='refresh'){
				socket.emit('quatertimercorrectionafter',{a:a,servertime:sf.nodetime()})
			}
		});
	});

	socket.on('saveorder',function(a){
		if(a.opt=='insert'){
			sf.whalsegetinfodb('insert into orderlist (orderset) values ("'+a.rgprblist+'")',function(a){
				socket.emit('saveorderafter',{a:a});
			});
		}else if(a.opt=='update'){
			var textl = {orderset:a.rgprblist};
			sf.whalsegetinfodb_par('update orderlist set ? where numid="'+a.numid+'"',textl,function(a){
				socket.emit('saveorderafter',{a:a});
			});

		}else{
			console.log('opt empty');
		}
	});
	

	socket.on('callorder',function(){
		sf.whalsegetinfodb('select * from orderlist',function(a){
			socket.emit('callorderafter',{a:a});
		});
	});
	socket.on('whalsegetdata',function(a){
		
			var sqlstc='';
			var whalsedata=[]
			//for(var ia=0; ia<statedata.length; ia++){
			//	whalsedata.push(statedata[ia]);
			//}
			for(var ia=0; ia<validdata.length; ia++){
				whalsedata.push(validdata[ia]);
			}
			for(var ia=0; ia<whalsedata.length; ia++){
				if(ia!=whalsedata.length-1){
					sqlstc+='i.'+whalsedata[ia]+',';	
				}else{
					sqlstc+='i.'+whalsedata[ia];
				}
			}

			//sf.whalsegetinfodb('select st.arrival0num, st.arrival1num, st.arrival2num, st.arrival3num,st.status0text,st.status1text, st.status2text,st.status3text,st.status0pic,st.status1pic,st.status2pic,st.status3pic,st.statuscode,ta.numid,ta.invoicenum, ta.ordernum, ta.compnum, ta.ordernum2, ta.documentnum, ta.product, ta.optioncode, ta.chineseproduct, ta.chineseoption, ta.chinesesize, ta.invoicenummatch, ta.timedeparture, ta.departureoption, ta.orderdate, ta. barcodenum, ta.productname, ta.optiondetail, ta.countnum, ta.imageaddr from initialdata as ta left join statusconnect as st on ta.numid=st.initialdataconnect',function(a){


		if(typeof a=='undefined'){
			sf.whalsegetinfodb('select '+sqlstc+' from initialdata',function(a){
				socket.emit('whalsegetdataafter',{data:a});
			});
		}else{
			var wh='';
			//var slist=a.selectpclist.split(',');
			for(var ia=0; ia<a.selectpclist.length; ia++){
				if(ia == a.selectpclist.length-1){
					wh+='i.parcel_code="'+a.selectpclist[ia][5]+'"';
				}else{
					wh+='i.parcel_code="'+a.selectpclist[ia][5]+'" or ';
				}
			}
			sf.whalsegetinfodb('select '+sqlstc+',p.childcol from initialdata as i left join madaeitemconnect as m on i.numid=m.childcol left join madaetagprocessing as p on p.parentcol=m.madaename  where '+wh,function(a){
				socket.emit('whalsegetdataafter',{data:a});
			});

		}
	});

	socket.on('statuscodechange',function(a){
		console.log(a);
		if(a.option=='inboundstatus'){
			sf.whalsegetinfodb('update initialdata set statuscode="'+a.scode+'" where numid="'+a.numid+'"',function(){
			//sf.whalsegetinfodb('insert into statusconnect (initialdataconnect, statuscode) values ("'+a.numid+'","'+a.scode+'") on duplicate key update statuscode="'+a.scode+'"',function(){
			});
		}else if(a.option=='branchstatus'){
			sf.whalsegetinfodb('update initialdata set branchoffice="'+a.scode+'" where numid="'+a.numid+'"',function(){
			//sf.whalsegetinfodb('insert into statusconnect (initialdataconnect, statuscode) values ("'+a.numid+'","'+a.scode+'") on duplicate key update statuscode="'+a.scode+'"',function(){
			});

		}
	});	

	socket.on('statusedit',function(a){
		//sf.getinfodb('update pcscate set cslevel=0 where pcsopt="csindex"',function(rs){});
		if(a.option=='text'){
			sf.whalsegetinfodb('update initialdata set status'+a.scode+'text="'+a.prbtext+'" where numid="'+a.numid+'"',function(){
				socket.emit('statuseditafter',{b:a});
			});
		}else if(a.option=='pic'){
			sf.whalsegetinfodb('update initialdata set status'+a.scode+'pic="'+a.prbtext+'" where numid="'+a.numid+'"',function(){
				socket.emit('statuseditafter',{b:a});
			});
		}else if(a.option=='arrivalnum'){
			sf.whalsegetinfodb('update initialdata set arrival'+a.scode+'num='+a.prbtext+' where numid="'+a.numid+'"',function(){
			//sf.whalsegetinfodb('update statusconnect set arrival'+a.scode+'num='+a.prbtext+' where initialdataconnect="'+a.numid+'"',function(){
				socket.emit('statuseditafter',{b:a});
			});
		}else if(a.option=='refresh'){
			console.log('refreshed');
		}

		socket.emit('statuseditafter',{b:a});
	});


	socket.on('statusupdateshown',function(a){
		sf.whalsegetinfodb('select order_quantity, status'+a.scode+'text as statustext, status'+a.scode+'pic as statuspic, arrival'+a.scode+'num as arrivalnum, numid, statuscode  from initialdata where numid="'+a.numid+'"',function(b){
		//sf.whalsegetinfodb('select countnum, status'+a.scode+'text as statustext, status'+a.scode+'pic as statuspic, arrival'+a.scode+'num as arrivalnum,initialdataconnect as numid, statuscode  from statusconnect join initialdata on initialdata.numid = statusconnect.initialdataconnect where initialdataconnect="'+a.numid+'"',function(b){
			socket.emit('statusupdateshownafter',{b:b,scode:a.scode});
		});
	});

});






// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//app.listen(app.get('port'), function(){
server.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});




