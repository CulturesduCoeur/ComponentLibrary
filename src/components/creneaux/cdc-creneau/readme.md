# cdc-creneau



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type      | Default |
| ------------- | ------------- | ----------- | --------- | ------- |
| `creneauid`   | `creneauid`   |             | `string`  | `''`    |
| `deletable`   | `deletable`   |             | `boolean` | `false` |
| `reservation` | `reservation` |             | `boolean` | `false` |
| `selectable`  | `selectable`  |             | `boolean` | `true`  |
| `selected`    | `selected`    |             | `boolean` | `false` |


## Events

| Event           | Description | Type                                           |
| --------------- | ----------- | ---------------------------------------------- |
| `deletecreneau` |             | `CustomEvent<{ id: string; }>`                 |
| `selectcreneau` |             | `CustomEvent<{ state: boolean; id: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
