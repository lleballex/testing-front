<template>
	<div class="footer">
		<div class="footer__content">
			<div>
				<span>© 2021. Автор проекта:</span> Алексей Лебедев
			</div>
			<div>
				support@testsforeveryone.ru
			</div>
		</div>
	</div>
</template>

<style scoped>
	.footer {
		margin-top: auto;
	}

	.footer__content {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 1rem;
		padding: 2.2em;
		background: #1c1c1c;
		font-size: .9em;
		letter-spacing: 1px;
	}

	.footer__content > div:last-child {
		color: #8ac547;
	}

	.footer__content span {
		color: #ccc;
	}

	@media (max-width: 480px) {
		.footer__content {
			padding: 1.5em;
		}

		.footer__content > div:first-child {
			padding-bottom: 1em;
		}
	}
</style>