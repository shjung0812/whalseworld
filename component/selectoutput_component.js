import { SelectOutputController } from "/controller/selectoutput_controller.js";
//import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
class SelectOutputComponent {
    constructor() {  
        
        this.selectoutputcontroller = new SelectOutputController();
        console.log('Selectoutput_conponent.js constructor')
        console.log(this.selectoutputcontroller.getBackdataController());
        this.titleBar();
        
    };


    titleBar(){
        var sdata=document.getElementById('showdata');
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
        sdata.appendChild(titlebar);

        //console.log(this.selectoutputcontroller());
    }
  
};

const pgroup=new SelectOutputComponent();
