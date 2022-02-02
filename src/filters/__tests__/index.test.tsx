import { filters } from '../index';

test('Plugin should be correctly registered', async () => {
	const navigate = jest.fn();
	const data = filters['mevris.plugin.taskbar.list.first'];
	const result: any = data({ children: [] }, { navigation: { navigate } });
	result.children[0].props.onPress();

	expect(navigate).toHaveBeenCalledTimes(1);
	expect(navigate).toHaveBeenCalledWith('ThingsApp');
});
