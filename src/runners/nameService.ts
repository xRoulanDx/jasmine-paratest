export class NameService {
	public prepareNameByArgs(name: string, args: any[]): string {
		return name.replace(/(\$\d+)/g, match => {
			const index = parseFloat(match.substr(1)) - 1;

			if (args.length <= index) {
				return match;
			}

			return '' + args[index];
		});
	}
}
