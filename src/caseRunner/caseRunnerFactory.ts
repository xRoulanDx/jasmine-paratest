import {CaseRunner} from './caseRunner';

export class CaseRunnerFactory {
	createCaseRunner(name: string, test: Function): CaseRunner {
		return new CaseRunner(name, test);
	}
}
