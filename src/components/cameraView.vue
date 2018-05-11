<template>
	<img
		class="camera-image animated"
		draggable="false"
		v-if="camera && camera.hasOwnProperty('image') && windowWidth >= 1000"
		:src="camera.image"
		:class="{
			fadeOut: !camera,
			fadeIn: camera,
		}"
	/>
</template>

<script>
export default {
	name: "cameraView",
	props: {
		cameraId: {
			type: String,
			required: true,
		},
	},
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
				source: this.$firebase.database().ref("gbgcamera").child(this.cameraId),
				asObject: true,
			}
		}
	}
}
</script>

<style lang="scss">
.camera-image {
	background-color: #424242;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	box-sizing: border-box;
	overflow: hidden;
	width: calc(100% - 20px);
	margin: 10px 10px 0 10px;
}
</style>
