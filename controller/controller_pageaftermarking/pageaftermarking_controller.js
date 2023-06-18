import {PageAfterMarkingModel} from '/model/model_rest/model_rest_pageaftermarking/model_rest_pageaftermarking.js'
export class PageAfterMarkingController {
    constructor(){
        
        
        this.varPageAfterMarkingModel = new PageAfterMarkingModel();
        
    
    }

    async getRemainedDataController(){
        return await this.varPageAfterMarkingModel.getRemainedDataModel();
    }
    
}

const varPageAfterMarkingContoller=new PageAfterMarkingController();
varPageAfterMarkingContoller.getRemainedDataController();
