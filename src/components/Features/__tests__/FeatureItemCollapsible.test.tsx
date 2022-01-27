import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import BlueEastClientPluginUI from '@blueeast/client-plugin-ui';
import { FeatureItemCollapsible } from '../FeatureItemCollapsible';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [BlueBaseRnPlaceholder, BlueEastClientPluginUI, BlueBasePluginMaterialUI, Plugin];

describe('FeatureItemCollapsible', () => {
	it('should render content on mobile', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<FeatureItemCollapsible
					title="AI Dual Camera"
					description="The Redmi 8 comes with a 12 MP AI Dual Camera that features a 2 MP Depth Sensor."
					media={{
						thumbnail: 'https://placeimg.com/5/5/tech',
						uri: 'https://placeimg.com/400/400/tech',
					}}
				/>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'FeatureItemCollapsible');

		expect(
			wrapper
				.find('Collapsible')
				.first()
				.prop('title')
		).toBe('AI Dual Camera');

		expect(
			wrapper
				.find('FeatureItem')
				.first()
				.prop('title')
		).toBeUndefined();

		wrapper.unmount();
	});
});
