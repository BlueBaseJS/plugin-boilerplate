export const noop = () => null;

export const or = (condition: boolean, _if: any, _else?: any) => (condition ? _if : _else);

export function renderIfNotNil(condition: any, node?: React.ReactNode) {
	return condition ? node : null;
}
