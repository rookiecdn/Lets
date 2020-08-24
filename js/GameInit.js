/*初始游戏状态*/
const state = {
    play:true,    //是否正在玩
    score:0,
    time:60,
    /*老师来了没的状态*/
    TeacComein:false,
    TeacX:0,     /*老师出现时的X的位置*/
    TeacY:0,     /*老师出现时的Y的位置*/
    /*初始化的书,尺子数据*/
    BookArrays:[],
    RulerArrays:[],
    SmokesArrays:[],
    /*创建书,尺子的时间间隔*/
    BookInter:0,
    RulerInter:0,
    SmokeInter:0,
    /*创建所有图片的结构*/
    CreateIma(name,classname,x,y,img,n){
        let newImg = new Image();  /* 创建一个障碍物 */
        name = newImg;
        //n为true设置id  否则不设置
        if(n) name.id = classname;
        name.ondragstart = false;
        name.src = "img/"+img;
        name.className = classname;
        name.style.left = x + 'px';
        name.style.top = y + 'px';
        return name;
    },
    /*判断间隔是否为真*/
    AddInterBool(arr,value,inter,tvalue){  //数组,数据,间隔,间隔值
        let time = new Date().getTime();
        if(time-this[inter]>=tvalue){
            arr.push(value);
            this[inter] = time;
        }
    },
    /*输出数组中的元素*/
    ShowArrays(arr,parentNode){
        arr.forEach((v,i)=>{
            parentNode.appendChild(v);
        })
    },
    /*移动数组中的元素*/
    MoveArrays(arr,top){
        arr.forEach((v,i)=>{
            $(v).animate({top:top},(Math.floor(Math.random() * (5 - 3)) + 3)*1000);
        })
    },
    /*消除数组中的指定数据*/
    DeleteArrays(arr,IF){
        arr.forEach((v,i)=>{
            if( parseInt($(v).css('top')) === IF){
                arr.splice(i,1);
                $(v).remove();
            }
        });
    },
    /*碰撞消除道具*/
    PropClear(arr,i,className,callback){
        arr.splice(i,1);
        $("."+className).eq(i).hide().remove();
        callback();
    },
    /*检测碰撞系统*/
    Collision(a,brr,ax,ay,brrx,brry,callback){
        //a的四个角
        var aT = parseInt($("#"+a).css('top')),        /*  a上边  */
            aL = parseInt($("#"+a).css('left')),       /*  a左边  */
            aR = parseInt($("#"+a).css('left'))+ax,    /*  a右边  */
            aB = parseInt($("#"+a).css('top'))+ay;     /*  a下边  */
        brr.forEach((v,i)=>{
            //brr的四个角
            let bT = parseInt($(v).css('top')),            /*  b上边  */
                bL = parseInt($(v).css('left')),           /*  b左边  */
                bR = parseInt( $(v).css('left'))+brrx,      /*  b右边  */
                bB = parseInt($(v).css('top'))+brry;       /*  b下边  */
            if(
                !(aL >  bR ||  aR < bL || aB < bT || aT > bB)
            ){
                callback(i);
            }
        })
    },
    /* 判断玩家老师来的情况下是否还在移动 */
    Stop(x,y,lx,ly){
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.lx = parseInt(lx);
        this.ly = parseInt(ly);
        if(!(this.x === lx && this.y === ly)){
           return true;
        }
    },
    /* 构造成绩星星 */
    Start(n){
        let i = 1;
        let STAR = "";
        do{
           STAR += "⭐";
        }while(i>=n);
        return STAR;
    },
    /*再玩一次*/
    AgainGame(arr){
        arr.forEach((v,i)=>{
            arr.splice(i,1);
            $(v).remove();
        });
    }
};
var GameInit = state;
export {
    GameInit
}


