import React from 'react';
import { SpecificationItem } from '../SpecificationItem';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('Specifications/Parts/SpecificationItem', module)
	.add('Normal State', () => <SpecificationItem label="SIM Size" value="Nano SIM" />)
	.add('Loading State', () => <SpecificationItem loading />);
