# 一级标题

## 二级标题

段落内容：随便写点什么都可以。
没有空格行的话，这边的内容会紧跟在上一段里面

有空格行的内容，就会形成新的段落

### 三级标题

> 这是一个块引用，markdown里以 '>' 表示.
>
> 这是另外一个块引用，上面还有一个 '>' 开头的空行，这样这段才会形成一个新的段落行.
>
> #### 块引用里的四级标题

这段内容包含*强调*的文字（被2个星号包含就是强调的内容）, 星号前后无需空格隔开, 等同于 'em' 标签

再看看,_这个也是强调的内容_,被2个单下划线包含，第一个下划线前必须得有空格, 否则标志会失效, 等同于 'em' 标签

__这个是strong的内容__，被2个 __双单下划线__ 包含 等同于 'strong' 标签,起始的双下划线前面不能有空格，结尾的双下划线不能有空格，跟 单下划线是一样

**这个也是strong的内容**，被2个**双星号**包含，星号前后空格不是必须，这个要比下划线更好用

Use two asterisks for**strong emphasis**.

+ F神
+ D神
+ V神

+ K神
+ B神
+ A神

1.第一步
2.第二步
3.第三步

[Google Link]: http://www.google.com/ "Google"
[2]: http://www.baidu.com/ "百毒"

+ 有序的内容

    中间加一个空行，当前行缩进4个空格或者一个tab，这样就可以在当前item里形成多行的段落

    再来一个段落看看

+ 再加一个有序内容

Inline-style的超链接, 链接内容通过中括号包含起来，后面紧跟一个括号，超链接地址作为括号的最开始内容，如果需要超链接的title，则以双引号包含title：

[百度](http://www.baidu.com "这是超链接的标题")

Reference-style的超链接：链接内容还是用中括号包含起来，后面紧跟一个中括号，里面是一个唯一的字符，可以是数字，字符，空格等，相当于是标识符；

然后在其他地方定义一个中括号包含的标识符，后面跟上冒号 然后空格 跟上 链接地址，空格跟上 链接的Title，title是可选

[Goolge][Google Link]要比[百度][2]强百倍，你服不服

![貌似这边显示不了图片](https://www.baidu.com/img/gaokao_pc_22894732028445b2e2caaf21ebc5e508.png '标题得用双引号包含')

![另外一种图片的定义方式][baidu picture]

[baidu picture]: https://www.baidu.com/img/gaokao_pc_22894732028445b2e2caaf21ebc5e508.png "标题得用双引号包含"

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

```javascript
let name = 'Felix'

function format(name) {
    return `#${name}#`
}
```

----
上面是一条分割线

----

## 两个DIV设置同高的办法

### html内容

``` html
<div id="container">
    <div id="left-col">
      <p>Test content</p>
      <p>longer</p>
      <p>longer</p>
      <p>longer</p>
      <p>longer</p>
      <p>longer</p>
    </div>
    <div id="right-col">
      <p>Test content</p>
    </div>
  </div>
```

### CSS设置

``` css
#container {
  overflow: hidden;
  width: 100%;
  padding: 1%
}

#left-col {
  float: left;
  background-color: orange;
  padding-bottom: 500em;
  margin-bottom: -500em;
  width: 38%;
  margin-right: 1%;
  border: 1px solid black;
}

#right-col {
  float: left;
  //margin-right: -1px; /* Thank you IE */
  background-color: red;
  padding-bottom: 500em;
  margin-bottom: -500em;
  width: 60%;
  border: 1px solid black;
}

```

----
参考 [链接](https://stackoverflow.com/questions/1205159/html-css-making-two-floating-divs-the-same-height "同高设置")

```javascript

let name = 'sandy'
console.log(name)

```
