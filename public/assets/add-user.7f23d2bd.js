import{h as v}from"./QItem.87f7eb07.js";import{H as A,Q as _,c as w,b as $}from"./HeaderActions.f25c2299.js";import{Q as q}from"./QForm.85481701.js";import{Q as U}from"./QCardActions.a748bd9b.js";import{Q as C}from"./QCard.9e15fa18.js";import{F as S}from"./FormComponent.f412702e.js";import{_ as k,d as E,r as t,aW as c,s as h,a as d,o as I,c as N,w as a,e as n,f as r,n as g,h as b,p as F,i as B}from"./index.650196fd.js";import{I as M}from"./SelectComponent.2f5249cd.js";import{B as Q}from"./BtnAction.b0c7cc86.js";import"./QInput.d6ff27b1.js";import"./notification.e1842625.js";import"./warning.551030d0.js";import"./bms.bfdce8d2.js";import"./tecnical_support.43e3eec1.js";import"./QSpinnerPie.7f041fe1.js";import"./use-fullscreen.0a2c208b.js";import"./QChip.f7831cda.js";import"./QDate.8a7cc956.js";import"./QEditor.0b50cedd.js";const x=E({key:"UsersPage",components:{HeaderActions:A,FormComponent:S,InputComponent:M,BtnAction:Q},data(){var e,s;return{loading:!1,modalPassword:!1,originalUser:null,errorMsg:"",btnAction:{show:!0,btnTitle:"Guardar",iconName:"o_save",btnWidth:"auto",tooltip:"Guardar usuario",btnAction:this.createOrEdit,loader:!1},btnCancel:{show:!0,btnTitle:"Cancelar",iconName:"close",btnWidth:"auto",tooltip:"Cancelar y cerrar",btnAction:this.closeModalPassword,loader:!1},btnUpdatePassword:{show:!0,btnTitle:"Actualizar",iconName:"update",btnWidth:"auto",tooltip:"Actualizar nueva contrase\xF1a",btnAction:this.updatePassword,loader:!1},btnCloseWindow:{iconName:"exit_to_app",btnBackground:"#FF990020",btnColor:"#FF9900",btnAction:this.goBack},formPassword:{newPassword:{key:"newUserPassword",label:"Contrase\xF1a*",type:"password",shouldShow:!this.isEditing(),model:"",rules:[t.requiredString]},verifyNewPassword:{key:"verifyUserPassword",label:"Contrase\xF1a*",type:"password",shouldShow:!this.isEditing(),model:"",rules:[t.requiredString]},currentPassword:{key:"currentUserPassword",label:"Contrase\xF1a*",type:"password",shouldShow:!this.isEditing(),model:"",rules:[t.requiredString]}},fields:{createdAt:this.getCreatedAt(),id:null,extras:[{key:"UserId",model:""}],top:[{key:"userName",label:"Nombre del usuario*",readonly:this.isEditing(),rules:[t.requiredString,t.maxLength(50),t.alpha],model:""},{key:"email",label:"Correo*",type:"email",readonly:this.isEditing(),model:"",rules:[t.requiredString,t.maxLength(50),t.validEmail]}],left:[{key:"birthday",label:"Fecha de nacimiento*",type:"date",model:null,readonly:this.isEditing(),restrictedMaxDate:this.restrictedMaxDate(),rules:[t.requiredString,this.errorMsg]},{key:"phone",label:"Tel\xE9fono*",type:"number",model:"",rules:[t.validPhoneNumber,t.requiredString]},{key:"userRole",label:"Rol de usuario*",type:"select",model:null,options:[{label:"Administrador",index:1,value:1},{label:"Auxiliar",index:2,value:2},{label:"Expectador",index:3,value:3}],rules:[t.requiredObject]},{key:"userStatus",label:"Estatus*",type:"select",model:null,shouldShow:this.isEditing(),options:[{label:"Activo",status:!0,value:!0},{label:"Inactivo",status:!1,value:!1}],rules:[t.requiredObject]},{key:"userPassword",label:"Contrase\xF1a*",type:"password",shouldShow:!this.isEditing(),model:"",rules:[t.requiredString]},{model:"Actualizar contrase\xF1a",type:"button",btnAction:this.openChangePassword,shouldShow:this.isEditing()&&((s=(e=this.$route)==null?void 0:e.params)==null?void 0:s.id)==0}],right:[{key:"photo",imageInput:!0,model:null}],bottom:[]},userId:null}},created(){this.checkPermissions(),this.isEditing()&&this.getUser()},methods:{async createUser(){this.btnAction.loader=!0;try{await this.$store.dispatch("users/postUserAction",this.fields)===!0?(c(this.$q,{title:"\xC9xito al crear el usuario",msg:"El usuario se ha agregado"}),this.$router.go(-1)):h(this.$q,{msg:"Int\xE9ntalo de nuevo m\xE1s tarde y si el error persiste, rep\xF3rtalo"}),this.btnAction.loader=!1}catch{this.btnAction.loader=!1}},async getUser(){try{this.loading=!0;const e={id:this.$route.params.id,fields:this.fields};this.originalUser=await this.$store.dispatch("users/getUserAction",e),this.userId=this.fields.extras[0].model,this.loading=!1}catch(e){this.loading=!1,console.log(e)}},async editUser(){this.btnAction.loader=!0;try{this.fields.id=this.userId,this.fields.originalObj=this.originalUser,await this.$store.dispatch("users/updateUserAction",this.fields)===!0?(c(this.$q,{title:"\xC9xito al editar el usuario",msg:"El usuario se ha actualizado"}),this.$router.go(-1)):h(this.$q,{msg:"Int\xE9ntalo de nuevo m\xE1s tarde y si el error persiste, rep\xF3rtalo"}),this.btnAction.loader=!1}catch{this.btnAction.loader=!1}},async createOrEdit(){await this.$refs.fieldsComponent.validate()&&(this.isEditing()?this.editUser():this.createUser())},async updatePassword(){if(await this.$refs.formPassword.validate().then(s=>s)===!0){this.btnUpdatePassword.loader=!0;try{const s={currentPassword:this.formPassword.currentPassword.model,userPassword:this.formPassword.newPassword.model};await this.$store.dispatch("users/updatePasswordAction",s)===!0?(c(this.$q,{title:"\xC9xito al actualizar la contrase\xF1a",msg:"La contrase\xF1a se ha actualizado"}),this.closeModalPassword()):h(this.$q,{msg:"Int\xE9ntalo de nuevo m\xE1s tarde y si el error persiste, rep\xF3rtalo"}),this.btnUpdatePassword.loader=!1}catch{this.btnUpdatePassword.loader=!1}}},checkPermissions(){switch(this.userRole){case 2:case 3:this.updateFieldByKeyInAllArrays("userRole",{readonly:!0}),this.updateFieldByKeyInAllArrays("userStatus",{readonly:!0});break}},openChangePassword(){this.modalPassword=!0},closeModalPassword(){this.modalPassword=!1,this.formPassword.currentPassword.model="",this.formPassword.newPassword.model="",this.formPassword.verifyNewPassword.model=""},validatePasswordsMatch(){this.formPassword.verifyNewPassword.rules[1]=t.sameThanOther(this.formPassword.newPassword.model)},showPassword(){return!0},getModelValueByKey(e){for(const s in this.fields)if(Object.prototype.hasOwnProperty.call(this.fields,s)){const o=this.fields[s];if(o&&typeof o[Symbol.iterator]=="function"){for(const i of o)if(i.key===e)return i.model}}},updateFieldByKeyInAllArrays(e,s){for(const o in this.fields)if(Array.isArray(this.fields[o])){const i=this.fields[o].find(p=>p.key===e);if(i){Object.assign(i,s);return}}console.error(`No se encontr\xF3 la entrada para la clave '${e}' en ning\xFAn arreglo o no tiene opciones.`)},restrictedMaxDate(){const e=new Date,s=e.getFullYear(),o=e.getMonth().toString().padStart(2,"0");return`${s-18}/${o}`},getDate(){return this.$store.$store.getters["global/getDate"]},goBack(){this.$router.go(-1)},getTitle(){return this.isEditing()?"Informaci\xF3n del usuario":"Agregar usuario"},getCreatedAt(){return this.isEditing()?"":this.$store.getters["global/getDate"]},isEditing(){return!!this.$route.params.id}},computed:{userRole:{get(){return this.$store.getters["users/getRoleGetter"]}}},watch:{"formPassword.newPassword.model":function(){this.formPassword.verifyNewPassword.model=""},"formPassword.verifyNewPassword.model":function(){this.validatePasswordsMatch()}}}),u=e=>(F("data-v-3ab143c2"),e=e(),B(),e),D={class:"card-page"},O={class:"main-container-page main-container-page-medium-dark container-form"},z=u(()=>n("div",{class:"title-page text-primary"},"Actualiza tu contrase\xF1a",-1)),T=u(()=>n("div",{class:"q-pr-md q-pt-sm form__item-label text-weight-medium"}," Ingresa tu contrase\xF1a actual ",-1)),R=u(()=>n("div",{class:"q-pr-md q-pt-sm form__item-label text-weight-medium"}," Ingresa tu contrase\xF1a nueva ",-1)),W=u(()=>n("div",{class:"q-pr-md q-pt-sm form__item-label text-weight-medium"}," Confirma tu contrase\xF1a nueva ",-1));function K(e,s,o,i,p,V){const y=d("header-actions"),P=d("form-component"),m=d("input-component"),f=d("btn-action");return I(),N(_,{class:"flex flex-center cursor-pointer non-selectable"},{default:a(()=>[n("div",D,[r(y,{titlePage:e.getTitle(),"btn-action":e.btnAction,"btn-close-window":e.btnCloseWindow},null,8,["titlePage","btn-action","btn-close-window"]),n("div",O,[r(v,{class:"h-97 q-pa-xs-none q-pa-lg-sm","thumb-style":e.$store.getters["global/getThumbStyle"]},{default:a(()=>[r(P,{ref:"fieldsComponent",fields:e.fields,loading:e.loading,type:"user"},null,8,["fields","loading"])]),_:1},8,["thumb-style"])])]),r($,{modelValue:e.modalPassword,"onUpdate:modelValue":s[3]||(s[3]=l=>e.modalPassword=l),persistent:""},{default:a(()=>[r(C,{class:"border-shadow q-px-sm border-rounded modal-ios"},{default:a(()=>[r(w,null,{default:a(()=>[z]),_:1}),r(w,{class:"q-pt-none"},{default:a(()=>[r(q,{ref:"formPassword"},{default:a(()=>[T,r(m,{item:e.formPassword.currentPassword,class:"form__input bg-accent col-12 col-sm",model:e.formPassword.currentPassword.model,"onUpdate:model":s[0]||(s[0]=l=>e.formPassword.currentPassword.model=l)},null,8,["item","model"]),R,r(m,{item:e.formPassword.newPassword,class:"form__input bg-accent col-12 col-sm",model:e.formPassword.newPassword.model,"onUpdate:model":s[1]||(s[1]=l=>e.formPassword.newPassword.model=l)},null,8,["item","model"]),W,r(m,{item:e.formPassword.verifyNewPassword,class:"form__input bg-accent col-12 col-sm",model:e.formPassword.verifyNewPassword.model,"onUpdate:model":s[2]||(s[2]=l=>e.formPassword.verifyNewPassword.model=l)},null,8,["item","model"])]),_:1},512)]),_:1}),r(U,{align:"right",class:"q-pa-md q-pb-lg"},{default:a(()=>[r(f,g(b(e.btnCancel)),null,16),r(f,g(b(e.btnUpdatePassword)),null,16)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}var me=k(x,[["render",K],["__scopeId","data-v-3ab143c2"]]);export{me as default};
