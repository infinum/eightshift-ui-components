declare module 'node:path' {
	export function dirname(path: string): string;
	export function resolve(...paths: string[]): string;
	export function relative(from: string, to: string): string;
	export function extname(path: string): string;
	export function join(...paths: string[]): string;

	const path: {
		dirname: typeof dirname;
		resolve: typeof resolve;
		relative: typeof relative;
		extname: typeof extname;
		join: typeof join;
	};

	export default path;
}

declare module 'node:url' {
	export function fileURLToPath(url: string | URL): string;
}

declare module 'node:fs' {
	export function existsSync(path: string): boolean;
	export function readFileSync(path: string, encoding: 'utf8'): string;
	export function readFileSync(path: string): Uint8Array;

	export const promises: {
		readFile(path: string, encoding: 'utf8'): Promise<string>;
		unlink(path: string): Promise<void>;
		writeFile(path: string, data: string | Uint8Array): Promise<void>;
	};
}

declare const process: {
	cwd(): string;
};
