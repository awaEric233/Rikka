import dotenv from "dotenv";
import { FULL_INTENTS } from "@tencent-connect/qqbot-nodejs/protocol";
import { QQBot } from "@tencent-connect/qqbot-nodejs";
import { registerPanel } from "./commands/index.js";
import { isAttingMe } from "./services/messages.js";
import { matchCommand } from "./services/parser.js";
import { processVerify } from "./services/security.js";

dotenv.config();

const intents =
	process.env.APPROVAL_INTENT === "0" ? FULL_INTENTS : FULL_INTENTS | (1 << 24);

const bot = new QQBot({
	appId: process.env.QQBOT_APP_ID!,
	appSecret: process.env.QQBOT_APP_SECRET!,
	logger: console,
	intents,
});

export let readyTime = 0;

bot.on("ready", async (ctx) => {
	console.log("🥳 Bot ready!");
	if (readyTime === 0) {
		readyTime = new Date().getTime();
	}
	await registerPanel(bot);
});

bot.on("message", async (ctx, msg) => {
	let isAtting = isAttingMe(msg);
	if (isAtting) {
		await matchCommand(msg, bot);
	}
});

bot.on("rawEvent", async (ctx) => {
	switch (ctx.eventType) {
		case "GROUP_JOIN_REQUEST":
			await processVerify(bot, ctx.data);
			break;
	}
});

await bot.start();
