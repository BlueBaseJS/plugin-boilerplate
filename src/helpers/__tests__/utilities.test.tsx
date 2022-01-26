import { Text, View } from 'react-native';
import { noop, or, renderIfNotNil } from '../utilities';

import React from 'react';
import { mount } from 'enzyme';

describe('helpers', () => {
	test('noop', async () => {
		expect(noop()).toBe(null);
	});

	test('or', async () => {
		expect(or(true, 1, 2)).toBe(1);
		expect(or(false, 1, 2)).toBe(2);
	});

	describe('renderIfNotNil', () => {
		it('should not render item', async () => {
			const wrapper = mount(
				<View testID="root">{renderIfNotNil(null, <Text testID="item">Hello</Text>)}</View>
			);

			expect(wrapper.find('Text[testID="item"]')).toHaveLength(0);
		});

		it('should render item', async () => {
			const wrapper = mount(
				<View testID="root">{renderIfNotNil(true, <Text testID="item">Hello</Text>)}</View>
			);

			expect(wrapper.find('Text[testID="item"]').length).toBeGreaterThan(0);
		});
	});

});
