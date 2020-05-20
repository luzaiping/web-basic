/* eslint-disable */
/**
 * 实现简易的模板引擎
 */

// 这个版本使用 eval 的方式执行转换后的字符串代码
// 另外这种方式强耦合了 data 和 html模板内容
// 模板内容是 users 以及 users[i].name, users[i].url
// 因为入参必须是 users，并且每个项的名称必须包含 name 和 url
function tmpl(str, data) {
  var str = document.getElementById(str).innerHTML;

    var string = "var p = []; p.push('" +
    str
    .replace(/[\r\t\n]/g, "")
    .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g,"p.push('")
    + "');"

    eval(string)

    return p.join('');
}

const users = [
  { "name": "Byron", "url": "http://localhost" },
  { "name": "Casper", "url": "http://localhost" },
  { "name": "Frank", "url": "http://localhost" }
];

var container = document.getElementById("name_list");
container.innerHTML = tmpl("user_tmpl", users);

