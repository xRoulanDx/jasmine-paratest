# Jasmine Paratest

Parameterize your `it` assertions, reduce lines of code and improve readability of your tests with this library.

### Installation

Requires [jasmine](https://www.npmjs.com/package/jasmine) v2+ to run.

```sh
$ npm install -D jasmine-paratest
```

### Usage

Configure cases for single `it` assertion.

```ts
describe('Tests for isEven method', () => {
    Para.case(32)
	.fcase(12) // same as fit
	.xcase(33) // same as xit
	.case(2) // same as it
	.case(64)
	.it('Method should return true for $1', number => {
	    // arrange
	    // Configure mocks and stubs by case's data

	    // act
	    const result = isEven(number);

	    // assert
	    expect(result).toBeTruthy();
	});
});
```

Test run will looks like

```
Tests for isEven method
    Method should return true for 12
    Method should return true for 32
    Method should return true for 34
    Method should return true for 2
    Method should return true for 64
```
