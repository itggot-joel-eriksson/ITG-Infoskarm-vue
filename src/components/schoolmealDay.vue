<template>
	<article class="schoolmeal__day" :class="'schoolmeal__day--' + currentDay" v-if="displayOnDays instanceof Array && displayOnDays.includes(currentDay)">
		<h2 class="day__title">{{ dayName }}</h2>
		<section class="day__meals" :class="[ { 'day__meals--messages': !day } ]">
			<span class v-if="!day">
				<p class="meal meal--message">{{ messages.doesNotHaveDayProperty }}</p>
			</span>
			<span v-else-if="day.hasOwnProperty('meals')">
				<p class="meal" v-for="(meal, mealKey, i) in day.meals" :key="mealKey">
					{{ meal.value }}
				</p>
			</span>
			<span v-else-if="day.open === false">
				<p class="meal meal--closed">{{ day.reason }}</p>
			</span>
			<span v-else>
				<p class="meal meal--message">{{ messages.dayDoesNotHaveMeals }}</p>
			</span>
		</section>
	</article>
</template>

<script>
export default {
	name: "schoolmealDay",
	props: [
		"current-day",
		"schoolmeal",
		"display-on-days",
	],
	data() {
		return {
			days: {
				monday: "Måndag",
				tuesday: "Tisdag",
				wednesday: "Onsdag",
				thursday: "Torsdag",
				friday: "Fredag",
				saturday: "Lördag",
				sunday: "Söndag"
			},
			messages: {
				noMeal: "Det serveras ingen mat idag",
				doesNotHaveDayProperty: "Det saknas en meny för dagen.",
				dayDoesNotHaveMeals: "Det finns ingen meny inlagd för denna dag.",
			},
		}
	},
	computed: {
		dayName() {
			if (this.displayOnDays instanceof Array === false || this.displayOnDays.length < 1) {
				return undefined
			}

			if (this.days.hasOwnProperty(this.displayOnDays[0])) {
				return this.days[this.displayOnDays[0]]
			}

			return undefined
		},
		day() {
			if (this.displayOnDays instanceof Array === false || this.displayOnDays.length < 1) {
				return undefined
			}

			const dayName = this.displayOnDays[0].toLowerCase()

			if (this.schoolmeal && this.schoolmeal.hasOwnProperty("days") && this.schoolmeal.days.hasOwnProperty(dayName)) {
				return this.schoolmeal.days[dayName]
			}

			return undefined
		},
	}
}
</script>
