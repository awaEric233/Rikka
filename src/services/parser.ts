import type { QQBotInboundMessage, QQBot } from "@tencent-connect/qqbot-nodejs";
import { COMMANDS } from "../commands/index.js";

export function clear(msg: QQBotInboundMessage): string {
	return msg.content.replace(
		`<@${msg.mentions?.find((x) => x.is_you)?.id}> `,
		"",
	);
}

export function isCommand(msg: string): boolean {
	return msg.startsWith("/");
}

export function parseCommand(msg: QQBotInboundMessage): Array<string> | null {
	let clean = clear(msg);
	if (!isCommand(clean)) {
		return null;
	}
	let trimmed = clean.substring(1).trimEnd();
	console.log(`🚀 Command invoke by ${msg.senderName}: ${trimmed}`);
	return trimmed.split(" ");
}

export async function matchCommand(msg: QQBotInboundMessage, bot: QQBot) {
	let parsed = parseCommand(msg);
	msg;
	if (parsed) {
		await COMMANDS.find((x) => x.name === parsed[0])?.execute(
			bot,
			msg.replyTarget,
			parsed.slice(1),
		);
	}
}
