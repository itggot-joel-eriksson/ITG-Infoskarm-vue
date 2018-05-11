<template>
	<div class="support-feedback" v-if="email">
		<h1 class="support-feedback__title">
			Support och feedback
		</h1>
		<p class="support-feedback__body">
			<a :href="emailHref">
				{{ email }}
			</a>
		</p>
		<div
			class="support-feedback__footer"
			v-if="status && status.up === false && moment().isBefore(status.since)"
		>
			<p>
				ITG-Infoskarm-API har legat nere i {{ moment(moment(status.since).format(`YYYY-MM-DD[T]HH:mm:ss[+${timeShift}]`)).locale("sv").fromNow(true) }}.
			</p>
		</div>
	</div>
</template>

<script>
import moment from "moment"

const monitor = 779586323;

export default {
	name: "supportFeedback",
	props: [
		"email",
	],
	data() {
		return {
			moment: moment,
		}
	},
	computed: {
		emailHref() {
			return `mailto:${this.email}`
		},
		timeShift() {
			return moment().isDST() ? "0400" : "0300"
		},
	},
	firebase() {
		return {
			status: {
				source: this.$firebase.database().ref(`/status/monitors/${monitor}/current`),
				asObject: true,
				cancelCallback: (error) => {
					console.error(error)
				},
			}
		}
	},
}
</script>

<style lang="scss" scoped>
$card-bg-color: rgba(66, 66, 66, 1);

.support-feedback {
	background-color: $card-bg-color;
	margin: 10px 10px 0 10px;
	color: #FFFFFF;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.23);
	border-radius: 4px;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	text-align: center;

	&__title, &__body {
		margin: 0;
	}
	
	&__title {
		padding: 10px 10px 0 10px;
	}

	&__body {
		padding: 0 10px 10px 10px;
		font-size: 1.2rem;
	}

	&__footer {
		padding: 7px;
		background-color: darken($card-bg-color, 5%);
		box-shadow: inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.12);

		p {
			font-size: 0.75rem;
			text-align: center;
			margin: 0;
		}
	}
}
</style>
