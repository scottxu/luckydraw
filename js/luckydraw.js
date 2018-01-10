var avatarTxt = $('.slot'),
    nicknameTxt = $('.name'),
    pcount = avatars.length,
    runing = true,
    num = 0,
    t=0;

avatarTxt.css('background-image', 'url("imgs/' + config["logo"] + '")');
nicknameTxt.html(config["name"]);

$(document).keydown(function (e) {
    if (!e) var e = window.event;
    if (e.keyCode == 32 || e.keyCode == 13) {
        start();
    }
});

function start() {
    if (runing) {
        if (pcount < 1) {
            alert("抽奖人数少于参与人数");
        } else {
            runing = false;
            startNum()
        }
    } else {
        print();
    }

}

/*https://www.zhihu.com/question/22818104/answer/22799409
   线性同余生成器
    */
var rand = (function () {
    var today = new Date();
    var seed = today.getTime();

    function rnd() {
        seed = ( seed * 9301 + 49297 ) % 233280;
        return seed / ( 233280.0 );
    }

    return function rand(number) {
        return Math.ceil(rnd() * number);
    }
})();

function startNum() {
    num = rand(pcount) - 1;
    avatarTxt.css('background-image', 'url(' + avatars[num] + ')');
    nicknameTxt.html(nicknames[num]);
    t = setTimeout(startNum, 0);
}

function print() {
    if (pcount >= 1) {
        if (runing) {
            runing = false;
            startNum();
        } else {
            $('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url(" + avatars[num] + ")'></div><div class='luckuserName'>" + nicknames[num] + "</div></li>");
            avatars.splice($.inArray(avatars[num], avatars), 1);
            nicknames.splice($.inArray(nicknames[num], nicknames), 1);
            clearInterval(t);
            t = 0;
            runing = true;
            pcount = avatars.length;
        }
    }
}