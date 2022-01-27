import { useCallback, useState } from 'react';

import { LayoutRectangle } from 'react-native';

export const useComponentLayout = () => {
	const [layout, setLayout] = useState<LayoutRectangle>({ width: 0, height: 0, x: 0, y: 0 });

	const onLayout = useCallback((event) => {
		setLayout(event.nativeEvent.layout);
	}, []);

	return { layout, onLayout };
};
