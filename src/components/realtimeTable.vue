<template>
	<article class="stop">
		<h1 v-show="stop.stop" v-if="stop.stop" class="stop__name animated" :class="[ { fadeOut: !stop.stop }, { fadeIn: stop.stop } ]">{{ stop.stop.shortName }}</h1>

		<div class="itg-loader itg-loader--stop animated" v-show="!stop.stop" :class="[ { fadeOut: stop.stop }, { fadeIn: !stop.stop } ]"></div>

		<div class="departure-board animated" v-show="stop.departures" :class="[ { fadeOut: !stop.stop }, { fadeIn: stop.stop } ]">
			<div class="departure-board__header">
				<div class="departure__line">{{ line }}</div>
				<div class="departure__direction">{{ destination }}</div>
				<div class="departure__track">{{ track }}</div>
				<div class="departure__next">{{ next }}</div>
				<div class="departure__thereafter">{{ thereafter }}</div>
			</div>
			<div class="departure-board__departures">
				<div class="departure-board__line-departures animated" v-for="(lines, lineKey, i) in stop.departures" :key="lineKey" :class="{even: Object.keys(lines).length.isEven(), odd: Object.keys(lines).length.isOdd() && Object.keys(lines).length !== 1, one: Object.keys(lines).length === 1}">
					<realtime-departure v-for="(departures, departureKey, j) in lines" :key="departureKey" :departures="departures"></realtime-departure(>
				</div>
			</div>
		</div>
	</article>
</template>

<script>
	import realtimeDeparture from "./realtimeDeparture.vue"

	import firebase from "firebase/app"
	import "firebase/database"

	const config = {
		apiKey: "AIzaSyCvbaplVa5dSNxHzTSJd1y1iiKxCmceLqY",
		authDomain: "vasttrafik-api-159cc.firebaseapp.com",
		databaseURL: "https://vasttrafik-api-159cc.firebaseio.com"
	}

	firebase.initializeApp(config, "realtime-table")

	const firebaseApp = firebase.app("realtime-table")

	const departuresRef = firebaseApp.database().ref("/vasttrafik/departures")

	Number.prototype.isEven = function() {
		return this % 2 === 0
	}

	Number.prototype.isOdd = function() {
		return !this.isEven()
	}

	export default {
		name: "realtimeTable",
		props: [
			"stop-id"
		],
		data() {
			return {
				line: "",
				destination: "Destination",
				track: "Läge",
				next: "Nästa",
				thereafter: "Efter"
			}
		},
		firebase() {
			return {
				stop: {
					source: departuresRef.child(this.stopId),
					asObject: true,
					cancelCallback: (error) => {
						console.error(error)
					},
				}
			}
		},
		components: {
			realtimeDeparture: realtimeDeparture
		}
	}
</script>

<style lang="sass">
$stripe-color: #616161

.stop
	background-color: #424242
	padding-top: 10px
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

.stop .departure:last-child
	margin-bottom: 0

.departure-board__departures > .even:first-child > .departure:nth-child(even)
	background-color: $stripe-color

.departure-board__departures > .odd:first-child > .departure:nth-child(even)
	background-color: $stripe-color

.departure-board__departures > .even + .even > .departure:nth-child(even)
	background-color: $stripe-color

.departure-board__departures > .even + .odd > .departure:nth-child(even)
	background-color: $stripe-color

.departure-board__departures > .odd + .even > .departure:nth-child(odd)
	background-color: $stripe-color

.departure-board__departures > .odd + .even + .one > .departure
	background-color: $stripe-color

.departure-board__departures > .one + .even > .departure:nth-child(even)
	background-color: $stripe-color

.departure-board__departures > .one + .even > .departure:nth-child(odd)
	background-color: inherit

.departure-board__departures > .even + .odd + .one > .departure:nth-child(odd)
	background-color: $stripe-color

.departure-board__departures > .one + .one > .departure:nth-child(odd)
	background-color: initial !important

.departure-board__departures > .one + .one + .even > .departure:nth-child(odd)
	background-color: $stripe-color

.departure-board__departures > .one + .one + .even > .departure:nth-child(even)
	background-color: initial !important

.departure-board__departures > .one > .departure:nth-child(even)
	background-color: $stripe-color

.departure-board__departures > .even + .one > .departure
	background-color: initial !important

.departure-board__departures > .odd + .even + .one > .departure
	background-color: $stripe-color !important
	
.stop__name
	font-size: 2rem
	text-align: center
	margin: 0
	padding: 0 10px

.departure-board__header
	display: flex
	flex-direction: row
	font-size: 0.8rem
	font-weight: bold
	text-align: center

.itg-loader--stop
	margin-top: 35px
	margin-left: -40px
	align-self: center

	&::before
		background-image: url(../assets/vt-blue.svg)
		background-repeat: no-repeat
		background-size: 30px
		background-position: center
</style>
