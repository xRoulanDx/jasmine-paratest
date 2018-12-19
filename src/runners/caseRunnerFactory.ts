import {CaseRunner} from './caseRunner';

export class CaseRunnerFactory {
	// tslint:disable-next-line:ban-types
	public createRunner(name: string, test: Function): CaseRunner {
		return new CaseRunner(name, test);
	}
}
