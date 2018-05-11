import Vue from "vue"
import App from "./App.vue"
import VueFire from "vuefire"
import screenfull from "screenfull"
import firebase from "firebase/app"
import "firebase/database"

Vue.use(VueFire)

Vue.prototype.$firebase = firebase.initializeApp({
	apiKey: "AIzaSyCvbaplVa5dSNxHzTSJd1y1iiKxCmceLqY",
	authDomain: "vasttrafik-api-159cc.firebaseapp.com",
	databaseURL: "https://vasttrafik-api-159cc.firebaseio.com"
})

const vm = new Vue({
	el: "#app",
	render: h => h(App)
})

if (screenfull.enabled) {
	if (screenfull.isFullscreen) {
		document.body.classList.add("fullscreen")
	}

	document.onkeyup = (event) => {
		event.preventDefault()

		if (event.keyCode === 13) {
			screenfull.toggle()

			if (screenfull.isFullscreen) {
				document.body.classList.add("fullscreen")
			} else {
				document.body.classList.remove("fullscreen")
			}
		}
	}
}
