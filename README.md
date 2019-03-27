<div align="center">
	<img width=125 height=125 src="assets/common/logo.png">
  <h1>
		Redux Persist
	</h1>
  <p>This plugin uses [redux-Persist](https://www.npmjs.com/package/redux-persist) to Persist and rehydrate a redux store.</p>
</div>

<hr />

## 🎊 Status

[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/plugin-redux-persist.svg?style=flat)](https://npmjs.org/package/plugin-redux-persist "View this project on npm")
[![Build Status](https://travis-ci.com/BlueBaseJS/plugin-redux-persist.svg?branch=master)](https://travis-ci.com/BlueBaseJS/plugin-redux-persist)
[![codecov](https://codecov.io/gh/BlueBaseJS/plugin-redux-persist/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueBaseJS/plugin-redux-persist)
[![Greenkeeper badge](https://badges.greenkeeper.io/BlueBaseJS/plugin-redux-persist.svg)](https://greenkeeper.io/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/BlueBaseJS/plugin-redux-persist/blob/master/CONTRIBUTING.md)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3c79162871414b6aa7c15d1a423adeca)](https://www.codacy.com/app/BlueBaseJS/plugin-redux-persist?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BlueBaseJS/plugin-redux-persist&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/BlueBaseJS/plugin-redux-persist/badge.svg)](https://snyk.io/test/github/BlueBaseJS/plugin-redux-persist)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## 🤝 Compatibility

| 🌏 Web | 🖥 Electron | 📱 React Native |
| :---: | :--------: | :------------: |
|✅|✅|❌|

### Installation

```shell
yarn add @bluebase/plugin-redux-persist
```

## Filters

### **bluerain.redux.enhancers**

This hook  helps to add store enhancers like middlewares etc. 

#### **Parameters:**

| Name      | Type            | Description                    |
| --------- | --------------- | ------------------------------ |
| enhancers | Array | It provides list of enhancers |

#### **Returns:**

| Name      | Type            | Description                    |
| --------- | --------------- | ------------------------------ |
| enhancers | object | The hooks pushes the enhancers in store |

#### **Example:**

```javascript
import BR from '@blueeast/bluerain-os';
import { autoRehydrate } from 'redux-persist';

 BB.Filters.add('bluerain.redux.enhancers', enhancers => {
enhancers.push(autoRehydrate());
return enhancers;
 }
```

### **bluerain.redux.store**

This hook adds the redux store in App to persist state of redux.

#### **Parameters:**

| Name      | Type            | Description                    |
| --------- | --------------- | ------------------------------ |
| store | object | This is used to provide the redux store |
|

#### **Returns:**

| Name      | Type            | Description                    |
| --------- | --------------- | ------------------------------ |
| state | object | The Hook returns the persisted state of redux |

#### **Example:**

```javascript
import BB from '@blueeast/core';
import { persistStore } from 'redux-persist';

BB.Filters.run('bluerain.redux.store', store => {
    persistStore(store);
        });
 }
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## Docs

- [Storybook](https://BlueBaseJS.github.io/plugin-redux-persist/storybook/)
- [API Docs](https://BlueBaseJS.github.io/plugin-redux-persist/)
