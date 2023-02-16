/*
 * @Date: 2022-08-02 11:24:30
 * @LastEditors: changgeee
 * @LastEditTime: 2022-09-01 17:27:05
 * @FilePath: \ipems-r\src\views\scene\controls\index.ts
 */
import Scene from '../scene';
import * as THREE from "three";
import * as _ from "lodash";
import type { ControlsOptions } from './index.d';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { updateAttr } from "../utils";
import config from './config';

export default class Controls {
  public context: Scene;
  public controls: OrbitControls;

  constructor(ctx: Scene, options: ControlsOptions) {
    this.context = ctx;
    this.controls = this.createControls(options);
    if (options) {
      this.update(options);
    }
  }

  /**
   * @description 创建相机
   * @private
   * @param {ControlsOptions} options
   * @return {*}
   * @memberof Controls
   */
  private createControls(options: ControlsOptions) {
    const controls = new OrbitControls(this.context.Camera.camera, this.context.renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0)
    controls.enabled = true;
    return controls;
  }

  public getTarget() {
    console.log(this.controls.target)
  }
  /**
   *
   *
   * @param {ControlsOptions} options
   * @memberof Controls
   */
  update(options: ControlsOptions) {
    _.each(options, (value, key) => {
      _.each(config.children, item => {
        if (key === item.key) {
          updateAttr(this.controls, key, value, item);
        }
      })
    })

  }

}


