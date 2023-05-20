
export class CommonComponent {
    constructor(){

    }

    removeallele(parentid){
        var parent=document.getElementById(parentid);
        while(parent.firstChild){
            parent.firstChild.remove();
        }
    }
}
