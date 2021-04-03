<template>
	<div class="finish-btns">
		<button
			@click="success"
			:title="successTitle"
			class="finish-btns__success"
		>
			<icon v-if="loading" icon="check" spin />
			<icon v-else icon="check" />
		</button>
		<button
			@click="cancel"
			:title="cancelTitle"
			class="finish-btns__cancel"
		>
			<icon icon="times" />
		</button>
	</div>
</template>

<script>
	export default {
		props: ['success', 'cancel', 'successTitle', 'cancelTitle'],
		data: () => ({
			loading: false
		})
	}
</script>

<style scoped>
	.finish-btns {
		display: flex;
		font-size: 1.6rem;
	}

	.finish-btns__success,
	.finish-btns__cancel {
		padding: .2em;
		width: 50%;
		border: none;
		font-size: 1em;
		cursor: pointer;
		transition: .3s;
	}

	.finish-btns__success {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		background: #2ecc71;
	}

	.finish-btns__success:hover {
		background: #27ae60;
	}

	.finish-btns__cancel {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		background: #e74c3c;
	}

	.finish-btns__cancel:hover {
		background: #c0392b;
	}
</style>