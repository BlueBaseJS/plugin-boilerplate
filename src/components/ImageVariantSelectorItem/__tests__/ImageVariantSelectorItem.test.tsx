import { BlueBaseApp, getComponent, isMobile } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { ImageVariantSelectorItemProps } from '../ImageVariantSelectorItem';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

const ImageVariantSelectorItem = getComponent<ImageVariantSelectorItemProps>(
	'ImageVariantSelectorItem'
);

describe('ImageVariantSelectorItem', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should execute onPress prop fn when TouchableItem is pressed', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const onPress = jest.fn();

		const wrapper = mount(
			<BlueBaseApp {...BootOptions}>
				<ImageVariantSelectorItem
					image={{ uri: 'https://placeimg.com/50/50/animals' }}
					index={3}
					onPress={onPress}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ImageVariantSelectorItem);

		const node = wrapper.find('ImageVariantSelectorItem Avatar').first();
		expect(node.prop('image')).toMatchObject({ uri: 'https://placeimg.com/50/50/animals' });

		wrapper.unmount();
	});
});
