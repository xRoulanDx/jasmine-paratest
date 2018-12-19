export class JasmineSpec {
	public it(name: string, assertion: () => void) {
		it(name, assertion);
	}

	public fit(name: string, assertion: () => void) {
		fit(name, assertion);
	}

	public xit(name: string, assertion: () => void) {
		xit(name, assertion);
	}
}
