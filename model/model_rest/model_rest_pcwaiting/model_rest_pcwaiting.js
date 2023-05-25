//import { io } from 'socket.io-client';
export class GetErrorDatafunction {
    
    constructor() {
        this.socket = io('/whalse');
        this.responsed=null;
        this.indslot=[];
        

    
    }
    
    async removePC_one(numid){
        //this.socket.emit('errorboard',{option:'remove',numid:numid});	
        
        return new Promise((resolve,reject)=>(
            
            this.socket.on('errorboardafter',(data) => (
                resolve(data)
            ))
        ));
    }
    async backdata(){
        
        return this.responsed.a;
    }
    async errList(){
        const errdata=this.responsed.err;
        const pclist=[];
        const relatederr=[];
        
        for(var ia=0; ia<this.indslot.length; ia++){
            var errpclist=[];
            var rel=[];
            for(var ib=0; ib<errdata.length;ib++){
                if(this.indslot[ia][0]==errdata[ib].registereddate && this.indslot[ia][1]==errdata[ib].roundnum && this.indslot[ia][2]==errdata[ib].branchoffice && errdata[ib].transform=='ini'){
                    errpclist.push(errdata[ib].errparcelcode);
                    
                    rel.push(errdata[ib].numid);
                }
            }
            pclist.push(errpclist);
            relatederr.push(rel);
        }


        return {'errdata':this.responsed.err,'pclist':pclist,'relatederr':relatederr};
    }
    async indSlot(){
        this.responsed = await this.requestData();
        const response = this.responsed.err;
        
        
        for(var ia=0; ia<response.length; ia++){
            var chk=0;
            if(response[ia].transform=='ini'){
                for(var ib=0; ib<this.indslot.length; ib++){
                    if(this.indslot[ib][0]==response[ia].registereddate && this.indslot[ib][1]==response[ia].roundnum && this.indslot[ib][2]==response[ia].branchoffice){
                        chk=1;
                        break;
                    }
                }
                if(chk==0){
                    this.indslot.push([response[ia].registereddate, response[ia].roundnum, response[ia].branchoffice]);
                }
            }
        }

        
        return this.indslot;
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


