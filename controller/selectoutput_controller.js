import {SelectOutputModel} from '/model/model_rest/model_rest_selectoutput.js'
export class SelectOutputController {
    constructor(){
        this.selectoutputmodel=new SelectOutputModel();
    
    }
    getParcelCodeStatusDataController(){
        return this.selectoutputmodel.getParcelCodeStatusData();
    }
    getFieldStringController(){
        const fieldstring = this.selectoutputmodel.getFieldString();
        if(fieldstring != null){
			var orderlist = fieldstring.split(',');
		}else{
			var orderlist=['statuscode','arrival0num','arrival1num','arrival2num','arrival3num','status0text','status1text','status2text','status3text','status0pic','status1pic','status2pic','status3pic','imageaddr','countnum','optiondetail','productname','barcodenum','orderdate','departureoption','timedeparture','invoicenum','invoicenummatch','chinesesize','chineseoption','chineseproduct','optioncode','product','documentnum','ordernum2','compnum','ordernum','numid']
			//var orderlist=['timedeparture','invoicenum','invoicenummatch','chinesesize','chineseoption','chineseproduct','optioncode','product','documentnum','ordernum2','compnum','ordernum','numid']
		}
		
		orderlist.splice(3,0,'comb1')
		orderlist.splice(5,0,'comb2')
		orderlist.splice(7,0,'comb3')


        return orderlist;
    }
    async getBackData(){
        return await this.selectoutputmodel.requestBackData();
    }

    
}

