import { browser } from '$app/environment';

class Counter {
	count = $state(0);

	constructor() {
		if (browser) {
			const storedCount = localStorage.getItem('counter');
			this.count = storedCount ? parseInt(storedCount) : 0;
		}
	}

	increment() {
		this.count += 1;
		if (browser) {
			localStorage.setItem('counter', this.count.toString());
		}
	}

	decrement() {
		this.count -= 1;
		if (browser) {
			localStorage.setItem('counter', this.count.toString());
		}
	}	
}

export const globalCounter = new Counter();
