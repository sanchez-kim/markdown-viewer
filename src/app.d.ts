// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// File System Access API — lib.dom에 Window의 picker 메서드가 없어 보강
	interface Window {
		showOpenFilePicker?(options?: {
			multiple?: boolean;
			types?: Array<{ description?: string; accept: Record<string, string[]> }>;
		}): Promise<FileSystemFileHandle[]>;
		showSaveFilePicker?(options?: {
			suggestedName?: string;
			types?: Array<{ description?: string; accept: Record<string, string[]> }>;
		}): Promise<FileSystemFileHandle>;
	}
}

export {};
