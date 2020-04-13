import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1.导入element ui组件库（和van-ui是一样，van是移动端的，element是pc端的）
import ElementUI from 'element-ui';
// 2.element ui的样式
import 'element-ui/lib/theme-chalk/index.css';

// 导入axios
import axios from "axios"
// 把axios绑定到原型
Vue.prototype.$axios = axios
// 配置axios的基准路径
axios.defaults.baseURL = "http://localhost:3000"

Vue.config.productionTip = false
// 3.注册element ui的组件
Vue.use(ElementUI);

// 路由守卫
// to表示要去的那个页面的路由信息
// from表示是从哪个页面跳转过去的
// next是个函数，必须要调用才会执行下个页面（类似于express里面的中间件）
router.beforeEach((to, from, next) => {
	if (to.path !== "/login") {
		const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};

		// 需要校验是否有token，并且用户是否是管理员
		if(userJson.token && userJson.user.role.type === "admin"){
			next();
		}else{
			// 如果不满足上面的条件，就跳转到登录页
			next("/login");
		}
	} else {
		// 如果是登录页,直接跳转
		next();
	}
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
