const tcb = require("@cloudbase/node-sdk");

const cloud = tcb.init({
  env: "云开发环境ID",
});
const db = cloud.database();
const _ = db.command;
exports.main = async (event, context) => {
  let res = {};
  const auth = cloud.auth().getUserInfo();
  const uid = auth.uid;
  if (uid != null) {
    const result = (
      await db
        .collection("2048")
        .where({
          _id: uid,
        })
        .get()
    ).data;
    if (result.length == 0) {
      await db.collection("2048").add({
        _id: uid,
        score: 0,
      });
    }
    if (event.score != null && result[0].score < event.score) {
      await db.collection("2048").doc(uid).update({
        score: event.score,
      });
      res.myscore = event.score;
    } else {
      res.myscore = result.length != 0 ? result[0].score : 0;
    }
    const array = (
      await db.collection("2048").orderBy("score", "desc").limit(1).get()
    ).data;
    res.netscore = array[0].score;
    res.code = 0;
  } else {
    res.code = 404;
  }
  return res;
};
