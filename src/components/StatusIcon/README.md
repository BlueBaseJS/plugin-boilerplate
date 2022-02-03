# 🚦 StatusIcon

StatusIcon shows the current connection status of a thing which indicates if it is online or offline.

## Usage

```jsx
<StatusIcon color="red" />
```

## Screenshots

|                      Web                      |                      IOS                      |                      Android                      |
| :-------------------------------------------: | :-------------------------------------------: | :-----------------------------------------------: |
| ![web image](./screenshots/webStatusIcon.jpg) | ![web image](./screenshots/iosStatusIcon.jpg) | ![web image](./screenshots/androidStatusIcon.jpg) |

## Component Props

|  Name |  Type  | Default |             Description            |
| :---: | :----: | :-----: | :--------------------------------: |
| color | string |  orange |      Color given to StatusIcon     |
| style | object |         | All the styles given to StatusIcon |

## Component Styles

|  Name  |    Type   |              Description              |
| :----: | :-------: | :-----------------------------------: |
|   red  | TextStyle |   Change the StatusIcon Color to Red  |
|  green | TextStyle |  Change the StatusIcon Color to Green |
| orange | TextStyle | Change the StatusIcon Color to Orange |

## Design States

-   Empty State: none
-   Loading State: none

## User Stories

|                      Story                     | In Storybook | Has Unit Test |
| :--------------------------------------------: | :----------: | :-----------: |
|   It should show user StatusIcon in red color  |       ✅      |       ✅       |
|  It should show user StatusIcon in green color |       ✅      |       ✅       |
| It should show user StatusIcon in orange color |       ✅      |       ✅       |

## Questions and Assumptions

|            Questions and Assumptions           |                       Answers                       |
| :--------------------------------------------: | :-------------------------------------------------: |
|     What if we do not pass any color props?    | There is default color in case you did not pass any |
| How could we change the size of the SatusIcon? |       We can change the size by fontSize prop       |
