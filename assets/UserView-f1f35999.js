import{_ as u,R as _,r as c,o as i,c as h,a as t,w as s,b as e,F as l,d as r}from"./index-46ad8ce9.js";const{VITE_APP_URL:d}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"ssozr",BASE_URL:"/vueWeek7/",MODE:"production",DEV:!1,PROD:!0},p={data(){return{}},methods:{checkLogin(){this.$http.post(`${d}v2/api/user/check`).then(()=>{}).catch(()=>{alert("請重新登入"),this.$router.push("/login")})}},mounted(){const n=document.cookie.replace(/(?:(?:^|.*;\s*)ssozrToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=n,this.checkLogin()},components:{RouterView:_}},m=r("h1",null,"這是後台",-1),f=r("p",null,"點選要進行的業務",-1),k=r("hr",null,null,-1);function V(n,$,P,R,E,w){const o=c("router-link"),a=c("RouterView");return i(),h(l,null,[m,f,t(o,{to:"/userorders"},{default:s(()=>[e("訂單管理")]),_:1}),e(" | "),t(o,{to:"/userprodeuts"},{default:s(()=>[e("產品管理")]),_:1}),e(" | "),t(o,{to:"/voucher"},{default:s(()=>[e("優惠券管理")]),_:1}),e(" | "),k,t(a)],64)}const A=u(p,[["render",V]]);export{A as default};
