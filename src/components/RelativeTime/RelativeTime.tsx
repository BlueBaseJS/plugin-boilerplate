import { Text, TextProps } from '@bluebase/components';

import React from 'react';
import TimeAgo from 'javascript-time-ago';
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en';

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US');

interface RelativeTimeState {
	time: string;
}

export interface RelativeTimeProps extends TextProps {
	time: string | number;
	component: React.ComponentType<any>;
}

export class RelativeTime extends React.PureComponent<RelativeTimeProps, RelativeTimeState> {
	static defaultProps: Partial<RelativeTimeProps> = {
		component: Text,
	};

	private timer: any;

	constructor(props: RelativeTimeProps) {
		super(props);

		this.state = {
			time: this.getTimeString(),
		};
	}

	componentDidMount() {
		this.startTimer();
	}

	startTimer: any = () => {
		// In future modify this logic to slow down and eventually stop
		// updates as time progresses
		this.timer = setTimeout(() => {
			this.setState({ time: this.getTimeString() });
			this.startTimer();
		}, 1000);
	};

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	getTimeString: any = () => {
		const data = new Date(this.props.time).getTime();
		const times = (timeAgo as any).format(data, 'twitter');
		return times === '' ? 'just now' : times;
	};

	render() {
		const { time, component, ...rest } = this.props;
		const data = this.getTimeString();
		return React.createElement(component, rest, data);
	}
}
