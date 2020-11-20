// jquery 封装的一个函数，ajaxPrefilter 可以在ajax发起请求之前处理里面的函数
// $.get() $.post() ,$.ajax()
$(function () {
    $.ajaxPrefilter(function (option) {
        option.url='http://ajax.frontend.itheima.net'+option.url
        console.log(option.url);
    })
})
