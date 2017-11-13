<template>
	<main id="app">
		<div class="column">
			<realtime-table stop-id="chalmers-goteborg"></realtime-table>
		</div>
		<div class="column">
			<realtime-table stop-id="kapellplatsen-goteborg"></realtime-table>
			<campaign-itgappen :showuntil="'2017-09-08 23:59:59'"></campaign-itgappen>
		</div>
		<div class="column">
			<realtime-table stop-id="chalmers-tvargata-goteborg"></realtime-table>
			<realtime-table stop-id="chalmersplatsen-goteborg"></realtime-table>
			<camera-view camera-id="17"></camera-view>
		</div>
		<div class="column">
			<datetime-view></datetime-view>
			<schoolmeal-view school="it-gymnasiet-goteborg"></schoolmeal-view>
			<campaign-eumeeting :showuntil="'2017-11-17 23:59:59'"></campaign-eumeeting>
			<support-feedback :email="'support@itggot.info'"></support-feedback>
		</div>

		<footer class="app__footer">
			<img class="logo" src="/img/itg-logo.svg">
		</footer>
	</main>
</template>

<script>
import cameraView from "./components/cameraView.vue"
import datetimeView from "./components/datetimeView.vue"
import realtimeTable from "./components/realtimeTable.vue"
import schoolmealView from "./components/schoolmealView.vue"
import supportFeedback from "./components/supportFeedback.vue"

import campaignItgappen from "./components/campaigns/itgappen.vue"
import campaignEumeeting from "./components/campaigns/eumeeting.vue"

export default {
	name: "app",
	components: {
		cameraView: cameraView,
		datetimeView: datetimeView,
		realtimeTable: realtimeTable,
		schoolmealView: schoolmealView,
		supportFeedback: supportFeedback,
		campaignItgappen: campaignItgappen,
		campaignEumeeting: campaignEumeeting,
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
	font-size: 16px
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

.app__footer
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

@keyframes itg-spin
	0%
		transform: rotate(0deg)
	50%
		transform: rotate(180deg)
	100%
		transform: rotate(359deg)

@media screen and (max-width: 999px)
	#app
		flex-wrap: wrap

	.column
		flex: 1 0 100%
		max-width: unset

	.app__footer
		display: none

@media screen and (max-height: 800px)
	footer
		display: none
</style>
