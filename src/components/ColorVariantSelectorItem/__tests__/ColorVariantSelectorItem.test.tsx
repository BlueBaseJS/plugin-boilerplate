import { BlueBaseApp, getComponent, isMobile } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { ColorVariantSelectorItemProps } from '../ColorVariantSelectorItem';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

const ColorVariantSelectorItem = getComponent<ColorVariantSelectorItemProps>(
	'ColorVariantSelectorItem'
);

describe('ColorVariantSelectorItem', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should execute onPress prop fn when TouchableItem is pressed', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BlueBaseApp {...BootOptions}>
				<ColorVariantSelectorItem color="red" index={3} onPress={onPress} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ColorVariantSelectorItem);

		const node = wrapper.find('ColorVariantSelectorItem Avatar').first();
		expect(node.prop('style')!.backgroundColor).toBe('red');

		wrapper.unmount();
	});
});
