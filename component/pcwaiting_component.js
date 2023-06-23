import { SelectOutputController } from "/controller/selectoutput_controller.js";
//import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
class SelectOutputComponent {
    constructor() {  
        
        this.selectoutputcontroller = new SelectOutputController();
        console.log(this.selectoutputcontroller.getBackdataController());
        
    };


    displayBackdataComponent(){
        //console.log(this.selectoutputcontroller());
    }
  
};

const pgroup=new SelectOutputComponent();
