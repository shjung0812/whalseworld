function checkNumGiven(UgivenNum,searchlist){
    
    var pugivenum=UgivenNum.trim()
    if(isNaN(pugivenum) || UgivenNum.trim()==''){
            alert('숫자를 넣으세요.')
            
    }else{
        
        var order_quantity=0;
        for(var ia=0; ia<searchlist.length; ia++){
            if(isNaN(searchlist[ia][1])){
                console.log('경고: 백데이터의 order_quantity에 숫자가 아닌 문자가 포함되어 있음. 무시하고 진행함');
            }else{
                order_quantity+=Number(searchlist[ia][1]);

            }
            
        }

        if(order_quantity==Number(UgivenNum.trim())){
        }else{
            alert('수량이 상이합니다. 그대로 진행하시겠습니까?')
            console.log(order_quantity)
        }
    }
    
    
}
function removeallele(parentid){
    var parent=document.getElementById(parentid);
    while(parent.firstChild){
        parent.firstChild.remove();
    }
}

function searchByOrderday(ini,fdiv,numid){


    //서치가 실행됬을 때 키워드 가져온다. 
    var keyword=document.getElementById('ordersearchinput'+numid).value;

    var UgivenNum=document.getElementById('dummycountdiv'+numid).value;
    
    removeallele('containerdiv2'+numid);
    if(keyword!=''){
        var searchlist=[];
        var _chkpc=0;
        for(var ia=0; ia<ini.length; ia++){
            if(keyword==ini[ia].w_orderday){
    
                var chk=0;
                for(var ib=0; ib<searchlist.length; ib++){
                    if(searchlist[ib]==ini[ia].ordernum){
                        chk=1;
                        break;
                    }
                }
                if(chk==0){
                    var sdiv=document.createElement('div');
                    var sdiva=document.createElement('a');
                    sdiv.className='ordernumsdiv'
                    sdiva.innerHTML=ini[ia].ordernum;
                    
                    var sbutton=document.createElement('button');	
                    sbutton.onclick=function(i){
                        return function(){
                            window.open("https://trade.1688.com/order/new_step_order_detail.htm?orderId="+i+"&tracelog=20120313bscentertologisticsbuyer&#logisticsTabTitle");
                        }
                    }(ini[ia].ordernum);
                    sbutton.innerHTML='Link';


                    sdiv.appendChild(sdiva);	
                    sdiv.appendChild(sbutton);	
                    fdiv.appendChild(sdiv);	
                    searchlist.push([ini[ia].ordernum,ini[ia].order_quantity]);
                }

                if((ini[ia].parcel_code!='') &&(ini[ia].parcel_code!='미출발')){
                    _chkpc=1;
                }
            }
        }
        
        if(searchlist.length==0){
            alert('No search Result');
            checkNumGiven(UgivenNum,searchlist)
        }else{
            checkNumGiven(UgivenNum,searchlist)
            if(_chkpc==0){
                alert('해당 주문번호에 송장번호가 하나도 입력되어있지 않습니다. 그대로 진행 하시겠습니까?');
            }else{

            }

        }

    }else{
        alert('insert keyword');
    }
}

