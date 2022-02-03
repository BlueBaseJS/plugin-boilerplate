import { BlueBaseImage, BlueBaseImageProps } from '@bluebase/components';

import React from 'react';
import { createAnimatableComponent } from 'react-native-animatable';

class BlueBaseImageClass extends React.Component<BlueBaseImageProps> {
	render() {
		return <BlueBaseImage {...this.props} />;
	}
}

export const AnimatedImage = createAnimatableComponent(BlueBaseImageClass);
