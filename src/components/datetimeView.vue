<template>
	<article class="datetime">
		{{ datetimeMoment }}
		<h1 class="datetime__time" v-if="datetime">{{ datetime.format("HH:mm:ss") }}</h1>
		<h2 class="datetime__date" v-if="datetime">{{ datetime.format("dddd D MMMM") }}</h2>
		<h2 class="datetime__week" v-if="datetime">{{ week }} {{ datetime.format("w") }}</h2>
	</article>
</template>

<script>
	import moment from "moment"

	export default {
		name: "datetimeView",
		data() {
			return {
				datetime: this.datetimeMoment,
				week: "Vecka"
			}
		},
		computed: {
			datetimeMoment() {
				setInterval(() => {
					this.datetime = moment().locale("sv")
				})
			}
		}
	}
</script>

<style lang="sass">
.datetime
	background-color: #424242
	margin: 10px
	padding: 10px
	color: #FFFFFF
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23)
	border-radius: 4px
	box-sizing: border-box

.datetime__time, .datetime__date, .datetime__week
	margin: 0
	text-align: center

.datetime__time
	font-size: 2rem
</style>
