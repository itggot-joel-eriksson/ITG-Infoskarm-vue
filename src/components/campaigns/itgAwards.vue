<template>
	<div>
		{{ updater }}
		<article class="campaign campaign--itgAwards" v-if="shown">
			<section class="campaign__header">
				<div class="campaign__heading">
					<h2 class="campaign__title">
						{{ title }}
					</h2>
					<h3 class="campaign__subtitle">
						{{ subtitle }}
					</h3>
				</div>
			</section>
			<section class="campaign__content" v-if="thisMoment.isAfter()">
				<p>
					{{ thisMoment.locale("sv").fromNow() }} i RunAn
				</p>
			</section>
		</article>
	</div>
</template>

<script>
import moment from "moment"

moment.updateLocale("sv", {
	relativeTime: {
		s: "%d sekunder",
	},
});

moment.relativeTimeThreshold('ss', 59);
moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);

export default {
	name: "campaignItgAwards",
	props: {
		showuntil: {
			type: String,
			required: true,
			validator(value) {
				return moment(value).isValid()
			},
		},
	},
	data() {
		return {
			title: "ITG Awards",
			subtitle: "2018",
			shown: moment().isBefore(this.showuntil),
			thisMoment: moment("2018-05-09 12:30:00"),
		}
	},
	computed: {
		updater() {
			setInterval(() => {
				this.shown = moment().isBefore(this.showuntil)
				this.$forceUpdate()
			}, 500)
		},
	},
}
</script>

<style lang="scss" scoped>
$card-bg-color: rgba(66, 66, 66, 1);

@import url("https://fonts.googleapis.com/css?family=Oswald:300,700");

.campaign--itgAwards {
	width: calc(100% - 21px);
	margin: 10px 10px 0 10px;
	box-sizing: border-box;
	border-radius: 4px;
	background-color: $card-bg-color;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23);
	overflow: hidden;

	.campaign__header {
		height: 235px;
		background-image: url("/img/campaigns/itg-awards/2018.jpg");
		background-position: center;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.campaign__heading {
		width: 50%;
		padding: 5px;
		text-align: center;
		color: rgba(0, 0, 0, 1);
		background-color: rgba(255, 255, 255, 0.8);
		font-family: 'Oswald', sans-serif;
		border-radius: 1px;
	}

	.campaign__title {
		margin: -10px;
		text-transform: uppercase;
		font-weight: 700;
	}

	.campaign__subtitle {
		margin: 0;
		font-weight: 100;
	}

	.campaign__content {
		color: rgba(255, 255, 255, 1);
		text-align: center;

		p:first-letter {
			text-transform: uppercase;
		}
	}
}
</style>

