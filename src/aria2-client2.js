class Aria2Client{
  constructor(options){
    //信息
    this.options = options
    this.websocket = new WebSocket(`ws://${options.host}:${options.port}/jsonrpc`)
    
    //在组件中是用mounted使用aria2链接，然而那是websocket还没链接成功
    //构建是同步，建立链接是异步的
    this.connectPromise = new Promise((resolve, reject) => {
      // 执行aria2中的所有方法都等这个promise完成后才执行
      this.websocket.addEventListener('open', () => {
        resolve()
      })
      this.websocket.addEventListener('error', (e) => {
        reject('WS_CONNECTION_ERROR')
      })
    })

    this.lastId = 1

    this.callbacks = {} //存放每个请求的回调函数

    //收到消息时，根据消息的id就能查到就能查到回调函数
    this.websocket.addEventListener('message', e => {
      let data = JSON.parse(e.data)
      let callback = this.callbacks[data.id]
      delete this.callbacks[data.id]
      if(typeof callback == 'function'){
        callback(data)
      }
    })
    
  }

  
  // addUri(...args){
  //   return new Promise((resolve, reject) => {
  //     let id = this.lastId++;
  //     //发往远程， 有可能同时调用了几个函数，回复的顺序不一定是某种顺序（需要回调）
  //     //这个id的回调函数是哪一个
  //     this.callbacks[id] = function(data){
  //       if(data.error){
  //         reject(data.error)
  //       }else{
  //         resolve(data.result)
  //       }
  //     }
  //     this.websocket.send(JSON.stringify({
  //       jsonrpc: '2.0',
  //       id: id,
  //       method: 'aria2.addUri',
  //       params: [`token:${this.options.secret}`, ...args]
  //     }))
  //   })
  // }


  ready() {
    return this.connectPromise
  }
  close() {
    this.websocket.close()
    //如果需要等它完成以后再执行其他操作，下面的写法
    return new Promise((resolve, reject) => {
      this.websocket.addEventListener('close', () => {
        resolve()
      })
    })
  }
  
}

;[
"addUri",
"addTorrent",
"getPeers",
"addMetalink",
"remove",
"pause",
"forcePause",
"pauseAll",
"forcePauseAll",
"unpause",
"unpauseAll",
"forceRemove",
"changePosition",
"tellStatus",
"getUris",
"getFiles",
"getServers",
"tellActive",
"tellWaiting",
"tellStopped",
"getOption",
"changeUri",
"changeOption",
"getGlobalOption",
"changeGlobalOption",
"purgeDownloadResult",
"removeDownloadResult",
"getVersion",
"getSessionInfo",
"shutdown",
"forceShutdown",
"getGlobalStat",
"saveSession",
"multicall",
"listMethods",
"listNotifications",
].forEach(methodName => {
  Aria2Client.prototype[methodName] = function (...args) {
    
    // 所有其他的方法都等这个promise完成后才执行
    return this.connectPromise.then(() => {
      return new Promise((resolve, reject) => {
        console.log(1)
        var id = this.lastId++
        this.callbacks[id] = function(data) {
          if (data.error) {
            reject(data.error)
          } else {
            resolve(data)
          }
        }
        this.websocket.send(JSON.stringify({
          jsonrpc: '2.0',
          id: id,
          method: `aria2.${methodName}`,
          params: [`token:${this.options.secret}`, ...args]
        }))
      })
    })
  }
})

export default Aria2Client