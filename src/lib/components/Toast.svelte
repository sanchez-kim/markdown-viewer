<script lang="ts">
	import { toastStore } from '$lib/stores/toast';
	import { fly, fade } from 'svelte/transition';

	const iconMap = {
		success: '✅',
		error: '❌',
		warning: '⚠️',
		info: 'ℹ️'
	};
</script>

<div class="toast-container">
	{#each $toastStore as toast (toast.id)}
		<div
			class="toast toast-{toast.type}"
			in:fly={{ y: -50, duration: 300 }}
			out:fade={{ duration: 200 }}
			role="alert"
		>
			<span class="toast-icon">{iconMap[toast.type]}</span>
			<span class="toast-message">{toast.message}</span>
			<button
				class="toast-close"
				on:click={() => toastStore.dismiss(toast.id)}
				aria-label="Close notification"
			>
				×
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		pointer-events: none;
	}

	.toast {
		pointer-events: all;
		background: white;
		border-radius: 8px;
		padding: 1rem 1.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 300px;
		max-width: 500px;
		border-left: 4px solid;
	}

	.toast-success {
		border-left-color: #10b981;
		background: #f0fdf4;
	}

	.toast-error {
		border-left-color: #ef4444;
		background: #fef2f2;
	}

	.toast-warning {
		border-left-color: #f59e0b;
		background: #fffbeb;
	}

	.toast-info {
		border-left-color: #3b82f6;
		background: #eff6ff;
	}

	.toast-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.toast-message {
		flex: 1;
		font-size: 0.95rem;
		color: #1f2937;
		line-height: 1.5;
	}

	.toast-close {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #6b7280;
		padding: 0;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: background-color 0.2s;
		flex-shrink: 0;
	}

	.toast-close:hover {
		background-color: rgba(0, 0, 0, 0.1);
		color: #1f2937;
	}

	@media (max-width: 768px) {
		.toast-container {
			top: 0.5rem;
			right: 0.5rem;
			left: 0.5rem;
		}

		.toast {
			min-width: auto;
			width: 100%;
		}
	}
</style>
