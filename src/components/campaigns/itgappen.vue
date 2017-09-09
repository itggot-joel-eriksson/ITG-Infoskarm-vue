<template>
	<div>
		{{ showStatus }}
		<article class="campaign campaign--itgappen" v-if="shown">
			<img src="/img/campaigns/itgappen.svg" draggable="false">
			<section class="app-badges">
				<div class="app-badge">
					<a href="https://itggot.info/itgappen-ios" class="app-badge">
						<img class="app-badge__logo app-badge__logo--app-store" alt="Download on the App Store" src="https://linkmaker.itunes.apple.com/assets/shared/badges/sv-se/appstore-lrg.svg" draggable="false" />
						<span class="app-badge__link">itggot.info/itgappen-ios</span>
					</a>
				</div>
				<div class="app-badge">
					<a href="https://itggot.info/itgappen-android" class="app-badge">
						<img class="app-badge__logo app-badge__logo--google-play" alt="Ladda ned på Google Play" src="/img/campaigns/sv-google-play-badge.png" draggable="false" />
						<span class="app-badge__link">itggot.info/itgappen-android</span>
					</a>
				</div>
			</section>
			<section class="campaign__legal">
				Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc.
				<hr noshade />
				Google Play och logotypen för Google Play är varumärken som tillhör Google Inc.
			</section>
		</article>
	</div>
</template>

<script>
import moment from "moment"

export default {
	name: "campaignItgappen",
	props: [
		"showuntil",
	],
	data() {
		return {
			shown: false,
		}
	},
	computed: {
		showStatus() {
			setInterval(() => {
				this.shown = moment().isBefore(this.showuntil)
			})
		},
	},
}
</script>

<style lang="sass" scoped>¨
$card-bg-color: rgba(66, 66, 66, 1)

.campaign--itgappen
	width: calc(100% - 21px)
	margin: 10px 10px 0 10px
	box-sizing: border-box
	border-radius: 4px
	background-color: $card-bg-color
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23)
	overflow: hidden

.campaign__legal
	padding: 7px
	background-color: darken($card-bg-color, 5%)
	box-shadow: inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12)
	font-size: 0.65rem

.app-badges
	display: flex
	flex-direction: row

	.app-badge
		display: flex
		flex-direction: column
		align-items: center
		flex: 0 1 100%
		text-align: center
		padding-bottom: 3px

		.app-badge__link
			padding-top: 3px
			font-size: 1.1rem

		.app-badge__logo--google-play
			max-height: 40px
			flex: 1 0 50%

		.app-badge__logo--app-store
			max-height: 40px
			flex: 1 0 50%

</style>

