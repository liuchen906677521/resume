
//->动态计算REM的换算比例
~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);
//->给滑屏区域进行初始化设置
~function () {
    var step = 0, divList = null;
    var swp = new Swiper(".swiper-container", {
        loop: true,
        direction: 'vertical',
        autoplay: 0,
        hashnav: true,
        onSlidePrevEnd: function () {
            step--;
            change();
            if (step === 0) {
                step =6;
            }
        },
        onSlideNextEnd: function () {
            step++;
            change();
            if (step === 7) {
                step = 1;
            }
        },
        // onTransitionEnd:function (swiper) {
        //     var slides=swiper.slides,
        //         curIndex=swiper.activeIndex,
        //         total=slides.length;
        //     targetId='page0';
        //     switch (curIndex){
        //         case 0:
        //             targetId+=total-2;
        //             break;
        //         case total-1:
        //             targetId+=1;
        //             break;
        //         default:
        //             targetId+=curIndex;
        //     }
        //     [].forEach.call(slides,function (item, index) {
        //         /*判断滑块是不是当前屏,如果是动态添加id,其他全部清空id*/
        //         if(index==curIndex){
        //             item.id=targetId
        //         }else {
        //             item.id=null
        //         }
        //     })
        //
        //
        // }
    });


    function change() {
        divList = document.querySelectorAll(".swiper-slide");
        console.log(divList);
        [].forEach.call(divList, function (curDiv, index) {
            curDiv.id = index === step ? curDiv.getAttribute("trueId") : null;
        });
    }

    //->给区域增加一个loop:true的时候,会自己往开头和结尾各增加一张一模一样的,但是我还需要把区域定位到“真实的第一张”,所以开始会自己向下切换一次,我们让初始的step=0即可
}();
//->音频的自动播放
~function () {
    var audioBox = document.querySelector(".audio"),
        myAudio = audioBox.getElementsByTagName("audio")[0];

    //->延时播放音频文件,先让其他的内容加载
    window.setTimeout(function () {
        myAudio.play();
        myAudio.addEventListener("canplay", function () {
            //->当音频可以播放的时候触发这个事件
            audioBox.style.display = "block";
            audioBox.className += " audioMove";
        }, false);
    }, 1000);

    //->点击音乐图标,实现音频的暂停或者播放
    audioBox.addEventListener("click", function () {
        if (myAudio.paused) {//->当前是暂停的,我让其播放
            myAudio.play();
            audioBox.className = "audio audioMove";
            return;
        }
        //->当前是播放的,我让其暂停
        myAudio.pause();
        audioBox.className = "audio";
    }, false);
}();
