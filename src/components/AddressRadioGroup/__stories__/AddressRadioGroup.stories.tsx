import { AddressRadioGroup, AddressRadioGroupProps } from '../AddressRadioGroup';

import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const addresses = [
	{
		address1: '540 A, Street 4, Zahoor Ilahi Road',
		id: 'id_3',

		city: 'Lahore',
		country: 'Pakistan',
		email: 'commi@blueeast.com',
		name: 'John Doe',
		phone: '+921234567890',
		area: '12535',

		province: 'Punjab',
	},
	{
		address1: '540 A, Street 4, Maraka',
		id: 'id_2',

		city: 'Lahore',
		country: 'Pakistan',
		email: 'commi@blueeast.com',
		name: 'Orient',
		phone: '+921234567890',
		area: '12535',

		province: 'Punjab',
	}
];

storiesOf('AddressRadioGroup', module)
	.add('Basic Example', () => (
		<AddressRadioGroup
			value="id_2"
			items={addresses}
			onValueChange={value => console.log(value)}
		/>
	))
	.add('Loading State', () => (
		<>
			<AddressRadioGroup loading />
			<AddressRadioGroup
				value="id_2"
				items={addresses}
				onValueChange={value => console.log(value)}
			/>
		</>
	));
