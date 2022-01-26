import { MultiLevelSelectorListItem } from '../ListItem';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('MultiLevelSelector/Parts/MultiLevelSelectorListItem', module)
	.add('Basic Example', () => <MultiLevelSelectorListItem id="lahore" title="Lahore" />)

	.add('With count', () => <MultiLevelSelectorListItem id="lahore" title="Lahore" count={1563} />)
	.add('With hasChildren', () => (
		<MultiLevelSelectorListItem id="lahore" title="Lahore" hasChildren />
	))
	.add('With count & hasChildren', () => (
		<MultiLevelSelectorListItem id="lahore" title="Lahore" count={1563} hasChildren />
	))
	.add('Loading State', () => <MultiLevelSelectorListItem loading />);
