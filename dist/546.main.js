"use strict";(self.webpackChunkvoyage_vault=self.webpackChunkvoyage_vault||[]).push([[546],{503:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(294);const r=function(e){return n.createElement("div",{className:"card ".concat(e.style," mx-auto h-full overflow-hidden rounded-lg m-0 shadow-black/25 ").concat(e.className)},e.children)}},546:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h});var n=a(861),r=a(152),c=a(687),l=a.n(c),s=a(294);const m=function(e){return s.createElement("div",{className:"avatar flex justify-center rounded-full overflow-hidden items-center ".concat(e.className),style:e.style},s.createElement("img",{src:e.image,alt:e.alt,className:"inline-block object-cover scale-110"}))};var o=a(503),i=a(655);const u=function(e){return s.createElement("li",{className:"user-item h-full mt-2 w-full"},s.createElement(o.Z,{className:"user-item__content p-0"},s.createElement(i.rU,{to:"/".concat(e.id,"/places"),className:"\r flex\r h-full\r items-center\r p-4\r text-white\r rounded-sm\r decoration-none\r hover:bg-gray-100\r "},s.createElement("div",{className:"user-item__image w-24 mr-4"},s.createElement(m,{image:"".concat("https://be-myfavplaces.onrender.com","/").concat(e.image),alt:e.name,style:{width:"95px",height:"95px"}})),s.createElement("div",{className:"user-item__info w-2/4 m-l-2"},s.createElement("h2",{className:"text-black text-lg mb-1"},e.name),s.createElement("h3",{className:"text-gray-500"},e.placeCount," ",1===e.placeCount?"Place":"Places")))))},d=function(e){return 0===e.items.length?s.createElement("div",{className:"text-center"},s.createElement("h2",{className:"m-8 text-xl"},"No users found.")):s.createElement("div",{className:"p-8"},s.createElement("h2",{className:"text-2xl mt-2 mb-4"},"Check out these ",s.createElement("b",null,"users' places")),s.createElement("ul",{className:"\n                users-list\n                list-none\n                mx-auto\n                p-0\n                pl-0\n                w-full\n                grid\n                lg:grid-cols-5\n                gap-8\n                md:grid-cols-3\n                sm:grid-cols-2\n        "},e.items.map((function(e){return s.createElement(u,{key:e.id,id:e.id,image:e.image,name:e.name,placeCount:e.places.length})}))))};var f=a(167),p=a(137),v=a(730);const h=function(){var e=(0,v.x)(),t=e.isLoading,a=e.error,c=e.sendRequest,m=e.clearError,o=(0,s.useState)([]),i=(0,r.Z)(o,2),u=i[0],h=i[1];return(0,s.useEffect)((function(){var e=function(){var e=(0,n.Z)(l().mark((function e(){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c("".concat("https://be-myfavplaces.onrender.com/api","/users/"));case 3:t=e.sent,console.log("aaa",t.users),h(t.users),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[c]),s.createElement(s.Fragment,null,s.createElement(f.Z,{error:a,onClear:m}),t&&s.createElement("div",{className:"h-screen flex items-center justify-center"},s.createElement(p.Z,{asOverlay:!0})),!t&&u&&s.createElement(d,{items:u}))}}}]);