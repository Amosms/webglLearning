/*
 * @Date: 2022-08-02 10:34:54
 * @LastEditors: changgeee
 * @LastEditTime: 2022-09-08 10:10:56
 * @FilePath: \ipems-r\src\views\scene\camera\index.ts
 */
import Scene from '../scene';
import * as THREE from "three";
import * as _ from "lodash";
import { updateAttr } from "../utils";
import config from "./config";
import type { CameraOptions, CameraAnimationParamTypes } from './index.d';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'


export default class Camera {
  public context: Scene;
  public camera: THREE.PerspectiveCamera;

  constructor(ctx: Scene, options: CameraOptions) {
    this.context = ctx;
    this.camera = this.createCamera(options);
    if (options) {
      this.update(options);
    }
  }

  /**
   * @description 创建相机
   * @private
   * @param {CameraOptions} options
   * @return {*}
   * @memberof Camera
   */
  private createCamera(options: CameraOptions) {
    if (options.type === 'PerspectiveCamera' || !options.type) {
      const camera = new THREE.PerspectiveCamera(
        options.fov || 45,
        this.context.width / this.context.height,
        options.near || 1,
        options.far || 100000
      )
      camera.position.set(
        _.get(options, "position.x", 10),
        _.get(options, "position.y", 10),
        _.get(options, "position.z", 10),
      )
      camera.lookAt(
        _.get(options, "lookAt.x", 0),
        _.get(options, "lookAt.y", 0),
        _.get(options, "lookAt.z", 0),
      )
      return camera;

    } else {

    }
  }

  /**
   *更新相机
   *
   * @param {CameraOptions} options
   * @memberof Camera
   */
  update(options: CameraOptions) {
    _.each(options, (value, key) => {
      _.each(config.children, item => {
        if (key === item.key) {
          updateAttr(this.camera, key, value, item);
          this.camera.updateProjectionMatrix();
        }
      })
    })
  }


  /**
   *相机窗口自适应
   *
   * @private
   * @param {*} width
   * @param {*} height
   * @memberof Camera
   */
  private resizeCamera(options: CameraOptions, width: number, height: number) {

    if (options.type === 'PerspectiveCamera') {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    // for (let value of this.cameras.values()) {
    //   if(value instanceof THREE.PerspectiveCamera){
    //     value.aspect = width / height;
    //     value.updateProjectionMatrix();
    //   }else if(value instanceof THREE.OrthographicCamera){
    //     value.left = -width / 2;
    //     value.right = width / 2;
    //     value.top = height / 2;
    //     value.bottom = -height / 2;
    //     value.updateProjectionMatrix();
    //   }
    // }
  }

  /**
   * @description 播放一组镜头动画
   * @param {CameraAnimationParamTypes[]} points
   * @param {number} [duration=5000]
   * @memberof Camera
   */
  public playCameraAnimation(points: CameraAnimationParamTypes[], duration: number = 5000) {
    if (points.length < 2) return;
    const positionPoints: THREE.Vector3[] = [];
    const targetPoints: THREE.Vector3[] = [];
    _.each(points, p => {
      positionPoints.push(new THREE.Vector3(p.position.x, p.position.y, p.position.z));
      targetPoints.push(new THREE.Vector3(p.target.x, p.target.y, p.target.z));
    })
    const positionCurve = new THREE.CatmullRomCurve3(positionPoints);
    const targetCurve = new THREE.CatmullRomCurve3(targetPoints);
    let tweenAnimation = new TWEEN.Tween({ t: 0 })
      .to({ t: 1 }, duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate((res: { t: number }) => {
        const curPosition = positionCurve.getPoint(res.t);
        const curTarget = targetCurve.getPoint(res.t);
        this.camera.position.copy(curPosition);
        this.camera.lookAt(curTarget);
        this.camera.updateProjectionMatrix();
        this.context.Controls.controls.target.copy(curTarget);
      }).start()
  }

  /**
   * @description 切换到某一帧
   * @param {CameraAnimationParamTypes} point
   * @memberof Camera
   */
  public checkoutSnapshot(point: CameraAnimationParamTypes) {
    this.camera.position.set(point.position.x, point.position.y, point.position.z);
    this.camera.lookAt(point.target.x, point.target.y, point.target.z);
    this.camera.updateProjectionMatrix();
    this.context.Controls.controls.target.set(point.target.x, point.target.y, point.target.z);
  }

}


