import { BlueBaseApp } from '@bluebase/core';
import { Noop } from '@bluebase/components';
import { ProductInfoLoadingState } from '../LoadingState';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ProductInfoLoadingState', () => {
	it('should render ProductInfoLoadingState', async () => {
		const wrapper = mount(
			<BlueBaseApp components={{ SkeletonListItem: Noop }}>
				<ProductInfoLoadingState />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ProductInfoLoadingState);

		expect(wrapper.find('SkeletonListItem').exists()).toBe(true);
	});
});
