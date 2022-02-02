import 'cross-fetch/polyfill';

import { BlueBase, BlueBaseApp } from '@bluebase/core';
import { ThingNodeQueryMocks, ThingRenameMutationMocks } from '../../../mocks';

import Apollo from '@bluebase/plugin-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider as MockedProviderDefault } from '@apollo/client/testing';
import Plugin from '../../../index';
import React from 'react';
import { ThingNameForm } from '../ThingNameForm';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const HappyFragmentMatcher = { match: () => true };

const MockedProvider = (props: any) => (
	<MockedProviderDefault
		addTypename={false}
		cache={
			new InMemoryCache({
				addTypename: false,
				fragmentMatcher: HappyFragmentMatcher,
			})
		}
		{...props}
	/>
);

describe('ThingNameForm', () => {
	it('should show ThingNameForm', async () => {
		// mount component
		function success() {
			return {};
		}
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, Apollo, JsonForm]}>
				<MockedProvider mocks={[ThingNodeQueryMocks.success, ThingRenameMutationMocks.success]}>
					<ThingNameForm id="123" onSuccess={success} />
				</MockedProvider>
			</BlueBaseApp>
		);

		// await
		await waitForElement(wrapper, ThingNameForm);
		const com: any = wrapper.find('JsonGraphqlForm').first();
		const MapQuery = com.props().mapQueryDataToInitialValues('test');
		expect(MapQuery.name).toBe(undefined);
	});

	it('should mutate ThingNameForm', async () => {
		// mount component
		function success() {
			return 'success';
		}
		// mount component
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, Apollo, JsonForm]}>
				<MockedProvider mocks={[ThingNodeQueryMocks.success, ThingRenameMutationMocks.success]}>
					<ThingNameForm id="test" onSuccess={success} />
				</MockedProvider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ThingNameForm);

		const com: any = wrapper.find('JsonGraphqlForm').first();

		const Mutationfunc = com.props().mapFormValuesToMutationVariables({ name: 'test' });
		expect(Mutationfunc.data.name).toBe('test');
		expect(com.props().onSuccess()).toBe('success');
	});

	it('should log error through BlueBase Logger if exception occurs during store update', async () => {
		const BB = new BlueBase();
		BB.Logger.error = jest.fn();

		// mount component
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, MUIplugin, Apollo, JsonForm]} BB={BB}>
				<MockedProvider mocks={[ThingNodeQueryMocks.success, ThingRenameMutationMocks.success]}>
					<ThingNameForm id="123" onSuccess={() => 'success'} />
				</MockedProvider>
			</BlueBaseApp>
		);
		await waitForElement(wrapper, ThingNameForm);

		const updateFn = (wrapper.find('JsonGraphqlForm').first().prop('mutation') as any).update;
		updateFn({}, { data: {} });

		expect(BB.Logger.error).toHaveBeenCalledTimes(1);
	});
});
