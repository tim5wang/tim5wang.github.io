(function($) {
  $.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  };
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
