import { ping } from "./ping.js";
import type { QQBot } from "@tencent-connect/qqbot-nodejs";
import type { Command } from "../types/command.js";

export const COMMANDS: Array<Command> = [ping];

export async function registerPanel(bot: QQBot) {
	await bot.api.post("/v2/panels", {
		scope: "c2c",
		panel: {
			items: mapPanel(COMMANDS.filter((x) => !x.isGroupOnly)),
		},
	});
	await bot.api.post("/v2/panels", {
		scope: "group",
		panel: {
			items: mapPanel(COMMANDS),
		},
	});
}

export function mapPanel(commands: Array<Command>): any {
	return commands.map((x) => ({
		type: "command",
		name: x.name,
		desc: x.description,
		only_admin: x.isAdminOnly,
	}));
}
