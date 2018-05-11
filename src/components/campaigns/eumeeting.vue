<template>
	<div>
		{{ showStatus }}
		<article class="campaign campaign--eumeeting" v-if="shown">
			<h1>
				EU-toppmöte påverkar trafiken i Göteborg
			</h1>
			<p>
				Det kommer bli stor påverkan på trafiken i Göteborg mellan 15-17 november då EU:s stats- och regeringschefer träffas på ett möte i Göteborg, med omläggningar och förseningar i kollektivtrafiken. Räkna därför med längre restid och var ute i god tid.
			</p>
		</article>
	</div>
</template>

<script>
import moment from "moment"

export default {
	name: "campaignEumeeting",
	props: {
		showuntil: {
			required: true,
			type: String,
			validator(value) {
				return moment(value).isValid()
			},
		},
	},
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

<style lang="scss" scoped>
$card-bg-color: rgba(255, 245, 180, 1);

.campaign--eumeeting {
	width: calc(100% - 21px);
	margin: 10px 10px 0 10px;
	box-sizing: border-box;
	border-radius: 4px;
	color: rgba(0, 57, 77, 1);
	background-color: $card-bg-color;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23);
	overflow: hidden;
	padding: 10px;
}
</style>

