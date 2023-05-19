import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
//import { PcGroupController } from './pcwaiting_controller.js';
class PcGroup {
    constructor() {
              
    

    };

    init(){
        const testdiv=document.createElement('div');
        //testdiv.innerHTML='hannnnmaum'
        const p=new PcGroupController
        testdiv.innerHTML=p.datavalue.length;
        document.body.appendChild(testdiv)

    }
};

const pgroup=new PcGroup();
pgroup.init();