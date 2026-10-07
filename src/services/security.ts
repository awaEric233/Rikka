import type { QQBot } from "@tencent-connect/qqbot-nodejs";
import { isBlockOrItem } from "./network.js";

export async function processVerify(bot: QQBot, data: any): Promise<boolean> {
	let answer = data.verify_info.review_qa_list[0].answer;
	let goid = data.group_openid;
	let moid = data.member_openid;
	let jid = data.join_request_id;
	let result = await isBlockOrItem(answer);
	if (result) {
		bot.api.post(`/v2/groups/${goid}/approval_join_request/${moid}`, {
			op: "approve",
			join_request_id: jid,
		});
		return true;
	} else {
		bot.api.post(`/v2/groups/${goid}/approval_join_request/${moid}`, {
			op: "decline",
			join_request_id: jid,
			reject_reason: "机器人审核，请填 Minecraft 中方块或物品的标准译名！",
		});
		return false;
	}
}
