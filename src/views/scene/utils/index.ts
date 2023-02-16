/*
 * @Date: 2022-07-26 17:47:46
 * @LastEditors: changgeee
 * @LastEditTime: 2023-01-17 16:45:28
 * @FilePath: \ipems-r\src\views\scene\utils\index.ts
 */

import * as THREE from 'three';
import type { AttrTypes } from '../scene.d';

/**
*
* @param {*} object
* @param {string} key
* @param {*} value
* @param {AttrTypes} conf
*/
export const updateAttr = (object: any, key: string, value: any, conf: AttrTypes): void => {

  if (conf.type === 'number' || conf.type === "boolean" || conf.type == "select") {

    object[key] = value;

  } else if (conf.type === "angle") {
    object[key] = angle2radian(value);

  } else if (conf.type === "texture") {

    let texture = ""
    object[key] = texture;

  } else if (conf.type === "Color") {

    object[key] = Object.assign({}, object[key], { [key]: value });

  } else if (conf.type === "Vector") {

    let v = new THREE.Vector3(value.x, value.y, value.z);

    object[key].copy(v);

  } else if (conf.type === "lookAt") {

    let v = new THREE.Vector3(value.x, value.y, value.z);

    object.lookAt(v);

  }

}
export const radian2angle = (radian: number) => {
  return radian / (Math.PI / 180);
}

export const angle2radian = (angle: number) => {
  return angle * Math.PI / 180;
}

/**
 * 获取变量的数据类型
 * @param params 需要查询数据类型的参数
 * @returns {string}
 */
export const getAttrType = (params: any): string => {
  let type = Object.prototype.toString.call(params).toLowerCase();
  type = type.replace(/^\[object\s(\w+)\]$/, (...rest: string[]) => {
    return rest[1];
  })
  return type
}

export const getTopModel = (object: THREE.Object3D): THREE.Object3D => {
  if (object.parent && object.parent.parent && !object.parent.parent.parent) {
    return object
  }
  return getTopModel(object.parent);
}

