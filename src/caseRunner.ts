import {Case} from './models/case';
import {CaseType} from './enums/caseType';

export class CaseRunner {
	constructor(private name: string, private test: Function) {}

	runCases(cases: Case[]) {
		cases.forEach(item => {
			this.runCase(item);
		});
	}

	private runCase(item: Case) {
		const expectation = this.prepareNameByArgs(this.name, item.data);
		const assertion = () => {
			this.test.call(null, item);
		};

		switch (item.type) {
			case CaseType.Normal:
				it(expectation, assertion);
				break;
			case CaseType.Focused:
				fit(expectation, assertion);
				break;
			case CaseType.Excluded:
				xit(expectation, assertion);
				break;
			default:
				throw new Error('Wrong case type.');
		}
	}

	private prepareNameByArgs(name: string, args: any[]): string {
		return name.replace(/(\$\d+)/g, match => {
			const index = parseFloat(match.substr(1)) - 1;

			return args[index].toString();
		});
	}
}
