import {GetErrorDatafunction} from '/model/model_rest/model_rest_pcwaiting/model_rest_pcwaiting.js'
export class PcGroupController {
    constructor(){
        
        
        this.errorData = new GetErrorDatafunction();
    
    }

    indslotDataController(){
        return this.errorData.indSlot();
    }
}


