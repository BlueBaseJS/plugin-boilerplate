import React from 'react';
import { Specifications } from '../Specifications';
import storiesOf from '@bluebase/storybook-addon';

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
					// eslint-disable-next-line max-len
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
					// eslint-disable-next-line max-len
					'Face Unlock, Dual App Support, USB Type C, Kryo 4 Architecture, Fingerprint Scanner Position: Side, Quick Charging Version: Supports Upto 27W',
			},
		],
	},
];

storiesOf('Specifications/Main/Specifications', module)
	.add('Normal State', () => <Specifications items={specs} />)
	.add('Loading State', () => <Specifications loading />);
