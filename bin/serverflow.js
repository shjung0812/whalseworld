
var mysql=require('mysql2');
module.exports={
getinfodb:function(req_query,callback){
var connection=mysql.createConnection({
host:'localhost',
user:'shjung',
password:'ehfvls38317**',
database:'whalseworld'

});
//connection.connect();

connection.query(req_query,function(err,rows){
	if(err){
		console.log(err);
	}else{
		callback(rows);
	}
});
connection.end();
},
whalsegetinfodb:function(req_query,callback){
var connection=mysql.createConnection({
host:'localhost',
user:'shjung',
password:'ehfvls38317**',
database:'whalseworld'

});
//connection.connect();

connection.query(req_query,function(err,rows){
	if(err){
		callback(rows,err);
		console.log(err);
	}else{
		callback(rows,err);
	}
});
connection.end();
},

whalsegetinfodb_par:function(req_query,para,callback){
//var mysql=require('mysql');
var connection=mysql.createConnection({
host:'localhost',
user:'shjung',
password:'ehfvls38317**',
database:'whalseworld'

});
connection.connect();
connection.query(req_query,para,function(err,rows){
	if(err){
		console.log(err);
		callback(err);
	}else{
		callback(rows);
	}
});
connection.end();
},


getinfodb_par:function(req_query,para,callback){
var mysql=require('mysql');
var connection=mysql.createConnection({
host:'localhost',
user:'shjung',
password:'ehfvls38317**',
database:'whalseworld'

});
connection.connect();
connection.query(req_query,para,function(err,rows){
	if(err){
		console.log(err);
		callback(err);
	}else{
		callback(rows);
	}
});
connection.end();
},

corstatic:function(plist,userid,settime,cback){
var async=require('async');
var count=0;
statis=[];
total=[];
async.whilst(
 function(callbackfunction){
	callbackfunction(null,count<plist.length)
	//return count<plist.length;
},
 function(callback){
  module.exports.getinfodb('select correct from prbsolve where prbid="'+plist[count]+'"and userid="'+userid+'" and timestampdiff(second,datetime,"'+settime+'")<0',function(rows){

  var rowlist=[];

  if (rows.length!=0){
  for(var i=0;i<rows.length;i++){
   rowlist[i]=rows[i].correct;
  }
  var cor=rowlist.reduce(function(a,b){return a+b;});
  var wro=rowlist.length-cor;
  statis[count]=(cor/rows.length).toFixed(2);
  total[count]=rows.length;
  }else{
  statis[count]=null;
  total[count]=null;
  }
  count++;
  callback(null);

  });
 },
 function(err){
if(!err){
 cback(statis, total);
}else{
 console.log('we encountered errors in corstatic in serverflow.js', err);
}
 });
},
nodetime:function(){
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  if (month<10){
    month='0'+month.toString();
  }
  if (day<10){
    day='0'+day.toString();
  }


  if (hour<10){
    hour='0'+hour.toString();
  }

  if (min<10){
    min='0'+min.toString();
  }


  if (sec<10){
    sec='0'+sec.toString();
  }


  var resettime=year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
  return resettime;
},
releaseMadae:function(a,allowedtag,notallowedtag){

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
                }  
		return releasemadae;

},
RandomString(length,opt){
	if(!opt || opt==0){
		var text='';
		var possible='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
		for(var ia=0; ia<length; ia++){
			text+=possible.charAt(Math.floor(Math.random()*possible.length));
		}
		return text;
	}
},
//Review
WhalseGetObjId(obj,tbname,num,callback){
	var empstr=module.exports.RandomString(num);
	var revid=empstr;
	//module.exports.whalsegetinfodb('select * from backdatamanage',function(rs){
	module.exports.whalsegetinfodb('select * from '+tbname,function(rs){
		var ua=1;	
		var chk;
		var ub=0;
		while(ua==1){
			chk=0;
			for(var ia=0; ia<rs.length ;ia++){
				if(rs[ia][obj]==revid){
					chk=1;
				}
			}
			if(chk==1){
				ua=1;
				empstr=module.exports.RandomString(10);
				revid=empstr;
			}else{
				ua=0;
			}
			ub+=1;
			if(ub>1000){
				ua=0;
			}
		}
		callback(revid)
	});
	
}


}
