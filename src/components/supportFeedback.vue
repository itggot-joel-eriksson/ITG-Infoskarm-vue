<template>
	<div class="support-feedback" v-if="email">
		<h1 class="support-feedback__title">Support och feedback</h1>
		<p class="support-feedback__body">
			<a :href="emailHref">{{ email }}</a>
		</p>
		<div class="support-feedback__footer" v-if="status && status.up === false">
			<p>ITG-Infoskarm-API har legat nere i {{ moment(status.since).locale("sv").fromNow(true) }}.</p>
		</div>
	</div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/database"

import moment from "moment"

const config = {
	apiKey: "AIzaSyCvbaplVa5dSNxHzTSJd1y1iiKxCmceLqY",
	authDomain: "vasttrafik-api-159cc.firebaseapp.com",
	databaseURL: "https://vasttrafik-api-159cc.firebaseio.com"
}

firebase.initializeApp(config, "support-feeback")

const firebaseApp = firebase.app("support-feeback")

const monitor = 779336471;

const statusRef = firebaseApp.database().ref(`/status/monitors/${monitor}/current`);

export default {
	name: "supportFeedback",
	props: [
		"email",
	],
	data() {
		return {
			moment: moment,
		}
	},
	computed: {
		emailHref() {
			return `mailto:${this.email}`
		},
	},
	firebase() {
		return {
			status: {
				source: statusRef,
				asObject: true,
				cancelCallback: (error) => {
					console.error(error)
				},
			}
		}
	},
}
</script>

<style lang="sass" scoped>
$card-bg-color: rgba(66, 66, 66, 1)

.support-feedback
	background-color: rgba(66, 66, 66, 1)
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
	
	.support-feedback__title
		padding: 10px 10px 0 10px

	.support-feedback__body
		padding: 0 10px 10px 10px
		font-size: 1.2rem

	.support-feedback__footer
		padding: 7px
		background-color: darken($card-bg-color, 5%)
		box-shadow: inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12)

		p
			font-size: 0.75rem
			text-align: center
			margin: 0
</style>

