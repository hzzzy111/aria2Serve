# RPC （8.31 第五节）
 * 当你需要跟服务器通信（让服务器给你返回各种代码） 
    构建一个网站（在网站通过js发请求），rpc（远程过程调用）可以抽象这个过程
    网络通信之间我们像一直在发送http请求，实际上通过网络发往服务器我想调用哪个函数，服务器在发送结果给我

# WebSocket 是一种网络通信协议
  * HTTP 协议有一个缺陷：通信只能由客户端发起。
  * websocket 可以双向放送信息（客户端，服务端）
  * 可以跨域的

# aria2
  * 如果已经有一个进程监听6800端口，它也会报监听成功（它其实没有监听，但是它不报错，软件问题）

# vue
  * components views
    components 会复用的东西
    views 路由里用到，需要切换

  * 生命周期
    https://bbs.huaweicloud.com/blogs/278913

  * 在index.js文件里添加了window的对象
    如果不写在其他文件（如vue文件里获取window.aria2）中获取构建工具扫描代码不存在，而全局找不到index.js

  * v-model不能绑定临时变量

  * 如何做到响应式
    当Vue初始化组件实例时，它会监听data项的变化。这意味着它将遍历 data 中的所有属性，并使用Object.defineProperty将它们转换为 getter/setter，通过为每个属性设置一个自定义的setter，Vue就可以监测到每个属性的变化，并且通知那些需要响应变化的依赖项。它是如何将依赖项和属性之间进行建联的呢？ 通过利用getters进行注册依赖，当触发 computed、watch和render function等行为时。


# setinterval
  * setInterval对象或setTimeout对象，这两种定时器对象只会随着窗口对象的销毁才从栈空间回收。

# jsonp
  * ajax不允许跨域请求，而 script 标签 src 属性可以跨域的 js 脚本，利用这个特性，服务端不再返回 JSON 格式的数据，而是返回一段调用某个函数的 js 代码，在 src 中进行了调用，这样实现了跨域。

# aria2服务器
  * 下拉框选中哪个就选哪个服务器
  * 重新创建一个服务器

# 异步捕获错误
  * https://smartline.cc/error-catch/
