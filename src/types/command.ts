import type { QQBot, ReplyTarget } from "@tencent-connect/qqbot-nodejs";

export interface Command {
	name: string;
	description: string;
	isAdminOnly: boolean;
	isGroupOnly: boolean;
	execute: (
		bot: QQBot,
		target: ReplyTarget,
		args: Array<string>,
	) => Promise<void>;
}
