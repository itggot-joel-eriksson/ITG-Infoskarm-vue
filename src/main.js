import Vue from "vue"
import App from "./App.vue"
import VueFire from "vuefire"

Vue.use(VueFire)

const vm = new Vue({
	el: "#app",
	render: h => h(App)
})


