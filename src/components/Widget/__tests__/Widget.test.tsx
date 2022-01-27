import 'cross-fetch/polyfill';

import { BlueBaseApp, getComponent, isMobile } from '@bluebase/core';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { Text } from '@bluebase/components';
import { WidgetProps } from '../Widget';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const Widget = getComponent<WidgetProps>('Widget');
const Content = () => <Text>Content</Text>;
const Childern = () => <Text>Childern</Text>;

// jest.mock('expo', () => {});

jest.mock('@blueeast/client-plugin-ui/dist/components/Alert/useAlert', () => ({
	useAlert: () => ({ alert: jest.fn() }),
}));
jest.mock('@bluebase/core/dist/utils/Screen', () => ({
	isMobile: jest.fn(),
}));

describe('Widget', () => {
	it('should render childern successfully', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<Widget title="Widget">
					<Childern />
				</Widget>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Widget);

		expect(
			wrapper
				.find('Overline Text')
				.last()
				.text()
		).toBe('Widget');
		expect(
			wrapper
				.find('Childern Text')
				.last()
				.text()
		).toBe('Childern');
	});

	it('should not render left and right borders on mobile', async () => {
		(isMobile as jest.Mock).mockReturnValue(true);

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<Widget content={Content} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Widget);

		expect(isMobile()).toBe(true);

		expect(
			wrapper
				.find('[testID="widget-content"]')
				.last()
				.prop('style')!.borderLeftWidth
		).toBe(0);

		expect(
			wrapper
				.find('[testID="widget-content"]')
				.last()
				.prop('style')!.borderRightWidth
		).toBe(0);

		wrapper.unmount();
	});

	it('should render left and right borders on desktop', async () => {
		(isMobile as jest.Mock).mockReturnValue(false);

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
				<Widget content={Content} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Widget);

		expect(isMobile()).toBe(false);

		expect(
			wrapper
				.find('[testID="widget-content"]')
				.last()
				.prop('style')!.borderLeftWidth
		).toBe(1);

		expect(
			wrapper
				.find('[testID="widget-content"]')
				.last()
				.prop('style')!.borderRightWidth
		).toBe(1);

		wrapper.unmount();
	});
});
