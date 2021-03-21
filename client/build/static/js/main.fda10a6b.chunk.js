(this.webpackJsonpmern=this.webpackJsonpmern||[]).push([[0],{32:function(e,t,a){},49:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var r=a(1),s=a(34),c=a.n(s),n=a(38),o=a(3),i=a(12),l=a(36),d=a(37),b=a(9),j=a(19),u=(a(49),a(40)),h=a(14),m=a(4),x="ADD_FAVORITE",g="REMOVE_FAVORITE",f="UPDATE_FAVORITES",O="UPDATE_USER",p="UPDATE_JOBS",v="UPDATE_CODEWARS",y="UPDATE_TECHNEWS",w=a(0),k=Object(r.createContext)(),N=k.Provider,E=function(e,t){switch(t.type){case x:return Object(m.a)(Object(m.a)({},e),{},{favorites:[t.item].concat(Object(h.a)(e.favorites))});case"GET_FAVORITES":return Object(m.a)(Object(m.a)({},e),{},{favorites:Object(h.a)(e.favorites)});case f:return Object(m.a)(Object(m.a)({},e),{},{favorites:Object(h.a)(t.items)});case g:return Object(m.a)(Object(m.a)({},e),{},{favorites:e.favorites.filter((function(e){return e.id!==t.id}))});case y:return Object(m.a)(Object(m.a)({},e),{},{techNews:Object(h.a)(t.items)});case p:return Object(m.a)(Object(m.a)({},e),{},{jobs:Object(h.a)(t.items)});case v:return Object(m.a)(Object(m.a)({},e),{},{codewars:Object(m.a)({},t.code)});case O:return Object(m.a)(Object(m.a)({},e),{},{user:Object(m.a)({},t.user)})}},S=function(e){e.value;var t=Object(u.a)(e,["value"]),a=Object(r.useReducer)(E,{user:{},favorites:[],techNews:[],worldNews:[],recentEpisodes:[],bestPodcasts:[],jobs:[],codewars:{}}),s=Object(b.a)(a,2),c=s[0],n=s[1];return Object(w.jsx)(N,Object(m.a)({value:[c,n]},t))},P=function(){return Object(r.useContext)(k)},A=a(11),D=a.n(A),C=function(e){return D.a.get("/api/user/"+e)},I=function(e,t){return console.log("saving"),console.log(t),D.a.post("/api/user/"+e,t)},T=function(e,t){return console.log("deleting"),console.log(t),D.a.patch("/api/user/"+e,t)},J=function(){return D.a.get("/api/thirdparty/hackernews")},R=function(){return D.a.get("/api/thirdparty/githubjobs")},F=function(){return D.a.get("/api/thirdparty/codewars")};var L=function(e){var t=e.article,a=P(),r=Object(b.a)(a,2),s=r[0],c=r[1],n=1==s.favorites.filter((function(e){return e.id==t.id})).length;return Object(w.jsxs)("div",{className:"card",children:[Object(w.jsxs)("div",{className:"card-header flex",children:[Object(w.jsx)("div",{children:Object(w.jsx)("a",{href:t.url,children:Object(w.jsx)("h3",{children:t.title})})}),Object(w.jsx)("div",{className:"span-right",children:n?Object(w.jsx)("button",{onClick:function(){T(s.user.username,t).then((function(e){console.log(e),c({type:g,id:t.id})}))},children:Object(w.jsx)(j.a,{icon:["fas","bookmark"]})}):Object(w.jsx)("button",{onClick:function(){I(s.user.username,t).then((function(e){console.log(e),c({type:x,item:t})}))},children:Object(w.jsx)(j.a,{icon:["far","bookmark"]})})})]}),Object(w.jsxs)("div",{className:"card-body",children:[Object(w.jsx)("a",{href:t.url,children:Object(w.jsx)("img",{src:t.image})}),Object(w.jsxs)("p",{children:["Published: ",t.date]})]})]})};var _=function(){var e=P(),t=Object(b.a)(e,2),a=t[0];return t[1],console.log(a),Object(w.jsxs)("div",{children:["Home page",0!==Object.keys(a.user).length&&0!==Object.keys(a.codewars).length?Object(w.jsxs)("div",{children:["User: ",a.user.username,Object(w.jsx)("br",{}),"Code: ",a.codewars.name]}):Object(w.jsx)("div",{children:"Loading user account info"}),Object(w.jsx)("div",{children:0!==a.favorites.length?a.favorites.map((function(e){return Object(w.jsx)(L,{article:e},e.id)})):Object(w.jsx)("div",{children:"No Bookmarks"})})]})};var U=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"All Bookmarks"}),Object(w.jsx)("h2",{children:"All"}),Object(w.jsx)("h2",{children:"News"}),Object(w.jsx)("h2",{children:"Podcasts"}),Object(w.jsx)("h2",{children:"Jobs"})]})};var B=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"List of Jobs based on area"}),Object(w.jsx)("p",{children:"Where you at?"})]})},V=(a(32),a.p+"static/media/github.6c955556.svg"),Y=a.p+"static/media/google.eae9aa93.svg";var G=function(){return Object(w.jsx)(w.Fragment,{children:Object(w.jsx)("div",{className:"container mx-auto px-4 h-full",children:Object(w.jsx)("div",{className:"flex content-center items-center justify-center h-full",children:Object(w.jsxs)("div",{className:"w-full lg:w-4/12 px-4",children:[Object(w.jsxs)("div",{className:"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0",children:[Object(w.jsxs)("div",{className:"rounded-t mb-0 px-6 py-6",children:[Object(w.jsx)("div",{className:"text-center mb-3",children:Object(w.jsx)("h6",{className:"text-gray-600 text-sm font-bold",children:"Sign in with"})}),Object(w.jsxs)("div",{className:"btn-wrapper text-center",children:[Object(w.jsxs)("button",{className:"bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150",type:"button",children:[Object(w.jsx)("img",{alt:"...",className:"w-5 mr-1",src:V}),"Github"]}),Object(w.jsxs)("button",{className:"bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150",type:"button",children:[Object(w.jsx)("img",{alt:"...",className:"w-5 mr-1",src:Y}),"Google"]})]}),Object(w.jsx)("hr",{className:"mt-6 border-b-1 border-gray-400"})]}),Object(w.jsxs)("div",{className:"flex-auto px-4 lg:px-10 py-10 pt-0",children:[Object(w.jsx)("div",{className:"text-gray-500 text-center mb-3 font-bold",children:Object(w.jsx)("small",{children:"Or sign in with credentials"})}),Object(w.jsxs)("form",{children:[Object(w.jsxs)("div",{className:"relative w-full mb-3",children:[Object(w.jsx)("label",{className:"block uppercase text-gray-700 text-xs font-bold mb-2",htmlFor:"grid-password",children:"Email"}),Object(w.jsx)("input",{type:"email",className:"px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150",placeholder:"Email"})]}),Object(w.jsxs)("div",{className:"relative w-full mb-3",children:[Object(w.jsx)("label",{className:"block uppercase text-gray-700 text-xs font-bold mb-2",htmlFor:"grid-password",children:"Password"}),Object(w.jsx)("input",{type:"password",className:"px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150",placeholder:"Password"})]}),Object(w.jsx)("div",{children:Object(w.jsxs)("label",{className:"inline-flex items-center cursor-pointer",children:[Object(w.jsx)("input",{id:"customCheckLogin",type:"checkbox",className:"form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"}),Object(w.jsx)("span",{className:"ml-2 text-sm font-semibold text-gray-700",children:"Remember me"})]})}),Object(w.jsx)("div",{className:"text-center mt-6",children:Object(w.jsx)("button",{className:"bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150",type:"button",children:"Sign In"})})]})]})]}),Object(w.jsxs)("div",{className:"flex flex-wrap mt-6 relative",children:[Object(w.jsx)("div",{className:"w-1/2",children:Object(w.jsx)("a",{href:"#pablo",onClick:function(e){return e.preventDefault()},className:"text-gray-300",children:Object(w.jsx)("small",{children:"Forgot password?"})})}),Object(w.jsx)("div",{className:"w-1/2 text-right",children:Object(w.jsx)("a",{to:"/auth/register",className:"text-gray-300",children:Object(w.jsx)("small",{children:"Create new account"})})})]})]})})})})};var W=function(){var e=P(),t=Object(b.a)(e,2),a=t[0];return t[1],console.log(a.techNews),Object(w.jsxs)("div",{children:["News",0!==a.techNews.length?a.techNews.map((function(e){return Object(w.jsx)(L,{article:e},e.id)})):Object(w.jsx)("div",{children:"Loading"})]})};var M=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Welcome user!"}),Object(w.jsx)("h2",{children:"Github account?"}),Object(w.jsx)("h2",{children:"Location"}),Object(w.jsx)("h2",{children:"Languages"})]})};var H=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Playlists"}),Object(w.jsx)("p",{children:"Youtube!"})]})};var z=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Podcasts Page"}),Object(w.jsx)("h2",{children:"Recent"}),Object(w.jsx)("h2",{children:"Best"})]})};var q=function(){return Object(w.jsx)(w.Fragment,{children:Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Account Settings"}),Object(w.jsx)("h2",{children:"Edit Profile"}),Object(w.jsx)("h2",{children:"Change Password"}),Object(w.jsx)("h2",{children:"Delete Account"})]})})};var K=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Signup Page"}),Object(w.jsx)("p",{children:"Sign up!"})]})},Q=a(35),X=a.n(Q);var Z=function(){var e=X()().format("YYYY-MM-DD"),t=P(),a=Object(b.a)(t,2),s=(a[0],a[1]);Object(r.useEffect)((function(){console.log("loading files"),n("username"),o(),c(y,"news",i),c(p,"jobs",l)}),[]);var c=function(t,a,r){localStorage.getItem(a)?JSON.parse(localStorage.getItem(a)).date!==e?r():(console.log(a+" already there"),s({type:t,items:JSON.parse(localStorage.getItem(a)).items})):r()},n=function(e){C(e).then((function(e){console.log("user"),console.log(e.data[0]),s({type:O,user:e.data[0]}),s({type:f,items:e.data[0].favorites})})).catch((function(e){console.log(e)}))},o=function(){F().then((function(e){s({type:v,code:e.data}),console.log(e.data)})).catch((function(e){console.log(e)}))},i=function(){console.log("getting news"),J().then((function(t){s({type:y,items:t.data}),localStorage.setItem("news",JSON.stringify({date:e,items:t.data}))})).catch((function(e){console.log(e)}))},l=function(){console.log("getting jobs"),R().then((function(t){s({type:p,items:t.data}),localStorage.setItem("jobs",JSON.stringify({date:e,items:t.data}))})).catch((function(e){console.log(e)}))};return Object(w.jsx)("div",{})};var $=function(){var e=P();return Object(b.a)(e,1)[0],Object(w.jsx)("nav",{className:"top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg",children:Object(w.jsx)("div",{className:"container mx-auto flex flex-wrap items-center justify-between",children:Object(w.jsxs)("div",{className:"w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start",children:[Object(w.jsx)("a",{href:"/",className:"px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",children:"Logo"}),Object(w.jsx)("a",{href:"/news",className:"px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",children:"News"}),Object(w.jsx)("a",{href:"/jobs",className:"px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",children:"Jobs"}),Object(w.jsx)("a",{href:"/bookmarked",className:"px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",children:"Bookmarked"}),Object(w.jsx)("a",{href:"/podcast",className:"px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",children:"Podcast"}),Object(w.jsx)("a",{href:"/settings",className:"px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",children:"Settings"}),Object(w.jsx)("a",{href:"/login",className:"px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",children:"Login / Signup"})]})})})};i.b.add(l.a,d.a);var ee=function(){return Object(w.jsx)(n.a,{children:Object(w.jsx)("div",{children:Object(w.jsxs)(S,{children:[Object(w.jsx)(Z,{}),Object(w.jsx)($,{}),Object(w.jsxs)(o.c,{children:[Object(w.jsx)(o.a,{exact:!0,path:"/",component:_}),Object(w.jsx)(o.a,{exact:!0,path:"/bookmarked",component:U}),Object(w.jsx)(o.a,{exact:!0,path:"/jobs",component:B}),Object(w.jsx)(o.a,{path:"/login",component:G}),Object(w.jsx)(o.a,{path:"/news",component:W}),Object(w.jsx)(o.a,{path:"/newuser",component:M}),Object(w.jsx)(o.a,{path:"/playlist",component:H}),Object(w.jsx)(o.a,{path:"/podcast",component:z}),Object(w.jsx)(o.a,{path:"/settings",component:q}),Object(w.jsx)(o.a,{path:"/signup",component:K})]})]})})})};a(71);c.a.render(Object(w.jsx)(ee,{}),document.getElementById("root"))}},[[72,1,2]]]);
//# sourceMappingURL=main.fda10a6b.chunk.js.map