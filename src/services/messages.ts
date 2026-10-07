import type { QQBotInboundMessage } from "@tencent-connect/qqbot-nodejs";

export function isAttingMe(msg: QQBotInboundMessage): boolean {
	if (msg.kind === "c2c") {
		return true;
	}
	let result = msg.mentions?.findIndex((x) => x.is_you);
	return result != undefined && result != -1;
}
