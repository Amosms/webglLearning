import { object } from 'vue-types';
/*
 * @Date: 2022-08-02 10:36:48
 * @LastEditors: changgeee
 * @LastEditTime: 2022-08-02 10:55:40
 * @FilePath: \ipems-r\src\views\scene\camera\index.d.ts
 */
import * as THREE from 'three';

export interface LightsOptions {
  type?: "AmbientLight" | "DirectionalLight",
  /** 灯光uuid */
  id?:string,
  name?:string,
  /** 灯光强度 */
  intensity?:number,
  /** 灯光位置 */
  position?: {
    x?: number;
    y?: number;
    z?: number;
  };
  target?: {
    x?: number;
    y?: number;
    z?: number;
  };
}
