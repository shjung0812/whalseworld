//import { io } from 'socket.io-client';
export class GetErrorDatafunction {
    
    constructor() {
        //this.io = socketIO('/');
        console.log(io('/whalse'))
    }
    
    test(){
        return io('/whalse')
    }
};


