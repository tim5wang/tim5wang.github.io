(function() {
  const edit = $.getUrlParam("edit");
  app = new Vue({
    el: "#app",
    data: {
      activeIndex: 1,
      username: "",
      holde: {},
      preview: {},
      msg: "",
      model_list: [],
      edit: edit,
      editer:{}
    },
    watch: {
      holde: {
        handler() {
          this.preview = this.mountdata($.deepCopy(this.holde));
          console.log(this.preview);
          if (this.preview.time_limit != false) {
            this.preview.time_limit = new Date().TimeDistance(
              Number(this.preview.time_limit) * 1000
            );
          }
        },
        deep: true
      },
      activeIndex() {
        if (this.activeIndex == 1) {
          this.init_1();
        } else if (this.activeIndex == 2) {
          this.init_2();
        }else if (this.activeIndex ==3){

        }
      }
    },
    created() {
      if (edit == null) {this.activeIndex = $.ai.get("admin", "activeIndex");}
      else{this.init_1();}
    },
    methods: {
      handleSelect(key, path) {
        console.log(key);
        $.ai.set("admin", "activeIndex", key);
        this.activeIndex = key;
      },
      init_1() {
        this.username = $.ai.get("auth", "username");
        if (edit != null) this.edit = true;
        $.post(
          api_host,
          {
            token: $.ai.get("auth", "token"),
            s: "App.Site.Model_model",
            job: edit
          },
          function(res) {
            if (res.ret == 200) {
              this.editer = {}
              app.$data.holde = res.data;
              app.$data.questions = JSON.stringify(res.data);
              $("#qa").val(app.$data.questions);
              console.log('初始化编辑器')
              this.editer = new jsonArea({
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
          model: JSON.stringify(app.$data.holde)
        },function(res){
          var type = 'success'	
          if(res.ret == 200){
            app.init_2();
          }else{
            type = warning
          }

          app.$message({
            showClose: true,
            message: ''+res.msg,
            center: true,
            type: type
          });
        });
      },
      init_2() {
        this.get_list();
      },
      get_list() {
        $.post(
          api_host,
          {
            token: $.ai.get("auth", "token"),
            s: "App.Site.Get_all_model"
          },
          function(res) {
            if (res.ret == 200) {
              app.$data.model_list = res.data;
              for (var i in app.$data.model_list) {
                app.mountdata(app.$data.model_list[i]);
              }
            }
          }
        );
      },
      getUrl(job) {
        return "guest.html?job=" + job;
      },
      edit_model(row) {
        window.location.href = "admin.html?edit=" + row.job;
      },
      delete_model(row) {
        $.post(
          api_host,
          {
            s: "App.Site.Delete_model",
            token: $.ai.get("auth", "token"),
            id: row.id
          },
          function(res) {
            if (res.ret == 200) {
              app.init_2();
            }
          }
        );
      },
      active(row) {
        let status = "未发布";
        if (row.status == "未发布") {
          status = "已发布";
        }
        $.post(
          api_host,
          {
            token: $.ai.get("auth", "token"),
            s: "App.Site.Update_insert_model",
            model: JSON.stringify({ job: row.job, status: status })
          },
          function(res) {
            if (res.ret == 200) {
              app.init_2();
            }
          }
        );
      }
    }
  });
})();
