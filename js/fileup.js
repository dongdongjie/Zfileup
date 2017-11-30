/**
 * Created by ddj on 2017/11/27.
 */
;(function ($,window,docuemnt,undefined) {
    var Fileup = function (element,opstion) {
        this.element = element;
        this.ops = $.extend({},$.fn.fileup.default,opstion);
        this.init();
    };
    Fileup.prototype = {
        /**
         *初始化
         */
        init : function () {
            var $this = this;
            $this._initDom();
            $this._onClickup();
        },

        /**
         * 初始化dom结构
         * @private
         */
        _initDom : function () {
            var $this = this;
            $this.element.wrap("<div class='cover'></div>").css({
                width : "100%",
                height : "100%",
                opacity : "0"
            });
            $this.element.parent(".cover").css({
                position : "relative",
                border : "1px dashed #ccc",
                backgroundImage : "url(img/add.png)",
                backgroundSize : "cover"
            });
        },
        /**
         * @private
         * 点击文件上传
         *
         */
        _onClickup : function () {
            var $this = this;
            $this.element.on({click:function(){
                $(this).val("");
            },change:function() {
                var fileReader = new FileReader(),
                    fileType = this.files[0].type,
                    fileName = this.files[0].name;
                console.log(this.files[0]);
                if(this.files[0].size <= $this.ops.maxFileSize){
                    // base64方式读取
                    fileReader.readAsDataURL(this.files[0]);
                    //判断是否开启了显示文件名配置
                    if($this.ops.isShowName){
                        $this._showFileName(this);
                    }
                    //文件上传到浏览器成功
                    fileReader.onload = function() {
                       $this._showImg(fileType);
                    }
                }else{
                    $this._fileSizeError();
                }

            }})
        },

        /**
         * @private
         * 显示文件名
         * 当用户设置显示文件名称的时候执行的方法
         */
        _showFileName : function(file){
            var $this = this;
            $this.element.parent().find(".file-name").remove();
            $this.element.parent().append("<div class='file-name'>"+ file.files[0].name +"</div>");
            $this.element.parent().find(".file-name").css({
                position : "absolute",
                top : "0",
                left : "0",
                maxWidth : "100%",
                height : "14px",
                padding : "5px",
                fontSize : "14px",
                color : "#fff",
                overflow : "hidden",
                textOverflow : "ellipsis",
                textWrap : "normal",
                backgroundColor : "rgba(187,222,252,0.8)"
            })
        },
        /**
         * @private
         * 根据提交的文件的类型，判断显示在前端的图片
         * fileType 传入的文件类型
         */
        _showImg : function (fileType) {
            var $this = this;
            //如果是图片文件，将图片显示在cover中
            if (/^image/.test(fileType)) {
                // 读取结果在fileReader.result里面
                $this.element.parent().css({
                    backgroundImage : "url("+ this.result +")",
                    backgroundSize : "cover"
                })
            }else if(/^text/.test(fileType)){
                $this.element.parent().css({
                    backgroundImage : "url(img/text.png)",
                    backgroundSize : "cover"
                })
            }else if(/^application/.test(fileType)){
                $this.element.parent().css({
                    backgroundImage : "url(img/app.png)",
                    backgroundSize : "cover"
                })
            }
        },

        /**
         * @private
         * 上传的文件超过设置值时触发的事件
         */
        _fileSizeError : function(){
            var $this = this;
            $this.element.parent().find(".file-name").remove();
            $this.element.parent(".cover").append("<div class='sizeError'>文件太大了</div>").css({
                backgroundImage : "url(img/add.png)",
                backgroundSize : "cover"
            });
            $this.element.parent(".cover").find(".sizeError").css({
                position : "absolute",
                top : "0",
                left : "0",
                width : "100%",
                height : "20px",
                // borderRadius : "5px",
                color : "#fff",
                textAlign : "center",
                lineHeight : "20px",
                backgroundColor : "rgba(230,0,0,0.5)"
            });
            setTimeout(function(){
                $this.element.parent(".cover").find(".sizeError").animate({
                    top : "-100%"
                },function(){
                    $this.element.parent(".cover").find(".sizeError").remove();
                });
            },2000)
        }
    };
    $.fn.fileup = function(opstion){
        return new Fileup(this,opstion);
    };
    $.fn.fileup.default = {
        isShowName : true,
        maxFileSize : 99999999
    };
})(jQuery,window,document);
