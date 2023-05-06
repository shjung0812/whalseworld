function jstest(){
}
function removeAllRepresent(cname){
	var rdiv=document.getElementsByClassName(cname);
	for(var ia=0; ia<rdiv.length; ia++){
		rdiv[ia].style.backgroundColor='';
		rdiv[ia].style.color='';
	}
}
function removeItemFromExist(liststr,item){
	var liststrl=liststr;
	var nlist=[];
	for(var ia=0; ia<liststrl.length; ia++){
		if(liststrl[ia]==item){
		}else{
			nlist.push(liststrl[ia]);
		}
	}
	return nlist;
}
function checkItemExist(liststr,item){
	var liststrl=liststr;

	var chk=0;
	for(var ia=0; ia<liststrl.length; ia++){
		if(liststrl[ia]==item){
			chk=1;
			break;
		}
	}

	return chk;
}

function clickToChosen(item,madaeind){
	var chk=checkItemExist(chosenlist,item);
	if(chk==0){//no exist
		chosenlist.push(item);

	}else{
		chosenlist=removeItemFromExist(chosenlist,item);
	}

	chosenRepresent(madaeind,chosenlist);

}

function singleClickToChosen2(item,madaeind){
	chosenlist2=[item]
	chosenRepresent(madaeind,chosenlist2);

}
function singleClickToChosen3(item,madaeind){
	chosenlist3=[item]
	chosenRepresent(madaeind,chosenlist3);

}



var swap=function(array,i,j){
	var temp=array[i];
	array[i]=array[j];
	array[j]=temp;
}

var sortind=function(array){
	for(var i=0; i<array.length; i++){
	for(var j=1;j<array.length; j++){
		if(array[j-1][1]>array[j][1]){
			swap(array,j-1,j);
		}
	}
	}
	return array;
}

var stat={'chosencolor':'blue','fontcolor':'white'}

function chosenRepresent(madaeind,clist){
	removeAllRepresent(madaeind);
	if(clist.length!=0){
		var chosenlistl=clist;
		for(var ia=0; ia<chosenlistl.length; ia++){
			var rpdiv=document.getElementById(chosenlistl[ia]);

			rpdiv.style.backgroundColor=stat.chosencolor;
			rpdiv.style.color=stat.fontcolor;


		}
	}

}


