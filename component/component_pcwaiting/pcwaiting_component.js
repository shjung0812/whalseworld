import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
//import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
class PcGroup {
    constructor() {  
        
        this._pcwaiting=null;
        this._errorlist=null;
        this.boxA();
    };

    async boxA(){
        this._pcwaiting = new PcGroupController()     
        const indslotData= await this._pcwaiting.indslotDataController();
        this._errorlist = await this._pcwaiting.errListController();
		var errorboard=document.getElementById('errorboard');
		this.removeallele('errorboard');
        for(var ia=0; ia<indslotData.length; ia++){
                var conA1=document.createElement('div');
                conA1.className='container conA1';
                this.titleBasicInfo(conA1);
                console.log(this._errorlist)
                for(var ib=0; ib<this._errorlist.length;ib++){
                    if(indslotData[ia][0]==this._errorlist[ib].registereddate && indslotData[ia][1]==this._errorlist[ib].roundnum && indslotData[ia][2]==this._errorlist[ib].branchoffice && this._errorlist[ib].transform=='ini'){
                        this.contentBox(conA1,this._errorlist[ib]);
                    }
                }
                
                errorboard.appendChild(conA1);
        }


    }
    contentBox(conA1,e){
        
            var conB1=document.createElement('div');	
            conB1.className='container text-center';


            var row=document.createElement('div');
            row.className='row'


            var col1=document.createElement('div');
            col1.className='col-md-2 col4';
            col1.innerHTML='1'

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
                    info1.appendChild(drawer1);
                    info1.appendChild(drawer2);


                var info2=document.createElement('div')
                info2.className='p-2 row';

                    var adrawer1=document.createElement('div');
                    adrawer1.className='col';
                    adrawer1.innerHTML='송장번호';
                    var adrawer2=document.createElement('div');
                    adrawer2.className='col';
                    adrawer2.innerHTML='222';
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
            col3.innerHTML='1'
            var col4=document.createElement('div');
            col4.className='col-md-2 col4';
            col4.innerHTML='5'
            row.appendChild(col1);

            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);

            conB1.appendChild(row);


            conA1.appendChild(conB1);
 
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
};

const pgroup=new PcGroup();
