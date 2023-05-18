class PcGroup {
    constructor() {
        const script=document.createElement('script');
        script.src="/controller/controller_pcwaiting/pcwaiting_controller.js"
        script.type='module'
        document.body.appendChild(script)
        
    

    };

    init(){
        const testdiv=document.createElement('div');
        testdiv.innerHTML=''
        ///testdiv.innerHTML=PcGroupController.datavalue.length;
        document.body.appendChild(testdiv)

    }
};

const pgroup=new PcGroup();
pgroup.init();