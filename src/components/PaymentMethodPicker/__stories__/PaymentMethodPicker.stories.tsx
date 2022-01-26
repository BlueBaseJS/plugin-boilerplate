import React, { useState } from 'react';

import { MockedProvider } from '@apollo/react-testing';
import { PaymentMethodListQueryMocks } from '../../../graphql/mocks';
import { PaymentMethodPicker } from '../PaymentMethodPicker';
import faker from 'faker';
import storiesOf from '@bluebase/storybook-addon';

const stories = storiesOf('PaymentMethodPicker', module);
stories
	.add('should show PaymentMethodPicker with mocked data', () => {
		const Component = () => {
			const [paymentmethod, setPaymentMethod] = useState({
				avatar: { uri: faker.image.nature(100) },
				title: 'BlueEast',
			});

			function onValueChange(item: any) {
				console.log('item changed', item);
				setPaymentMethod(item);
			}
			return (
				<MockedProvider mocks={PaymentMethodListQueryMocks.success(100)} addTypename={false}>
					<PaymentMethodPicker
						title={paymentmethod.title}
						avatar={paymentmethod.avatar}
						onValueChange={onValueChange}
					/>
				</MockedProvider>
			);
		};

		return <Component />;
	})

	.add('loading state', () => (
		<PaymentMethodPicker loading />
	))

	.add('mutating state', () => (
		<PaymentMethodPicker name="BlueEast" avatar={{ uri: faker.image.nature(100) }} mutating />
	));
