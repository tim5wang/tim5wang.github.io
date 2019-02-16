(function() {
  app = new Vue({
    el: "#app",
    data: {
      activeName: "first",
      username: "",
      holde: {},
      preview: {},
      msg: ""
    },
    watch: {
      holde: {
        handler() {
          this.preview = this.mountdata($.deepCopy(this.holde));
          console.log(this.preview);
          this.preview.time_limit = new Date().TimeDistance(
            Number(this.preview.time_limit) * 1000
          );
        },
        deep: true
      }
    },
    created() {
      this.username = $.ai.get("auth", "username");
      $.post(
        api_host,
        {
          token: $.ai.get("auth", "token"),
          s: "App.Site.Model_model"
        },
        function(res) {
          if (res.ret == 200) {
            app.$data.holde = res.data;
            app.$data.questions = JSON.stringify(res.data);
            $("#qa").val(app.$data.questions);
            new jsonArea({
              el: "#qa",
              insert: false,
              change: function(json) {
                console.log(json);
                app.$data.holde = json;
              }
            });
          }
        }
      );
      $("#qa").change = function(val) {
        console.log(val);
      };
    },
    methods: {
      handleClick() {},
      handleSelect(key, path) {
        console.log(key, path);
      },
      logout() {
        $.post(
          api_host,
          {
            s: "App.User.Logout",
            token: $.ai.get("auth", "token")
          },
          function(res) {
            if (res.ret == 200) {
              (app.$data.status = true),
                (app.$data.username = res.data.username);
              $.ai.set("auth", "token", res.data.token);
              window.location.href = "login.html";
            } else {
              (app.$data.status = false), (app.$data.username = "");
            }
          }
        );
      },
      mountdata(ondata) {
        for (var i in ondata.questions) {
          ondata.questions[i].answer = false;
          if (ondata.questions[i].type == "multi_chose") {
            ondata.questions[i].answer = [];
          }
          if (ondata.questions[i].type == "fill") {
            let spans = [ondata.questions[i].question];
            let map = ondata.questions[i].map;

            for (var vi in map) {
              let tmpspan = [];

              for (var pi = 0; pi < spans.length; pi++) {
                if (typeof spans[pi] == "object") {
                  tmpspan.push(spans[pi]);
                  continue;
                }
                let places = spans[pi].split("$" + vi + "$");

                if (places[0] != "") tmpspan.push(places[0]);
                for (var ii = 1; ii < places.length; ii++) {
                  if (map[vi].type == "text") {
                    tmpspan.push({
                      type: "text",
                      name: vi,
                      value: ""
                    });
                  } else if (map[vi].type == "number") {
                    tmpspan.push({
                      type: "number",
                      name: vi,
                      value: ""
                    });
                  } else if (map[vi].type == "select") {
                    tmpspan.push({
                      type: "select",
                      name: vi,
                      value: "",
                      options: map[vi].options
                    });
                  }
                  if (places[ii] != "") tmpspan.push(places[ii]);
                }
              }
              spans = tmpspan;
            }
            // console.log(spans);
            let tmpspan = {};
            for (let it in spans) {
              tmpspan[it] = spans[it];
            }
            ondata.questions[i].spans = tmpspan;
          }
          if (ondata.questions[i].type == "answer") {
            ondata.questions[i].answer = "";
          }
        }
        return ondata;
      },
      add_model() {
        $.post(api_host, {
          token: $.ai.get("auth", "token"),
          s: "App.Site.Update_insert_model",
          model: app.$data.questions
        });
      }
    }
  });
})();
