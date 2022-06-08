import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toggleSele: 'a',
    settingDesc: {
      "allow-overwrite": "允许覆盖",
      "allow-piece-length-change": "允许分片大小变化",
      "always-resume": "始终断点续传",
      "async-dns": "异步 DNS",
      "auto-file-renaming": "文件自动重命名",
      "auto-save-interval": "自动保存间隔",
      "conditional-get": "条件下载",
      "conf-path": "配置文件路径",
      "console-log-level": "控制台日志级别",
      "content-disposition-default-utf8": "使用 UTF-8 处理 Content-Disposition",
      "daemon": "启用后台进程",
      "deferred-input": "延迟加载",
      "disable-ipv6": "禁用 IPv6",
      "disk-cache": "磁盘缓存",
      "download-result": "下载结果",
      "dscp": "DSCP",
      "rlimit-nofile": "最多打开的文件描述符",
      "enable-color": "终端输出使用颜色",
      "enable-mmap": "启用 MMap",
      "event-poll": "事件轮询方法",
      "file-allocation": "文件分配方法",
      "force-save": "强制保存",
      "save-not-found": "保存未找到的文件",
      "hash-check-only": "仅哈希检查",
      "human-readable": "控制台可读输出",
      "keep-unfinished-download-result": "保留未完成的任务",
      "max-download-result": "最多下载结果",
      "max-mmap-limit": "MMap 最大限制",
      "max-resume-failure-tries": "最大断点续传尝试次数",
      "min-tls-version": "最低 TLS 版本",
      "log-level": "日志级别",
      "optimize-concurrent-downloads": "优化并发下载",
      "piece-length": "文件分片大小",
      "show-console-readout": "显示控制台输出",
      "summary-interval": "下载摘要输出间隔",
      "max-overall-download-limit": "全局最大下载速度",
      "max-download-limit": "最大下载速度",
      "no-conf": "禁用配置文件",
      "no-file-allocation-limit": "文件分配限制",
      "parameterized-uri": "启用参数化 URI 支持",
      "quiet": "禁用控制台输出",
      "realtime-chunk-checksum": "实时数据块验证",
      "remove-control-file": "删除控制文件",
      "save-session": "状态保存文件",
      "save-session-interval": "保存状态间隔",
      "socket-recv-buffer-size": "Socket 接收缓冲区大小",
      "stop": "自动关闭时间",
      "truncate-console-readout": "缩短控制台输出内容",
    },
    setStoreNum: '',
    DownloadPage: false,
    btnClickInfo: '',
  },
  mutations: {
    setStore(state, serves) {
			localStorage.setItem('aria2Serves', serves)
		},
    getStore(state) {
      state.setStoreNum = localStorage.getItem('aria2Serves')
      return state.setStoreNum
    },
	},
  actions: {},
  modules: {},
  
});
