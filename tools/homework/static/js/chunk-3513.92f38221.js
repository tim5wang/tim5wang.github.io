(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3513"],{"0jop":function(e,t,r){},fIwS:function(e,t,r){"use strict";r.r(t);var o=r("wk8/"),a=r("cCY5"),n=r.n(a),i=(r("VCwm"),{name:"Form",components:{Treeselect:n.a},props:{roles:{type:Array,required:!0},isAdd:{type:Boolean,required:!0},sup_this:{type:Object,default:null}},data:function(){return{dialog:!1,loading:!1,form:{username:"",email:"",enabled:"false",roles:[]},roleIds:[],rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}],enabled:[{required:!0,message:"状态不能为空",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,e.form.roles=[];var r=e;e.roleIds.forEach(function(e,t){var o={id:e};r.form.roles.push(o)}),e.isAdd?e.doAdd():e.doEdit()})},doAdd:function(){var e=this;Object(o.a)(this.form).then(function(t){e.resetForm(),e.$notify({title:"添加成功",message:"默认密码：123456",type:"success",duration:2500}),e.loading=!1,e.$parent.$parent.init()}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})},doEdit:function(){var e=this;Object(o.c)(this.form).then(function(t){e.resetForm(),e.$notify({title:"修改成功",type:"success",duration:2500}),e.loading=!1,e.sup_this.init()}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})},resetForm:function(){this.dialog=!1,this.$refs.form.resetFields(),this.roleIds=[],this.form={username:"",email:"",enabled:"false",roles:[]}}}}),s=(r("rikW"),r("KHd+")),l=Object(s.a)(i,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{visible:e.dialog,title:e.isAdd?"新增用户":"编辑用户","append-to-body":"",width:"500px"},on:{"update:visible":function(t){e.dialog=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"66px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{staticStyle:{width:"370px"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{staticStyle:{width:"370px"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"状态",prop:"enabled"}},[r("el-radio",{attrs:{label:"true"},model:{value:e.form.enabled,callback:function(t){e.$set(e.form,"enabled",t)},expression:"form.enabled"}},[e._v("激活")]),e._v(" "),r("el-radio",{attrs:{label:"false"},model:{value:e.form.enabled,callback:function(t){e.$set(e.form,"enabled",t)},expression:"form.enabled"}},[e._v("锁定")])],1),e._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{label:"角色"}},[r("treeselect",{staticStyle:{width:"370px"},attrs:{multiple:!0,options:e.roles,placeholder:"请选择角色"},model:{value:e.roleIds,callback:function(t){e.roleIds=t},expression:"roleIds"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"text"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),r("el-button",{attrs:{loading:e.loading,type:"primary"},on:{click:e.doSubmit}},[e._v("确认")])],1)],1)},[],!1,null,"55f76963",null);l.options.__file="form.vue";t.default=l.exports},rikW:function(e,t,r){"use strict";var o=r("0jop");r.n(o).a},"wk8/":function(e,t,r){"use strict";r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n}),r.d(t,"c",function(){return i}),r.d(t,"f",function(){return s}),r.d(t,"e",function(){return l}),r.d(t,"d",function(){return u});var o=r("t3Un");function a(e){return Object(o.a)({url:"api/users",method:"post",data:e})}function n(e){return Object(o.a)({url:"api/users/"+e,method:"delete"})}function i(e){return Object(o.a)({url:"api/users",method:"put",data:e})}function s(e){return Object(o.a)({url:"api/users/validPass/"+e,method:"get"})}function l(e){return Object(o.a)({url:"api/users/updatePass/"+e,method:"get"})}function u(e,t){return Object(o.a)({url:"api/users/updateEmail/"+e,method:"post",data:t})}}}]);