import React from 'react';
import shallowEqual from 'shallowequal';
// import { mod } from 'react-swipeable-views-core';

// tslint:disable-next-line
const { mod } = require('react-swipeable-views-core');

export interface AutoPlayProps {
	/**
	 * If `false`, the auto play behavior is disabled.
	 */
	autoplay: boolean,
	/**
	 * @ignore
	 */
	children: React.ReactNode,
	/**
	 * This is the auto play direction.
	 */
	direction: 'incremental' | 'decremental',
	/**
	 * @ignore
	 */
	index: number,
	/**
	 * Delay between auto play transitions (in ms).
	 */
	interval: number,
	/**
	 * @ignore
	 */
	onChangeIndex: (indexNew: number, indexLatest: number) => void,
	/**
	 * @ignore
	 */
	onSwitching: (index: any, type: any) => void,
	/**
	 * @ignore
	 */
	slideCount: number,
};

export function autoPlay(MyComponent: React.ComponentType<any>): any {
	class AutoPlay extends React.Component<AutoPlayProps, any> {
		static defaultProps: Partial<AutoPlayProps> = {
			autoplay: true,
			direction: 'incremental',
			interval: 3000,
		};

		readonly state: any = {
			index: this.props.index || 0,
		};

		private timer: any = null;

		componentDidMount() {
			this.startInterval();
		}

		componentWillReceiveProps(nextProps: any) {
			const { index } = nextProps;

			if (typeof index === 'number' && index !== this.props.index) {
				this.setState({
					index,
				});
			}
		}

		componentDidUpdate(prevProps: any) {
			const shouldResetInterval = !shallowEqual(
				{
					autoplay: prevProps.autoplay,
					index: prevProps.index,
					interval: prevProps.interval,
				},
				{
					autoplay: this.props.autoplay,
					index: this.props.index,
					interval: this.props.interval,
				}
			);

			if (shouldResetInterval) {
				this.startInterval();
			}
		}

		componentWillUnmount() {
			clearInterval(this.timer);
		}

		handleInterval: any = () => {
			const { children, direction, onChangeIndex, slideCount } = this.props;

			const indexLatest = this.state.index;
			let indexNew = indexLatest;

			if (direction === 'incremental') {
				indexNew += 1;
			} else {
				indexNew -= 1;
			}

			if (slideCount || children) {
				indexNew = mod(indexNew, slideCount || React.Children.count(children));
			}

			// Is uncontrolled
			if (this.props.index === undefined) {
				this.setState({
					index: indexNew,
				});
			}

			if (onChangeIndex) {
				onChangeIndex(indexNew, indexLatest);
			}
		};

		handleChangeIndex: any = (index: any, indexLatest: any) => {
			// Is uncontrolled
			if (this.props.index === undefined) {
				this.setState({
					index,
				});
			}

			if (this.props.onChangeIndex) {
				this.props.onChangeIndex(index, indexLatest);
			}
		};

		handleSwitching: any = (index: any, type: any) => {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else if (type === 'end') {
				this.startInterval();
			}

			if (this.props.onSwitching) {
				this.props.onSwitching(index, type);
			}
		};

		startInterval: any = () => {
			const { autoplay, interval } = this.props;

			clearInterval(this.timer);

			if (autoplay) {
				this.timer = setInterval(this.handleInterval, interval);
			}
		};

		render() {
			const {
				autoplay,
				direction,
				index: indexProp,
				interval,
				onChangeIndex,
				...other
			} = this.props;

			const { index } = this.state;

			if (!autoplay) {
				return <MyComponent index={index} {...other} />;
			}

			return (
				<MyComponent
					index={index}
					onChangeIndex={this.handleChangeIndex}
					{...other}
					onSwitching={this.handleSwitching}
				/>
			);
		}
	}

	return AutoPlay;
}
