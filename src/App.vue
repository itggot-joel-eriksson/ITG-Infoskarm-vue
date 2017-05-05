<template>
	<main id="app">
		<div class="column">
			<realtime-table stop-id="chalmers-goteborg"></realtime-table>
		</div>
		<div class="column">
			<realtime-table stop-id="kapellplatsen-goteborg"></realtime-table>
		</div>
		<div class="column">
			<realtime-table stop-id="chalmers-tvargata-goteborg"></realtime-table>
			<realtime-table stop-id="chalmersplatsen-goteborg"></realtime-table>
			<camera-view camera-id="17"></camera-view>
		</div>
		<div class="column">
			<datetime-view></datetime-view>
			<schoolmeal-view school="it-gymnasiet-goteborg"></schoolmeal-view>
			<div class="support-feedback">
				<h1 class="support-feedback__title">Support och feedback</h1>
				<p class="support-feedback__body">
					<a href="mailto:joel.eriksson3@itggot.se?subject=ITG-Infoskarm">joel.eriksson3@itggot.se</a>
				</p>
			</div>
		</div>

		<footer>
			<img class="logo" src="/img/itg-logo.svg">
			{{ fullscreen }}
			<p class="enter-fullscreen animated" :class="[ { fadeOut: isFullscreen }, { fadeIn: !isFullscreen } ]">{{ fullscreenMessage }}</p>
		</footer>
	</main>
</template>

<script>
import screenfull from "screenfull"

import cameraView from "./components/cameraView.vue"
import datetimeView from "./components/datetimeView.vue"
import realtimeTable from "./components/realtimeTable.vue"
import schoolmealView from "./components/schoolmealView.vue"

export default {
	name: "app",
	data() {
		return {
			isFullscreen: screenfull.isFullscreen,
			fullscreenMessage: "Tryck på [Enter] för att visa ITG-Infoskärm i fullskärm",
		}
	},
	computed: {
		fullscreen() {
			screenfull.onchange(() => {
				this.isFullscreen = screenfull.isFullscreen
			})
		}
	},
	components: {
		cameraView: cameraView,
		datetimeView: datetimeView,
		realtimeTable: realtimeTable,
		schoolmealView: schoolmealView,
	}
}
</script>

<style lang="sass">
$itg-blue: rgba(0, 156, 221, 1)
$itg-pink: rgba(236, 0, 137, 1)
$itg-orange: rgba(247, 147, 44, 1)
$vt-blue: rgba(0, 173, 219, 1)
$bg-color: rgba(33, 33, 33, 1)
$white: rgba(255, 255, 255, 1)
$card-bg-color: rgba(66, 66, 66, 1)

\:root
	font-size: 14px
	color: $white

html, body
	margin: 0
	padding: 0
	width: 100%
	height: 100%
	font-family: "Roboto", "Open Sans", Helvetica, Arial, sans-serif
	background: $bg-color

a:link, a:visited
	color: $itg-blue
	text-decoration: none
	transition: color 0.2s

a:active, a:hover
	color: darken($itg-blue, 10%)

body > #app
	max-width: 100%
	display: flex
	justify-content: space-between

.column
	flex: 0 0 25%
	max-width: 25%

.support-feedback
	background-color: rgba(66, 66, 66, 1)
	padding: 10px
	margin: 10px 10px 0 10px
	color: #FFFFFF
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23)
	border-radius: 4px
	box-sizing: border-box
	overflow: hidden
	display: flex
	flex-direction: column
	justify-content: center
	align-items: stretch
	text-align: center

.support-feedback__title, .support-feedback__body
	margin: 0

.itg-loader
	position: relative
	height: 0
	width: 0
	padding: 50px 0
	border-radius: 50%

	&::before, &::after
		content: ""
		position: absolute
		top: 0
		height: 50px
		width: 50px
		border-radius: 50%

	&::before
		background-color: #FFFFFF
		z-index: 1

	&::after
		top: -4px
		left: -4px
		border: 4px solid transparent
		border-top-color: $itg-blue
		border-left-color: $itg-orange
		border-bottom-color: $vt-blue
		border-right-color: $itg-pink
		animation: itg-spin 1s linear infinite
		z-index: 0

footer
	position: fixed
	right: 0
	bottom: 0
	left: 0
	height: 85px
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center

	.logo
		padding: 5px
		width: 75px

	.enter-fullscreen
		color: lighten($bg-color, 15%)
		margin-right: 5px
		text-align: right

@keyframes itg-spin
	0%
		transform: rotate(0deg)
	50%
		transform: rotate(180deg)
	100%
		transform: rotate(359deg)

@media screen and (max-device-width: 999px)
	#app
		flex-wrap: wrap

	.column
		flex: 1 0 100%
		max-width: unset

	footer
		display: none

@media screen and (max-device-height: 800px)
	footer
		display: none
</style>
