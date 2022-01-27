import { BlueBaseImageProps, ImageBackground } from '@bluebase/components';

import React from 'react';
import { createAnimatableComponent } from 'react-native-animatable';

class BlueBaseImageBackgroundClass extends React.Component<BlueBaseImageProps> {
	render() {
		return <ImageBackground {...(this.props as any)} />;
	}
}

export const AnimatedImageBackground = createAnimatableComponent(BlueBaseImageBackgroundClass);
