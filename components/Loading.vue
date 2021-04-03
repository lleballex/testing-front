<template>
	<div class="loading">
		<icon
			icon="pencil-alt"
			:class="isInverse() ? 'inverse' : ''"
			class="loading__icon"
			spin
		/>
	</div>
</template>

<script>
	export default {
		methods: {
			isInverse() {
				return Boolean(this.inverse || this.inverse == '')
			}
		}
	}
</script>

<style scoped>
	.loading {
		text-align: center;
	}

	.loading__icon {
		font-size: 3.125rem;
		margin: 3em 0;
		color: #fff;
	}

	.loading__icon.inverse {
		color: #2a2a2a;
	}
</style>