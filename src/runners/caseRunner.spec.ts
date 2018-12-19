import {anything, capture, deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {CaseType} from '../enums/caseType';
import {Case} from '../models/case';
import {CaseRunner} from './caseRunner';
import {JasmineSpec} from './jamsineSpec';
import {NameService} from './nameService';

describe('CaseRunner', () => {
	let jasmineSpecMock: JasmineSpec;
	let nameServiceMock: NameService;

	beforeEach(() => {
		jasmineSpecMock = mock(JasmineSpec);
		nameServiceMock = mock(NameService);
	});

	describe('Methods', () => {
		describe('runCases', () => {
			function testForCaseType(
				caseName: string,
				caseType: CaseType,
				jasmineSpecFunction: () => any
			) {
				describe(caseName + ' case', () => {
					it('Should prepare name', () => {
						// arrange
						const testName = 'test name';
						const testFunction = () => null;
						const testedClass = new CaseRunner(
							testName,
							testFunction,
							instance(jasmineSpecMock),
							instance(nameServiceMock)
						);

						const testCaseData = [123];
						const testCases = [new Case(caseType, testCaseData)];

						// act
						testedClass.runCases(testCases);

						// assert
						verify(
							nameServiceMock.prepareNameByArgs(
								testName,
								deepEqual(testCaseData)
							)
						).once();
					});

					it('Should call ' + caseName + ' it', () => {
						// arrange
						const testName = 'test name';
						const testFunction = () => null;
						const testedClass = new CaseRunner(
							testName,
							testFunction,
							instance(jasmineSpecMock),
							instance(nameServiceMock)
						);

						const preparedName = 'prepared test name';
						when(
							nameServiceMock.prepareNameByArgs(anything(), anything())
						).thenReturn(preparedName);

						const testCaseData = [123];
						const testCases = [new Case(caseType, testCaseData)];

						// act
						testedClass.runCases(testCases);

						// assert
						verify(jasmineSpecFunction()(preparedName, anything())).once();
					});

					it('Should bind all case data to test function', () => {
						// arrange
						let testFunctionArgs: any[] = [];

						const testName = 'test name';
						const testFunction = (...args: any[]) =>
							(testFunctionArgs = args);
						const testedClass = new CaseRunner(
							testName,
							testFunction,
							instance(jasmineSpecMock),
							instance(nameServiceMock)
						);

						const testCaseData = [12, '34', false];
						const testCases = [new Case(caseType, testCaseData)];

						// act
						testedClass.runCases(testCases);

						// assert
						const assertionFunction: any = capture(
							jasmineSpecFunction()
						).last()[1];
						assertionFunction();
						expect(testFunctionArgs).toEqual(testCaseData);
					});
				});
			}

			testForCaseType('Normal', CaseType.Normal, () => jasmineSpecMock.it);
			testForCaseType('Focused', CaseType.Focused, () => jasmineSpecMock.fit);
			testForCaseType('Excluded', CaseType.Excluded, () => jasmineSpecMock.xit);

			it('Should throw an exception if case with wrong type', () => {
				// arrange
				const testedClass = new CaseRunner('', () => null);

				const testCases = [new Case(-1 as any, [])];

				let throwedError;

				// act
				try {
					testedClass.runCases(testCases);
				} catch (error) {
					throwedError = error;
				}

				// arrange
				expect(throwedError).toBeDefined();
				expect(throwedError.message).toBe('Wrong case type.');
			});
		});
	});
});
