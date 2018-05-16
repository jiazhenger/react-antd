/* ====================================== 全局变量及方法整合  ====================================== */
import Methods from './global/methods';
import LocalStorage from './global/localStorage';
import Ajax from './global/http';
import Indexdb from './global/indexdb';

export const F = Methods;
export const LS = LocalStorage;
export const Http = Ajax;
export const DB = Indexdb;


export default { F, LS, Http, DB }