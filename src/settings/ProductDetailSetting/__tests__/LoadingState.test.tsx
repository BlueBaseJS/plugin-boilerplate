import { BlueBaseApp } from '@bluebase/core';
import { Noop } from '@bluebase/components';
import { ProductDetailSettingLoadingState } from '../LoadingState';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ProductDetailSettingLoadingState', () => {
	it('should render ProductDetailSettingLoadingState', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ SkeletonListItem: Noop }}>
				<ProductDetailSettingLoadingState />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ProductDetailSettingLoadingState);

		expect(wrapper.find('SkeletonListItem').exists()).toBe(true);
	});
});
