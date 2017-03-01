(function(window,document){
    var currentPosition = 0;
    var allscreenwrap = document.querySelector('#viewport');
    var app = {
        init:function(){
           document.addEventListener('DOMContentLoaded',function(){
              app.bindBtnClick("#nextPage2",1);   //绑定按钮点击事件
              app.bindBtnClick("#linktoupLoad",0);   //绑定按钮点击事件
              app.bindBtnClick("#nextpage3",2);   //绑定按钮点击事件
           }.bind(app),false);
        }(),

        transform:function(translatePos){
          this.style.webkitTransform = "translate3d(-"+translatePos+"px,0,0)";
          currentPosition = translatePos;
        },

        bindBtnClick:function(e,t){
            var pageWidth = window.innerWidth;
            var button = document.querySelector(e);
            button.addEventListener('click',function(){
                var translatePos = pageWidth*t;
                this.transform.call(allscreenwrap,translatePos);
            }.bind(this),false)
        }
    }
})(window,document);

/*(function(window,document){
    var currentPosition = 0;
    var app = {
        init:function(){
           document.addEventListener('DOMContentLoaded',function(){
              var viewport = document.querySelector('#viewport');
               app.bindBtnClick();   //绑定按钮点击事件
           }.bind(app),false);
        }(),

        transform:function(translatePos){
          this.style.webkitTransform = "translate3d(-"+translatePos+"px,0,0)";
          currentPosition = translatePos;
        },

        bindBtnClick:function(){
            var pageWidth = window.innerWidth;
            var initPos = 0;
            var button = document.querySelector("#button");
            button.addEventListener('click',function(){
              if (currentPosition>pageWidth*1) {
                initPos = -pageWidth;
                var translatePos = initPos + pageWidth;
                this.transform.call(viewport,translatePos);
                // console.log(translatePos)
              }else{
                initPos = currentPosition;
                var translatePos = initPos + pageWidth;
                this.transform.call(viewport,translatePos);
              }
            }.bind(this),false)
        }
    }
})(window,document);*/