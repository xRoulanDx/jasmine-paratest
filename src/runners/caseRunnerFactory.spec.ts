import {CaseRunner} from './caseRunner';
import {CaseRunnerFactory} from './caseRunnerFactory';

describe('CaseRunnerFactory', () => {
	describe('Methods', () => {
		describe('createRunner', () => {
			it('Should create new case runner', () => {
				// arrange
				const testedClass = new CaseRunnerFactory();

				// act
				const result = testedClass.createRunner('', () => null);

				// assert
				expect(result instanceof CaseRunner).toBeTruthy();
			});
		});
	});
});
