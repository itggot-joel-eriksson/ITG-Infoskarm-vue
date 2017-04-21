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
		</div>

		<img class="logo" src="./assets/logo.svg">
	</main>
</template>

<script>
import cameraView from "./components/cameraView.vue"
import datetimeView from "./components/datetimeView.vue"
import realtimeTable from "./components/realtimeTable.vue"
import schoolmealView from "./components/schoolmealView.vue"

export default {
	name: "app",
	data() {
		return {

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

\:root
	font-size: 14px
	color: #FFFFFF

html, body
	margin: 0
	padding: 0
	width: 100%
	height: 100%
	font-family: "Roboto", "Open Sans", Helvetica, Arial, sans-serif

body
	background: #212121

#app
	max-width: 100%
	display: flex
	justify-content: space-between

.column
	flex: 0 0 25%
	max-width: 25%

.logo
	position: fixed
	bottom: 10px
	left: 10px
	width: 75px

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

	.logo
		display: none
</style>
