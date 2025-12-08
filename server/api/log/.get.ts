import fs from "fs";
import path from "path";
const isTest = process.env.APP_ENV == "test";

type LogReadingItem = {
	date: string;
	level: string;
	source: string;
	block: string[];
};
export type LogItem = {
	metaData: { date: string; level: string; source: string };
	content: string;
};

export default defineEventHandler(() => {
	const logPath = path.resolve(isTest ? "logs/app.test.log" : "logs/app.log");
	try {
		const data = fs.readFileSync(logPath, "utf8");
		const lines = data.split("\n").filter(Boolean).slice(-100); // last 100 lines
		const items: LogItem[] = [];
		let item: LogReadingItem | undefined;
		lines.forEach((line) => {
			let m: any = null;
			if (
				(m =
					/(?<date>\[[\d+-T:\.]+\]) (?<level>\[\w+\]) (?<source>\w+) - (?<rest>.+)/.exec(
						line
					))
			) {
				if (item) pushToItems(items, item);
				const { date, level, source, rest } = m.groups;
				item = { date, level, source, block: [rest] };
			} else if (item) {
				item.block.push(line);
			}
		});
		if (item) {
			pushToItems(items, item);
		}

		return { logs: items.reverse() };
	} catch (e: any) {
		return { logs: [], error: e.message };
	}
});
function pushToItems(items: LogItem[], item: LogReadingItem | undefined) {
	if (item) {
		const { date, level, source, block } = item;
		items.push({
			metaData: { date, level, source },
			content: block.join("\n"),
		});
	}
}
