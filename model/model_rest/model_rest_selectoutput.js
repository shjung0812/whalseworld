//import { io } from 'socket.io-client';
export class SelectOutputModel {
    
    constructor() {
        this.socket = io('/whalse');
        console.log('model_rest_selectoutput - constructor');
        this.getBackdata();
    }
    
    getBackdata(){
        console.log(tooutput);
    }
 
};

const k = new SelectOutputModel();
console.log(k);
