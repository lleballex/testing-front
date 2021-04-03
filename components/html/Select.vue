<template>
	<div
		ref="select"
		@click="toggleSelect"
		v-blur="toggleSelect"
		class="select"
	>
		<div class="select__header">
			<span>{{current ? items[current] : placeholder}}</span>
			<icon icon="chevron-down" class="select__icon" />
		</div>
		<div class="select__body">
			<div
				v-for="(item, key) in items"
				@click="setItem(key)"
				:class="key == current ? 'active' : ''"
				class="select__item"
			>
				{{item}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			items: {type: Object, required: true},
			placeholder: {type: String, default: 'Выбери'}
		},
		data: () => ({
			current: ''
		}),
		created() {
			var key = this.$attrs.value

			if(key && this.items[key]) this.current = key
			else this.$emit('input', '')
		},
		methods: {
			toggleSelect() {
				this.$refs.select.classList.toggle('active')
			},

			setItem(key) {
				if(key != this.current) {
					this.current = key
					this.$emit('input', key)
					this.$emit('change')
				}
			}
		}
	}
</script>

<style scoped>
	.select {
		position: relative;
		padding: .8em;
		width: 12.5rem;
		z-index: 1;
		background: #fff;
		border-radius: 5px;
		box-sizing: border-box;
		font-size: 1rem;
		color: #000;
		cursor: pointer;
		transition: .3s;
	}

	.select.active {
		background: #e2e2e2;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}

	.select__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.select__icon {
		font-size: 1.2em;
		color: #8e44ad;
	}

	.select__body {
		position: absolute;
		max-height: 0;
		top: 100%;
		left: 0;
		right: 0;
		overflow: hidden;
		background: #fff;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
		transition: .3s;
	}

	.select.active .select__body {
		max-height: 12.5rem; 
		overflow: auto;
		border: 1px solid #e2e2e2;
		border-top: none;
	}

	.select__item {
		padding: 1em;
		font-size: .9em;
		transition: .1s;
	}

	.select__item.active, .select__item:hover {
		background: #9b59b6;
		color: #fff;
		cursor: default;
	}
</style>