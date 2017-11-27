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
            $this.element.wrap("<div class='cover'></div>");
            $this.element.css({
                width : "100%",
                height : "100%",
                opacity : "0"
            });
        },
        /**
         * 点击文件上传
         * @private
         */
        _onClickup : function () {
            $this.element.on("change", function() {
                // console.log(`file name is ${this.value}`);
                // let formData = new FormData(this.form);
                // formData.append("fileName", this.value);
                // console.log(formData);
                let fileReader = new FileReader(),
                    fileType = this.files[0].type;
                fileReader.onload = function() {
                    if (/^image/.test(fileType)) {
                        // 读取结果在fileReader.result里面
                        $(`<img src="${this.result}">`).appendTo("body");
                    }
                }
            })
        }
    };
    $.fn.fileup = function(opstion){
        return new Fileup(this,opstion);
    };
    $.fn.fileup.default = {

    };
})(jQuery,window,document);
