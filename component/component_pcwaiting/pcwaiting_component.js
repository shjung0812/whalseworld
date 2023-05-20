import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
//import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
class PcGroup {
    constructor() {  
        this.boxA();
        this._indslot=null
        
    };

    async boxA(){
        this._indslot = new PcGroupController()
        
        const indslotData= await this._indslot.indslotDataController();
    
        
		var errorboard=document.getElementById('errorboard');
		this.removeallele('errorboard');
        for(var ia=0; ia<indslotData.length; ia++){
                var conA1=document.createElement('div');
                conA1.className='container conA1'
                
                errorboard.appendChild(conA1);
        }


    }

    
    removeallele(parentid){
        var parent=document.getElementById(parentid);
        while(parent.firstChild){
            parent.firstChild.remove();
        }
    }
};

const pgroup=new PcGroup();
