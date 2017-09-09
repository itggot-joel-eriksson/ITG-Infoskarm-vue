<template>
	<div>
		{{ showStatus }}
		<article class="campaign campaign--norddagen" v-if="shown">
			<video autoplay loop muted>
				<source src="/img/campaigns/norddagen.mp4" type="video/mp4">
			</video>
		</article>
	</div>
</template>

<script>
import moment from "moment"

export default {
	name: "campaignNorddagen",
	props: [
		"showuntil",
	],
	data() {
		return {
			shown: false,
		}
	},
	computed: {
		showStatus() {
			setInterval(() => {
				this.shown = moment().isBefore(this.showuntil)
			})
		},
	},
}
</script>

<style lang="sass" scoped>
.campaign--norddagen
	width: calc(100% - 21px)
	margin: 10px 10px 0 10px
	box-sizing: border-box
	border-radius: 4px
	overflow: hidden
	padding-bottom: -5px

	video
		width: 100%
		border-radius: 4px
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23)
		

 </style>
