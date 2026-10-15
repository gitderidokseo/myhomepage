// Vercel 사본 전용. 퀴즈 문서(d/159·161·162·180 등)는 iframe 안에서 parent.claude의 db·user로
// 채점 기록을 저장한다. claude.ai 아티팩트 밖에는 그게 없으니, 퀴즈가 쓰는 부분만
// /gyuwon/api/quiz(Upstash Redis)로 흉내 낸다. 아티팩트 index.html을 다시 받아 덮어쓰면
// 이 파일을 불러오는 <script> 한 줄을 다시 넣어야 한다.
(function () {
  if (window.claude) return;
  var API = "/gyuwon/api/quiz";

  function docRef(path) {
    var url = API + "?key=" + encodeURIComponent(path);
    return {
      get: function () {
        return fetch(url, { cache: "no-store", credentials: "same-origin" }).then(function (r) {
          if (!r.ok) throw new Error("quiz get " + r.status);
          return r.json();
        }).then(function (v) {
          return { exists: v != null, data: function () { return v; } };
        });
      },
      set: function (value) {
        return fetch(url, {
          method: "PUT",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value)
        }).then(function (r) { if (!r.ok) throw new Error("quiz set " + r.status); });
      }
    };
  }

  function collection(base) {
    return {
      doc: function (id) {
        var ref = docRef(base + "/" + id);
        ref.collection = function (name) { return collection(base + "/" + id + "/" + name); };
        return ref;
      }
    };
  }

  var db = { collection: collection };
  // 비밀번호 하나로 들어오는 개인 노트라 사용자 구분 없이 한 사람 기록으로 저장한다.
  var user = { id: function () { return Promise.resolve("gyuwon"); } };

  window.claude = {
    use: function (name) {
      return Promise.resolve(name === "db" ? db : name === "user" ? user : null);
    }
  };
})();
