import { BlueBaseApp } from '@bluebase/core';
import { BlueBaseImage } from '@bluebase/components';
import BlueBaseMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { HeaderLogo } from '../HeaderLogo';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn().mockReturnValue(true),
}));

const plugins = [BlueBaseRnPlaceholder, BlueBaseMaterialUI, Plugin];

describe('HeaderLogo', () => {
	it('should render logo image', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderLogo source={{ uri: 'http://abc.com' }} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderLogo);

		expect(wrapper.find(BlueBaseImage).prop('source')).toMatchObject({ uri: 'http://abc.com' });

		wrapper.unmount();
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<HeaderLogo source={{ uri: 'http://abc.com' }} loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, HeaderLogo);

		expect(wrapper.find('Placeholder').length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
