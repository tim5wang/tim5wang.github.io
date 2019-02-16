(function() {
  const job = $.getUrlParam("job");

  $.post(
    api_host,
    {
      job: job,
      s: "App.Site.Get_table"
    },
    function(res) {
      if (res.ret == 200) {
        res.data.time_rest = 0;
        for (var i in res.data.questions) {
          res.data.questions[i].answer = false;
          if (res.data.questions[i].type == "multi_chose") {
            res.data.questions[i].answer = [];
          }
          if (res.data.questions[i].type == "fill") {
            let spans = [res.data.questions[i].question];
            let map = res.data.questions[i].map;

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
            console.log(spans);
            let tmpspan = {};
            for (let it in spans) {
              tmpspan[it] = spans[it];
            }
            res.data.questions[i].spans = tmpspan;
          }
          if (res.data.questions[i].type == "answer") {
            res.data.questions[i].answer = "";
          }
        }
        app = new Vue({
          el: "#app",
          data: res.data,
          methods: {
            submit: function() {
              $.post(
                api_host,
                {
                  job: job,
                  s: "App.Site.Submit_table",
                  data: JSON.stringify(app.$data)
                },
                function(res) {
                  if (res.ret == 200) {
                  }
                }
              );
            }
          },
          created: function() {
            if (res.data.time_limit != false) {
              if ($.ai.get(res.data.job, "start_time") == undefined) {
                let now = new Date().format("yyyy-MM-dd HH:mm:ss");
                $.ai.set(res.data.job, "start_time", now);
                console.log(now);
                this.start_time = new Date(now);
              } else {
                this.start_time = new Date(
                  $.ai.get(res.data.job, "start_time")
                );
              }
              that = this;
              that.time_rest = new Date().TimeDistance(
                that.time_limit * 1000 -
                  (new Date() - new Date(that.start_time))
              );

              setInterval(function() {
                that.time_rest = new Date().TimeDistance(
                  that.time_limit * 1000 -
                    (new Date() - new Date(that.start_time))
                );
              }, 1000);
            }
          },
          watch: {
            questions: {
              handler: function() {
                $.ai.set(job, "answer", app.$data);
                console.log(this.questions);
              },
              deep: true
            }
          }
        });

        console.log(res.data);
      } else {
        console.warn(res);
      }
    }
  );
})();
