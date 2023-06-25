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
        console.log(orderlist);
        for(var is=0; is<receivedparcelcode.length; is++){  //Start:for(var is=0; is<tooutput.length; is++){
            var sameparcelcodecount=0; 
            var chkk=0;
            
            for(var ia=0; ia<rowbackdata.data.length; ia++){  //start: for(var ia=0; ia<a.data.length; ia++){ 
                if(rowbackdata.data[ia].parcel_code==receivedparcelcode[is][5]){  
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
                        RowContentMember.run({targetdom:fdiv,receiveddom:sdiv});
                        if(v=='img_url'){
                            RowContentMember.imgurlcontent({usedata:rowbackdata.data[ia][v],targetdom:fdiv,receiveddom:sdiv});

                        }else if(v=='madenum'){
                            datacount=RowContentMember.madenumcontent({usedata:rowbackdata.data,orderlist:v,forcount:ia,targetdom:fdiv,receiveddom:sdiv});
                            
                        }else if(v=='numid'){
                        }else if(v=='status0text'||v=='status1text' || v=='status2text' || v=='status3text'||v=='status0pic'||v=='status1pic'||v=='status2pic'||v=='status3pic'||v=='arrival0num'||v=='arrival1num'||v=='arrival2num'||v=='arrival3num'){
                            RowContentMember.statuscontent({usedata:rowbackdata.data,orderlist:v,forcount:ia,targetdom:fdiv,receiveddom:sdiv});                           
                        }else if(v=='parcelnumbering'){
                            RowContentMember.parcelnumberingcontent({receivedparcelcode:receivedparcelcode,receivednumber:is,usedata:rowbackdata.data,orderlist:v,forcount:ia,targetdom:fdiv,receiveddom:sdiv});                           
                        }else if(v=='statuscode'){
                            RowContentMember.statuscodecontent({receivedparcelcode:receivedparcelcode,receivednumber:is,usedata:rowbackdata.data,orderlist:v,forcount:ia,targetdom:fdiv,receiveddom:sdiv});                           
                        }else if(v=='comb1'){
                            RowContentMember.comb1content({receivedparcelcode:receivedparcelcode,receivednumber:is,usedata:rowbackdata.data,orderlist:v,forcount:ia,targetdom:fdiv,receiveddom:sdiv});                           
                        }else if(v=='comb2'){
                            RowContentMember.comb2content({receivedparcelcode:receivedparcelcode,receivednumber:is,usedata:rowbackdata.data,orderlist:v,forcount:ia,targetdom:fdiv,receiveddom:sdiv});                           
                           
                        }else if(v=='comb3'){
                            RowContentMember.comb3content({receivedparcelcode:receivedparcelcode,receivednumber:is,usedata:rowbackdata.data,orderlist:v,forcount:ia,targetdom:fdiv,receiveddom:sdiv});                           

                        }else{
                        
                            sdiv.id=rowbackdata.data[ia].numid+v;
                            sdiv.setAttribute('data-item',v);
                            sdiv.setAttribute('data-numid',rowbackdata.data[ia].numid);
                            var sdiva=document.createElement('a');	
                            sdiva.innerHTML=rowbackdata.data[ia][v];
                            sdiva.onclick=function(i,j,k,l){
                                return function(){
                                    editDetailItem(l,i,j,k);
                                }
                            }(v,rowbackdata.data[ia][v],sdiv,rowbackdata.data[ia].numid)

                            sdiv.appendChild(sdiva);
                            fdiv.appendChild(sdiv);
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
