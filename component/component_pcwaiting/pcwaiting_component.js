
import {PcGroupController} from '/controller/controller_pcwaiting/pcwaiting_controller.js'
class PcGroup {
    constructor() {
        const testdiv=document.createElement('div');
        testdiv.innerHTML=PcGroupController.datavalue.length;
        document.body.appendChild(testdiv)
    

    };
};

new PcGroup();