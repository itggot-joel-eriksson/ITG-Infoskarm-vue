<template>
	<div class="departure">
		<div class="departure__line" :style="[ { color: departure.colors.foreground }, { backgroundColor: departure.colors.background } ]">{{ departure.line.shortName }}</div>
		<div class="departure__direction">{{ departure.direction.short }}</div>
		<div class="departure__track">{{ departure.track }}</div>
		<div class="departure__next">{{ departure.departure.wait.minutes <= 0 ? now : departure.departure.wait.minutes }}</div>
		<div class="departure__thereafter" v-if="thereafter">{{ thereafter.departure.wait.minutes <= 0 ? now : thereafter.departure.wait.minutes }}</div>
		<div class="departure__thereafter departure__thereafter--none" v-else></div>
	</div>
</template>

<script>
	export default {
		name: "realtimeDeparture",
		props: [
			"departure",
			"thereafter",
		],
		data() {
			return {
				now: "nu",
				defaultForegroundColor: "#FFFFFF",
				defaultBackgroundColor: "#000000",
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
