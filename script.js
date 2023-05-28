//110,121行 いなだにではローディングアニメが完了した段階で実行されている
pageView();

//
function isHome() {
  return $("body").hasClass("p-home") ? true : false;
}

/**699行 ①ファーストビューのイラストアニメーションの再現 */
function pageView() {
  $("#loder").css({
    display: "none",
  });
  //ファーストビューの表示を実行する「pageView」を付与
  $("body").addClass("pageView");
  //topページであれば実行
  if (isHome()) {
    $(".p_homemain").addClass("homeView");
  }
  /*logoanimPlay();*/
}

/**②フッターの文字が回るアニメーションの再現 */
/**③カードが裏返るアニメーションの再現 */
