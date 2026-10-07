import axios from "axios";

export const MCWIKI_API: string = "https://mcwiki.rice-awa.top/api";

export async function isBlockOrItem(name: string): Promise<boolean> {
	let safeName = encodeURIComponent(name);
	try {
		let response = await axios.get(`${MCWIKI_API}/page/${safeName}`);
		let data = response.data;
		let cate = data.data.page.categories;
		if (cate === undefined) {
			return false;
		}
		let arr: Array<any> = cate;
		return arr.findIndex((x) => x.name === "方块" || x.name === "物品") != -1;
	} catch {
		return false;
	}
}
