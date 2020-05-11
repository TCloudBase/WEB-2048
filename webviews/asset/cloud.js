var app = tcb.init({
  env: "云开发环境ID",
});
var auth = app.auth();
var loadflag = false;

/**
 * 云开发初始化：匿名登录
 */
function cloudinit() {
  auth
    .anonymousAuthProvider()
    .signIn()
    .then((res) => {
      console.log("初始化成功！");
      loadflag = true;
      callnet();
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * 上报函数：上报分数到数据库
 * @param {*} score 分值
 */
function callnet(score) {
  if (loadflag == false) return;
  app
    .callFunction({
      name: "app",
      data: {
        score: score,
      },
    })
    .then((res) => {
      if (res.result.code == 0) {
        document.getElementById("maxscore").innerHTML = res.result.myscore;
        document.getElementById("netscore").innerHTML = res.result.netscore;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
