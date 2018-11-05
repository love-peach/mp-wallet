# 小程序demo

## 接入流程

参考 [小程序简易教程-起步](https://developers.weixin.qq.com/miniprogram/dev/index.html)

1. 注册
在微信公众平台注册小程序，完成注册后可以同步进行信息完善和开发。

2. 小程序信息完善
填写小程序基本信息，包括名称、头像、介绍及服务范围等。

3. 开发小程序
完成小程序开发者绑定、开发信息配置后，开发者可下载开发者工具、参考开发文档进行小程序的开发和调试。

4. 提交审核和发布
完成小程序开发后，提交代码至微信团队审核，审核通过后即可发布（公测期间不能发布）。

参考 [接入流程](https://mp.weixin.qq.com/cgi-bin/wx)。

注册分三步：首先填写基本信息。

注意：作为登录帐号，请填写未被微信公众平台注册，未被微信开放平台注册，未被个人微信号绑定的邮箱。

![-w1417](media/15403526940385/15403533644010.jpg)

然后，去邮箱点击链接激活。

最后，登记信息。

![-w1413](media/15403526940385/15403534446984.jpg)

选择主体，扫码完成管理员身份认证。

![-w1129](media/15403526940385/15403536191617.jpg)

![-w738](media/15403526940385/15403537244101.jpg)

主体信息提交后，不可更改，

![-w585](media/15403526940385/15403538104720.jpg)

确定后，提示前往小程序。

![-w580](media/15403526940385/15403538714260.jpg)

小程序后台：

![-w1640](media/15403526940385/15403539036979.jpg)

然后，在设置 - 开发设置 中 可以查看 AppID (注意这里要区别于服务号或订阅号的 AppID)，AppID 相当于小程序平台的一个身份证。


![-w1612](media/15403526940385/15403543067305.jpg)

## 创建项目

创建项目之前，得先下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=18102320)

打开微信开发者工具，首先登陆

![-w334](media/15403526940385/15403603009793.jpg)

然后选择，新建 web项目，还是 小程序

![-w334](media/15403526940385/15403603486450.jpg)

选择小程序，填入 AppID。如果是测试，点测试会自动填入AppId。

![-w411](media/15403526940385/15403604965254.jpg)

**注意**：这里选择 `建立普通快速启动模板`。还有一个是 `建立云开发快速启动模板`，云开发 与 普通开发不同点：

- 无游客模式、也不可以使用 测试号
- project.config.json 中增加了字段 cloudfunctionRoot 用于指定存放云函数的目录
- cloudfunctionRoot 指定的目录有特殊的图标
- 云开发能力从基础库 2.2.3 开始支持

点击确定，一个项目就创建好了。

![-w908](media/15403526940385/15403618195265.jpg)

第一次进来，页面可能是空白的，点一下编译，就可以看到了。

## TODOLIST
- [x] 项目结构梳理
- [x] 统一页面布局 
- [x] 扩展 Page
- [x] 全屏样式。navigationBarBackgroundColor
- [x] 返回拦截 通过自定义返回按钮。
- [x] 本地存储
- [x] 封装请求 提取url
- [x] 打电话 全局配置
- [x] 上传图片
- [x] webview
- [x] 小程序跳转 navigateToMiniProgramAppIdList
- [x] 呼叫电话
- [x] 长按二维码
- [x] 解决小程序不支持异步转同步问题 async await
- [x] 扩展小程序 添加 computed watch 属性
- [ ] 运营商认证
- [ ] 下载app
- [ ] 人脸识别
- [ ] 公众号页面跳小程序 
- [ ] 微信版本兼容 vivo oppo 

## 项目结构
```sh
.
├── api/                      api 接口封装
├── assets/                   静态资源目录
├── common/                   通用目录
├── components/               组件目录
├── lib/                      第三放插件目录
├── pages/                    业务页面目录
├── style/                    样式目录
├── utils/                    公用方法目录
├── template/                 模板目录
├── app.js                    小程序启动文件
├── app.json                  小程序配置
├── app.wxss                  小程序全局样式
├── README.md                 项目说明文档
├── project.config.json       小程序项目配置
├── .editorconfig             代码风格配置
└── .gitignore                Git忽略文件

```

## 注意点

### 页面布局

钱包项目，有统一的头部，以及底部统一的客服电话，每个页面引入一遍比较麻烦，这里将布局提了出来，封装成 `app-layout` 组件。

```html
<view class="app-layout {{ isShowFooter ? 'app-layout-offset-bottom' : ''}}">
  <app-header
    class="app-header-wrap"
    headerTitle="{{ headerTitle }}"
    headerArrow="{{ headerArrow }}"
    isControlBackEvent="{{ isControlBackEvent }}"
    bindtap="onTap"
  />
  <view class="app-layout-content">
    <slot></slot>
  </view>
  <app-footer wx:if="{{ isShowFooter }}" class="app-footer-wrap"></app-footer>
</view>
```

### 扩展 page

项目中有可能有一些功能是每个页面需要使用的，比如埋点。因此需要，有一中方法，能做到统一处理，比较好。

小程序中，每个页面都需要调用 `Page` 方法，因此可以扩展这个 `Page` 方法，做一些事情。

首先定义 扩展的 `wxPage` 方法
```js
// utils/wxPage.js

import api from '../api/api';
import wxApi from '../utils/wxApi';

const wxPage = function(config) {
  const { onLoad } = config;
  // TODO: 添加公用方法

  // 添加 http 请求
  config.api = api;

  // 添加 封装的 wxApi
  config.wxApi = wxApi;

  // 添加 打电话函数
  config.handleCallCustomerService = wxApi.makePhoneCall;

  // 统一处理 onload
  config.onLoad = function(onLoadOptions) {
    // TODO:  打点
    console.log('可以打点');

    // TODO: 获取上一个页面路由
    const pages = getCurrentPages()
    this.__previousPage = pages[pages.length - 2];
    if(this.__previousPage) {
      console.log('上一个路由:', this.__previousPage.route);
    } else {
      console.log('上一个路由: 没有 这是首页');
    }

    if (typeof onLoad === 'function') {
      onLoad.call(this, onLoadOptions);
    }
  };
  return Page(config);
}
export default wxPage;
```

然后，将其挂载到全局中

```js
//app.js

import wxPage from './utils/wxPage';

App({
  wxPage,
  ...
})
```

最后，在页面中使用

```js
const app = getApp();

app.wxPage({
    data: {
    
    },
    onLoad: function() {
    
    }
    ...
})
```

目前有两种办法扩展page. plugin 配合有问题。

### 请求

小程序发请求，通过 wx.request api接口实现。本项目中，将请求统一封装了，统一设置了header token等信息，并且将回调的写法改成 promise 的写法。

另外需要注意，小程序中必须使用 HTTPS 发起网络请求 [查看](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html) 本地开发时可以关闭校验

### wxss

[注意：在组件wxss中不应使用ID选择器、属性选择器和标签名选择器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)


### 模板（template） 引用（import include） 自定义组件

小程序中，是标签优先的。因此，组件的使用，基本是以标签的形式引入的居多，自定义组件在复杂的业务中才会被用到(?)

include 感觉好像没有传递数据的api, 因此，一般适合那种固定内容，而又多次使用的地方。在需要用到的地方，直接 include ,被引入的文件会直接渲染在当前位置。

import 跟传统的组件有点像，只不过是在 'html' 中引入的。import 一个组件，使用的时候，指定 name,并传入数据，就可以了。

自定义组件 从小程序基础库版本 1.6.3 开始。与 小程序原生的组件差不多的使用方法，应该是最接近组件开发的模式（？）只不过自定义组件有点麻烦：

1、首先，需要在自定义组件的 json 文件中声明 ` "component": true`

2、在使用的地方的json文件中，引入：

```json
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

### 上传图片

微信的上传图片逻辑是，首先调用 wx.chooseImage 接口，选择图片，然后调用wx.uploadFile接口，将图片上传到微信服务器，返回一个图片 url，最后，再将这个 url 传给我们自己的服务器，达到上传图片的目的。

但是本项目中，并没有这么做。首先调用 wx.chooseImage 接口，选择图片，然后调用 wx.getFileSystemManager().readFile()接口，将图片转为base64，作为参数传递给后端接口，达到上传图片，以及获取图片信息。

### 长按二维码

> image组件中二维码/小程序码图片不支持长按识别,仅在 wx.previewImage 中支持长按识别

目前小程序中，不支持长按识别二维码。只能将图片保存，然后在通过微信识别。

具体做法：首先，通过 wx.previewImage 接口，将图片做成可点击预览的，这就要求图片不能是本地的，只能是线上图片。然后，在预览窗口中，长按图片，会自动弹出操作选项，选择保存或者发送。在发送窗口，或者本地文件中，长按是可以有识别二维码的选线。

小程序二维码，可以支持长按识别。

### web-view

所有第三方的域名，都得在微信小程序后台 - 开发设置 - 业务域名 中配置，同时需要在业务域名的根目录添加校验文件。包括 第三方 web 页面，iframe 嵌套的页面域名。（假如，你要打开新浪微博web页面，而新浪微博不愿意配合你放校验文件。可能的想法：自己的一个web网站，添加校验文件，内嵌iframe 打开新浪微博，是行不通的。）

另外一点就是，web-view 页面无法自定义导航栏，小程序默认强制使用系统自带的导航栏。

### async await

小程序中，不支持 async await 的写法，需要添加 runtime 文件，在需要用到这个特性的地方引用这个文件，保持微信开发者工具的项目设置中 ES6 转 ES5 处于打开状态。

参考：https://github.com/zarknight/owx
https://github.com/facebook/regenerator


### 下载app

目前项目中用到两种下载文件。在安卓手机中，下载 xx.apk，在苹果手机中，下载 .plist 的文件。可能需要调整接口。

### 返回拦截 

目前小程序暂时不支持返回事件的监听也没有提供相关api，只能通过自定义导航栏 navigationStyle 实现。（只在app.json中有效）。

返回暂时不提供接口控制，但是可以自定义navbar 缺陷是 安卓物理返回键无法监听或者阻止。



## 风险点

- 返回拦截
- 日期组件，暂时没有日期范围选择的组件，需要用两个单独的日期组件组合起来使用
- 版本兼容




