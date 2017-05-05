<template>
	<div class="departure">
		<div class="departure__line" :style="[ { color: departures[0].colors.foreground }, { backgroundColor: departures[0].colors.background } ]">{{ departures[0].line.shortName }}</div>
		<div class="departure__direction">{{ departures[0].direction.short }}</div>
		<div class="departure__track">{{ departures[0].track }}</div>
		<div class="departure__next">{{ departures[0].departure.wait.minutes <= 0 ? now : departures[0].departure.wait.minutes }}</div>
		<div class="departure__thereafter" v-if="departures.length > 1">{{ departures[1].departure.wait.minutes <= 0 ? now : departures[1].departure.wait.minutes }}</div>
		<div class="departure__thereafter departure__thereafter--none" v-else></div>
	</div>
</template>

<script>
	export default {
		name: "realtimeDeparture",
		props: [
			"departures",
		],
		data() {
			return {
				now: "nu",
			}
		},
	}
</script>

<style lang="sass">
	.departure
		display: flex
		flex-direction: row
		margin: 2px 0

	.departure__line
		flex: 1 0 20%
		padding: 5px
		text-align: center
		max-width: 50px
	
	.departure__direction
		flex: 3 0 20%
		padding-left: 5px
		line-height: 28px
		vertical-align: middle
		text-overflow: ellipsis
		white-space: nowrap
		overflow: hidden

	.departure__track
		flex-grow: 1
		padding: 5px
		text-align: center
		max-width: 50px

	.departure__next, .departure__thereafter
		flex: 1 0
		padding: 5px
		text-align: center
		max-width: 50px

	.departure__thereafter--none::before
		content: "-"
		vertical-align: middle
</style>
