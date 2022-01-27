export function getInRangeValue(
	input: string | number | null,
	props: { min?: number; max?: number }
) {
	const { min, max } = props;

	if (input === '' || input === null) {
		return null;
	}

	let update = typeof input === 'number' ? input : parseInt(input, 10);

	if (max !== undefined && update > max) {
		update = max;
	} else if (min !== undefined && update < min) {
		update = min;
	}

	return update;
}
