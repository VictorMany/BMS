import{h as s}from"./QItem.87f7eb07.js";import{H as m,Q as c}from"./HeaderActions.f25c2299.js";import{F as l}from"./FormComponent.f412702e.js";import{_ as p,d,a as t,o as u,c as b,w as n,e as a,f as o}from"./index.650196fd.js";import"./BtnAction.b0c7cc86.js";import"./QInput.d6ff27b1.js";import"./notification.e1842625.js";import"./warning.551030d0.js";import"./bms.bfdce8d2.js";import"./tecnical_support.43e3eec1.js";import"./QSpinnerPie.7f041fe1.js";import"./QForm.85481701.js";import"./use-fullscreen.0a2c208b.js";import"./QChip.f7831cda.js";import"./QDate.8a7cc956.js";import"./SelectComponent.2f5249cd.js";import"./QEditor.0b50cedd.js";const f=d({name:"SettingsPage",components:{HeaderActions:m,FormComponent:l},data(){return{btnAction:{show:!0,btnTitle:"Guardar",to:"settings",btnWidth:"auto"},btnCloseWindow:{iconName:"exit_to_app",btnBackground:"#FF990020",btnColor:"#FF9900",btnAction:this.goBack},fields:{imageInput:!0,top:[{label:"Nombre del hospital",model:""},{label:"Correo electr\xF3nico",model:""},{label:"Direcci\xF3n",model:""},{label:"Tipo de cuenta",model:"",type:"select",options:["Premium","Prueba de una semana"]}],left:[],right:[],textarea:{}}}},methods:{goBack(){this.$router.go(-1)}}}),_={class:"card-page"},g={class:"main-container-page main-container-page-medium-dark container-form"};function h(e,w,C,k,A,B){const r=t("header-actions"),i=t("form-component");return u(),b(c,{class:"flex flex-center cursor-pointer non-selectable"},{default:n(()=>[a("div",_,[o(r,{titlePage:"Informaci\xF3n de la cuenta","btn-action":e.btnAction,"btn-close-window":e.btnCloseWindow},null,8,["btn-action","btn-close-window"]),a("div",g,[o(s,{class:"h-90 q-pa-xs-none q-pa-lg-sm","thumb-style":e.$store.getters["global/getThumbStyle"]},{default:n(()=>[o(i,{fields:e.fields},null,8,["fields"])]),_:1},8,["thumb-style"])])])]),_:1})}var j=p(f,[["render",h]]);export{j as default};
