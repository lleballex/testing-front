<template>
	<div id="app">
		<div class="container">
			<div class="content">
				<Navbar />
				<Nuxt />
			</div>
		</div>
		<Footer />
		<Messages />
	</div>
</template>

<script>
	export default {
		components: {
			Navbar: () => import('~/components/Navbar.vue'),
			Footer: () => import('~/components/Footer.vue'),
			Messages: () => import('~/components/Messages.vue')
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	html {
		font-size: 16px;
	}

	body {
		background: #2a2a2a;
	}

	img {
		display: block;
	}

	input, button {
		font-family: 'Montserrat', sans-serif;
		outline: none;
	}

	input[type="radio"] {
		display: none;
	}

	.radio {
		display: inline-block;
		flex-shrink: 0;
		margin-right: .3em;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		border: 1px solid #3498db;
		box-sizing: border-box;
		font-size: 1.1rem;
		transition: .3s;
	}

	.radio:hover,
	input[type="radio"]:checked + .radio {
		border-width: .28em;
		cursor: pointer;
	}

	#app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: #2a2a2a;
		font-family: 'Montserrat', sans-serif;
		color: #fff;
	}

	.container {
		align-self: center;
		width: 100%;
		max-width: 75rem;
	}

	.content {
		margin: 0 1.875rem;
	}

	.content__block {
		padding: 1.875rem;
		border-radius: .25rem;
		background: #fff;
		color: #000;
	}

	.content__block.mb {
		margin-bottom: 1.875rem;
	}


	/* scrollbar */

	body::-webkit-scrollbar {
		width: .75rem;
		height: .75rem;
	}

	body::-webkit-scrollbar-thumb:vertical {
		background: linear-gradient(to bottom, #fff, #333);
	}

	body::-webkit-scrollbar-thumb:horizontal {
		background: linear-gradient(to right, #fff, #333);
	}

	body::-webkit-scrollbar-corner {
		background: #333;
	}
</style>