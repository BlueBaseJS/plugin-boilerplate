/* eslint-disable max-len */
import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { Divider } from '@bluebase/components';
import Plugin from '../../..';
import React from 'react';
import { SpecificationGroup } from '../SpecificationGroup';
import { Specifications } from '../Specifications';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [BlueBasePluginMaterialUI, BlueBaseRnPlaceholder, Plugin];

const specs = [
	{
		title: 'Other Details',

		items: [
			{
				label: 'SIM Size',
				value: 'Nano SIM',
			},
			{
				label: 'Removable Battery',
				value: 'No',
			},
			{
				label: 'Other Features',
				value:
					'Face Unlock, Dual App Support, USB Type C, Kryo 4 Architecture, Fingerprint Scanner Position: Side, Quick Charging Version: Supports Upto 27W',
			},
		],
	},

	{
		title: 'Other Details',

		items: [
			{
				label: 'SIM Size',
				value: 'Nano SIM',
			},
			{
				label: 'Removable Battery',
				value: 'No',
			},
			{
				label: 'Other Features',
				value:
					'Face Unlock, Dual App Support, USB Type C, Kryo 4 Architecture, Fingerprint Scanner Position: Side, Quick Charging Version: Supports Upto 27W',
			},
		],
	},
];

describe('Specifications', () => {
	it('should render content', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Specifications items={specs} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Specifications');

		expect(wrapper.find(SpecificationGroup).length).toBe(2);
		expect(wrapper.find(Divider).length).toBe(1);
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<Specifications loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'Specifications');

		expect(
			wrapper
				.find(SpecificationGroup)
				.first()
				.prop('loading')
		).toBe(true);

		wrapper.unmount();
	});
});
