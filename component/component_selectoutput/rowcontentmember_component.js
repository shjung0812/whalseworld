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
        

        return datacount
    }

    //receiveddom-> sdiv
    static statuscontent({usedata,forcount,datacount,orderlist,targetdom,receiveddom}){

        var isThisContentExist=false;
        
        if(orderlist=='status'+usedata[forcount].statuscode+'text'){
            if(usedata[forcount][orderlist]!=null){
        
                receiveddom.innerHTML=usedata[forcount][v];
            }else{
                receiveddom.innerHTML='TEXT EMPTY';
            }

            receiveddom.id='status'+usedata[forcount].numid+'text';


            //targetdom.appendChild(receiveddom);
            receiveddom.onclick=function(i,k){
                return function(){
                    editFunc([i,findCurrentScode(i),'text',k],50,20,20)
                }
            }(usedata[forcount].numid,usedata[forcount][orderlist]);
            isThisContentExist=true;
            return;
        }


        if(orderlist=='status'+usedata[forcount].statuscode+'pic'){
            if(usedata[forcount][orderlist]!=null){
                var sdivel=document.createElement('img');
                sdivel.src='/whalse/whalsephoto/'+usedata[forcount][orderlist];
                receiveddom.appendChild(sdivel);
            }else{
                receiveddom.innerHTML='PIC EMPTY';
            }
            receiveddom.id='status'+usedata[forcount].numid+'pic';

            receiveddom.className='statuspic';
            //targetdom.appendChild(receiveddom);
            receiveddom.onclick=function(i){
                return function(){
                    PicContainer(40,10,10,i,findCurrentScode(i))

                }
            }(usedata[forcount].numid);
            isThisContentExist=true;
            return;

        }
        if(orderlist=='arrival'+usedata[forcount].statuscode+'num'){
            receiveddom.id='arrival'+usedata[forcount].numid+'num';
            var arrsub0div=document.createElement('div');
            
            arrsub0div.className='arrsubdiv';
            
            receiveddom.className='arrdiv';

            if(usedata[forcount][orderlist]!=null){

                if(receiveddom[forcount].statuscode==0){
                    arrsub0div.innerHTML=usedata[forcount].order_quantity;
                    arrsub0div.onclick=function(i){
                        return function(){
                            //NumContainer(30,20,20,i,findCurrentScode(i))
                        }
                    }(usedata[forcount].numid);


                }else{
                    arrsub0div.innerHTML=a.data[ia][v];
                    arrsub0div.onclick=function(i){
                        return function(){
                            NumContainer(30,20,20,i,findCurrentScode(i))
                        }
                    }(usedata[forcount].numid);

                }

              
                receiveddom.appendChild(arrsub0div);
              
            }else{
                if(usedata[forcount].statuscode==0){
                    receiveddom.innerHTML=usedata[forcount].order_quantity;
                    receiveddom.onclick=function(i){
                        return function(){
                            //NumContainer(30,20,20,i,findCurrentScode(i))
                        }
                    }(usedata[forcount].numid);

                }else{
                    receiveddom.innerHTML='NUM EMPTY';
                    receiveddom.onclick=function(i){
                        return function(){
                            NumContainer(30,20,20,i,findCurrentScode(i))
                        }
                    }(usedata[forcount]);

                }


            }

            //fdiv.appendChild(sdiv);
            isThisContentExist=true;
            return;
        }
        if(!isThisContentExist){
            receiveddom.remove();
        }
    };
    static parcelnumberingcontent({receivedparcelcode,receivednumber,usedata,forcount,datacount,orderlist,targetdom,receiveddom}){
        
        receiveddom.className='officestatusdiv';
        var officestatusdiv=document.createElement('div');
        officestatusdiv.className='officestatussubdiv';
        var officestatusa=document.createElement('a');
        officestatusa.innerHTML='('+(receivednumber+1)+') '+receivedparcelcode[receivednumber][5];

        officestatusdiv.appendChild(officestatusa);
        receiveddom.appendChild(officestatusdiv);
        //targetdom.appendChild(receiveddom);

    }

    static statuscodecontent({receivedparcelcode,receivednumber,usedata,forcount,datacount,orderlist,targetdom,receiveddom}){
        receiveddom.className='statusdiv';

        var status0div=document.createElement('div');
        status0div.className='statussubdiv';
        var status0a=document.createElement('a');
        status0a.innerHTML='정상';
        var status0=document.createElement('input');
        status0div.appendChild(status0);
        status0div.appendChild(status0a);



        var status1div=document.createElement('div');
        status1div.className='statussubdiv';
        var status1a=document.createElement('a');
        status1a.innerHTML='미입고'
        var status1=document.createElement('input');
        status1div.appendChild(status1);
        status1div.appendChild(status1a);




        var status2div=document.createElement('div');
        status2div.className='statussubdiv';
        var status2a=document.createElement('a');
        status2a.innerHTML='오입고';
        var status2=document.createElement('input');
        status2div.appendChild(status2);
        status2div.appendChild(status2a);


        status0.className='status'+usedata[forcount].numid+'input';
        status1.className='status'+usedata[forcount].numid+'input';
        status2.className='status'+usedata[forcount].numid+'input';

        status0.type='radio';
        status1.type='radio';
        status2.type='radio';

        status0.name='statusc'+forcount;
        status1.name='statusc'+forcount;
        status2.name='statusc'+forcount;

        if(usedata[forcount].statuscode==0){
            status0.checked='true';
        }else if(usedata[forcount].statuscode==1){
            status1.checked='true';
        }else if(usedata[forcount].statuscode==2){
            status2.checked='true';
        }
        status0.onclick=function(i,j){
            return function(){
                statusCheckedSend(i,j,'inboundstatus');
                updateStatusShown(i,j);
            }
        }(usedata[forcount].numid,0);

        status1.onclick=function(i,j){
            return function(){
                statusCheckedSend(i,j,'inboundstatus');
                updateStatusShown(i,j);
            }
        }(usedata[forcount].numid,1);
        status2.onclick=function(i,j){
            return function(){
                statusCheckedSend(i,j,'inboundstatus');
                updateStatusShown(i,j);
            }
        }(usedata[forcount].numid,2);

        receiveddom.appendChild(status0div);
        receiveddom.appendChild(status1div);
        receiveddom.appendChild(status2div);

        //fdiv.appendChild(sdiv);
    }

    static comb1content({receivedparcelcode,receivednumber,usedata,forcount,datacount,orderlist,targetdom,receiveddom}){
        
        receiveddom.className='comb1div';
        var comb1div=document.createElement('div');
        comb1div.className='comb1subdiv';
        //var comb1diva=document.createElement('a');


        var cdate=new Date(receivedparcelcode[receivednumber][0]);
        if(cdate.getMonth() <= 8){
            var rmonth='0'+(cdate.getMonth()+1);
        }else{
            var rmonth=cdate.getMonth()+1;
        }
        if(cdate.getDate() <= 9){
            var rdate='0'+cdate.getDate();
        }else{
            var rdate=''+cdate.getDate();
        }


        if(receivedparcelcode[receivednumber][7] <= 9){	
            var rorder='0'+receivedparcelcode[receivednumber][7];
        }else{
            var rorder=receivedparcelcode[receivednumber][7];
        }
        comb1div.innerHTML=receivedparcelcode[receivednumber][2]+' '+rmonth+rdate+' '+receivedparcelcode[receivednumber][1]+'차 '+rorder;

        
        receiveddom.appendChild(comb1div);
        
    }
    static comb2content({receivedparcelcode,receivednumber,usedata,forcount,datacount,orderlist,targetdom,receiveddom}){
        receiveddom.className='comb2div';
        var comb2div=document.createElement('div');
        
    
        var bo=usedata[forcount].w_orderday.split('_')[0];
        if(bo=='ON' || bo=='MOON' || bo=='DW' || bo=='CP'){
            comb2div.innerHTML='돌핀웨일'+'<br/>'+usedata[forcount].kor_item_name+'<br/>'+usedata[forcount].kor_option;
        }else if(bo=='DT' || bo=='MODT' || bo=='KK' || bo=='MOKK' || bo=='SI' || bo=='MOSI' || bo=='MG'||bo=='MOOMG'){
            comb2div.innerHTML=usedata[forcount].order_color.replaceAll('|','<br/>');
        }else{
            comb2div.innerHTML='Error'
        }


        
        //comb2div.appendChild(comb2diva);
        receiveddom.appendChild(comb2div);
        //fdiv.appendChild(sdiv);
    }
    static comb3content({receivedparcelcode,receivednumber,usedata,forcount,datacount,orderlist,targetdom,receiveddom}){
        receiveddom.className='comb3div';
        var comb3div=document.createElement('div');
        comb3div.innerHTML='https://detail.1688.com/offer/'+usedata[forcount].offer_id+'.html';
        
        
        receiveddom.appendChild(comb3div);
        //fdiv.appendChild(receiveddom);

    }
    static etccontent({receivedparcelcode,receivednumber,usedata,forcount,datacount,orderlist,targetdom,receiveddom}){
        receiveddom.id=usedata[forcount].numid+orderlist;
        receiveddom.setAttribute('data-item',orderlist);
        receiveddom.setAttribute('data-numid',usedata[forcount].numid);
        var sdiva=document.createElement('a');	
        sdiva.innerHTML=usedata[forcount][orderlist];
        sdiva.onclick=function(i,j,k,l){
            return function(){
                editDetailItem(l,i,j,k);
            }
        }(orderlist,usedata[forcount][orderlist],receiveddom,usedata[forcount].numid)

        receiveddom.appendChild(sdiva);
        
    }



}
