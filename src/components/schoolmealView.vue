<template>
	<div class="schoolmeal">
		<h1 class="schoolmeal__title">
			{{ title }}
		</h1>
		
		{{ dayUpdater }}
		<article 
			class="animated"
			v-if="schoolmeal && schoolmeal.hasOwnProperty('days')"
			:class="{
				fadeOut: !schoolmeal,
				fadeIn: schoolmeal,
			}"
		>
			<section class="schoolmeal__days">
				<schoolmeal-day
					:schoolmeal="schoolmeal"
					:current-day="day"
					:display-on-days="['monday']"
				/>
				<schoolmeal-day
					:schoolmeal="schoolmeal"
					:current-day="day"
					:display-on-days="['tuesday', 'monday']"
				/>
				<schoolmeal-day
					:schoolmeal="schoolmeal"
					:current-day="day"
					:display-on-days="['wednesday', 'tuesday']"
				/>
				<schoolmeal-day
					:schoolmeal="schoolmeal"
					:current-day="day"
					:display-on-days="['thursday', 'wednesday']"
				/>
				<schoolmeal-day
					:schoolmeal="schoolmeal"
					:current-day="day"
					:display-on-days="['friday', 'thursday']"
				/>
				<schoolmeal-day
					:current-day="day"
					:display-on-days="['saturday']"
				/>
				<schoolmeal-day
					:current-day="day"
					:display-on-days="['sunday']"
				/>
			</section>
			<section class="schoolmeal__bulletins" v-if="schoolmeal.hasOwnProperty('bulletins')">
				<p
					class="schoolmeal__bulletins-item"
					v-for="(bulletin, bulletinKey) in schoolmeal.bulletins"
					:key="bulletinKey"
				>
					{{ bulletin.text }}
				</p>
			</section>
		</article>
		<div
			v-else
			class="itg-loader itg-loader--schoolmeal animated"
			:class="{
				fadeOut: schoolmeal && schoolmeal.hasOwnProperty('days'),
				fadeIn: !schoolmeal,
			}"
		/>
	</div>
</template>

<script>
import schoolmealDay from "./schoolmealDay.vue"

import moment from "moment"

export default {
	name: "schoolmealView",
	props: [
		"school"
	],
	data() {
		return {
			title: "Matsedel",
			schoolmeal: null,
			day: moment().locale("en").format("dddd").toLowerCase(),
			currentMoment: moment().locale("en"),
		}
	},
	computed: {
		dayUpdater() {
			setInterval(() => {
				this.currentMoment = moment().locale("en")
				this.day = this.currentMoment.format("dddd").toLowerCase()
			})
		}
	},
	firebase() {
		return {
			schoolmeal: {
				source: this.$firebase.database().ref(`schoolmeal/schools/${this.school}/latest`),
				asObject: true,
			}
		}
	},
	components: {
		schoolmealDay: schoolmealDay,
	},
}
</script>

<style lang="scss">
$card-bg-color: rgba(66, 66, 66, 1);

.schoolmeal {
	background-color: $card-bg-color;
	margin: 10px;
	color: #FFFFFF;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	box-sizing: border-box;
	overflow: hidden;

	&__title {
		font-size: 2rem;
		text-align: center;
		margin: 0;
		padding: 10px 10px 0 10px;
	}

	&__days {
		padding: 0 10px 10px 10px;
	}

	&__day:not(:last-child) {
		border-bottom: 2px solid white;
	}

	&__bulletins {
		padding: 7px;
		background-color: darken($card-bg-color, 5%);
		box-shadow: inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12);

		&-item {
			font-size: 0.75rem;
			text-align: center;
			margin: 0;

			&:first-child {
				padding-bottom: 5px;
			}

			&:last-child {
				padding-bottom: 0;
			}

			&:not(:first-child) {
				padding-top: 5px;
			}

			&:not(:last-child) {
				border-bottom: 2px solid #424242;
			}
		}
	}
}

.meal--closed {
	color: rgba(239, 83, 80, 1);
}

.meal--message {
	color: rgba(100, 181, 246, 1);
}

.itg-loader--schoolmeal {
	margin-top: 35px;
	margin-left: -40px;
	align-self: center;

	&::before {
		background-image: url("/img/skolmaten-logo.png");
		background-repeat: no-repeat;
		background-size: 30px;
		background-position: center;
	}
}
</style>
