/* eslint-disable import/prefer-default-export */
import appwrapper from './components/AppWrapper.vue';
import store from './store/common/index';
import Axios from '../../../node_modules/axios';
import dynMod from './utils/dynamicModule';

export const AppWrapper = appwrapper;
export const AppAxios = Axios;
export const commonAppStore = store;
export const dynamicModule = dynMod;

