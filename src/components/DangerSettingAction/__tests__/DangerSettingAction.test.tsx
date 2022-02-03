import 'cross-fetch/polyfill';

import { BlueBaseApp, getComponent } from '@bluebase/core';
import { DeletePlaceMutation, success } from '../__stories__/mocks';
import { Dialog, List } from '@bluebase/components';

import { FormikContextType } from 'formik';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import React from 'react';
import { mount } from 'enzyme';
// import wait from 'waait';
import { waitForElement } from 'enzyme-async-helpers';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

const DangerSettingAction = getComponent('DangerSettingAction');

describe('DangerSettingActions', () => {
	it('should render component correctly', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-material-ui'),
					require('@bluebase/plugin-json-schema-components'),
				]}
			>
				<DangerSettingAction
					mutation={{ mutation: DeletePlaceMutation }}
					schema={{ initialValues: { id: '123' } }}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, DangerSettingAction);

		expect(wrapper.find('ListItem').exists()).toBe(true);
		expect(wrapper.find('Dialog').exists()).toBe(true);
		// expect(wrapper.find('JsonForm').exists()).toBe(true);

		wrapper.unmount();
	});

	it('should render loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-material-ui'),
					require('@bluebase/plugin-json-schema-components'),
				]}
			>
				<DangerSettingAction loading />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, DangerSettingAction);

		expect(wrapper.find('DangerSettingAction SkeletonListItem').exists()).toBe(true);

		wrapper.unmount();
	});

	it('should render component correctly', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-material-ui'),
					require('@bluebase/plugin-json-schema-components'),
				]}
			>
				<DangerSettingAction
					mutation={{ mutation: DeletePlaceMutation }}
					schema={{ initialValues: { id: '123' } }}
					onSuccess={jest.fn()}
				/>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, DangerSettingAction);
		const node = wrapper
			.find('DangerSettingAction')
			.last()
			.instance() as any;
		node.onSuccess();

		expect(wrapper.find('ListItem').exists()).toBe(true);
		expect(wrapper.find('Dialog').exists()).toBe(true);
		// expect(wrapper.find('JsonForm').exists()).toBe(true);

		wrapper.unmount();
	});

	it('should check event handlers to be called', async () => {
		const wrapper: any = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-apollo'),
					require('@bluebase/plugin-material-ui'),
					require('@bluebase/plugin-json-schema-components'),
				]}
			>
				<MockedProvider mocks={success} addTypename={false}>
					<DangerSettingAction
						code="123"
						mutation={{ mutation: DeletePlaceMutation }}
						schema={{ initialValues: { id: '123' } }}
					/>
				</MockedProvider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, DangerSettingAction);
		wrapper
			.find('DangerSettingAction')
			.find(List.Item)
			.first()
			.props()
			.onPress();

		expect(
			wrapper
				.find('DangerSettingAction')
				.last()
				.state(['dialogVisible'])
		).toBe(true);

		wrapper
			.find('DangerSettingAction')
			.find(Dialog)
			.first()
			.props()
			.onDismiss();

		expect(
			wrapper
				.find('DangerSettingAction')
				.last()
				.state(['dialogVisible'])
		).toBe(false);

		wrapper.unmount();
	});

	it('should enable or disable button based on code', async () => {
		const onChange = jest.fn();
		const onSuccess = jest.fn();
		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-apollo'),
					require('@bluebase/plugin-material-ui'),
					require('@bluebase/plugin-json-schema-components'),
				]}
			>
				<MockedProvider mocks={success} addTypename={false}>
					<DangerSettingAction
						code="123"
						onSuccess={onSuccess}
						mutation={{ mutation: DeletePlaceMutation }}
						schema={{ initialValues: { id: '123' }, onChange }}
					/>
				</MockedProvider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, DangerSettingAction);

		// Find component instance
		const instance: any = wrapper
			.find('DangerSettingAction')
			.last()
			.instance();

		// Open dialog
		instance.openDialog();

		wrapper.update();

		// Find dialog for submit button
		const formik: FormikContextType<{ code: string }> = wrapper
			.find('FormikEffect')
			.first()
			.prop('formik');

		// Input wrong code to see if the button is still disabled
		formik.setFieldValue('code', '12');
		wrapper.update();

		expect(
			wrapper
				.find('Button[name="submit"]')
				.last()
				.prop('disabled')
		).toBe(true);

		// Input correct code to see if the button is NOT disabled
		formik.setFieldValue('code', '123');
		wrapper.update();

		expect(
			wrapper
				.find('Button[name="submit"]')
				.last()
				.prop('disabled')
		).toBe(true);

		// Submit form to see if the button is disabled again
		formik.handleSubmit();
		wrapper.update();

		expect(
			wrapper
				.find('Button[name="submit"]')
				.last()
				.prop('disabled')
		).toBe(true);

		wrapper.unmount();
	});

	it('mapFormValuesToMutationVariables should return input object without code prop', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[
					Plugin,
					require('@bluebase/plugin-apollo'),
					require('@bluebase/plugin-material-ui'),
					require('@bluebase/plugin-json-schema-components'),
				]}
			>
				<DangerSettingAction code="123" />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, DangerSettingAction);

		// Find component instance
		const instance: any = wrapper
			.find('DangerSettingAction')
			.last()
			.instance();

		// Open dialog
		const result = instance.mapFormValuesToMutationVariables({
			bar: false,
			code: '123',
			foo: 'bar',
		});

		expect(result).toMatchObject({
			bar: false,
			foo: 'bar',
		});

		wrapper.unmount();
	});
});
