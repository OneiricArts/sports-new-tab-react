(this["webpackJsonpsports-new-tab"]=this["webpackJsonpsports-new-tab"]||[]).push([[0],{14:function(e,a,t){e.exports=t(24)},20:function(e,a,t){},24:function(e,a,t){"use strict";t.r(a);var n=t(1),s=t.n(n),r=t(7),i=t.n(r),l=(t(19),t(20),t(6)),c=t.n(l),o=t(9),m=t(31),u=t(29),d=t(30);var h=t(25),f=t(26),g=t(27),p=(f.a,function(e){var a=e.title,t=e.children;return s.a.createElement(h.a,null,s.a.createElement(f.a,null,a),s.a.createElement(g.a,null,t))});function E(e){var a={displayDate:"Week ".concat(e.w),games:[]};return e.gms.forEach((function(e){var t=e.organizedInfo,n=t.id,s=t.status,r=t.awayTeam,i=t.homeTeam,l=t.awayTeamHasPosession,c=t.homeTeamHasPosession,o=t.awayTeamWinning,m=t.homeTeamWinning,u=t.awayTeamScore,d=t.homeTeamScore,h="";try{if("DATETIME"===s.type){var f=new Date(e.organizedInfo.status.value);h=f.toLocaleString("en-US",{weekday:"short",hour:"2-digit",minute:"2-digit"}).replace(/AM|PM/,"").trim()}else h=s.value}finally{}a.games.push({id:n,status:h,awayTeam:r,homeTeam:i,awayTeamWinning:o,homeTeamWinning:m,awayTeamScore:u,homeTeamScore:d,awayTeamHasPosession:l,homeTeamHasPosession:c,hidden:!1})})),a}function v(e,a){return e.displayDate!==a.displayDate?e:(e.games.map((function(e,t){var n=a.games.filter((function(a){return a.id===e.id}))[0];return n&&(e.hidden=n.hidden),e})),e)}function w(e){var a,t,n;return c.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return"https://sports-new-tab-page.appspot.com/nfl",s.t0=c.a,s.next=4,c.a.awrap(fetch("https://sports-new-tab-page.appspot.com/nfl"));case 4:return s.t1=s.sent.json(),s.next=7,s.t0.awrap.call(s.t0,s.t1);case 7:if(a=s.sent,t=E(a),e){s.next=11;break}return s.abrupt("return",t);case 11:return n=v(t,e),s.abrupt("return",n);case 13:case"end":return s.stop()}}))}var y=t(28),T=function(e){var a=e.game,t=e.removeGame;return n.createElement("tr",null,n.createElement("td",{className:"align-middle"},a.status),n.createElement("td",{className:"align-middle ".concat(a.awayTeamWinning?"winning_team":""," ").concat(a.awayTeamHasPosession?"has_posession":"")},a.awayTeam,a.awayTeamHasPosession&&n.createElement("span",{className:"d-none d-md-inline d-lg-inline"}," \ud83c\udfc8")),n.createElement("td",{className:"align-middle ".concat(a.homeTeamWinning&&"winning_team"," ").concat(a.homeTeamHasPosession?"has_posession":"")},a.homeTeam,a.homeTeamHasPosession&&n.createElement("span",{className:"d-none d-md-inline d-lg-inline"}," \ud83c\udfc8")),n.createElement("td",{className:"align-middle text-right"},a.awayTeamScore),n.createElement("td",{className:"align-middle text-right"},a.homeTeamScore),n.createElement("td",{className:"align-middle text-right"},n.createElement(m.a,{outline:!0,color:"secondary",size:"sm",onClick:function(){return t(a.id)}},"\u2573")))},b=function(){return n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null),n.createElement("th",null,"away"),n.createElement("th",null,"@home"),n.createElement("th",{className:"text-right"},"a"),n.createElement("th",{className:"text-right"},"h"),n.createElement("th",{className:"text-right"})))},N=function(e){var a=e.games,t=e.removeGame;return n.createElement(y.a,{responsive:!0,size:"sm"},n.createElement(b,null),n.createElement("tbody",null,a.filter((function(e){return!e.hidden})).map((function(e,a){return n.createElement(T,{key:a,game:e,removeGame:t})}))))};function x(){var e=Object(n.useState)({displayDate:"",games:[]}),a=Object(o.a)(e,2),t=a[0],r=a[1],l=Object(n.useState)(!1),h=Object(o.a)(l,2),f=h[0],g=h[1],E=function(){var e,a,t;return c.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("using cache"),(a=localStorage.getItem("nfl-schedule-data"))&&(e=JSON.parse(a)),i.a.unstable_batchedUpdates((function(){e&&r(e),g(!0)})),n.prev=4,n.next=7,c.a.awrap(w(e));case 7:t=n.sent,i.a.unstable_batchedUpdates((function(){r(t),g(!1)})),localStorage.setItem("nfl-schedule-data",JSON.stringify(t)),n.next=15;break;case 12:n.prev=12,n.t0=n.catch(4),g(!1);case 15:case"end":return n.stop()}}),null,null,[[4,12]])};Object(n.useEffect)((function(){E()}),[]),function(e){var a=!0,t=function(){a||e(),a=!0},s=function(){return a=!1},r=function(){document.hidden?a=!1:(a||e(),a=!0)};Object(n.useEffect)((function(){return window.addEventListener("focus",t),window.addEventListener("blur",s),document.addEventListener("visibilitychange",r,!1),function(){window.removeEventListener("focus",t),window.removeEventListener("blur",s),document.removeEventListener("visibilitychange",r)}}),[])}(E);return console.log("rendering..."),s.a.createElement(p,{title:s.a.createElement("span",null,s.a.createElement("span",{className:"font-weight-bold"},"NFL"),s.a.createElement("span",{className:"pl-2 font-weight-light font-italic text-lowercase text-muted"},t.displayDate),s.a.createElement(m.a,{outline:!0,size:"sm",className:"float-right",onClick:function(){localStorage.removeItem("nfl-schedule-data"),E()},disabled:f,style:{width:"50px"}},f?s.a.createElement(u.a,{size:"sm",color:"primary",type:"grow"}):"Reset"))},f&&s.a.createElement(d.a,{animated:!0,style:{height:"5px"},color:"info",value:100}),s.a.createElement(N,{games:t.games,removeGame:function(e){var a=t.games.map((function(a){return a.id===e&&(a.hidden=!0),a}));r({displayDate:t.displayDate,games:a}),localStorage.setItem("nfl-schedule-data",JSON.stringify(t))}}))}var S=function(){return s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"card-columns"},s.a.createElement(x,null))))};i.a.render(s.a.createElement(S,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.c11108b3.chunk.js.map