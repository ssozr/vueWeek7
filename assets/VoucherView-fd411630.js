import{p as D}from"./PaginationView-becae3bf.js";import{_ as f,M as _,r as y,o as d,c as i,d as o,F as m,f as M,a as k,b,t as l,g as c,v as u,h as V,i as P}from"./index-97dda310.js";const{VITE_APP_PATH:p,VITE_APP_URL:h}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"ssozr",BASE_URL:"/vueWeek7/",MODE:"production",DEV:!1,PROD:!0},x={data(){return{modal:!0,coupons:"",couponModal:"",delCouponModal:"",editDate:"",editId:"",delId:"",pagination:{},couponData:{title:"",code:"",due_date:"",percent:"",is_enabled:0}}},methods:{getCoupons(e=1){this.$http.get(`${h}/v2/api/${p}/admin/coupons?page=${e}`).then(t=>{console.log(t),this.coupons=t.data,this.pagination=t.data.pagination}).catch(t=>{console.log(t)})},openCouponMadl(){this.modal=!0,this.couponData={},this.couponModal.show()},openEdit(e){this.couponData={},this.modal=!1,this.couponData={...e},this.editId=e.id,this.editDate=this.couponData.due_date,this.couponData.due_date=this.couponData.due_date*1e3,this.couponModal.show()},newCoupon(){if(this.modal===!1){this.timeChange();const e={...this.couponData};this.$http.put(`${h}/v2/api/${p}/admin/coupon/${this.editId}`,{data:e}).then(t=>{console.log(t),this.getCoupons(),alert("更新完成"),this.couponModal.hide()}).catch(t=>{console.log(t)})}else{this.timeChange();const e={...this.couponData};this.$http.post(`${h}/v2/api/${p}/admin/coupon`,{data:e}).then(t=>{alert(t.data.message),this.getCoupons(),this.couponModal.hide()}).catch(t=>{alert(t.data.message)})}},timeChange(){const e=new Date(this.couponData.due_date);e.setHours(0,0,0,0);const t=e.getTime()/1e3;this.couponData.due_date=t},time(e){const t=new Date(e*1e3),r={year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"};return t.toLocaleString("zh-TW",r)},openDelCoupon(e){this.couponData={...e},this.delCouponModal.show(),this.delId=e.id,console.log(this.delId)},delCoupon(){this.$http.delete(`${h}/v2/api/${p}/admin/coupon/${this.delId}`).then(e=>{console.log(e),alert("已刪除優惠券"),this.getCoupons(),this.delCouponModal.hide()}).catch(e=>{console.log(e)})},changePage(e){this.getCoupons(e)}},components:{pagination:D},mounted(){this.getCoupons(),this.couponModal=new _(this.$refs.couponModal),this.delCouponModal=new _(this.$refs.delCouponModal)}},w={class:"text-end my-4"},I={class:"table"},E=o("thead",null,[o("tr",null,[o("th",null,"名稱"),o("th",null,"折扣百分比"),o("th",null,"到期日"),o("th",null,"是否啟用"),o("th",null,"編輯")])],-1),T={key:0},U={key:1},A=["onClick"],L=["onClick"],B={class:"modal",tabindex:"-1",ref:"couponModal",id:"couponModal"},N={class:"modal-dialog"},R={class:"modal-content"},H={class:"modal-header"},S=o("h5",{class:"modal-title"},"建立優惠券",-1),z=o("button",{type:"button",class:"btn-cslose","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),F={class:"modal-body"},O={class:"mb-3"},W=o("label",{for:"title",class:"form-label"},"優惠券名稱",-1),$={class:"mb-3"},j=o("label",{for:"coupon_code",class:"form-label"},"優惠碼",-1),q={class:"mb-3"},G=o("label",{for:"due_date",class:"form-label"},"到期日",-1),J={key:0,class:"py-0 my-0"},K=o("br",null,null,-1),Q={class:"mb-3"},X=o("label",{for:"percent",class:"form-label"},"折扣百分比",-1),Y={class:"mb-3"},Z={class:"form-check"},oo=o("label",{for:"is_enabled",class:"form-label"},"是否啟用",-1),to={class:"modal-footer"},eo=o("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"取消",-1),so={class:"modal",tabindex:"-1",ref:"delCouponModal"},no={class:"modal-dialog"},ao={class:"modal-content"},lo={class:"modal-header"},io={class:"modal-title"},co=o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),uo=o("div",{class:"modal-body"},[o("p",null,"是否確認刪除此優惠券?")],-1),po={class:"modal-footer"},ho=o("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Close",-1);function ro(e,t,r,_o,n,a){const g=y("pagination");return d(),i(m,null,[o("div",w,[o("button",{type:"button",class:"btn btn-primary",onClick:t[0]||(t[0]=s=>a.openCouponMadl())},"建立優惠券")]),o("table",I,[E,o("tbody",null,[(d(!0),i(m,null,M(n.coupons.coupons,(s,C)=>(d(),i("tr",{key:C},[o("td",null,l(s.title),1),o("td",null,l(s.percent),1),o("td",null,l(a.time(s.due_date)),1),o("td",null,[s.is_enabled?(d(),i("p",T,"已啟用")):(d(),i("p",U,"未啟用"))]),o("button",{type:"button",class:"btn btn-outline-primary",onClick:v=>a.openEdit(s)},"編輯",8,A),o("button",{type:"button",class:"btn btn-outline-danger",onClick:v=>a.openDelCoupon(s)},"刪除",8,L)]))),128))])]),k(g,{pages:n.pagination,onChangePage:a.changePage},null,8,["pages","onChangePage"]),o("div",B,[o("div",N,[o("div",R,[o("div",H,[S,b(" "+l(n.couponData.due_date)+" ",1),z]),o("div",F,[o("div",O,[b(l(n.couponData)+" ",1),W,c(o("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[1]||(t[1]=s=>n.couponData.title=s)},null,512),[[u,n.couponData.title]])]),o("div",$,[j,c(o("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":t[2]||(t[2]=s=>n.couponData.code=s)},null,512),[[u,n.couponData.code]])]),o("div",q,[G,n.modal?V("",!0):(d(),i("p",J,"目前到期日"+l(a.time(n.editDate)),1)),K,c(o("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[3]||(t[3]=s=>n.couponData.due_date=s)},null,512),[[u,n.couponData.due_date]])]),o("div",Q,[X,c(o("input",{type:"number",class:"form-control",id:"percent","onUpdate:modelValue":t[4]||(t[4]=s=>n.couponData.percent=s)},null,512),[[u,n.couponData.percent]])]),o("div",Y,[o("div",Z,[oo,c(o("input",{type:"checkbox",class:"form-check-input","true-value":1,"false-value":0,id:"is_enabled","onUpdate:modelValue":t[5]||(t[5]=s=>n.couponData.is_enabled=s)},null,512),[[P,n.couponData.is_enabled]])])])]),o("div",to,[eo,o("button",{type:"button",class:"btn btn-primary",onClick:t[6]||(t[6]=s=>a.newCoupon())},"確定編輯")])])])],512),o("div",so,[o("div",no,[o("div",ao,[o("div",lo,[o("h5",io,l(n.couponData.title),1),co]),uo,o("div",po,[ho,o("button",{type:"button",class:"btn btn-primary",onClick:t[7]||(t[7]=s=>a.delCoupon())},"確認刪除")])])])],512)],64)}const go=f(x,[["render",ro]]);export{go as default};