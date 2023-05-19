import { PcGroupController } from "/controller/controller_pcwaiting/pcwaiting_controller.js";
class PcGroup {
    constructor() {  
        this.boxA();
        this._indslot=null
        
    };

    async boxA(){
        this._indslot = new PcGroupController()
        
        const indslotData= await this._indslot.indslotDataController();
        console.log(indslotData)

        for(var ia=0; ia<indslotData.length; ia++){
            console.log(indslotData[ia])
        }

        const testdiv=document.createElement('div');
        testdiv.innerHTML='hannnnmaum'
        
        //testdiv.innerHTML=p.datavalue.length;
        document.body.appendChild(testdiv)

    }s
};

const pgroup=new PcGroup();
