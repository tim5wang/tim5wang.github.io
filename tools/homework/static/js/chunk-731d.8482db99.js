(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-731d"],{"8zjs":function(t,n,e){},DaiE:function(t,n,e){"use strict";var o=e("8zjs");e.n(o).a},G6u5:function(t,n,e){"use strict";e.r(n);var o=e("QbLZ"),i=e.n(o),s=e("L2JU"),c=e("zH15"),l=e.n(c),a=e("dNE1"),r=e.n(a),u=e("7Qib"),h={name:"Msg",data:function(){return{ico:"unlock",unlock:!0,content:"锁定滚动条",height:document.documentElement.clientHeight-94.5+"px;",width:document.documentElement.clientWidth-185+"px;",data:[{name:"elAdmin-",timestamp:new Date,threadName:"system-prompt-message",level:"INFO",className:"me.zhengjie.AppRun :",body:"Welcome, no log output"}],INFO:"#0000ff",WARN:"#FFFF00",ERROR:"#FF0000",DEBUG:"#DEA000"}},computed:i()({},Object(s.b)(["socketApi"])),watch:{data:{handler:function(t,n){var e=this;this.$nextTick(function(){if(e.unlock){var t=document.getElementById("console");t.scrollTop=t.scrollHeight}})}}},mounted:function(){this.initWebSocket()},beforeDestroy:function(){this.disconnect(),window.clearInterval(this.timer)},methods:{parseTime:u.c,initWebSocket:function(){var t=this;this.connection(this),this.timer=window.setInterval(function(){try{t.stompClient.send("test")}catch(n){console.log("断线了: "+n),t.connection()}},5e3)},connection:function(t){var n=this,e=new l.a(this.socketApi);this.stompClient=r.a.over(e);this.stompClient.connect({token:"k1"},function(e){n.stompClient.subscribe("/topic/logMsg",function(e){var o=JSON.parse(e.body);o.name="elAdmin-",console.log(t.data),n.data.push(o)})},function(t){console.log(t)})},disconnect:function(){null!=this.stompClient&&(this.stompClient.disconnect(),window.clearInterval(this.timer))},getColor:function(t){return"INFO"===t?this.INFO:"WARN"===t?this.WARN:"DEBUG"===t?this.DEBUG:this.ERROR},doLock:function(){this.unlock?(this.content="解除锁定",this.ico="lock"):(this.content="锁定滚动条",this.ico="unlock"),this.unlock=!this.unlock}}},d=(e("DaiE"),e("KHd+")),m=Object(d.a)(h,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container",style:"width:"+t.width},[e("el-tooltip",{staticClass:"lock item",attrs:{content:t.content,effect:"dark",placement:"left"}},[e("el-button",{attrs:{type:"info",size:"mini",circle:""},on:{click:t.doLock}},[e("svg-icon",{attrs:{"icon-class":t.ico}})],1)],1),t._v(" "),e("div",{staticClass:"console",style:"height:"+t.height,attrs:{id:"console"}},t._l(t.data,function(n){return e("div",{key:n.time},[e("span",[t._v(t._s(n.name))]),t._v(" "),e("span",{staticStyle:{color:"#CD0066"}},[t._v(t._s(t.parseTime(n.timestamp)+" "))]),t._v(" "),e("span",{staticStyle:{color:"#00CD00"}},[t._v(t._s(n.threadName+" "))]),t._v(" "),e("span",{style:"color:"+t.getColor(n.level)},[t._v("\n        "+t._s(n.level+" ")+"\n      ")]),t._v(" "),e("span",{staticStyle:{color:"#DE00CC"}},[t._v(t._s(n.className+" "))]),t._v(" "),e("span",{domProps:{innerHTML:t._s(n.body)}})])}))],1)},[],!1,null,"3960d69c",null);m.options.__file="msg.vue";n.default=m.exports}}]);