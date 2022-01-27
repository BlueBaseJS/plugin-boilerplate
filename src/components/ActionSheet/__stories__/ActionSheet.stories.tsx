import { Button, Icon } from '@bluebase/components';
import React, { useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';

import storiesOf from '@bluebase/storybook-addon';
import { useActionSheet } from '../useActionSheet';

const ActionSheetDemo = () => {
	const { showActionSheetOrDialogWithOptions } = useActionSheet();

	const onPress = useCallback(
		() =>
			showActionSheetOrDialogWithOptions(
				{
					cancelButtonIndex: 1,
					destructiveButtonIndex: 1,
					icons: [
						<Icon key={Math.random()} name="apple" />,
						null,
						null,
						<Icon key={Math.random()} name="cancel" />,
					],
					message: 'Which on do you like?',
					options: ['Apple', 'Bannana', 'Mango', 'Cancel'],
					showSeparators: true,
					// tintColor: 'blue',
					title: 'Fruits',
				},

				(index) => console.log('pressed', index)
			),
		[]
	);

	return <Button title="Show options" onPress={onPress} />;
};
const stories = storiesOf('ActionSheet', module);

stories.add('Action Sheet', () => (
	<View style={{ height: 500 }}>
		<SafeAreaView>
			<ActionSheetDemo />
		</SafeAreaView>
	</View>
));
