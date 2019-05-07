(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-08ba"],{MSNs:function(e,t,r){"use strict";r.d(t,"c",function(){return n}),r.d(t,"e",function(){return i}),r.d(t,"a",function(){return s}),r.d(t,"b",function(){return a}),r.d(t,"d",function(){return l});var o=r("t3Un");function n(){return Object(o.a)({url:"api/qiNiuConfig",method:"get"})}function i(e){return Object(o.a)({url:"api/qiNiuConfig",data:e,method:"put"})}function s(e){return Object(o.a)({url:"api/qiNiuContent/"+e,method:"delete"})}function a(e){return Object(o.a)({url:"api/qiNiuContent/download/"+e,method:"get"})}function l(){return Object(o.a)({url:"api/qiNiuContent/synchronize",method:"post"})}},fSph:function(e,t,r){},iIQJ:function(e,t,r){"use strict";var o=r("fSph");r.n(o).a},ylM3:function(e,t,r){"use strict";r.r(t);var o=r("MSNs"),n={name:"Config",data:function(){return{zones:["华东","华北","华南","北美","东南亚"],loading:!1,form:{accessKey:"",secretKey:"",bucket:"",host:"",zone:"",type:""},rules:{accessKey:[{required:!0,message:"请输入accessKey",trigger:"blur"}],secretKey:[{required:!0,message:"请输入secretKey",trigger:"blur"}],bucket:[{required:!0,message:"请输入空间名称",trigger:"blur"}],host:[{required:!0,message:"请输入外链域名",trigger:"blur"}],type:[{required:!0,message:"空间类型不能为空",trigger:"blur"}]}}},created:function(){this.init()},methods:{init:function(){var e=this;Object(o.c)().then(function(t){e.form=t})},doSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.loading=!0,Object(o.e)(e.form).then(function(t){e.$notify({title:"修改成功",type:"success",duration:2500}),e.loading=!1}).catch(function(t){e.loading=!1,console.log(t.response.data.message)})})}}},i=(r("iIQJ"),r("KHd+")),s=Object(i.a)(n,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"form",staticStyle:{"margin-top":"6px"},attrs:{model:e.form,rules:e.rules,size:"small","label-width":"130px"}},[r("el-form-item",{attrs:{label:"Access Key",prop:"accessKey"}},[r("el-input",{staticStyle:{width:"35%"},model:{value:e.form.accessKey,callback:function(t){e.$set(e.form,"accessKey",t)},expression:"form.accessKey"}}),e._v(" "),r("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[e._v("accessKey，在安全中心，秘钥管理中查看")])],1),e._v(" "),r("el-form-item",{attrs:{label:"Secret Key",prop:"secretKey"}},[r("el-input",{staticStyle:{width:"35%"},attrs:{type:"password"},model:{value:e.form.secretKey,callback:function(t){e.$set(e.form,"secretKey",t)},expression:"form.secretKey"}}),e._v(" "),r("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[e._v("secretKey，在安全中心，秘钥管理中查看")])],1),e._v(" "),r("el-form-item",{attrs:{label:"空间名称",prop:"bucket"}},[r("el-input",{staticStyle:{width:"35%"},model:{value:e.form.bucket,callback:function(t){e.$set(e.form,"bucket",t)},expression:"form.bucket"}}),e._v(" "),r("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[e._v("存储空间名称作为唯一的 Bucket 识别符")])],1),e._v(" "),r("el-form-item",{attrs:{label:"外链域名",prop:"host"}},[r("el-input",{staticStyle:{width:"35%"},model:{value:e.form.host,callback:function(t){e.$set(e.form,"host",t)},expression:"form.host"}}),e._v(" "),r("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[e._v("外链域名，可自定义，需在七牛云绑定")])],1),e._v(" "),r("el-form-item",{attrs:{label:"存储区域",prop:"port"}},[r("el-select",{attrs:{placeholder:"请选择存储区域"},model:{value:e.form.zone,callback:function(t){e.$set(e.form,"zone",t)},expression:"form.zone"}},e._l(e.zones,function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})})),e._v(" "),r("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[e._v("北美区域尚未支持自定义数据处理服务，一旦创建区域无法修改，请谨慎选择")])],1),e._v(" "),r("el-form-item",{attrs:{label:"空间类型",prop:"host"}},[r("el-radio",{attrs:{label:"公开"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[e._v("公开")]),e._v(" "),r("el-radio",{attrs:{label:"私有"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[e._v("私有")]),e._v(" "),r("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[e._v("公开和私有仅对 Bucket 的读文件生效，修改、删除、写入等对 Bucket 的操作均需要拥有者的授权才能进行操作")])],1),e._v(" "),r("el-button",{staticStyle:{"margin-left":"5%"},attrs:{loading:e.loading,size:"medium",type:"success"},on:{click:e.doSubmit}},[e._v("保存配置")])],1)},[],!1,null,"30a955a7",null);s.options.__file="config.vue";t.default=s.exports}}]);