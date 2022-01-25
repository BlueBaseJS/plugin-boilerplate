# LocationPermission

Shows the map view which has an input dialog.

## Usage

```jsx
<LocationPermission
    onLocationUpdate={()=>void}
>
    children
</LocationPermission>
```

## Component Props

|       Name       |                             Type                            | Default |                          Description                          |
| :--------------: | :---------------------------------------------------------: | :-----: | :-----------------------------------------------------------: |
| onLocationUpdate | (location: { latitude: number; longitude: number }) => void |         |        function which will be called on location update       |
|     children     |                   MaybeRenderPropChildren                   |         | takes the component which will be shown on permission granted |
