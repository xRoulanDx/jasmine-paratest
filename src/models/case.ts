import {CaseType} from '../enums/caseType';
import {CaseData} from './caseData';

export class Case {
	constructor(public type: CaseType, public data: CaseData) {}
}
