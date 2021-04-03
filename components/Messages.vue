<template>
	<transition name="message">
		<div v-if="showMessage" class="message" :class="messageType">
			<div>{{messageText}}</div>
			<icon
				@click="hideMessage"
				icon="times"
				class="message__close-icon"
			/>
		</div>
	</transition>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'

	export default {
		computed: {
			...mapGetters('messages', {
				showMessage: 'show',
				messageType: 'type',
				messageText: 'text'
			})
		},
		methods: {
			...mapMutations('messages', {
				hideMessage: 'hide'
			})
		}
	}
</script>

<style scoped>
	.message {
		display: flex;
		justify-content: space-between;
		position: fixed;
		padding: 1em;
		width: 25em;
		max-width: calc(100% - 1.875em * 2);
		top: 1.875em;
		right: 1.875em;
		z-index: 1;
		box-sizing: border-box;
		border-radius: 3px;
		font-size: 1rem;
		line-height: 25px;
	}

	.message.success {
		background: #d4edda;
		border-bottom: 5px solid #99CC99;
		color: #155724;
	}

	.message.error {
		background: #f8d7da;
		border-bottom: 5px solid #F8aaaa;
		color: #721c24;
	}

	.message__close-icon {
		align-self: center;
		margin-left: 1em;
		cursor: pointer;
	}

	.message-enter-active, .message-leave-active {
		transition: .4s;
	}

	.message-leave-to, .message-enter {
		right: -23.75em;
	}
</style>