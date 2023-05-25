import {GetErrorDatafunction} from '/model/model_rest/model_rest_pcwaiting/model_rest_pcwaiting.js'
export class PcGroupController {
    constructor(){
        
        
        this.errorData = new GetErrorDatafunction();
    
    }

    async removePC_oneController(numid){
        
        
        return await this.errorData.removePC_one(numid);
    }
    async indslotDataController(){
        return await this.errorData.indSlot();
    }
    async errListController(){
        return await this.errorData.errList();
    }
    async backdataController(){
        return await this.errorData.backdata();
    }
}


