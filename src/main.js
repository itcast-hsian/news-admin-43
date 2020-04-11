import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1.导入element ui组件库（和van-ui是一样，van是移动端的，element是pc端的）
import ElementUI from 'element-ui';
// 2.element ui的样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// 3.注册element ui的组件
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
