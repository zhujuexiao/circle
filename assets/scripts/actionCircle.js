// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.num = 0;
        // var dir = cc.v2(-0.5,-0.5);
        // cc.log("225弧度:"+(dir.signAngle(cc.v2(-1,0))*180/Math.PI));
        cc.log("弧度:"+(Math.tan(-135*Math.PI/180)));

    },

    flatArray4:function(arr){
        return arr.toString().split(',').map( item => 0+item);
    }, 

    start () {
    	
        this.start_agnle = 0;
        this.start = true;

        // let ary = [[3, 4], [5, [6, 7]],1, 2 ];
        // console.log(ary.toString());
        // console.log(this.flatArray4(ary));

        this.test("a","b","c","d","e");

        // var args = [].slice.call(arguments)

        function a(){
    	   var i = 0;
    	   function b(){
    		cc.log(++i);
    	}
    	   return b;
        }

        // this.c = a();


    },

    update (dt) {
        //由于Math函数接受的是孤度，所以我们先节节点的旋转转化为弧度
        // var angle = this.node.rotation / 180 * Math.PI;
        if(!this.start)
            return;
        this.start_agnle+=5;
        this.node.rotation=360-this.start_agnle-90;//A　　　Ａ与Ｂ效果一样
        this.start_agnle=this.start_agnle%360;
        var angle = this.start_agnle / 180 * Math.PI;
        if(this.start_agnle%90 == 0){
        	// this.c();
            setTimeout(function(){
        	    cc.log(this.num);
        	    this.num=this.num+1;
            }.bind(this),1000)
        }
        // this.node.rotation-=5;//B

        //合成基于 X正方向的方向向量
        var dir = cc.v2(Math.cos(angle),Math.sin(angle));
        //单位化向量
        dir.normalizeSelf();
        

        var a=dir.signAngle(cc.v2(1,0));
        //根据方向向量移动位置
        var moveSpeed = 200;
        this.node.x = 150+ dir.x*moveSpeed;
        this.node.y = 150+ dir.y*moveSpeed;
    },

    pause(){
        this.start = false;
    },

    resume(){
        this.start = true;
    },

    test:function(args){
    	 cc.log(arguments[1]);
    	 cc.log(typeof arguments);
    }
});
