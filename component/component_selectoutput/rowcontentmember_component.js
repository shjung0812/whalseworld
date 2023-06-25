export class RowContentMember {
    constructor(){
        
    }
    static run({receiveddom,targetdom}){
        targetdom.appendChild(receiveddom);
    }

    static imgurlcontent({usedata,targetdom,receiveddom}){
        
        var imgel=document.createElement('img');
        imgel.src=usedata;             
        receiveddom.appendChild(imgel)
        //targetdom.appendChild(receiveddom);
    }

    static madenumcontent({usedata,forcount,datacount,orderlist,targetdom,receiveddom}){
        
        receiveddom.id=usedata[forcount].numid+orderlist;
        receiveddom.setAttribute('data-item',orderlist);
        receiveddom.setAttribute('data-numid',usedata[forcount].numid);
        if(usedata[forcount].childcol!=null){
            targetdom.style.color='#aaaaaa';
        }else{
            receiveddom.className='madenumcontent';
            receiveddom.setAttribute('data-madecount',datacount);
            var boutgoingdate=document.createElement('input');
            boutgoingdate.type='text';
            boutgoingdate.className='datecon';
            receiveddom.appendChild(boutgoingdate);	

            var optionbox=document.createElement('div');
            optionbox.className='optionbox';
            optionbox.style.width='40%';
            

            var chbox1=document.createElement('input');
            chbox1.type='checkbox';
            chbox1.name='outselect'+forcount;	
            chbox1.value='downselect';
            chbox1.className='chbox1';
            chbox1.onclick=function(jcurrcount){
                return function(){
                    var ifdiv=document.getElementsByClassName('madenumcontent');
                    for(var ic=0; ic<ifdiv.length; ic++){
                        ifdiv[ic].parentNode.style.backgroundColor='';
                        ifdiv[ic].childNodes[1].childNodes[0].checked=false;
                        ifdiv[ic].childNodes[1].childNodes[1].checked=false;
                        ifdiv[ic].childNodes[1].childNodes[2].checked=false;
                    }

                    for(var ib=jcurrcount; ib<ifdiv.length; ib++){
                        ifdiv[ib].parentNode.style.backgroundColor='red';
                        ifdiv[ib].childNodes[1].childNodes[0].checked=true;
                    }

                }
            }(datacount);

            var chbox2=document.createElement('input');
            chbox2.type='checkbox';
            chbox2.name='outselect'+forcount;	
            chbox2.value='ss';
            chbox2.className='chbox2';
            chbox2.onclick=function(jcurrcount){
                return function(){
                    var ifdiv=document.getElementsByClassName('madenumcontent');
                    for(var ic=0; ic<ifdiv.length; ic++){
                        ifdiv[ic].parentNode.style.backgroundColor='';
                        ifdiv[ic].childNodes[1].childNodes[0].checked=false;
                        //ifdiv[ic].childNodes[1].childNodes[1].checked=false;
                        ifdiv[ic].childNodes[1].childNodes[2].checked=false;
                    }

                    ifdiv[jcurrcount].parentNode.style.backgroundColor='purple';
                    if(ifdiv[jcurrcount].childNodes[1].childNodes[1].checked){
                        ifdiv[jcurrcount].childNodes[1].childNodes[1].checked=true;
                    }else{
                        ifdiv[jcurrcount].childNodes[1].childNodes[1].checked=false;
                    }


                }
            }(datacount);

            var chbox3=document.createElement('input');
            chbox3.type='checkbox';
            chbox3.name='oustselect'+forcount;	
            chbox3.value='groupselect';
            chbox3.className='chbox3';
            chbox3.onclick=function(jcurrcount){
                return function(){

                    var ifdiv=document.getElementsByClassName('madenumcontent');
                    if(ifdiv[jcurrcount].childNodes[1].childNodes[2].checked){
                        ifdiv[jcurrcount].childNodes[1].childNodes[2].checked=true;
                        ifdiv[jcurrcount].parentNode.style.backgroundColor='blue';
                    }else{
                        ifdiv[jcurrcount].parentNode.style.backgroundColor='';
                        ifdiv[jcurrcount].childNodes[1].childNodes[2].checked=false;
                    }


                }
            }(datacount);


            optionbox.appendChild(chbox1);
            optionbox.appendChild(chbox2);
            optionbox.appendChild(chbox3);

            receiveddom.appendChild(optionbox);
            //fdiv.style.backgroundColor=bgcolorset[bgnum]


            datacount+=1;



        }
        //targetdom.appendChild(receiveddom);

        return datacount
    }


}
