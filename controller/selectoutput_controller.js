import {SelectOutputModel} from '/model/model_rest/model_rest_selectoutput.js'
export class SelectOutputController {
    constructor(){
        this.selectoutputmodel=new SelectOutputModel();
    
    }
    getBackdataController(){
        return this.selectoutputmodel.getBackdata();
    }
    

    
}

