/*
 * @Date: 2022-08-02 10:34:54
 * @LastEditors: changgeee
 * @LastEditTime: 2022-08-16 16:41:35
 * @FilePath: \ipems-r\src\views\scene\lights\index.ts
 */
import Scene from '../scene';
import * as THREE from "three";
import * as _ from "lodash";
import { updateAttr } from "../utils";
import config from "./config";
import type { LightsOptions } from './index.d';

export default class Lights {
  public context: Scene;
  public lights: THREE.Light[];

  constructor(ctx: Scene, options: LightsOptions[]) {
    this.context = ctx;
    this.lights = [];
    _.each(options, (item, i) => {
      this.createLights(item);
    });
  }

  /**
   * @description 创建灯光
   * @private
   * @param {LightsOptions} options
   * @return {*}
   * @memberof Lights
   */
  private createLights(options: LightsOptions) {
    if (options.type === 'AmbientLight') {
      const light = new THREE.AmbientLight(0xffffff, options.intensity);
      light.uuid = options.id;
      this.lights.push(light);
      this.context.scene.add(light);
    } else if (options.type === "DirectionalLight") {
      const light = new THREE.DirectionalLight(0xffffff, options.intensity);
      light.uuid = options.id;

      light.position.set(options?.position?.x || 0, options?.position?.y || 500, options?.position?.z || 0);
      light.lookAt(new THREE.Vector3(options?.target?.x || 0, options?.target?.y || 500, options?.target?.z || 0));
      this.lights.push(light);
      this.context.scene.add(light);
    }
  }

  /**
   *更新灯光
   *
   * @param {LightsOptions} options
   * @memberof Lights
   */
  update(options: LightsOptions, id: String, changeLight: any) {
    let obj = this.lights.find(item => item.uuid === id);
    _.each(options, (value, key) => {
      _.each(config.children, item => {
        if (key === item.path) {
          if(item.path === "type"){
            _.each(this.lights,it =>{
              if(id === it.uuid){
                this.context.scene.remove(it);
                this.lights = this.lights.filter(itm => itm.uuid != id);

                if (options.type === 'AmbientLight') {
                  const light = new THREE.AmbientLight(0xffffff, changeLight.intensity);
                  light.uuid = changeLight.id;
                  this.lights.push(light)
                  this.context.scene.add(light);
                }else if(options.type === "DirectionalLight"){
                  const light = new THREE.AmbientLight(0xffffff, changeLight.intensity);
                  light.uuid = changeLight.id;
                  light.position.set(options?.position?.x || 0, options?.position?.y || 500, options?.position?.z || 0);
                  light.lookAt(new THREE.Vector3(options?.target?.x || 0, options?.target?.y || 500, options?.target?.z || 0));
                  this.lights.push(light);
                  this.context.scene.add(light);
                }
              }
            });
          }else{
            updateAttr(obj, key, value, item);
          }
        }
      })
    })
  }

  /**
   *删除灯光
   *
   * @param {id} options
   * @memberof Lights
   */
  remove(id: String) {
    let mv = this.lights.find(item => item.uuid === id);
    this.lights = this.lights.filter(item => item.uuid !== id);
    this.context.scene.remove(mv);
  }
}


