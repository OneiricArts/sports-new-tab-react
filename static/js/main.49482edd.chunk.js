(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(25)},20:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(7),s=n.n(c),l=(n(20),n(6)),o=n.n(l),i=n(8),m=n(10),u=n(32),d=n(30),f=n(31);var h=n(26),p=n(27),g=n(28),E=(p.a,function(e){var t=e.title,n=e.children;return r.a.createElement(h.a,null,r.a.createElement(p.a,null,t),r.a.createElement(g.a,null,n))});function v(e){var t={displayDate:"Week ".concat(e.w),games:[]};return e.gms.map(function(e){var n,a,r;return n=e.qtr?e.playing?"".concat(e.qtr,"Q, ").concat(e.clock):e.qtr:e.extrainfo?"".concat(e.extrainfo.gameSchedule.gameDate," ").concat(e.t):e.t,a=e.extrainfo?e.extrainfo.gameSchedule.visitorNickname:e.away.abbr,r=e.extrainfo?e.extrainfo.gameSchedule.homeNickname:e.home.abbr,t.games.push({id:e.eid,status:n,awayTeam:a,homeTeam:r,awayTeamWinning:e.visitor_winning,homeTeamWinning:e.home_winning,awayTeamScore:e.away.score.T,homeTeamScore:e.home.score.T,awayTeamHasPosession:e.visitor_pos,homeTeamHasPosession:e.home_pos,hidden:!1}),e}),t}function w(e,t){return e.displayDate!==t.displayDate?e:(e.games.map(function(e,n){var a=t.games.filter(function(t){return t.id===e.id})[0];return a&&(e.hidden=a.hidden),e}),e)}function y(e){return b.apply(this,arguments)}function b(){return(b=Object(i.a)(o.a.mark(function e(t){var n,a,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"https://us-central1-sports-new-tab.cloudfunctions.net/nfl-data",e.next=3,fetch("https://us-central1-sports-new-tab.cloudfunctions.net/nfl-data");case 3:return e.next=5,e.sent.json();case 5:if(n=e.sent,a=v(n),t){e.next=9;break}return e.abrupt("return",a);case 9:return r=w(a,t),e.abrupt("return",r);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}var T=n(29),x=function(e){var t=e.game,n=e.removeGame;return a.createElement("tr",null,a.createElement("td",null,t.status),a.createElement("td",{className:"".concat(t.awayTeamWinning?"winning_team":""," ").concat(t.awayTeamHasPosession&&"has_posession")},t.awayTeam,t.awayTeamHasPosession&&a.createElement("span",{className:"d-none d-md-inline d-lg-inline"}," \ud83c\udfc8")),a.createElement("td",{className:"".concat(t.homeTeamWinning&&"winning_team"," ").concat(t.homeTeamHasPosession&&"has_posession")},t.homeTeam,t.homeTeamHasPosession&&a.createElement("span",{className:"d-none d-md-inline d-lg-inline"}," \ud83c\udfc8")),a.createElement("td",null,t.awayTeamScore),a.createElement("td",null,t.homeTeamScore),a.createElement("td",null,a.createElement(u.a,{outline:!0,color:"secondary",size:"sm",onClick:function(){return n(t.id)}},"\u2573")))},N=function(){return a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null),a.createElement("th",null,"away"),a.createElement("th",null,"@home"),a.createElement("th",null,"a"),a.createElement("th",null,"h"),a.createElement("th",null)))},S=function(e){var t=e.games,n=e.removeGame;return a.createElement(T.a,{responsive:!0,size:"sm"},a.createElement(N,null),a.createElement("tbody",null,t.filter(function(e){return!e.hidden}).map(function(e,t){return a.createElement(x,{key:t,game:e,removeGame:n})})))};function k(){var e=Object(a.useState)({displayDate:"",games:[]}),t=Object(m.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(!1),h=Object(m.a)(l,2),p=h[0],g=h[1],v=function(){var e=Object(i.a)(o.a.mark(function e(){var t,n,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("using cache"),(n=localStorage.getItem("nfl-schedule-data"))&&(t=JSON.parse(n)),s.a.unstable_batchedUpdates(function(){t&&c(t),g(!0)}),e.prev=4,e.next=7,y(t);case 7:a=e.sent,s.a.unstable_batchedUpdates(function(){c(a),g(!1)}),localStorage.setItem("nfl-schedule-data",JSON.stringify(a)),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(4),g(!1);case 15:case"end":return e.stop()}},e,null,[[4,12]])}));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)(function(){v()},[]),function(e){var t=!0,n=function(){t||e(),t=!0},r=function(){return t=!1},c=function(){document.hidden?t=!1:(t||e(),t=!0)};Object(a.useEffect)(function(){return window.addEventListener("focus",n),window.addEventListener("blur",r),document.addEventListener("visibilitychange",c,!1),function(){window.removeEventListener("focus",n),window.removeEventListener("blur",r),document.removeEventListener("visibilitychange",c)}},[])}(v);return console.log("rendering..."),r.a.createElement(E,{title:r.a.createElement("span",null,r.a.createElement("span",{className:"font-weight-bold"},"NFL"),r.a.createElement("span",{className:"pl-2 font-weight-light font-italic text-lowercase text-muted"},n.displayDate),r.a.createElement(u.a,{outline:!0,size:"sm",className:"float-right",onClick:function(){localStorage.removeItem("nfl-schedule-data"),v()},disabled:p,style:{width:"50px"}},p?r.a.createElement(d.a,{size:"sm",color:"primary",type:"grow"}):"Reset"))},p&&r.a.createElement(f.a,{animated:!0,style:{height:"5px"},color:"info",value:100}),r.a.createElement(S,{games:n.games,removeGame:function(e){var t=n.games.map(function(t){return t.id===e&&(t.hidden=!0),t});c({displayDate:n.displayDate,games:t}),localStorage.setItem("nfl-schedule-data",JSON.stringify(n))}}))}var O=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card-columns"},r.a.createElement(k,null))))};n(24);s.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.49482edd.chunk.js.map