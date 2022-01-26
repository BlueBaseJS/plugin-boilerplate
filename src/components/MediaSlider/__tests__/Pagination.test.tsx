import { BlueBase, BlueBaseApp } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { Pagination } from '../Pagination';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// const Noop = () => {
// 	return;
// };

// const NavigationActions = ({ children }: any) => children({ navigation: Noop });

const BBWrapper = ({ children }: any) => (
	<BlueBaseApp
		{...BootOptions}
		filters={{
			'bluebase.boot.end': async (_b: any, _c: any, BB: BlueBase) => {
				// await BB.Components.register('NavigationActions', NavigationActions);
				await BB.Components.register('Link', ({ children: c }: any) => c);
			},
		}}
	>
		{children}
	</BlueBaseApp>
);

describe('MediaSlider', () => {
	it('should render 4 dots', async () => {
		const wrapper = mount(
			<BBWrapper>
				<Pagination dots={4} index={1} onChangeIndex={jest.fn()} />
			</BBWrapper>
		);

		await waitForElement(wrapper, Pagination);

		expect(wrapper.find(Pagination).find('PaginationDotComponent')).toHaveLength(4);

		wrapper.unmount();
	});
});
