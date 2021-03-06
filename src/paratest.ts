import {CaseType} from './enums/caseType';
import {Case} from './models/case';
import {CaseData} from './models/caseData';
import {CaseRunnerFactory} from './runners/caseRunnerFactory';

export class Paratest {
	public static xcase(...data: CaseData): Paratest {
		return new Paratest().xcase(...data);
	}

	public static fcase(...data: CaseData): Paratest {
		return new Paratest().fcase(...data);
	}

	public static case(...data: CaseData): Paratest {
		return new Paratest().case(...data);
	}

	private cases: Case[] = [];
	private runnerFactory = new CaseRunnerFactory();

	public xcase(...data: CaseData) {
		this.addCase(CaseType.Excluded, data);
		return this;
	}

	public fcase(...data: CaseData) {
		this.addCase(CaseType.Focused, data);
		return this;
	}

	public case(...data: CaseData) {
		this.addCase(CaseType.Normal, data);
		return this;
	}

	// tslint:disable-next-line:ban-types
	public it(name: string, test: Function) {
		this.runnerFactory.createRunner(name, test).runCases(this.cases);
	}

	private addCase(type: CaseType, data: CaseData) {
		this.cases.push(new Case(type, data));
	}
}
