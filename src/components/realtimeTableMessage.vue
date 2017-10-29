<template>
	<p class="departure-board__message">{{ message.text }}</p>
</template>

<script>
	export default {
		name: "realtimeTableMessage",
		props: [
			"message"
		],
	}
</script>

<style lang="sass">
$card-bg-color: rgba(66, 66, 66, 1)

.departure-board__messages
	padding: 7px
	background-color: darken($card-bg-color, 5%)
	box-shadow: inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12)

.departure-board__message
	font-size: 0.75rem
	text-align: center
	margin: 0

	&:first-child
		padding-bottom: 5px

	&:last-child
		padding-bottom: 0

	&:not(:first-child)
		padding-top: 5px

	&:not(:last-child)
		border-bottom: 2px solid #424242
</style>
