import { COMMANDS } from "../commands/index.js";

export function clear(msg: string): string {
	return msg.replace(/@[^\n]*?(?=\s*\/)\s*/, "");
}

export function isCommand(msg: string): boolean {
	return msg.startsWith("/");
}

export function parseCommand(msg: string): Array<string> | null {
	if (isCommand(msg)) {
		return null;
	}
	let clean = clear(msg);
	let trimmed = clean.substring(1).trimEnd();
	return trimmed.split(" ");
}

export function matchCommand(msg: string) {
	let parsed = parseCommand(msg);
	if (parsed) {
		COMMANDS.find((x) => x.name === parsed[0])?.execute(parsed.slice(1));
	}
}
