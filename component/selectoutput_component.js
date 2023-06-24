import { SelectOutputController } from "/controller/selectoutput_controller.js";
import { RowContentMember } from "/component/component_selectoutput/rowcontentmember_component.js";
class SelectOutputComponent {
    constructor() {  
        
        this.selectoutputcontroller = new SelectOutputController();
        console.log('Selectoutput_conponent.js constructor')
        console.log(this.selectoutputcontroller.getParcelCodeStatusDataController());
        this.sdata=document.getElementById('showdata');

        console.log('ssss');
        this.titleBar();
        console.log('ssss1');
        this.backdataContentsScaffold();
        console.log('ssss2');
        
    };


    async backdataContentsScaffold(){
        var receivedparcelcode=this.selectoutputcontroller.getParcelCodeStatusDataController()
        var rowbackdata=await this.selectoutputcontroller.getBackData();
        const orderlist= this.selectoutputcontroller.getFieldStringController();
        var datacount=0;
        var seperatecolorset=['green','blue','yellow','red']
        console.log(rowbackdata);
        for(var is=0; is<receivedparcelcode.length; is++){  //Start:for(var is=0; is<tooutput.length; is++){
            var sameparcelcodecount=0; 
            var chkk=0;
            console.log('kkkkk1');
            for(var ia=0; ia<rowbackdata.data.length; ia++){  //start: for(var ia=0; ia<a.data.length; ia++){ 
                console.log('kkkkk2');
                console.log(rowbackdata.data[ia]);
                if(rowbackdata.data[ia].parcel_code==receivedparcelcode[is][5]){ 
                    console.log('kkkkk3');
        
                    chkk=1;
                    
                    var fdiv=document.createElement('div');
                    fdiv.className='rowcontent '+'inv'+rowbackdata.data[ia].parcel_code;

                    /*
                    if(sameparcelcodecount==0){
                        fdiv.style.backgroundColor='#40b2d6';
                    }
                    fdiv.style.border='2px '+seperatecolorset[is%seperatecolorset.length]+' solid';*/


                    for(let v of orderlist){
                        var sdiv=document.createElement('div');
                        RowContentMember.run({receiveddom:sdiv,targetdom:fdiv});

                        if(v=='img_url'){
                            
                            var imgel=document.createElement('img');
                            imgel.src=rowbackdata.data[ia][v];
                            sdiv.appendChild(imgel);
                            
                        }else if(v=='madenum'){
                            sdiv.id=rowbackdata.data[ia].numid+v;
                            sdiv.setAttribute('data-item',v);
                            
                            sdiv.setAttribute('data-numid',rowbackdata.data[ia].numid);
                            if(rowbackdata.data[ia].childcol!=null){
                                fdiv.style.color='#aaaaaa';
                            }else{
                                sdiv.className='madenumcontent';
                                sdiv.setAttribute('data-madecount',datacount);
                                var boutgoingdate=document.createElement('input');
                                boutgoingdate.type='text';
                                boutgoingdate.className='datecon';
                                sdiv.appendChild(boutgoingdate);	

                                var optionbox=document.createElement('div');
                                optionbox.className='optionbox';
                                optionbox.style.width='40%';
                                

                                var chbox1=document.createElement('input');
                                chbox1.type='checkbox';
                                chbox1.name='outselect'+ia;	
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
                                chbox2.name='outselect'+ia;	
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
                                chbox3.name='oustselect'+ia;	
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

                                sdiv.appendChild(optionbox);
                                //fdiv.style.backgroundColor=bgcolorset[bgnum]


                                datacount+=1;



                            }
                            
                            



                        }else if(v=='numid'){
                        }else if(v=='status0text'||v=='status1text' || v=='status2text' || v=='status3text'||v=='status0pic'||v=='status1pic'||v=='status2pic'||v=='status3pic'||v=='arrival0num'||v=='arrival1num'||v=='arrival2num'||v=='arrival3num'){

                            if(v=='status'+rowbackdata.data[ia].statuscode+'text'){
                                if(rowbackdata.data[ia][v]!=null){
                            
                                    sdiv.innerHTML=a.data[ia][v];
                                }else{
                                    sdiv.innerHTML='TEXT EMPTY';
                                }

                                sdiv.id='status'+rowbackdata.data[ia].numid+'text';


                                fdiv.appendChild(sdiv);
                                sdiv.onclick=function(i,k){
                                    return function(){
                                        editFunc([i,findCurrentScode(i),'text',k],50,20,20)
                                    }
                                }(rowbackdata.data[ia].numid,rowbackdata.data[ia][v]);
                            }

                            if(v=='status'+rowbackdata.data[ia].statuscode+'pic'){
                                if(rowbackdata.data[ia][v]!=null){
                                    var sdivel=document.createElement('img');
                                    sdivel.src='/whalse/whalsephoto/'+rowbackdata.data[ia][v];
                                    sdiv.appendChild(sdivel);
                                }else{
                                    sdiv.innerHTML='PIC EMPTY';
                                }
                                sdiv.id='status'+rowbackdata.data[ia].numid+'pic';

                                sdiv.className='statuspic';
                                fdiv.appendChild(sdiv);
                                sdiv.onclick=function(i){
                                    return function(){
                                        PicContainer(40,10,10,i,findCurrentScode(i))

                                    }
                                }(rowbackdata.data[ia].numid);

                            }
                            if(v=='arrival'+rowbackdata.data[ia].statuscode+'num'){
                                sdiv.id='arrival'+rowbackdata.data[ia].numid+'num';
                                var arrsub0div=document.createElement('div');
                                arrsub0div.className='arrsubdiv';
                                
                                sdiv.className='arrdiv';

                                if(rowbackdata.data[ia][v]!=null){

                                    if(rowbackdata.data[ia].statuscode==0){
                                        arrsub0div.innerHTML=rowbackdata.data[ia].order_quantity;
                                        arrsub0div.onclick=function(i){
                                            return function(){
                                                //NumContainer(30,20,20,i,findCurrentScode(i))
                                            }
                                        }(rowbackdata.data[ia].numid);


                                    }else{
                                        arrsub0div.innerHTML=rowbackdata.data[ia][v];
                                        arrsub0div.onclick=function(i){
                                            return function(){
                                                NumContainer(30,20,20,i,findCurrentScode(i))
                                            }
                                        }(rowbackdata.data[ia].numid);

                                    }

                            
                                    sdiv.appendChild(arrsub0div);
                                    
                                }else{
                                    if(rowbackdata.data[ia].statuscode==0){
                                        sdiv.innerHTML=rowbackdata.data[ia].order_quantity;
                                        sdiv.onclick=function(i){
                                            return function(){
                                                //NumContainer(30,20,20,i,findCurrentScode(i))
                                            }
                                        }(rowbackdata.data[ia].numid);

                                    }else{
                                        sdiv.innerHTML='NUM EMPTY';
                                        sdiv.onclick=function(i){
                                            return function(){
                                                NumContainer(30,20,20,i,findCurrentScode(i))
                                            }
                                        }(rowbackdata.data[ia].numid);

                                    }


                                }

                                fdiv.appendChild(sdiv);

                            }

                            
                        }else if(v=='parcelnumbering'){
                        


                            sdiv.className='officestatusdiv';
                            var officestatusdiv=document.createElement('div');
                            officestatusdiv.className='officestatussubdiv';
                            var officestatusa=document.createElement('a');
                            officestatusa.innerHTML='('+(is+1)+') '+tooutput[is][5];

                            officestatusdiv.appendChild(officestatusa);
                            sdiv.appendChild(officestatusdiv);
                            fdiv.appendChild(sdiv);



                        }else if(v=='statuscode'){
                            sdiv.className='statusdiv';
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


                            status0.className='status'+rowbackdata.data[ia].numid+'input';
                            status1.className='status'+rowbackdata.data[ia].numid+'input';
                            status2.className='status'+rowbackdata.data[ia].numid+'input';

                            status0.type='radio';
                            status1.type='radio';
                            status2.type='radio';

                            status0.name='statusc'+ia;
                            status1.name='statusc'+ia;
                            status2.name='statusc'+ia;

                            if(rowbackdata.data[ia].statuscode==0){
                                status0.checked='true';
                            }else if(rowbackdata.data[ia].statuscode==1){
                                status1.checked='true';
                            }else if(rowbackdata.data[ia].statuscode==2){
                                status2.checked='true';
                            }
                            status0.onclick=function(i,j){
                                return function(){
                                    statusCheckedSend(i,j,'inboundstatus');
                                    updateStatusShown(i,j);
                                }
                            }(rowbackdata.data[ia].numid,0);

                            status1.onclick=function(i,j){
                                return function(){
                                    statusCheckedSend(i,j,'inboundstatus');
                                    updateStatusShown(i,j);
                                }
                            }(rowbackdata.data[ia].numid,1);
                            status2.onclick=function(i,j){
                                return function(){
                                    statusCheckedSend(i,j,'inboundstatus');
                                    updateStatusShown(i,j);
                                }
                            }(rowbackdata.data[ia].numid,2);

                            sdiv.appendChild(status0div);
                            //sdiv.appendChild(status0a);
                            sdiv.appendChild(status1div);
                            //sdiv.appendChild(status1a);
                            sdiv.appendChild(status2div);
                            //sdiv.appendChild(status2a);

                            fdiv.appendChild(sdiv);
                        }else if(v=='comb1'){

                            sdiv.className='comb1div';
                            var comb1div=document.createElement('div');
                            comb1div.className='comb1subdiv';
                            //var comb1diva=document.createElement('a');


                            var cdate=new Date(tooutput[is][0]);
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


                            if(tooutput[is][7] <= 9){	
                                var rorder='0'+tooutput[is][7];
                            }else{
                                var rorder=tooutput[is][7];
                            }
                            comb1div.innerHTML=tooutput[is][2]+' '+rmonth+rdate+' '+tooutput[is][1]+'차 '+rorder;

                            //comb1div.appendChild(comb1diva);
                            sdiv.appendChild(comb1div);
                            fdiv.appendChild(sdiv);

                            


                        }else if(v=='comb2'){
                            sdiv.className='comb2div';
                            var comb2div=document.createElement('div');
                            
                        
                            var bo=rowbackdata.data[ia].w_orderday.split('_')[0];
                            if(bo=='ON' || bo=='MOON' || bo=='DW' || bo=='CP'){
                                comb2div.innerHTML='돌핀웨일'+'<br/>'+rowbackdata.data[ia].kor_item_name+'<br/>'+rowbackdata.data[ia].kor_option;
                            }else if(bo=='DT' || bo=='MODT' || bo=='KK' || bo=='MOKK' || bo=='SI' || bo=='MOSI' || bo=='MG'||bo=='MOOMG'){
                                comb2div.innerHTML=rowbackdata.data[ia].order_color.replaceAll('|','<br/>');
                            }else{
                                comb2div.innerHTML='Error'
                            }


                            
                            //comb2div.appendChild(comb2diva);
                            sdiv.appendChild(comb2div);
                            fdiv.appendChild(sdiv);
                        }else if(v=='comb3'){
                            sdiv.className='comb3div';
                            var comb3div=document.createElement('div');
                                
                            comb3div.innerHTML='https://detail.1688.com/offer/'+rowbackdata.data[ia].offer_id+'.html'

                            sdiv.appendChild(comb3div);
                            fdiv.appendChild(sdiv);


                        }else{
                        
                            //sdiv.innerHTML=a.data[ia][v];
                            /*
                            sdiv.id=a.data[ia].numid+v;
                            sdiv.setAttribute('data-item',v);
                            sdiv.setAttribute('data-numid',a.data[ia].numid);
                            var sdiva=document.createElement('a');	
                            sdiva.innerHTML=a.data[ia][v];
                            sdiva.onclick=function(i,j,k,l){
                                return function(){
                                    editDetailItem(l,i,j,k);
                                }
                            }(v,a.data[ia][v],sdiv,a.data[ia].numid)

                            sdiv.appendChild(sdiva);
                            fdiv.appendChild(sdiv);*/
                        }
                    }
                    this.sdata.appendChild(fdiv);
                    sameparcelcodecount+=1
                }else{

                }
            }
        }
    }

    titleBar(){
        
        var titlebar=document.createElement('div');
        titlebar.id='titlebar';
    
        const orderlist= this.selectoutputcontroller.getFieldStringController();
        for(let s of orderlist){
        
        //for(var s in a.data[0]){
            if(s == 'numid'||s=='status1text'||s=='status2text'||s=='status3text'||s=='status0pic'||s=='status1pic'||s=='status3pic'||s=='arrival1num'||s=='arrival2num'||s=='arrival3num'){
            }else if(s=='arrival0num'){
                var titlecontent=document.createElement('div');
                titlecontent.innerHTML='arrivalNum';
                titlecontent.className='arrivalNum';
                titlebar.appendChild(titlecontent);

            }else if(s=='status0text'){
                var titlecontent=document.createElement('div');
                titlecontent.innerHTML='statustext';
                titlecontent.className='statustext';
                titlebar.appendChild(titlecontent);

            }else if(s=='status2pic'){
                var titlecontent=document.createElement('div');
                titlecontent.innerHTML='statusPic';
                titlecontent.className='statusPic';
                titlebar.appendChild(titlecontent);

            }else{
                var titlecontent=document.createElement('div');
                titlecontent.innerHTML=s;
                titlecontent.className=s;
                titlebar.appendChild(titlecontent);
            }
        //}
        }
        this.sdata.appendChild(titlebar);

        //console.log(this.selectoutputcontroller());
    }
  
};

const pgroup=new SelectOutputComponent();
