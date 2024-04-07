// 页面路径：store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		count: 1
	},
	mutations:{
		add(state) {
			// 变更状态
			state.count += 2
		}
	},
	actions:{
		async login({
		   dispatch,commit
		  }, formData) {
		   if (formData) {
			// kUrl是keycloak的地址
		    const url = kUrl + "realms/" + realm + "/protocol/openid-connect/token "
		    const obj = {
		     client_id: clientId,
		     grant_type: 'password',
		     username: formData.name,
		     password: formData.password,
		    }
		    let res ={}
		    uni.request({
		     url:  url,
		     method: 'POST',
		     header: {
		      'content-type':'application/x-www-form-urlencoded'
		     },
		     timeout: 10000,
		     data: obj,
		     success:async (successData) => {
		      const data = successData.data
		      if(successData.statusCode == 200){
		       res = data
		       commit('analysisToken',res.access_token)
		       res.url = kUrl + "realms/" + realm + "/account"
		       res.kurl = url
		       res.data = {}
		       Object.assign(res.data, obj)
		       await dispatch('getName', res)
		       await dispatch('refreshToken', res)
		      }else{
		       uni.showToast({
		           title: data.error_description,
		        icon: 'none',
		           duration: 2000
		       });
		      }
		     },
		    })
		   }
		  },
		  // 获取用户名
		  async getName({commit}, res) {
		   let res1={}
		   uni.request({
		    url:  res.url,
		    method: 'GET',
		    followRedirect:false,
		    header: {
		     'Authorization': 'Bearer ' + res.access_token,
		     'Content-Type': 'application/json',
		    },
		    timeout: 10000,
		    success:async (successData) => {
		     const data = successData.data
		     if(successData.statusCode == 200){
		     }
	}
})
export default store