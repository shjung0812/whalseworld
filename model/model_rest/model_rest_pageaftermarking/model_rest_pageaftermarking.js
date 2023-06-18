//import { io } from 'socket.io-client';
export class PageAfterMarkingModel {
    
    constructor() {
        this.socket = io('/whalse');
        
        console.log('here is the getpageaftermarking - model constructor')
    }
    
    async getRemainedDataModel(numi){
        this.socket.emit('getpageaftermarking',{mode:'askdata'});
        console.log('here is the getpageaftermarking - model datasended')
        return new Promise((resolve,reject)=>(
            this.socket.on('getpageaftermarkingafter',(data) => (
                resolve(data)
            ))
        ));
    }

};


