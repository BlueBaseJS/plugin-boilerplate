import React, { useCallback } from 'react';

import { Button } from '@bluebase/components';
import { SafeAreaView } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';
import { useAlert } from '../useAlert.web';

const AlterDemo = () => {
	const { alert } = useAlert();

	const onPress = useCallback(
		() =>
			alert(
				'Hurry',
				'Buy now before time runs out!',
				[
					{ text: 'Ok!', style: 'default', onPress: () => console.log('ok!') },
					{ text: 'Cancel', style: 'cancel', onPress: () => console.log('Cancel') },
					{ text: 'Delete', style: 'destructive', onPress: () => console.log('Delete') },
				],
				{ onDismiss: () => console.log('dismissed') }
			),
		[]
	);

	return (
		<SafeAreaView>
			<Button title="Alert Me" onPress={onPress} />
		</SafeAreaView>
	);
};

const stories = storiesOf('Alert', module);
stories.add('Invoke Alert ', () => <AlterDemo />);
