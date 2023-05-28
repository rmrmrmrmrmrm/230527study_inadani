//////////////////////////////////////////////////
/*変数*/
/////////////////////////////////////////////////

/*変数スクロール*/
let scroll = 0;

/*変数ローディング*/
let start, end, loadEndflg;
let loadingDelay = 5000;
var fromP;

//////////////////////////////////////////////////
/*loading*/
/////////////////////////////////////////////////

const loadingfn = function () {
  loadset();
  loadEndflg = false;

  var imgLoad = imagesLoaded("body"),
    imgTotal = imgLoad.images.length,
    imgLoaded = 0,
    current = 0,
    progressTimer = setInterval(updateProgress, 1000 / 60);
  imgLoad.on("progress", function () {
    imgLoaded++;
  });

  function updateProgress() {
    var target = (imgLoaded / imgTotal) * 100;
    current += (target - current) * 0.1;
    if (current >= 100) {
      clearInterval(progressTimer);
      loadEndAnim();
      $(".p-load").addClass("loadend");
    }
    if (current > 99.9) {
      current = 100;
    }
  }
};

var anim1;
var anim2;

function loadset() {
  if (fromP == false) {
    animset();

    function animset() {
      anim1 = bodymovin.loadAnimation({
        container: document.getElementById("load_d1"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/assets/js/loading.json",
        name: "anim1",
      });
      anim2 = bodymovin.loadAnimation({
        container: document.getElementById("load_d2"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/assets/js/loading.json",
        name: "anim2",
      });
      anim1.onComplete = () => {
        loadEndAnim();
      };
    }
    setTimeout(loadStartAnim, 500);
  } else {
  }
}

function loadStartAnim() {
  lottie.setSpeed(2, anim1);
  anim1.setDirection(1);
  anim1.playSegments([0, 120], true);
  lottie.setSpeed(2, anim2);
  anim2.setDirection(1);
  anim2.playSegments([0, 120], true);
}

var loadcount = 0;

function loadEndAnim() {
  loadcount = loadcount + 1;
  if (loadcount == 2 && fromP == false) {
    TweenMax.to(".p-loadanim__d.-left", 2, {
      x: "-110%",
      y: "10%",
      scale: 1.2,
      delay: 0,
      ease: Power2.easeIn,
    });
    TweenMax.to(".p-loadanim__d.-right", 2, {
      x: "110%",
      y: "10%",
      scale: 1.2,
      delay: 0,
      ease: Power2.easeIn,
    });
    TweenMax.to(".p-loadanim .-bg", 1, {
      opacity: 0,
      delay: 1,
      ease: Power2.easeIn,
      onComplete: function () {
        pageView();
      },
    });
    anim1.playSegments([150, 180], true);
    anim2.playSegments([150, 180], true);
  } else if (loadcount == 1 && fromP == true) {
    TweenMax.to(".p-loadanim .-bg", 0.5, {
      opacity: 0,
      delay: 0,
      ease: Power2.easeIn,
      onComplete: function () {
        pageView();
      },
    });
  }
}

function pageView() {
  $("#loder").css({
    display: "none",
  });
  $("body").addClass("pageView");
  if (isHome()) {
    $(".p_homemain").addClass("homeView");
  }
  /**/
  logoanimPlay();
}

/**/
var hLogoMark;
var hLogoText;

function logoanimset() {
  console.log("logoanimset");
  hLogoMark = bodymovin.loadAnimation({
    container: document.getElementById("hlogoMark"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "/assets/js/logomark.json",
    name: "hLogoMark",
  });
  hLogoText = bodymovin.loadAnimation({
    container: document.getElementById("hlogoType"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "/assets/js/logotxt.json",
    name: "hLogoText",
  });
}

function hLogoanimSet() {}

function logoanimPlay() {
  lottie.setSpeed(1, hLogoMark);
  hLogoMark.setDirection(1);
  hLogoMark.playSegments([0, 60], true);

  window.setTimeout(function () {
    lottie.setSpeed(1, hLogoText);
    hLogoText.setDirection(1);
    hLogoText.playSegments([0, 60], true);
    TweenMax.to(".c-header__logo .-stamp img", 0.1, {
      scale: 1,
      opacity: 1,
      delay: 0,
      ease: Power2.easeIn,
    });
  }, 500);
  $(".c-header .c-subnav a").hover(
    function () {
      hLogoMark.playSegments([120, 135], true);
    },
    function () {
      hLogoMark.playSegments([135, 150], true);
    }
  );
  $(".c-header .c-gnav").hover(
    function () {
      hLogoMark.playSegments([150, 165], true);
    },
    function () {
      hLogoMark.playSegments([165, 180], true);
    }
  );

  $(".c-header__logo").hover(
    function () {
      hLogoMark.playSegments([30, 60], true);
    },
    function () {
      hLogoMark.playSegments([40, 60], true);
    }
  );
}

let firstFace = true;

//DOMの読み込みが完了したら実行
$(document).ready(function () {
  ua();
  fromP = fromCurrentSite();
  if (fromP == true) $("body").addClass("second");
  loadingfn();
  initfn();

  setPopup();
});

/*リサイズイベント*/
$(window).resize(function () {});

function ua() {
  var ua = navigator.userAgent.toLowerCase();
  var ver = navigator.appVersion.toLowerCase();

  // IE(11莉･螟�)
  var isMSIE = ua.indexOf("msie") > -1 && ua.indexOf("opera") == -1;
  // IE6
  var isIE6 = isMSIE && ver.indexOf("msie 6.") > -1;
  // IE7
  var isIE7 = isMSIE && ver.indexOf("msie 7.") > -1;
  // IE8
  var isIE8 = isMSIE && ver.indexOf("msie 8.") > -1;
  // IE9
  var isIE9 = isMSIE && ver.indexOf("msie 9.") > -1;
  // IE10
  var isIE10 = isMSIE && ver.indexOf("msie 10.") > -1;
  // IE11
  var isIE11 = ua.indexOf("trident/7") > -1;
  // IE
  var isIE = isMSIE || isIE11;
  // Edge
  var isEdge = ua.indexOf("edge") > -1;

  // Google Chrome
  var isChrome = ua.indexOf("chrome") > -1 && ua.indexOf("edge") == -1;
  // Firefox
  var isFirefox = ua.indexOf("firefox") > -1;
  // Safari
  var isSafari = ua.indexOf("safari") > -1 && ua.indexOf("chrome") == -1;
  // Opera
  var isOpera = ua.indexOf("opera") > -1;

  if (
    navigator.userAgent.match(/MSIE 10/i) ||
    navigator.userAgent.match(/Trident\/7\./) ||
    navigator.userAgent.match(/Edge\/12\./)
  ) {
    $("body").on("mousewheel", function () {
      event.preventDefault();
      var wd = event.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
  }

  console.log("isIE " + isIE);
  if (isIE == true) {
    $("html").addClass(".ie");
  }
}

//////////////////////////////////////////////////
/*初期値*/
/////////////////////////////////////////////////
function initfn() {
  commonscroll();
  acordion();
  logoanimset();
  if (isHome()) homescroll();
}

//////////////////////////////////////////////////
/*nav*/
/////////////////////////////////////////////////
/*　nav */
let navtgl = false;
$("button.c-header__button").click(function () {
  if (navtgl == false) {
    navOpen();
  } else {
    navClose();
  }
});

function navOpen() {
  navtgl = true;
  $("body").addClass("navopen");
  $(".c-drower").css({
    display: "block",
  });
  TweenMax.to(".c-drower", 0.3, {
    opacity: 1,
    delay: 0,
    onComplete: function () {
      $(".c-drower .l-wrapper").addClass("view");
    },
  });
}

function navClose() {
  navtgl = false;
  $("body.navopen").removeClass("navopen");
  $(".c-drower .l-wrapper").removeClass("view");
  TweenMax.to(".c-drower", 0.3, {
    opacity: 0,
    delay: 0.3,
    onComplete: function () {
      $(".c-drower").css({
        display: "none",
      });
    },
  });
}

$(document).on("click", "#biz_calendar .-eventday", function () {
  $("#js-calendar-popup").addClass("-active");
  var target_date = $(this).data("date");
  $("#biz_calendar .-eventday").removeClass("-active");
  $(this).addClass("-active");

  search_date = target_date.replace(/-/g, "/");
  disp_date = target_date.replace(/-/g, ".");

  $("#js-popup-event-schedule").empty();
  $("#js-popup-event-date").text(disp_date);
  $.ajax({
    url: "/event-schedule?date=" + search_date,
    type: "GET",
    dataType: "html",
  })
    .done(function (data) {
      console.log($(data).find("#event-schedule"));
      $("#js-popup-event-schedule").append($(data).find("#event-schedule"));
    })
    .fail(function () {
      // 通信失敗時の処理を記述
    });
});

$("#js-calendar-popup-close").click(function () {
  $("#js-calendar-popup").removeClass("-active");
  $("#biz_calendar .-eventday").removeClass("-active");
});

//////////////////////////////////////////////////
/*スクロールイベント*/
/////////////////////////////////////////////////
function homescroll() {
  var targetHOMEfv = document.querySelector(".leadviewFlg"); // 対象のエレメント
  // optionは省略可能、初期値は以下のようになります。
  var optionHOMEfv = {
    root: null, //rootで指定した要素内スクロールができ、その中の要素とrootで指定した要素の交差監視を有効にしたい場合
    rootMargin: "0% 0px 0% 0px", //pxもしくは%で指定
    threshold: [0], //0は少しでも　1は全部
  };
  // 交差した際の処理を記載
  var callbackHOMEfv = function (entries, observerHomefv) {
    entries.forEach(function (entry) {
      // 交差している場合はtrue
      if (entry.isIntersecting) {
        //$('body').removeClass('-homeFVend');
        $("body").addClass("-homeFVend");
        console.log("交差している");
        if (!isHome()) {
        }
      } else {
        console.log("交差していない");
        //$('body').addClass('-homeFVend');
        if (!isHome()) {
        }
      }
    });
  };

  var observerHomefv = new IntersectionObserver(callbackHOMEfv, optionHOMEfv); // callback, optionを設定
  observerHomefv.POLL_INTERVAL = 100; // Polyfillを使っている場合コメントアウトを外す
  observerHomefv.observe(targetHOMEfv); // 監視を開始

  //		ScrollTrigger.create({
  //		  trigger: ".p-homemainlead",
  //		  start: "top 0%",
  //		  // .article_textが"center 40%"に来たら固定解除
  //		  endTrigger: ".p_homemain",
  //		  end: "bottom 100%",
  //		  pin: true,
  //		  // 余白を計算しない
  //		  pinSpacing: false,
  //		});

  /**/
  const barTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".p_homemain",
      start: "top top",
      end: "bottom bottom",
      // スクラブアニメーションの設定「true/false」または数値
      scrub: true,
    },
  });
  barTl.addLabel("topmainMov");

  /*p_homeabout*/
  console.log("p_homeabout");
  var targetHomeabout = document.querySelector(".p_homeabout"); // 対象のエレメント
  // optionは省略可能、初期値は以下のようになります。
  var optionHomeabout = {
    root: null, //rootで指定した要素内スクロールができ、その中の要素とrootで指定した要素の交差監視を有効にしたい場合
    rootMargin: "0% 0px 0% 0px", //pxもしくは%で指定
    threshold: [0], //0は少しでも　1は全部
  };
  // 交差した際の処理を記載
  var callbackHomeabout = function (entries, observerHomeabout) {
    entries.forEach(function (entry) {
      // 交差している場合はtrue
      if (entry.isIntersecting) {
        if ($(".p_homeabout.-act").length <= 0) {
          $(".p_homeabout").addClass("-act");

          TweenMax.fromTo(
            $(".p_homeabout__bord .-card.n1"),
            0.4,
            {
              rotateY: 0,
              perspective: 2000,
              scale: 1,
            },
            {
              rotateY: -89,
              perspective: 2000,
              delay: 0.5,
              y: 20,
              scale: 1.05,
              ease: Power1.easeIn,
              onComplete: function () {
                turnOn(".p_homeabout__bord .-card.n1");
              },
            }
          );
          TweenMax.fromTo(
            $(".p_homeabout__bord .-card.n2"),
            0.4,
            {
              rotateY: 0,
              perspective: 2000,
              scale: 1,
            },
            {
              rotateY: -89,
              perspective: 2000,
              delay: 0.75,
              y: 20,
              scale: 1.05,
              ease: Power1.easeIn,
              onComplete: function () {
                turnOn(".p_homeabout__bord .-card.n2");
              },
            }
          );
          TweenMax.fromTo(
            $(".p_homeabout__bord .-card.n3"),
            0.4,
            {
              rotateY: 0,
              perspective: 2000,
              scale: 1,
            },
            {
              rotateY: -89,
              perspective: 2000,
              delay: 1,
              y: 20,
              scale: 1.05,
              ease: Power1.easeIn,
              onComplete: function () {
                turnOn(".p_homeabout__bord .-card.n3");
              },
            }
          );

          function turnOn(tgt) {
            $(tgt).addClass("trunOn");
            TweenMax.fromTo(
              $(tgt),
              0.4,
              {
                rotateY: -91,
                perspective: 2000,
                y: 20,
                scale: 1.05,
              },
              {
                rotateY: 0,
                perspective: 2000,
                y: 0,
                scale: 1,
                ease: Power1.easeIn,
              }
            );
          }
        }
      } else {
        //				$('.p_homeabout').removeClass('-act');
        //				  console.log("2");
      }
    });
  };

  var observerHomeabout = new IntersectionObserver(
    callbackHomeabout,
    optionHomeabout
  ); // callback, optionを設定
  observerHomeabout.POLL_INTERVAL = 100; // Polyfillを使っている場合コメントアウトを外す
  observerHomeabout.observe(targetHomeabout); // 監視を開始
}

function commonscroll() {
  var targetfv = document.querySelector(".navchangflg"); // 対象のエレメント
  // optionは省略可能、初期値は以下のようになります。
  var optionfv = {
    root: null, //rootで指定した要素内スクロールができ、その中の要素とrootで指定した要素の交差監視を有効にしたい場合
    rootMargin: "0% 0px 0% 0px", //pxもしくは%で指定
    threshold: [0], //0は少しでも　1は全部
  };
  // 交差した際の処理を記載
  var callbackfv = function (entries, observerfv) {
    entries.forEach(function (entry) {
      // 交差している場合はtrue
      if (entry.isIntersecting) {
        $("body").removeClass("-fvend");
        if (!isHome()) {
        }
      } else {
        $("body").addClass("-fvend");
        if (!isHome()) {
        }
      }
    });
  };

  var observerfv = new IntersectionObserver(callbackfv, optionfv); // callback, optionを設定
  observerfv.POLL_INTERVAL = 100; // Polyfillを使っている場合コメントアウトを外す
  observerfv.observe(targetfv); // 監視を開始

  if ($(".view").length > 0) {
    // 今回の交差を監視する要素
    const boxes = document.querySelectorAll(".view");
    const options = {
      root: null, // 今回はビューポートをルート要素とする
      rootMargin: "-20% 0px", // ビューポートの中心を判定基準にする
      threshold: 0, // 閾値は0
    };
    const observer = new IntersectionObserver(doWhenIntersect, options);
    // それぞれのboxを監視する
    boxes.forEach((box) => {
      observer.observe(box);
    });

    /**
     * 交差したときに呼び出す関数
     * @param entries
     */
    function doWhenIntersect(entries) {
      // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateIndex(entry.target);
        }
      });
    }

    /**
     * 目次の色を変える関数
     * @param element
     */
    function activateIndex(element) {
      $(element).addClass("act");
    }
  }
}

/*////////////////////////////////
 関数
////////////////////////////////*/

/* smooth scroll */
/*
$('a[href^="#"]').click(function () {
  // スクロールの速度
  let speed = 400;
  // スクロールタイプ
  let type = 'swing';
  // href属性の取得
  let href = $(this).attr("href");
  // 移動先の取得（hrefが#indexならトップ$(html)に、）
  let target = $(href == "#index" ? 'html' : href);
  // 移動先のポジション取得
  let position = target.offset().top;
  // animateでスムーススクロール
  $('body,html').animate({ scrollTop: position }, speed, type);
  return false;
});
*/

$(".c-pagetop").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    500
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

function acordion() {
  $(".fn_acordion .c-sidenav__title").click(function () {
    $(this).toggleClass("active");
    $(this).next("nav").slideToggle();
  });
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function setPopup() {
  if ($(".js-popup").length > 0) {
    $(".js-popup").magnificPopup({
      type: "inline",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
    });
  }
}

/*////////////////////////////////
 check
////////////////////////////////*/
/*pcかの判断*/
function isPC() {
  var ret;
  var width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width > 768) {
    ret = true;
  } else {
    ret = false;
  }
  return ret;
}

function isHome() {
  return $("body").hasClass("p-home") ? true : false;
}

/*fromCurrentSite*/
function fromCurrentSite() {
  var value = document.referrer; //直前に見ていたページを取得
  var domain = document.domain; //現在のドメインを取得
  var ret = false;
  if (value.match(domain)) {
    //直前に見ていたページのURLに現在のドメインが含まれてたらtrueを返す
    ret = true;
  }
  return ret;
}
