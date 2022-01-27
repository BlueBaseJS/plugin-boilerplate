/* eslint-disable react/jsx-no-bind */
import { MultiLevelSelector, MultiLevelSelectorItem } from '../MultiLevelSelector';

import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const items: MultiLevelSelectorItem[] = [
	{
		hasChildren: true,
		id: 'punjab',
		title: 'Punjab',
	},
	{
		hasChildren: true,
		id: 'sindh',
		title: 'Sindh',
	},
	{
		id: 'balochistan',
		title: 'Balochistan',
	},
	{
		hasChildren: true,
		id: 'lahore',
		parentId: 'punjab',
		title: 'Lahore',
	},
	{
		id: 'multan',
		parentId: 'punjab',
		title: 'Multan',
	},
	{
		hasChildren: false,
		id: 'thokar',
		parentId: 'lahore',
		title: 'Thokar Niaz Baig',
	},
	{
		id: 'karachi',
		parentId: 'sindh',
		title: 'Karachi',
	},
];

storiesOf('MultiLevelSelector/Main/MultiLevelSelector', module).add('Basic Example', () =>
	React.createElement(() => {
		// const pane = useRef<any>(null);

		return (
			<MultiLevelSelector
				items={items}
				values={[]}
				onChangeValue={selection => console.log('Selected!', selection)}
			/>
		);
	})
);
// .add('with text', () => <Component />);
