
// 获取某个URL参数/参数列表
(function($) {
  $.getUrlParam = function(name) {
    
    // 获取全部参数，返回对象
    var url =decodeURI(decodeURI(location.search)); //获取url中"?"符后的字串，使用了两次decodeRUI解码
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    console.log(theRequest)
    if(name){ // 确切参数
        return theRequest[name];
    }else{
        return theRequest;
    }
    
    
  };
})(jQuery);


// URL编码,传入key,value
(function($){
    $.setUrlParam = function(params,value){
        if(!params) return;
        
        var url = location.origin + location.pathname + "?";
        if(value){ // 传入了一个参数
            url += params + "="+ encodeURI(value)
        }else{ // 传入了较多参数
           if(typeof params != 'object') return;
           var start = true;
           for(const index in params){
               if(start){
                   url += index + "=" + encodeURI(params[index])
                   start = false
               }else{
                   url += "&" +index + "=" + encodeURI(params[index])
               }
               
           }
           
        }
        return url;
        //location.href = url;
    };
    
    $.addUrlParam = function(params,value){
        if(!params) return;
        
        var hasParam = location.search.indexOf('?')!= -1;
        var url = location.href;
        if(value){ // 传入了一个参数
            if(hasParam){
                url += "&" + params + "=" + encodeURI(value);
            }else{
                url += "?" + params + "=" + encodeURI(value);
            }
            
        }else{ // 传入了较多参数
            if(typeof params != 'object') return;
            
            
            if(!hasParam){
                url += "?";
            }else{
                url += "&";
            }
            
            var start = true;
            for(const index in params){
               if(start){
                   url += index + "=" + encodeURI(params[index])
                   start = false
               }else{
                   url += "&" +index + "=" + encodeURI(params[index])
               }
            }
        }
        //location.href = url;
        return url

    }
    
    
})(jQuery);


// 日期格式化
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

Date.prototype.TimeDistance = function(diff) {
  //计算相差天数
  let days = Math.floor(diff / (24 * 3600 * 1000));
  //计算出小时数
  let leave1 = diff % (24 * 3600 * 1000);
  //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000);
  //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000);
  //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);

  //let returnStr = seconds + "秒";
  let returnStr = "";
  if (diff > 60000) {
    returnStr = minutes + "分" + returnStr;
  } else {
    returnStr = "小于1分钟";
  }
  if (hours > 0) {
    returnStr = hours + "小时" + returnStr;
  }
  if (days > 0) {
    returnStr = days + "天" + returnStr;
  }
  return returnStr;
};

Date.prototype.TetTimeB = function(start_time, end_time) {
  let endDate = new Date();
  if (end_time != undefined) endDate = end_time;
  let startDate = new Date(start_time);
  //计算时间差的毫秒数
  let diff = endDate.getTime() - startDate.getTime();
  return Date.prototype.timeDistence(diff);
};

(function($) {
  // app instance
  $.ai = {
    get: function(instance, key) {
      let lo = localStorage.getItem(instance);
      if (lo == undefined) return lo;
      lo = JSON.parse(lo);
      return lo[key];
    },
    set: function(instance, key, val) {
      let lo = localStorage.getItem(instance);
      if (lo == undefined) lo = {};
      else lo = JSON.parse(lo);
      lo[key] = val;
      return localStorage.setItem(instance, JSON.stringify(lo));
    },
    all: function(instance) {
      let lo = localStorage.getItem(instance);
      if (lo == undefined) return lo;
      lo = JSON.parse(lo);
      return lo;
    },
    cover: function(instance, lo) {
      localStorage.setItem(instance, lo);
    }
  };
})(jQuery);

(function($) {
  $.deepCopy = function(obj) {
    if (typeof obj != "object") {
      return obj;
    }
    var newobj = Array.isArray(obj) ? [] : {};
    for (var attr in obj) {
      newobj[attr] = this.deepCopy(obj[attr]);
    }
    return newobj;
  };
})(jQuery);
