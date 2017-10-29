<template>
	<div class="stop">
		<h1 v-show="stop.stop" v-if="stop.stop" class="stop__name animated" :class="[ { fadeOut: !stop.stop }, { fadeIn: stop.stop } ]">{{ stop.stop.shortName }}</h1>

		<div class="itg-loader itg-loader--stop animated" v-show="!stop.stop" :class="[ { fadeOut: stop.stop }, { fadeIn: !stop.stop } ]"></div>

		<article class="departure-board animated" v-show="stop.stop" :class="[ { fadeOut: !stop.stop }, { fadeIn: stop.stop } ]">
			<section class="departure-board__header">
				<div class="departure__line">{{ line }}</div>
				<div class="departure__direction">{{ destination }}</div>
				<div class="departure__track">{{ track }}</div>
				<div class="departure__next">{{ next }}</div>
				<div class="departure__thereafter">{{ thereafter }}</div>
			</section>
			<section class="departure-board__departures">
				<div class="departure-board__line-departures animated fadeIn" v-if="stop.departures">
					<realtime-departure v-for="(departure, departureKey, i) in departures" :key="departureKey" :departure="departure[0]" :thereafter="departure[1]"></realtime-departure>
				</div>
				<div class="departure-board__line-departures animated fadeIn" v-else>
					<realtime-departure :departure="noDepaturesFound"></realtime-departure>
				</div>
			</section>
			<!-- <section class="departure-board__messages" v-if="stop && stop.stop && stop.stop.hasOwnProperty('messages')">
				<realtime-table-message :message="vasttrafikMessage"></realtime-table-message>
				<realtime-table-message v-for="(message, messageKey, i) in stop.stop.messages" :key="messageKey" :message="message"></realtime-table-message>
			</section>
			<section class="departure-board__messages">
				<realtime-table-message :message="vasttrafikMessage"></realtime-table-message>
			</section> -->
		</article>
	</div>
</template>

<script>
	import realtimeDeparture from "./realtimeDeparture.vue"
	import realtimeTableMessage from "./realtimeTableMessage.vue"

	import _ from "lodash"

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

	export default {
		name: "realtimeTable",
		props: [
			"stop-id"
		],
		data() {
			return {
				line: "Linje",
				destination: "Destination",
				track: "Läge",
				next: "Nästa",
				thereafter: "Efter",
				count: 0,
				noDepaturesFound: {
					colors: {
						background: "#F44336",
						foreground: "#FFFFFF",
					},
					departure: {
						wait: {
							minutes: "-",
						},
					},
					direction: {
						long: "Inga avgångar hittades",
						short: "Inga avgångar hittades",
					},
					line: {
						shortName: "-",
					},
					track: "-",
				},
				vasttrafikMessage: {
					text: "Resedata från Västtrafik AB",
				},
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
		computed: {
			departures() {
				return this.parseDepartures(this.stop.departures)
			},
		},
		methods: {
			parseDepartures(departures) {
				let result = []

				_.map(_.flatMap(departures), (x) => {
					const departure = _.sortBy(x, ["line.shortName", "departure.wait.minutes"])

					_.forEach(departure, (value, key) => {
						if (value.length > 1) {
							if (value[0].departure.wait.milliseconds > value[1].departure.wait.milliseconds) {
								result.push([ value[1], value[0] ])
							} else {
								result.push([ value[0], value[1] ])
							}
						} else {
							result.push([ value[0] ])
						}
					})
				})

				return result
			},
		},
		components: {
			realtimeDeparture: realtimeDeparture,
			realtimeTableMessage: realtimeTableMessage,
		},
	}
</script>

<style lang="sass">
$card-bg-color: rgba(66, 66, 66, 1)
$stripe-color: rgba(97, 97, 97, 0.8)

.stop
	background-color: $card-bg-color
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

.departure-board__departures > .departure-board__line-departures:nth-child(even)
	background-color: $stripe-color

.departure-board__departures
	background-color: darken($card-bg-color, 3%)
	box-shadow: inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12)

	.departure:nth-child(even)
		background-color: $stripe-color
	
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
		background-image: url(/img/vasttrafik-logo.svg)
		background-repeat: no-repeat
		background-size: 30px
		background-position: center
</style>
