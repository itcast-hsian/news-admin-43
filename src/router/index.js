import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: () => import("@/views/Index.vue"),
		children: [
			// 文章列表
			{
				path: "post-list",
				component: () => import("@/views/PostList.vue")
			},
			// 发布文章
			{
				path: "new-post",
				component: () => import("@/views/NewPost.vue")
			}
		]
	},
	{
		path: "/login",
		component: () => import("@/views/Login.vue")
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
