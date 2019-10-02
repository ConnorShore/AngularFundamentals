import { FormControl } from '@angular/forms';

// Validator: Return type is just saying its an object of any shape
export function restrictedWords(words) {
	return (control: FormControl): {[key: string]: any} => {
		if (!words) return null;

		const invalidWords = words.map(w => control.value.includes(w) ? w : null).filter(w => w != null);

		// Return 'error' of invalid words if control contains restricted words, and returns null otherwise
		return invalidWords && invalidWords.length > 0 ? {restrictedWords: invalidWords.join(', ')} : null;
	};
}
