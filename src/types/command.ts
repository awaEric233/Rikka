export interface Command {
	name: string;
	description: string;
	execute: (args: Array<string>) => {};
}
