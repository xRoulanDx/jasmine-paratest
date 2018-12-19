import {CaseType} from '../enums/caseType';
import {Case} from '../models/case';
import {JasmineSpec} from './jamsineSpec';
import {NameService} from './nameService';

export class CaseRunner {
	constructor(
		private name: string,
		// tslint:disable-next-line:ban-types
		private test: Function,
		private jasmineSpec = new JasmineSpec(),
		private nameService = new NameService()
	) {}

	public runCases(cases: Case[]) {
		cases.forEach(item => {
			this.runCase(item);
		});
	}

	private runCase(item: Case) {
		const expectation = this.nameService.prepareNameByArgs(this.name, item.data);
		const assertion = this.test.bind(null, ...item.data);

		switch (item.type) {
			case CaseType.Normal:
				this.jasmineSpec.it(expectation, assertion);
				break;
			case CaseType.Focused:
				this.jasmineSpec.fit(expectation, assertion);
				break;
			case CaseType.Excluded:
				this.jasmineSpec.xit(expectation, assertion);
				break;
			default:
				throw new Error('Wrong case type.');
		}
	}
}
