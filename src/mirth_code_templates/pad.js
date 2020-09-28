/**
 * Add leading zeros to string.
 *
 * @author Dave Reed
 * @param {string} num - String to prepend zeros to.
 * @param {number} size - Wanted size of resulting string, with zero prepended to string.
 * @returns {string} - String with prepended zeros.
 */
function pad(num, size) {
	let s = `${num}`;
	while (s.length < size) {
		s = `0${s}`;
	}
	return s;
}
