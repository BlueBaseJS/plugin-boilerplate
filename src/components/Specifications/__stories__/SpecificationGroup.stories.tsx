import React from 'react';
import { SpecificationGroup } from '../SpecificationGroup';
import storiesOf from '@bluebase/storybook-addon';

const specs = [
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
];

storiesOf('Specifications/Parts/SpecificationGroup', module)
	.add('Normal State', () => <SpecificationGroup title="Other Details" items={specs} />)
	.add('Loading State', () => <SpecificationGroup loading />);
