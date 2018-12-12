import {CaseType} from './enums/caseType';
import {Case} from './models/case';
import {CaseData} from './models/caseData';
import {CaseRunnerFactory} from './caseRunner/caseRunnerFactory';

export class Paratest {
	private cases: Case[] = [];
	private caseRunnerFactorty = new CaseRunnerFactory();

	static xcase(...data: CaseData): Paratest {
		return new Paratest().xcase(...data);
	}

	static fcase(...data: CaseData): Paratest {
		return new Paratest().fcase(...data);
	}

	static case(...data: CaseData): Paratest {
		return new Paratest().case(...data);
	}

	xcase(...data: CaseData) {
		this.addCase(CaseType.Excluded, data);
		return this;
	}

	fcase(...data: CaseData) {
		this.addCase(CaseType.Focused, data);
		return this;
	}

	case(...data: CaseData) {
		this.addCase(CaseType.Normal, data);
		return this;
	}

	it(name: string, test: Function) {
		this.caseRunnerFactorty.createCaseRunner(name, test).runCases(this.cases);
	}

	private addCase(type: CaseType, data: CaseData) {
		this.cases.push(new Case(type, data));
	}
}
