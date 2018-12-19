import {expect} from 'chai';
import {anything, deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {CaseType} from './enums/caseType';
import {Case} from './models/case';
import {Paratest} from './paratest';
import {CaseRunner} from './runners/caseRunner';
import {CaseRunnerFactory} from './runners/caseRunnerFactory';

describe('Paratest', () => {
	// mocks
	let runnerMock: CaseRunner;
	let runnerFactoryMock: CaseRunnerFactory;

	function setRunnerFactoryMock(testedClass: Paratest) {
		(testedClass as any).runnerFactory = instance(runnerFactoryMock);
	}

	beforeEach(() => {
		runnerMock = mock(CaseRunner);
		runnerFactoryMock = mock(CaseRunnerFactory);
	});

	describe('Methods', () => {
		describe('case', () => {
			it('Should add normal case', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.case(123).it('', () => null);

				// assert
				verify(
					runnerMock.runCases(deepEqual([new Case(CaseType.Normal, [123])]))
				).once();
			});

			it('Should add case with multiple args', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.case(123, 456).it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([new Case(CaseType.Normal, [123, 456])])
					)
				).once();
			});

			it('Should return chainable result', () => {
				// arrange
				const testedClass = new Paratest();

				// act
				const result = testedClass.case(123, 456);

				// assert
				expect(result).to.eq(testedClass);
			});
		});

		describe('case static', () => {
			it('Should add normal case', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.case(123);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(deepEqual([new Case(CaseType.Normal, [123])]))
				).once();
			});

			it('Should add case with multiple args', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.case(123, 456);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([new Case(CaseType.Normal, [123, 456])])
					)
				).once();
			});

			it('Should return chainable result', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.case(12, 34).case(56, 78);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([
							new Case(CaseType.Normal, [12, 34]),
							new Case(CaseType.Normal, [56, 78])
						])
					)
				).once();
			});
		});

		describe('fcase', () => {
			it('Should add focused case', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.fcase(123).it('', () => null);

				// assert
				verify(
					runnerMock.runCases(deepEqual([new Case(CaseType.Focused, [123])]))
				).once();
			});

			it('Should add case with multiple args', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.fcase(123, 456).it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([new Case(CaseType.Focused, [123, 456])])
					)
				).once();
			});

			it('Should return chainable result', () => {
				// arrange
				const testedClass = new Paratest();

				// act
				const result = testedClass.fcase(123, 456);

				// assert
				expect(result).to.eq(testedClass);
			});
		});

		describe('fcase static', () => {
			it('Should add normal case', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.fcase(123);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(deepEqual([new Case(CaseType.Focused, [123])]))
				).once();
			});

			it('Should add case with multiple args', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.fcase(123, 456);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([new Case(CaseType.Focused, [123, 456])])
					)
				).once();
			});

			it('Should return chainable result', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.fcase(12, 34).fcase(56, 78);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([
							new Case(CaseType.Focused, [12, 34]),
							new Case(CaseType.Focused, [56, 78])
						])
					)
				).once();
			});
		});

		describe('xcase', () => {
			it('Should add excluded case', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.xcase(123).it('', () => null);

				// assert
				verify(
					runnerMock.runCases(deepEqual([new Case(CaseType.Excluded, [123])]))
				).once();
			});

			it('Should add case with multiple args', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.xcase(123, 456).it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([new Case(CaseType.Excluded, [123, 456])])
					)
				).once();
			});

			it('Should return chainable result', () => {
				// arrange
				const testedClass = new Paratest();

				// act
				const result = testedClass.xcase(123, 456);

				// assert
				expect(result).to.eq(testedClass);
			});
		});

		describe('xcase static', () => {
			it('Should add normal case', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.xcase(123);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(deepEqual([new Case(CaseType.Excluded, [123])]))
				).once();
			});

			it('Should add case with multiple args', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.xcase(123, 456);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([new Case(CaseType.Excluded, [123, 456])])
					)
				).once();
			});

			it('Should return chainable result', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);

				// act
				const testedClass = Paratest.xcase(12, 34).xcase(56, 78);
				setRunnerFactoryMock(testedClass);
				testedClass.it('', () => null);

				// assert
				verify(
					runnerMock.runCases(
						deepEqual([
							new Case(CaseType.Excluded, [12, 34]),
							new Case(CaseType.Excluded, [56, 78])
						])
					)
				).once();
			});
		});

		describe('it', () => {
			it('Should create runner with runner factory', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testName = 'name';
				const testFunction = () => null;
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.it(testName, testFunction);

				// assert
				verify(runnerFactoryMock.createRunner(testName, testFunction)).once();
			});

			it('Should run created runner with cases', () => {
				// arrange
				when(runnerFactoryMock.createRunner(anything(), anything())).thenReturn(
					instance(runnerMock)
				);
				const testedClass = new Paratest();
				setRunnerFactoryMock(testedClass);

				// act
				testedClass.case(123).it('', () => null);

				// assert
				verify(
					runnerMock.runCases(deepEqual([new Case(CaseType.Normal, [123])]))
				).once();
			});
		});
	});
});
