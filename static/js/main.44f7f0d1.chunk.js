(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(24)},19:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),l=n(10),c=n.n(l),i=(n(19),n(13)),m=n(6),o=n.n(m),u=n(11);function s(e){var t={displayDate:"Week ".concat(e.w),games:[]};return e.gms.map(function(e){var n,a,r;return n=e.qtr?e.playing?"".concat(e.qtr,"Q, ").concat(e.clock):e.qtr:e.extrainfo?"".concat(e.extrainfo.gameSchedule.gameDate," ").concat(e.t):e.t,a=e.extrainfo?e.extrainfo.gameSchedule.visitorNickname:e.away.abbr,r=e.extrainfo?e.extrainfo.gameSchedule.homeNickname:e.home.abbr,e.visitor_pos&&(a="".concat(a," \ud83c\udfc8")),e.home_pos&&(r="".concat(r," \ud83c\udfc8")),t.games.push({id:e.eid,status:n,awayTeam:a,homeTeam:r,awayTeamWinning:e.visitor_winning,homeTeamWinning:e.home_winning,awayTeamScore:e.away.score.T,homeTeamScore:e.home.score.T,hidden:!1}),e}),t}function d(e,t){return e.displayDate!==t.displayDate?e:(e.games.map(function(e,n){var a=t.games.filter(function(t){return t.id===e.id})[0];return a&&(e.hidden=a.hidden),e}),e)}function f(){return(f=Object(u.a)(o.a.mark(function e(t){var n,a,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://us-central1-sports-new-tab.cloudfunctions.net/nfl-data");case 2:if(n=e.sent,a=s(n),t){e.next=6;break}return e.abrupt("return",a);case 6:return r=d(a,t),e.abrupt("return",r);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}var h=n(29),g=n(25),p=function(e){var t=e.game,n=e.removeGame;return a.createElement("tr",null,a.createElement("td",null,t.status),a.createElement("td",{className:t.awayTeamWinning?"winning_team":""},t.awayTeam),a.createElement("td",{className:t.homeTeamWinning?"winning_team":""},t.homeTeam),a.createElement("td",null,t.awayTeamScore),a.createElement("td",null,t.homeTeamScore),a.createElement("td",null,a.createElement(h.a,{outline:!0,color:"secondary",size:"sm",onClick:function(){return n(t.id)}},"\u2573")))},E=function(){return a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null),a.createElement("th",null,"away"),a.createElement("th",null,"@home"),a.createElement("th",null,"a"),a.createElement("th",null,"h"),a.createElement("th",null)))},v=function(e){var t=e.games,n=e.removeGame;return a.createElement(g.a,{responsive:!0,size:"sm"},a.createElement(E,null),a.createElement("tbody",null,t.filter(function(e){return!e.hidden}).map(function(e,t){return a.createElement(p,{key:t,game:e,removeGame:n})})))},y=n(26),w=n(27),b=n(28),S=(w.a,function(e){var t=e.title,n=e.children;return r.a.createElement(y.a,null,r.a.createElement(w.a,null,t),r.a.createElement(b.a,null,n))});function T(){var e=Object(a.useState)({displayDate:"",games:[]}),t=Object(i.a)(e,2),n=t[0],l=t[1],c=function(){var e,t=localStorage.getItem("nfl-schedule-data");t&&(e=JSON.parse(t))&&l(e),function(e){return f.apply(this,arguments)}(e).then(function(e){l(e),localStorage.setItem("nfl-schedule-data",JSON.stringify(e))})};Object(a.useEffect)(function(){c()},[]);return console.log("rendering..."),r.a.createElement(S,{title:r.a.createElement("span",null,"NFL // ",n.displayDate,r.a.createElement(h.a,{outline:!0,size:"sm",className:"float-right",onClick:function(){localStorage.removeItem("nfl-schedule-data"),c()}},"Reset"))},r.a.createElement(v,{games:n.games,removeGame:function(e){var t=n.games.map(function(t){return t.id===e&&(t.hidden=!0),t});l({displayDate:n.displayDate,games:t}),localStorage.setItem("nfl-schedule-data",JSON.stringify(n))}}))}var N=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card-columns"},r.a.createElement(T,null))))};n(23);c.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.44f7f0d1.chunk.js.map