import {CaseType} from './enums/caseType';
import {Case} from './models/case';
import {CaseData} from './models/caseData';
import {CaseRunner} from './caseRunner';

export class Fixture {
	private cases: Case[] = [];

	constructor() {}

	static xcase(...data: CaseData): Fixture {
		return new Fixture().xcase(...data);
	}

	static fcase(...data: CaseData): Fixture {
		return new Fixture().fcase(...data);
	}

	static case(...data: CaseData): Fixture {
		return new Fixture().case(...data);
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
		new CaseRunner(name, test).runCases(this.cases);
	}

	private addCase(type: CaseType, data: CaseData) {
		this.cases.push(new Case(type, data));
	}
}
