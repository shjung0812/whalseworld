export class RowContentMember {
    constructor(){
        
    }
    static run({receiveddom,targetdom}){
        targetdom.appendChild(receiveddom);
    }

}
