import {CaseRunner} from './caseRunner';

export class CaseRunnerFactory {
	// tslint:disable-next-line:ban-types
	public createCaseRunner(name: string, test: Function): CaseRunner {
		return new CaseRunner(name, test);
	}
}
