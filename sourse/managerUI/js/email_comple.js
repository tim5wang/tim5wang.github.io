(function(){ 
var emails = [	{domain: '@qq.com', label: 'qq邮箱'}, 
				{domain: '@163.com', label: '163邮箱'}, 
				{domain: '@126.com', label: '126邮箱'}, 
				{domain: '@hotmail.com', label: 'hotmail邮箱'}, 
				{domain: '@sina.com', label:'sina邮箱'}, 
				{domain: '@gmail.com',label:'gmail邮箱'}, 
				{domain: '@139.com', label: '139邮箱'}, 
				{domain:'@yahoo.com.cn', label: 'yahoo中国邮箱'}
			];

var addEmailHelp = function(id, otherAddress){ 
var inputObj = $('input#' + id); 
if(inputObj.length == 0){ 
return; 
} 

inputObj.keyup(function (ev) { 
var val = $(inputObj).val(); 
var lastInputKey = val.charAt(val.length - 1); 

if (lastInputKey == '@') { 
var indexOfAt = val.indexOf('@'); 
var username = val.substring(0, indexOfAt); 

if ($('datalist#emailList').length > 0) { 
$('datalist#emailList').remove(); 
} 

$(inputObj).parent().append('<datalist id="emailList"></datalist>'); 
for (var i in emails) { 
$('datalist#emailList').append('<option value="' + username + emails[i].domain + '" label="' + emails[i].label + '" />'); 
} 

if(otherAddress != null && typeof otherAddress != 'undefined'){ 
for (var i in otherAddress) { 
$('datalist#emailList').append('<option value="' + username + otherAddress[i].domain + '" label="' + otherAddress[i].label + '" />'); 
} 
} 

$(inputObj).attr('list', 'emailList'); 
} 
}) 
}; 

window.addEmailHelp = addEmailHelp; 
})();