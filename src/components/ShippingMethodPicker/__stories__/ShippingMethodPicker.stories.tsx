import React, { useState } from 'react';

import { MockedProvider } from '@apollo/react-testing';
import { ShippingMethodListQueryMocks } from '../../../graphql/mocks';
import { ShippingMethodPicker } from '../ShippingMethodPicker';
import faker from 'faker';
import storiesOf from '@bluebase/storybook-addon';

const stories = storiesOf('ShippingMethodPicker', module);
stories
	.add('should show ShippingMethodPicker with mocked data', () => {
		const Component = () => {
			const [shippingmethod, setShippingMethod] = useState({
				avatar: { uri: faker.image.nature(100) },
				title: 'BlueEast',
			});

			function onValueChange(item: any) {
				console.log('item changed', item);
				setShippingMethod(item);
			}
			return (
				<MockedProvider mocks={ShippingMethodListQueryMocks.success(100)} addTypename={false}>
					<ShippingMethodPicker
						title={shippingmethod.title}
						avatar={shippingmethod.avatar}
						onValueChange={onValueChange}
					/>
				</MockedProvider>
			);
		};

		return <Component />;
	})

	.add('loading state', () => (
		<ShippingMethodPicker loading />
	))

	.add('mutating state', () => (
		<ShippingMethodPicker name="BlueEast" avatar={{ uri: faker.image.nature(100) }} mutating />
	));
