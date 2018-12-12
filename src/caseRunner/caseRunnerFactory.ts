import {CaseRunner} from './caseRunner';

export class CaseRunnerFactory {
	public createCaseRunner(name: string, test: () => void): CaseRunner {
		return new CaseRunner(name, test);
	}
}
