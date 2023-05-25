import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
//import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
class PcGroup {
    constructor() {  
        
        this._pcwaiting=null;
        this._errorlist=null;
        this._backdata=null;
        this.boxA();
    };

    async boxA(){
        this._pcwaiting = new PcGroupController()     
        const indslotData= await this._pcwaiting.indslotDataController();
        this._errorlist = await this._pcwaiting.errListController();
        this._backdata = await this._pcwaiting.backdataController();
        console.log(indslotData)
		var errorboard=document.getElementById('errorboard');
		this.removeallele('errorboard');
        for(var ia=0; ia<indslotData.length; ia++){
                var conA1=document.createElement('div');
                conA1.className='container conA1';
                this.titleBasicInfo(conA1);
                for(var ib=0; ib<this._errorlist.errdata.length;ib++){
                    if(indslotData[ia][0]==this._errorlist.errdata[ib].registereddate && indslotData[ia][1]==this._errorlist.errdata[ib].roundnum && indslotData[ia][2]==this._errorlist.errdata[ib].branchoffice && this._errorlist.errdata[ib].transform=='ini'){
                        this.contentBox(conA1,this._errorlist.errdata[ib],ib);
                    }
                }
                this.complteButton(conA1,ia)
                errorboard.appendChild(conA1);

                
        }


    }
    contentBoxCol4(col4, numid){
        const ordernumresultdiv=document.createElement('div');
        ordernumresultdiv.className='';
        ordernumresultdiv.id='ordernumresultdiv'+numid;
        col4.appendChild(ordernumresultdiv);
    }
    contentBoxCol1(col1, num){
        const conB=document.createElement('div');
        conB.className='container text-center';
        conB.id='col1button'

        const buttonB=document.createElement('button')
        buttonB.type='button';
        buttonB.className='btn btn-primary';

        const spanB=document.createElement('span')
        spanB.innerHTML=num;

        buttonB.appendChild(spanB);

        conB.appendChild(buttonB)
        col1.appendChild(conB);
    }
    contentBoxCol3(col3, e){
        const row1=document.createElement('div')
        row1.className='col-12';
        const row2=document.createElement('div')
        row2.className='col-12';
        const row3=document.createElement('div')
        row3.className='col-12';
        col3.appendChild(row1)

            var ordersearchinput=document.createElement('input');
            ordersearchinput.placeholder='발주코드입력';
            ordersearchinput.id='ordersearchinput'+e.numid;
            row1.appendChild(ordersearchinput)


        col3.appendChild(row2)

            var dummyinput=document.createElement('input');
            dummyinput.id='dummycountdiv'+e.numid;
            dummyinput.placeholder='송장의 수량입력';
            row2.appendChild(dummyinput);


        col3.appendChild(row3)

            var schbuttondiv=document.createElement('div')
            schbuttondiv.className='row col-12 justify-content-end';
            var schbutton=document.createElement('button');
            schbutton.className='col-4'
            schbuttondiv.appendChild(schbutton)
            col3.appendChild(schbuttondiv);
            schbutton.innerHTML='Search';
            
            
            schbutton.onclick=()=>{
                const k=e.numid;
                this.searchByOrderday(k);
                
            };


        /*
        var pcinputdiv=document.createElement('div');
        pcinputdiv.className='pcinputdiv';
        var containerdiv1=document.createElement('div');
        pcinputdiv.appendChild(containerdiv1);

        var ordersearchinput=document.createElement('input');
        ordersearchinput.id='ordersearchinput'+errlist[ia].numid;
        containerdiv1.appendChild(ordersearchinput);

        var containerdiv2=document.createElement('div');
        containerdiv2.id='containerdiv2'+errlist[ia].numid;
        containerdiv2.className='containerdiv2';
        pcinputdiv.appendChild(containerdiv2);



        var schbutton=document.createElement('button');
        containerdiv1.appendChild(schbutton);
        schbutton.innerHTML='Search';
        schbutton.onclick=function(i,j,k){
            return function(){
                searchByOrderday(i,j,k)
            }
        }(a.a,containerdiv2,errlist[ia].numid);*/




    }
    contentBox(conA1,e,c){
        
        var conB1=document.createElement('div');	
        conB1.className='container text-center';


        var row1=document.createElement('div');
        row1.className='row'


        var col1=document.createElement('div');
        col1.className='col-md-2 col4';
        this.contentBoxCol1(col1,c+1)
        

        var col2=document.createElement('div');
        col2.className='col-md-4 col4';

            var inforow=document.createElement('div');
            inforow.className='d-flex-row mb-3'

            var info1=document.createElement('div')
            info1.className='p-2 row';

                var drawer1=document.createElement('div');
                drawer1.className='col';
                drawer1.innerHTML='대기송장순서';
                var drawer2=document.createElement('div');
                drawer2.className='col';
                drawer2.innerHTML=e.registernum;
                info1.appendChild(drawer1);
                info1.appendChild(drawer2);


            var info2=document.createElement('div')
            info2.className='p-2 row';

                var adrawer1=document.createElement('div');
                adrawer1.className='col';
                adrawer1.innerHTML='송장번호';
                var adrawer2=document.createElement('div');
                adrawer2.className='col';
                adrawer2.innerHTML=e.errparcelcode;
                info2.appendChild(adrawer1);
                info2.appendChild(adrawer2);


            var info3=document.createElement('div')
            info3.className='p-2 row';
                var bdrawer1=document.createElement('div');
                bdrawer1.className='col';
                bdrawer1.innerHTML='송장사진';
                var bdrawer2=document.createElement('div');
                bdrawer2.className='col';
                bdrawer2.innerHTML='';

                
                info3.appendChild(bdrawer1);
                info3.appendChild(bdrawer2);
                

            var info4=document.createElement('div')
            info4.className='p-2';
                var cdrawer1=document.createElement('figure');
                cdrawer1.className='figure';
                
                
                if(e.errorpic!=null){
                    var cimg=document.createElement('img');
                    cimg.className='figure-img img-fluid rounded'
                    cimg.src='/whalse/whalsewaiting/'+e.errorpic;
                    cdrawer1.appendChild(cimg);
                }else{
                }
                info4.appendChild(cdrawer1);





            inforow.appendChild(info1)
            inforow.appendChild(info2)
            inforow.appendChild(info3)
            inforow.appendChild(info4)

        col2.appendChild(inforow);

        
        var col3=document.createElement('div');
        col3.className='col-md-2 col4';
        this.contentBoxCol3(col3, e)

        var col4=document.createElement('div');
        col4.className='col-md-2 col4';
        this.contentBoxCol4(col4, e.numid)
        row1.appendChild(col1);

        row1.appendChild(col2);
        row1.appendChild(col3);
        row1.appendChild(col4);



        var row2=document.createElement('div');
        row2.className='row'


            var col2_1=document.createElement('div');
            col2_1.className='col-10'
            

            var col2_2=document.createElement('div');
            col2_2.className='col-1 removediv'
            
            col2_2.innerHTML='remove';
            

            col2_2.onclick=()=>{
                
                this._pcwaiting.removePC_oneController(e.numid).then(()=>{
                    location.reload();
                });
                alert('delete'+e.numid);
                
            }

            var col2_3=document.createElement('div');
            col2_3.className='col-1'
            col2_3.innerHTML='바로출고'

        row2.appendChild(col2_1);
        row2.appendChild(col2_2);
        

        row2.appendChild(col2_3);



        conB1.appendChild(row1);
        conB1.appendChild(row2);
        

        conA1.appendChild(conB1);
        
        
 
    }

    complteButton(conA1,indslotnum){
        var chk0=1;
        for(var ic=0; ic<this._errorlist.pclist[indslotnum].length; ic++){
            var chk1=0;
            for(var id=0; id<this._backdata.length; id++){
                if(this._errorlist.pclist[indslotnum][ic]==this._backdata.parcel_code){
                    chk1=1;
                    break;
                    
                }
            }
            if(chk1==0){
                chk0=0;
                break;
            }
        }	
        var completediv=document.createElement('div');
       // completediv.className='completediv'
        completediv.innerHTML='완료';
        conA1.appendChild(completediv);


    
        if(chk0==0){
            completediv.style.color='red';
        }else{
        }


        completediv.onclick=function(i,j){
            return function(){
                if(j==1){
                    //socket.emit('errorboard',{option:'complete',errstr:i});	
                }else{
                    alert('no parcelcode data');
                }
            }
        }(this._errorlist.relatederr[indslotnum], chk0);

        completediv.addEventListener('mouseover',function(j){
            return function(){
                if(j==1){
                    this.style.backgroundColor='purple';
                    this.style.color='white';
                }
            }
        }(chk0));

        completediv.addEventListener('mouseout',function(j){
            return function(){
                if(j==1){
                    this.style.backgroundColor='';
                    this.style.color='black';
                }
            }


        }(chk0));
        
        
    }


    titleBasicInfo(conA1){

        var title_basic_info_div=document.createElement('div');
        title_basic_info_div.className='container text-center'
        //title_basic_info_div.className='card'


        var basic_title_div=document.createElement('div')
        basic_title_div.className='row'

        var basic_title1_div=document.createElement('div');
        basic_title1_div.className='col-8 col-sm-2'
        var basic_title1_span=document.createElement('span');
        basic_title1_span.className='badge bg-primary';
        basic_title1_span.innerHTML='스캔차수';
        basic_title1_div.appendChild(basic_title1_span)
        basic_title_div.appendChild(basic_title1_div);
        var basic_title2_div=document.createElement('div');
        basic_title2_div.className='col-6 col-sm-4 border';
        basic_title2_div.innerHTML='col-6 col-sm-4';
        basic_title_div.appendChild(basic_title2_div);

        
        var basic_title_forcebreak=document.createElement('div');
        basic_title_forcebreak.className='w-100 d-none d-md-block'
        basic_title_div.appendChild(basic_title_forcebreak);
        //title_basic_info_div.appendChild(basic_title1_span)


        var basic_title1_div=document.createElement('div');
        basic_title1_div.className='col-8 col-sm-2'
        var basic_title1_span=document.createElement('span');
        basic_title1_span.className='badge rounded-pill bg-secondary';
        basic_title1_span.innerHTML='송장수';
        basic_title1_div.appendChild(basic_title1_span)
        basic_title_div.appendChild(basic_title1_div);
        var basic_title2_div=document.createElement('div');
        basic_title2_div.className='col-6 col-sm-4 border';
        basic_title2_div.innerHTML='col-6 col-sm-4';
        basic_title_div.appendChild(basic_title2_div);

        var basic_title_forcebreak=document.createElement('div');
        basic_title_forcebreak.className='w-100 d-none d-md-block'
        basic_title_div.appendChild(basic_title_forcebreak);



        var basic_title1_div=document.createElement('div');
        basic_title1_div.className='col-8 col-sm-2'
        var basic_title1_span=document.createElement('span');
        basic_title1_span.className='badge bg-warning';
        basic_title1_span.innerHTML='대기송장순서';
        basic_title1_div.appendChild(basic_title1_span)
        basic_title_div.appendChild(basic_title1_div);
        var basic_title2_div=document.createElement('div');
        basic_title2_div.className='col-6 col-sm-4 border';
        basic_title2_div.innerHTML='col-6 col-sm-4';
        basic_title_div.appendChild(basic_title2_div);



        title_basic_info_div.appendChild(basic_title_div)
        conA1.appendChild(title_basic_info_div)

    }
    
    removeallele(parentid){
        var parent=document.getElementById(parentid);
        while(parent.firstChild){
            parent.firstChild.remove();
        }
    }


    checkNumGiven(UgivenNum,searchlist){
    
        var pugivenum=UgivenNum.trim()
        if(isNaN(pugivenum) || UgivenNum.trim()==''){
                alert('숫자를 넣으세요.')
                
        }else{
            
            var order_quantity=0;
            for(var ia=0; ia<searchlist.length; ia++){
                if(isNaN(searchlist[ia][1])){
                    console.log('경고: 백데이터의 order_quantity에 숫자가 아닌 문자가 포함되어 있음. 무시하고 진행함');
                }else{
                    order_quantity+=Number(searchlist[ia][1]);
    
                }
                
            }
    
            if(order_quantity==Number(UgivenNum.trim())){
            }else{
                alert('수량이 상이합니다. 그대로 진행하시겠습니까?')
                console.log(order_quantity)
            }
        }
        
        
    }

    searchByOrderday(numid){
        const ini = this._backdata;
        console.log(numid)
        //서치가 실행됬을 때 키워드 가져온다. 
        var keyword=document.getElementById('ordersearchinput'+numid).value;
    
        var UgivenNum=document.getElementById('dummycountdiv'+numid).value;
        
        this.removeallele('ordernumresultdiv'+numid);
        if(keyword!=''){
            var searchlist=[];
            var _chkpc=0;
            for(var ia=0; ia<ini.length; ia++){
                if(keyword==ini[ia].w_orderday){
        
                    var chk=0;
                    for(var ib=0; ib<searchlist.length; ib++){
                        if(searchlist[ib]==ini[ia].ordernum){
                            chk=1;
                            break;
                        }
                    }
                    if(chk==0){
                        var sdiv=document.createElement('div');
                        var sdiva=document.createElement('a');
                        sdiv.className='ordernumsdiv'
                        sdiva.innerHTML=ini[ia].ordernum;
                        
                        var sbutton=document.createElement('button');	
                        sbutton.onclick=function(i){
                            return function(){
                                window.open("https://trade.1688.com/order/new_step_order_detail.htm?orderId="+i+"&tracelog=20120313bscentertologisticsbuyer&#logisticsTabTitle");
                            }
                        }(ini[ia].ordernum);
                        sbutton.innerHTML='Link';
    
    
                        sdiv.appendChild(sdiva);	
                        sdiv.appendChild(sbutton);	
                        document.getElementById('ordernumresultdiv'+numid).appendChild(sdiv);	
                        searchlist.push([ini[ia].ordernum,ini[ia].order_quantity]);
                    }
    
                    if((ini[ia].parcel_code!='') &&(ini[ia].parcel_code!='미출발')){
                        _chkpc=1;
                    }
                }
            }
            
            if(searchlist.length==0){
                alert('No search Result');
                this.checkNumGiven(UgivenNum,searchlist)
            }else{
                this.checkNumGiven(UgivenNum,searchlist)
                if(_chkpc==0){
                    alert('해당 주문번호에 송장번호가 하나도 입력되어있지 않습니다. 그대로 진행 하시겠습니까?');
                }else{
    
                }
    
            }
    
        }else{
            alert('insert keyword');
        }
    }
    

};

const pgroup=new PcGroup();
