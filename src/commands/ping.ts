import type { Command } from "../types/command.js";
import { readyTime } from "../index.js";

export const ping: Command = {
	name: "ping",
	description: "获取机器人状态",
	isAdminOnly: false,
	isGroupOnly: false,
	async execute(bot, target, args) {
		let uptime = (new Date().getTime() - readyTime) / 1000;
		const reply = `**🚧 状态 Ping**\n**ID：**${bot.accountId}\n**运行时间：**${uptime} 秒`;
		await bot.sendMarkdown(target, reply);
	},
};
