import React from 'react';
import { View } from 'react-native';
import { mount } from 'enzyme';
import { renderElement } from '../renderElement';

describe('renderElement', () => {
	it('should render an element', async () => {
		const wrapper = mount(renderElement(<View testID="tester" />, {}));
		expect(wrapper.find('[testID="tester"]').exists()).toBe(true);
	});

	it('should render a Component', async () => {
		const Component = () => <View testID="tester" />;
		const wrapper = mount(renderElement(Component, {}));
		expect(wrapper.find('[testID="tester"]').exists()).toBe(true);
	});
});
