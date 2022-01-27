/* eslint-disable react/jsx-no-bind */
import { Button, Card, EmptyState } from '@bluebase/components';
import React, { useRef } from 'react';

import { SlidingPane } from '../SlidingPane';
import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('MultiLevelSelector/Parts/SlidingPane', module).add('Basic Example', () =>
	React.createElement(() => {
		const pane = useRef<any>(null);

		return (
			<View style={{ width: 200, padding: 20 }}>
				<View style={{ height: 100, overflow: 'hidden' }}>
					<SlidingPane ref={pane}>
						<Card>
							<EmptyState />
						</Card>
					</SlidingPane>
				</View>
				<View style={{}}>
					<Button title="Slide Right" onPress={() => pane.current!.slideRight()} />
					<Button title="Slide Left" onPress={() => pane.current!.slideLeft()} />
					<Button title="Slide Center" onPress={() => pane.current!.slideCenter()} />
					<Button title="Warp Right" onPress={() => pane.current!.warpRight()} />
					<Button title="Warp Left" onPress={() => pane.current!.warpLeft()} />
					<Button title="Warp Center" onPress={() => pane.current!.warpCenter()} />
				</View>
			</View>
		);
	})
);
// .add('with text', () => <Component />);
