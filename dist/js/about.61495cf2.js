(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0ae28":function(t,e,n){"use strict";n("74ce")},"2b25":function(t,e,n){"use strict";n("32dc")},"32dc":function(t,e,n){},"4ef5":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"overflow-y":"scroll"}},[[n("el-row",[n("el-button",{attrs:{type:"primary",round:""},on:{click:function(e){return t.changeGlobalOpt()}}},[t._v("提交")])],1),t._l(t.setting,(function(e,a){return n("p",{key:a+"a",staticClass:"setting main-boxStyle"},[n("span",{staticClass:"text"},[t._v(" "+t._s(t.$store.state.settingDesc[a]||a)+" ")]),["true"==e||"false"==e?[n("div",{staticClass:"select",staticStyle:{width:"70%"}},[n("el-radio",{attrs:{value:"true",label:"true"},model:{value:t.setting[a],callback:function(e){t.$set(t.setting,a,e)},expression:"setting[i]"}},[t._v("是")]),n("el-radio",{attrs:{value:"false",label:"false"},model:{value:t.setting[a],callback:function(e){t.$set(t.setting,a,e)},expression:"setting[i]"}},[t._v("否")])],1)]:n("div",{staticClass:"select",staticStyle:{width:"70%"}},[n("el-input",{model:{value:t.setting[a],callback:function(e){t.$set(t.setting,a,e)},expression:"setting[i]"}})],1)]],2)}))]],2)},s=[],i=n("c7eb"),r=n("1da1"),c={props:["aria2"],data:function(){return{setting:null,radio:"1"}},mounted:function(){var t=this;return Object(r["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.aria2.getGlobalOption();case 2:t.setting=e.sent;case 3:case"end":return e.stop()}}),e)})))()},methods:{changeGlobalOpt:function(){var t=this;return Object(r["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.aria2.changeGlobalOption(t.setting),e.next=3,t.aria2.getGlobalOption();case 3:t.setting=e.sent;case 4:case"end":return e.stop()}}),e)})))()}}},l=c,o=(n("0ae28"),n("2877")),u=Object(o["a"])(l,a,s,!1,null,null,null);e["default"]=u.exports},"74ce":function(t,e,n){},cc90:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ul",{staticClass:"complete-sty"},t._l(t.tasks,(function(e,a){return n("li",{key:a,staticClass:"main-boxStyle"},[t._v(" "+t._s(t.getFilenames(e.files[0].path))+" / "+t._s(t.fixed(e.completedLength/e.totalLength*100))+"% ")])})),0)])},s=[],i=n("c7eb"),r=n("1da1"),c=(n("33d1"),n("ea98"),n("ac1f"),n("1276"),n("b680"),{name:"completed",props:["aria2"],data:function(){return{tasks:[]}},mounted:function(){var t=this;this.$store.state.DownloadPage=!1;try{this.intervalId=setInterval(Object(r["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.aria2.tellStopped(0,1e3);case 2:t.tasks=e.sent;case 3:case"end":return e.stop()}}),e)}))),1e3)}catch(e){if("WS_CONNECTION_ERROR"!=e)throw e;clearInterval(this.intervalId)}},beforeDestroy:function(){clearInterval(this.intervalId)},methods:{getFilenames:function(t){return t.split("/").at(-1)},fixed:function(t){return t=+t,t.toFixed(2)}}}),l=c,o=(n("2b25"),n("2877")),u=Object(o["a"])(l,a,s,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=about.61495cf2.js.map