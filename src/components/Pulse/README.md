# Pulse

Shows pulse animation.

## Usage

```jsx
<Pulse size={20} />
```

## ScreenShots

|                 🌏 Web                |               📱 Android              |                📱 iOS                |
| :-----------------------------------: | :-----------------------------------: | :----------------------------------: |
| <img src="./screenshots/pulse.png" /> | <img src="./screenshots/pulse.png" /> | <img src="./screenshots/pulse.png"/> |

## Component Props

|  Name  |     Type    | Default |                  Description                  |
| :----: | :---------: | :-----: | :-------------------------------------------: |
| styles | PulseStyles |         | styles which will be applied on the component |
|  size  |    number   |         |             the size of the pulse             |

## Component Styles

| Name |    Type   | Default |                Description               |
| :--: | :-------: | :-----: | :--------------------------------------: |
| root | ViewStyle |    ️    | the styles will be applied on root level |

## User Stories

|                                 Story                                | In Storybook | Has Unit Test |
| :------------------------------------------------------------------: | :----------: | :-----------: |
|               should render a pulse with default width               |       ✅      |       ✅       |
|                should render a view with custom width                |       ✅      |       ✅       |
| should not throw exceptions even when used directly without BlueBase |       ✅      |       ✅       |
