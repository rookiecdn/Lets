/*加载游戏初始化变量*/
    import {GameInit} from "./GameInit.js";
/*加载初始化变量结束*/
/*加载Dom节点*/
const SCORE = document.getElementById('SCORE'),
      TIME = document.getElementById('TIME'),
      GetMePlayArea = document.getElementById('GetMePlayArea'),
      marks = document.getElementById('marks'),    //最终的分数
      level = document.getElementById('level'),    //最终的评级
      start = document.getElementById('start');    //最终的星星
/*加载Dom节点结束*/
window.onload = function () {
/*初始化游戏数据*/
    SCORE.innerHTML = GameInit.score;
    TIME.innerHTML = GameInit.time;
/*初始化游戏数据结束*/
    class GetMeGame{
        /*加载初始化变量*/
        constructor(){};
/*书的开始*/
        /*掉落书本*/
        CreateBook(){
            return GameInit.CreateIma("Books","Books",Math.random()*350,-60,'kb.png',false);
        };
        /*往数组中添加书本*/
        PushBooksArrays(){
            GameInit.AddInterBool(GameInit.BookArrays,this.CreateBook(),'BookInter',2000);
        };
/*书的结束*/
/*尺子的开始*/
        /*创建一个尺子道具*/
        CreateRuler(){
           return GameInit.CreateIma('Ruler','Ruler',Math.random()*352,-48,'wj.png',false);
        };
        /*将尺子放到尺子数组中*/
        PushRulerArrays(){
            GameInit.AddInterBool(GameInit.RulerArrays,this.CreateRuler(),'RulerInter',2000);
        };
/*尺子的结束*/
/*香烟的开始*/
        /*构造香烟*/
        CreateSmoke(){
            return GameInit.CreateIma('Smoke','Smoke',Math.random()*460,-54,'xy.png',false);
        };
        /*向数组中塞香烟*/
        PushSmokesArrays(){
            GameInit.AddInterBool(GameInit.SmokesArrays,this.CreateSmoke(),'SmokeInter',2000);
        };
/*香烟的结束*/
/*操作道具*/
        /*显示道具*/
        ShowPropArrays(arr,dom){
            GameInit.ShowArrays(arr,dom);
        }
        /*道具移动*/
        MovePropArrays(arr,top){
            GameInit.MoveArrays(arr,top);
        };
        /*消除多余道具*/
        DeletePropArrays(arr,top){
            GameInit.DeleteArrays(arr,top);
        }
/*操作道具结束*/
/*老师出现*/
        TeacComeIn(){
            GameInit.TeacComein = true;
            $("#Obstacle").animate({
                backgroundPosition:80
            },500,function () {
                GameInit.TeacX = $("#Pigs").css('top');
                GameInit.TeacY = $("#Pigs").css('left');
                setTimeout(()=>{
                    $("#Obstacle").animate({  backgroundPosition:230},500,function () {
                        GameInit.TeacComein = false;
                    });
                },5000);
            });
        };
/*老师出现结束*/
/*成绩结算*/
        Result(a,b,c){
            $("#Rank,#mubu").fadeIn(300);
            $("#marks,#level,#start").fadeIn(600);
            marks.innerHTML = a;
            level.innerHTML = b;
            start.innerHTML = c;
        };
/*成绩结算结束*/
/*再来一吧*/
        Again(){
            $("#Rank,#mubu").fadeOut();
            GameInit.AgainGame(GameInit.BookArrays);
            GameInit.AgainGame(GameInit.RulerArrays);
            GameInit.AgainGame(GameInit.SmokesArrays);
            TIME.innerHTML = 60;
            SCORE.innerHTML = 0;
            GameInit.TeacComein = false;
            $("#Obstacle").animate({
                backgroundPosition:230
            });
            $("#Pigs").animate({
                top:370,
                left:170
            });
        }
/*再来一把*/
/*小飞猪的开始*/
        /*画一个小猪*/
        CreatePigHero(){
            return GameInit.CreateIma("Pigs","Pigs",170,370,'pig.gif',true);
        };
        /*输出小猪*/
        ShowPigHero(){
             GetMePlayArea.appendChild(this.CreatePigHero());
        };
/*小飞猪的结束*/
    }
    if(GameInit.play){
        const GetMeGameClass = new GetMeGame();
        /*小猪只能输出一次,显示一次*/
        GetMeGameClass.CreatePigHero();
        GetMeGameClass.ShowPigHero();
        /*小猪*/
        const Pigs = document.getElementById('Pigs');
        Pigs.onmousedown = function(e){
            var client = GetMePlayArea.getBoundingClientRect();
            var px = client.x;
            var py = client.y;
            Pigs.onmousemove = function (e) {
                $('#Pigs').css({
                    left:e.x-px-30,
                    top:e.y-py-30
                });
                //老师来了时
                GameInit.TeacComein && (GameInit.Stop(GameInit.TeacX,GameInit.TeacY,e.x-px,e.y-py) &&
                    GetMeGameClass.Result(SCORE.innerHTML,SCORE.innerHTML>100?'A':SCORE.innerHTML<60?'C':'B',SCORE.innerHTML>100?GameInit.Start(5):SCORE.innerHTML<60?GameInit.Start(2):GameInit.Start(3))
                )
            }
            Pigs.onmouseover = function (e) {
                this.onmousedown = null;
            }
        }

        /*游戏重新开始*/
        $("#AgainBtn").click(function () {
            GetMeGameClass.Again();
        });

            /*操作区域*/
            setInterval(()=>{
                //构造道具
                let n = parseInt(Math.floor(Math.random()*(101-1)+1)/10);
                n <= 3 ? GetMeGameClass.PushBooksArrays() :
                n < 8 ? GetMeGameClass.PushRulerArrays() :
                SCORE.innerHTML >= 30 && GetMeGameClass.PushSmokesArrays();
                //显示道具
                GetMeGameClass.ShowPropArrays(GameInit.BookArrays,GetMePlayArea);
                GetMeGameClass.ShowPropArrays(GameInit.RulerArrays,GetMePlayArea);
                GetMeGameClass.ShowPropArrays(GameInit.SmokesArrays,GetMePlayArea);
                //移动道具
                GetMeGameClass.MovePropArrays(GameInit.BookArrays,480);
                GetMeGameClass.MovePropArrays(GameInit.RulerArrays,480);
                GetMeGameClass.MovePropArrays(GameInit.SmokesArrays,480);
                //删除已经在页面下面的道具
                GetMeGameClass.DeletePropArrays(GameInit.BookArrays,480);
                GetMeGameClass.DeletePropArrays(GameInit.RulerArrays,480);
                GetMeGameClass.DeletePropArrays(GameInit.SmokesArrays,480);
                //检测碰撞
                //小猪和书本
                GameInit.Collision('Pigs',GameInit.BookArrays,30,30,50,60,function (i) {
                    GameInit.PropClear(GameInit.BookArrays,i,'Books',function () {
                        // console.log("书,成绩+3");
                        SCORE.innerHTML=parseInt(SCORE.innerHTML)+3;
                    });
                });
                //小猪和尺子
                GameInit.Collision('Pigs',GameInit.RulerArrays,30,30,48,48,function (i) {
                    GameInit.PropClear(GameInit.RulerArrays,i,'Ruler',function () {
                        // console.log("尺子,成绩+2");
                        SCORE.innerHTML=parseInt(SCORE.innerHTML)+2;
                    });
                });
                //小猪和香烟
                GameInit.Collision('Pigs',GameInit.SmokesArrays,30,30,32,54,function (i) {
                    GameInit.PropClear(GameInit.SmokesArrays,i,'Smoke',function () {
                        // console.log("香烟,成绩-5");
                        SCORE.innerHTML=parseInt(SCORE.innerHTML)-5;
                    });
                });
            },80);
            /*老师出现*/
            setInterval(()=>{
                GetMeGameClass.TeacComeIn();
            },15000);
            /*GAME TIME*/
            var timers = setInterval(()=>{
                TIME.innerHTML = parseInt(TIME.innerHTML)-1;
                if(parseInt(TIME.innerHTML)<=0){
                    clearInterval(timers);
                    GetMeGameClass.Result(SCORE.innerHTML,SCORE.innerHTML>100?'A':SCORE.innerHTML<60?'C':'B',SCORE.innerHTML>100?GameInit.Start(5):SCORE.innerHTML<60?GameInit.Start(2):GameInit.Start(3))
                }
            },1000);
        }
}