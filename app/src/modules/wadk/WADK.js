/* eslint-disable import/prefer-default-export */
import appwrapper from './components/AppWrapper.vue';
import appmodal from './components/AppModal.vue';
import appplaceholdercontent from './components/AppPlaceholderContent.vue';
import appmodalmanager from './components/AppModalManager.vue';
import store from './store/common/index';
import dynMod from './utils/dynamicModule';
import appaxios from './utils/AppAxios';
import paginationarrows from './components/PaginationArrows.vue';


export const AppWrapper = appwrapper;
export const AppModal = appmodal;
export const AppPlaceholderContent = appplaceholdercontent;
export const AppModalManager = appmodalmanager;
export const AppAxios = appaxios;
export const commonAppStore = store;
export const dynamicModule = dynMod;
export const PaginationArrows = paginationarrows;

