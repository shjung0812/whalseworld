//import { io } from 'socket.io-client';
export class GetErrorDatafunction {
    
    constructor() {
        this.socket = io('/whalse');
        this.responsed=null;

    
    }
    
    async indSlot(){
        this.responsed = await this.requestData();
        const response = this.responsed.err;
        
        var indslot=[];
        for(var ia=0; ia<response.length; ia++){
            var chk=0;
            if(response[ia].transform=='ini'){
                for(var ib=0; ib<indslot.length; ib++){
                    if(indslot[ib][0]==response[ia].registereddate && indslot[ib][1]==response[ia].roundnum && indslot[ib][2]==response[ia].branchoffice){
                        chk=1;
                        break;
                    }
                }
                if(chk==0){
                    indslot.push([response[ia].registereddate, response[ia].roundnum, response[ia].branchoffice]);
                }
            }
        }

        
        return indslot;
    }

    async requestData(){

        this.socket.emit('errorboard',{option:'call'});
        return new Promise((resolve,reject)=>(
            
            this.socket.on('errorboardafter',(data) => (
                resolve(data)
            ))
        ));
    }
};


