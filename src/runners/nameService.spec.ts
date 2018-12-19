import {expect} from 'chai';
import {Para} from '..';
import {NameService} from './nameService';

const testStringData = 'test';

class ObjectWithToString {
	public toString(): string {
		return testStringData;
	}
}

describe('NameService', () => {
	let testedClass: NameService;

	beforeEach(() => {
		testedClass = new NameService();
	});

	describe('prepareNameByArgs', () => {
		// TODO: Add cases with function and symbol
		Para.case(123, '123', 'number')
			.case('my string', 'my string', 'string')
			.case(true, 'true', 'boolean')
			.case([123, 123], '123,123', 'array')
			.case(new ObjectWithToString(), testStringData, 'object with toString')
			.case({}, '[object Object]', 'object with default toString')
			.case(null, 'null', 'null')
			.case(undefined, 'undefined', 'undefined')
			.it('Should correctly paste $3', (value: any, expectedResult: string) => {
				// arrange
				const testMessage = 'test $1 test';
				const testData = [value];

				// act
				const result = testedClass.prepareNameByArgs(testMessage, testData);

				// assert
				expect(result).to.eq(`test ${expectedResult} test`);
			});

		it('Should correctly paste several arguments', () => {
			// arrange
			const testMessage = 'test $1 test $2 test $3 test';
			const testData = [12, 34, 56];

			// act
			const result = testedClass.prepareNameByArgs(testMessage, testData);

			// assert
			expect(result).to.eq('test 12 test 34 test 56 test');
		});

		it('Should not paste data if it not exist', () => {
			// act
			const result = testedClass.prepareNameByArgs('test $10 test', [123]);

			// assert
			expect(result).to.eq('test $10 test');
		});
	});
});
