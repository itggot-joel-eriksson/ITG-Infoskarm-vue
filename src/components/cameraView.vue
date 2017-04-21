<template>
	<img v-if="camera && camera.hasOwnProperty('image') && windowWidth >= 1000" :src="camera.image" class="camera-image animated" :class="[ { fadeOut: !camera }, { fadeIn: camera } ]">
</template>

<script>
import firebase from "firebase/app"
import "firebase/database"

const config = {
	apiKey: "AIzaSyCvbaplVa5dSNxHzTSJd1y1iiKxCmceLqY",
	authDomain: "vasttrafik-api-159cc.firebaseapp.com",
	databaseURL: "https://vasttrafik-api-159cc.firebaseio.com"
}

firebase.initializeApp(config, "gbgcamera")

const firebaseApp = firebase.app("gbgcamera")

const gbgcamerasRef = firebaseApp.database().ref("gbgcamera")

export default {
	name: "cameraView",
	props: [
		"camera-id",
	],
	data() {
		return {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		}
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener("resize", (event) => {
				this.windowWidth = window.innerWidth
				this.windowHeight = window.innerHeight
			}, false)
		})
	},
	beforeDestroy() {
		window.removeEventListener("resize", null)
	},
	firebase() {
		return {
			camera: {
				source: gbgcamerasRef.child(this.cameraId),
				asObject: true,
			}
		}
	}
}
</script>

<style lang="sass">
.camera-image
	background-color: #424242
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23)
	border-radius: 4px
	box-sizing: border-box
	overflow: hidden
	width: calc(100% - 20px)
	margin: 10px 10px 0 10px
</style>
