import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastAction {
	label: string;
	onClick: () => void;
}

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
	duration?: number;
	action?: ToastAction;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);
	let idCounter = 0;

	return {
		subscribe,
		show: (message: string, type: ToastType = 'info', duration: number = 3000, action?: ToastAction) => {
			const id = idCounter++;
			const toast: Toast = { id, message, type, duration, action };

			update((toasts) => [...toasts, toast]);

			if (duration > 0) {
				setTimeout(() => {
					update((toasts) => toasts.filter((t) => t.id !== id));
				}, duration);
			}

			return id;
		},
		dismiss: (id: number) => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		},
		clear: () => {
			update(() => []);
		}
	};
}

export const toastStore = createToastStore();
