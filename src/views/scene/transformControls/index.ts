/*
 * @Date: 2022-08-02 11:24:42
 * @LastEditors: changgeee
 * @LastEditTime: 2023-01-16 09:07:15
 * @FilePath: \ipems-r\src\views\scene\transformControls\index.ts
 */
import * as THREE from "three";
import Scene from '../scene';
import type { TransControlsOptions } from './index.d';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { radian2angle } from '../utils/index'
import * as _ from "lodash";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
// @ts-ignore
import { OutlinePass } from "./libs/OutlinePass";
// import { MyOutlinePass } from "./libs/MyOutlinePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { angle2radian } from '../utils';

var objectPositionOnDown: THREE.Vector3 = null;
var objectRotationOnDown: THREE.Euler = null;
var objectScaleOnDown: THREE.Vector3 = null;


export default class TransControls {
  public context: Scene;
  public transControls: TransformControls;
  // public selectionBox: any;
  public onTransformChange: (object: any) => void;
  public type: '2d' | '3d';
  public outlinePass?: OutlinePass;
  public selectedObjects: THREE.Object3D[]; // 选中的模型对象，允许多选
  public beforeChangeObjectStatus: any; // 变更前的模型属性，批量操作时与之对比计算增量
  public isCtrlKeyDown: boolean;
  public isCopying: boolean; // 是否正在复制，按住ctrl键拖动鼠标复制，鼠标抬起结束一次复制，中间拖动事件多次触发避免重复复制
  constructor(ctx: Scene, options: TransControlsOptions, onTransformChange: (object: any) => void) {
    this.context = ctx;
    this.selectedObjects = [];
    this.beforeChangeObjectStatus = {};
    this.isCopying = false;
    this.isCtrlKeyDown = false;
    this.transControls = new TransformControls(this.context.Camera.camera, this.context.renderer.domElement);
    this.transControls.rotationSnap = angle2radian(5); // 旋转步频
    this.transControls.translationSnap = 1;
    // this.selectionBox = new THREE.BoxHelper(new THREE.Object3D, 0xffff00);
    // this.selectionBox.material.depthTest = false;
    // this.selectionBox.material.transparent = true;
    // this.selectionBox.visible = false;
    this.onTransformChange = onTransformChange;
    // this.context.scene.add(this.selectionBox);
    this.context.scene.add(this.transControls);
    this.type = '2d';
    this.init();
  }

  private init = () => {
    // this.transControls.addEventListener('change', () => {
    //   var object = this.transControls.object;

    //   if (object !== undefined) {

    //     this.selectionBox.setFromObject(object);
    //   }
    // });

    this.transControls.addEventListener('mouseDown', () => {
      // var object = this.transControls.object;

      // objectPositionOnDown = object.position.clone();
      // objectRotationOnDown = object.rotation.clone();
      // objectScaleOnDown = object.scale.clone();

      this.context.Controls.controls.enabled = false;

    });

    this.transControls.addEventListener('mouseUp', () => {
      this.isCopying = false;
      var object = this.transControls.object;

      if (object !== undefined) {

      }

      this.context.Controls.controls.enabled = true;

    });

    document.addEventListener('keydown', (ev) => {
      if (ev.ctrlKey) {
        this.isCtrlKeyDown = true;
      }
      if (ev.key === 'Escape') {
        this.selectedObjects = [];
        this.outlineObj(this.selectedObjects);
        this.transControls.detach();
        this.context.onEventTrigger(null, 'selectObject', []);
      }
    })

    document.addEventListener('keyup', (ev) => {
      if (!ev.ctrlKey) {
        this.isCtrlKeyDown = false;
      }
    })

    this.transControls.addEventListener('objectChange', (e) => {
      this.checkCopyModel();
      const { object: { position, rotation, scale, userData: { objectId } }, mode } = this.transControls;
      const increment = {
        position: {
          x: position.x - this.beforeChangeObjectStatus.position.x,
          y: position.y - this.beforeChangeObjectStatus.position.y,
          z: position.z - this.beforeChangeObjectStatus.position.z,
        },
        rotation: {
          x: rotation.x - this.beforeChangeObjectStatus.rotation.x,
          y: rotation.y - this.beforeChangeObjectStatus.rotation.y,
          z: rotation.z - this.beforeChangeObjectStatus.rotation.z,

        },
        scale: {
          x: scale.x - this.beforeChangeObjectStatus.scale.x,
          y: scale.y - this.beforeChangeObjectStatus.scale.y,
          z: scale.z - this.beforeChangeObjectStatus.scale.z,
        }
      }
      const objectsChangedAttrs: any[] = [];
      _.each(this.selectedObjects, obj => {
        const params: {
          objectId: String,
          position?: any
          rotation?: any
          scale?: any,
          key?: String
        } = { objectId: obj.userData.objectId }
        switch (mode) {
          case 'translate':  //平移
            params.key = 'position'
            if (obj.userData.objectId !== objectId) {
              obj.position.set(obj.position.x + increment.position.x,
                obj.position.y + increment.position.y,
                obj.position.z + increment.position.z)

            }
            params.position = {
              x: obj.position.x,
              y: obj.position.y,
              z: obj.position.z
            }
            break;
          case 'rotate':  //旋转
            params.key = 'rotation'
            if (obj.userData.objectId !== objectId) {
              obj.rotation.set(obj.rotation.x + increment.rotation.x,
                obj.rotation.y + increment.rotation.y,
                obj.rotation.z + increment.rotation.z)
            }
            params.rotation = {
              x: radian2angle(obj.rotation.x),
              y: radian2angle(obj.rotation.y),
              z: radian2angle(obj.rotation.z),
            }

            break;
          case 'scale':  //缩放
            params.key = 'scale'
            if (obj.userData.objectId !== objectId) {
              obj.scale.set(obj.scale.x + increment.scale.x,
                obj.scale.y + increment.scale.y,
                obj.scale.z + increment.scale.z)
            }
            params.scale = {
              x: obj.scale.x,
              y: obj.scale.y,
              z: obj.scale.z,
            }
            break;
          default:
            break;
        }
        objectsChangedAttrs.push(params);
      })
      this.objectsAttrChange(objectsChangedAttrs);
      this.updateContrastObject();
    })
  }

  private objectsAttrChange = _.throttle((info: any[]) => {
    this.onTransformChange(info)
  }, 200)

  /**
   * @description 检查是否要复制模型
   * @return {*}
   */
  checkCopyModel = () => {
    if (!this.isCtrlKeyDown || this.isCopying || this.transControls.mode !== 'translate') return;
    this.isCopying = true;
    this.selectedObjects = this.context.Models.cloneObjectByObjectIds(_.map(this.selectedObjects, i => _.get(i, 'userData.objectId')), this.context.onCloneModel, this.context.onCloneAttr);
    this.transControls.attach(this.selectedObjects[this.selectedObjects.length - 1])
    this.outlineObj(this.selectedObjects);
    this.context.onEventTrigger(_.get(this.selectedObjects[this.selectedObjects.length - 1], 'userData.objectId'), 'selectObject', this.selectedObjects)
  }


  attachObject = (eventType: string, object: any, ev?: MouseEvent) => {
    if (object && object[0] && object[0].object) {
      if (ev && ev.shiftKey) {
        if (_.find(this.selectedObjects, (obj) => {
          if (obj.userData.objectId === _.get(object[0].object, 'userData.objectId')) {
            return true;
          }
        })) {
          _.remove(this.selectedObjects, (obj) => {
            if (obj.userData.objectId === _.get(object[0].object, 'userData.objectId')) {
              return true;
            }
          })
        } else {
          this.selectedObjects.push(object[0].object);
        }
        if (this.selectedObjects.length) {
          this.outlineObj(this.selectedObjects);
          this.transControls.attach(this.selectedObjects[this.selectedObjects.length - 1]);
          this.updateHandles();
        } else {
          this.transControls.detach();
        }
      } else {
        this.selectedObjects = [object[0].object]
        this.updateHandles();
        this.transControls.attach(object[0].object);
        this.outlineObj(this.selectedObjects);
      }
      this.updateContrastObject();
    } else {
      this.selectedObjects = [];
      this.transControls.detach();
      this.outlineObj([]);
    }
  }

  updateContrastObject = () => {
    const object = this.transControls.object;
    if (!object) return;
    this.beforeChangeObjectStatus = {
      position: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
      rotation: {
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z,
      },
      scale: {
        x: object.scale.x,
        y: object.scale.y,
        z: object.scale.z,
      }
    }
  }

  outlineObj = (selectedObjects: any) => {
    const composer = this.context.composer;
    // 物体边缘发光通道
    if (!this.outlinePass) {
      this.outlinePass = new OutlinePass(new THREE.Vector2(this.context.width, this.context.height), this.context.scene, this.context.Camera.camera, selectedObjects)
      composer.addPass(this.outlinePass);
      // 自定义的着色器通道 作为参数
      // var effectFXAA = new ShaderPass(FXAAShader)
      // effectFXAA.uniforms.resolution.value.set(1 / this.context.width, 1 / this.context.height)
      // effectFXAA.renderToScreen = true
      // composer.addPass(effectFXAA)
    }
    this.outlinePass.selectedObjects = selectedObjects
    this.outlinePass.edgeStrength = 2.0 // 边框的亮度
    this.outlinePass.edgeGlow = 0.5// 光晕[0,1]
    this.outlinePass.usePatternTexture = false // 是否使用父级的材质
    this.outlinePass.edgeThickness = 1.0 // 边框宽度
    this.outlinePass.downSampleRatio = 1 // 边框弯曲度
    this.outlinePass.pulsePeriod = 0 // 呼吸闪烁的速度
    this.outlinePass.visibleEdgeColor.set(0x00ff00) // 呼吸显示的颜色
    this.outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
    this.outlinePass.clear = true

  }

  // updateSelectionBox = () => {
  //   this.selectionBox.update();
  // }

  private updateHandles = () => {
    if (this.type === '3d') {
      this.transControls.showX = true;
      this.transControls.showY = true;
      this.transControls.showZ = true;
      return;
    }
    if (this.transControls.mode === 'translate') {
      this.transControls.showX = true;
      this.transControls.showY = false;
      this.transControls.showZ = true;
    }
    if (this.transControls.mode === 'rotate') {
      this.transControls.showX = false;
      this.transControls.showY = true;
      this.transControls.showZ = false;
    }
    if (this.transControls.mode === 'scale') {
      this.transControls.showX = true;
      this.transControls.showY = true;
      this.transControls.showZ = true;
    }
  }

  public setMode(mode: "translate" | "rotate" | "scale") {
    this.transControls.setMode(mode);
    this.updateHandles();
  }

  public setType = (type: '2d' | '3d') => {
    this.type = type;
    this.updateHandles();
  }

}


