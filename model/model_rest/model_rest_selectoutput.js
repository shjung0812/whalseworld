//import { io } from 'socket.io-client';
export class SelectOutputModel {
    
    constructor() {
        this.socket = io('/whalse');
        console.log('model_rest_selectoutput - constructor');
        this.getParcelCodeStatusData();

    }
    
    getParcelCodeStatusData(){
        console.log(tooutput)
        return tooutput;
    }
    getFieldString(){
        return fieldstring;   
    }
    async requestBackData(){
        this.socket.emit('whalsegetdata',{selectpclist:this.getParcelCodeStatusData()});

        return new Promise((resolve,reject)=>{this.socket.on('whalsegetdataafter',(backdata)=>{
            try{
                resolve(backdata)
            }catch(e){
                reject(new Error(e))
            }
            
        })});
    }
 
};


