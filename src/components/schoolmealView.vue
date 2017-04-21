<template>
	<div class="schoolmeal">
		<h1 class="schoolmeal__title">{{ title }}</h1>
		
		{{ dayUpdater }}
		<div class="schoolmeal__days animated" v-if="schoolmeal && schoolmeal.hasOwnProperty('days')" :class="[ { fadeOut: !schoolmeal }, { fadeIn: schoolmeal } ]">
			<article class="schoolmeal__day schoolmeal__day--monday" v-show="day === 'monday'">
				<h2 class="day__title">Måndag</h2>
				<section class="day__meals" v-if="schoolmeal.days.hasOwnProperty('monday')">
					<p class="meal" v-if="schoolmeal.days.monday.hasOwnProperty('meals')" v-for="meal in schoolmeal.days.monday.meals">{{ meal.value }}</p>
					<p class="meal meal--closed" v-else>{{ schoolmeal.days.monday.reason }}</p>
				</section>
			</article>
			
			<article class="schoolmeal__day schoolmeal__day--tuesday" v-show="schoolmeal && schoolmeal.hasOwnProperty('days') && day === 'monday' || day === 'tuesday'">
				<h2 class="day__title">Tisdag</h2>
				<section class="day__meals" v-if="schoolmeal.days.hasOwnProperty('tuesday')">
					<p class="meal" v-if="schoolmeal.days.tuesday.hasOwnProperty('meals')" v-for="meal in schoolmeal.days.tuesday.meals">{{ meal.value }}</p>
					<p class="meal meal--closed" v-else>{{ schoolmeal.days.tuesday.reason }}</p>
				</section>
			</article>

			<article class="schoolmeal__day schoolmeal__day--wednesday" v-show="day === 'tuesday' || day === 'wednesday'">
				<h2 class="day__title">Onsdag</h2>
				<section class="day__meals" v-if="schoolmeal.days.hasOwnProperty('wednesday')">
					<p class="meal" v-if="schoolmeal.days.wednesday.hasOwnProperty('meals')" v-for="meal in schoolmeal.days.wednesday.meals">{{ meal.value }}</p>
					<p class="meal meal--closed" v-else>{{ schoolmeal.days.wednesday.reason }}</p>
				</section>
			</article>

			<article class="schoolmeal__day schoolmeal__day--thursday" v-show="day === 'wednesday' || day === 'thursday'">
				<h2 class="day__title">Torsdag</h2>
				<section class="day__meals" v-if="schoolmeal.days.hasOwnProperty('thursday')">
					<p class="meal" v-if="schoolmeal.days.thursday.hasOwnProperty('meals')" v-for="meal in schoolmeal.days.thursday.meals">{{ meal.value }}</p>
					<p class="meal meal--closed" v-else>{{ schoolmeal.days.thursday.reason }}</p>
				</section>
			</article>

			<article class="schoolmeal__day schoolmeal__day--friday" v-show="day === 'thursday' || day === 'friday'">
				<h2 class="day__title">Fredag</h2>
				<section class="day__meals" v-if="schoolmeal.days.hasOwnProperty('friday')">
					<p class="meal" v-if="schoolmeal.days.friday.hasOwnProperty('meals')" v-for="meal in schoolmeal.days.friday.meals">{{ meal.value }}</p>
					<p class="meal meal--closed" v-else>{{ schoolmeal.days.friday.reason }}</p>
				</section>
			</article>
		</div>
		<div class="itg-loader itg-loader--schoolmeal animated" v-else :class="[ { fadeOut: schoolmeal }, { fadeIn: !schoolmeal } ]"></div>
	</div>
</template>

<script>
import moment from "moment"
import firebase from "firebase/app"
import "firebase/database"

moment.locale("en")

const config = {
	apiKey: "AIzaSyCvbaplVa5dSNxHzTSJd1y1iiKxCmceLqY",
	authDomain: "vasttrafik-api-159cc.firebaseapp.com",
	databaseURL: "https://vasttrafik-api-159cc.firebaseio.com"
}

firebase.initializeApp(config, "schoolmeal")

const firebaseApp = firebase.app("schoolmeal")

const schoolmealsRef = firebaseApp.database().ref("schoolmeal/schools")

export default {
	name: "schoolmealView",
	props: [
		"school"
	],
	data() {
		return {
			title: "Matsedel",
			schoolmeal: undefined,
			day: moment().format("dddd").toLowerCase(),
		}
	},
	computed: {
		dayUpdater() {
			setInterval(() => {
				this.day = moment().format("dddd").toLowerCase()
			})
		}
	},
	firebase() {
		return {
			schoolmeal: {
				source: schoolmealsRef.child(this.school),
				asObject: true,
			}
		}
	},
}
</script>

<style lang="sass">
.schoolmeal
	background-color: #424242
	margin: 10px
	padding: 10px
	color: #FFFFFF
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23)
	border-radius: 4px
	display: flex
	flex-direction: column
	justify-content: center
	align-items: stretch
	box-sizing: border-box

.schoolmeal__title
	font-size: 2rem;
	text-align: center
	margin: 0
	padding: 0 10px

.schoolmeal__day:not(:last-child)
	border-bottom: 2px solid white

.meal--closed
	color: red

.itg-loader--schoolmeal
	margin-top: 35px
	margin-left: -40px
	align-self: center

	&::before
		background-image: url(https://skolmaten.se/img/logo.png)
		background-repeat: no-repeat
		background-size: 30px
		background-position: center
</style>
