//import { io } from 'socket.io-client';
export class SelectOutputModel {
    
    constructor() {
        this.socket = io('/whalse');
        console.log('model_res_selectoutput - constructor');
    }
    
 
};

const k = new SelectOutputModel();
console.log(k);

