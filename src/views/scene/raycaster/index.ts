import * as THREE from "three";
import Scene from '../scene';
import * as _ from "lodash";

//鼠标按下记录坐标
let onDownPosition = new THREE.Vector2();
//鼠标抬起记录左边
let onUpPosition = new THREE.Vector2();
//双击记录坐标
let onDoubleClickPosition = new THREE.Vector2();
//当前拾取坐标
let mouse = new THREE.Vector2();

export default class Raycaster {
  public context: Scene;
  public raycaster: THREE.Raycaster;
  public camera: THREE.Camera;
  public rootDom: HTMLElement;
  // public onEventTrigger:(eventType:string , object : THREE.Object3D<Event>[] | THREE.Mesh[] )=>void;
  public onEventTrigger: (eventType: string, object: any, ev: MouseEvent) => void;

  constructor(ctx: Scene, options: any, onEventTrigger: (eventType: string, object: any, ev: MouseEvent) => void) {
    this.context = ctx;
    this.onEventTrigger = onEventTrigger;
    this.camera = this.context.Camera.camera;
    this.rootDom = this.context.rootDom;
    this.raycaster = new THREE.Raycaster();

    this.rootDom.addEventListener('pointerdown', this.onMouseDown);
    this.rootDom.addEventListener('dblclick', this.onDoubleClick);

    console.log("Raycaster")

  }


  public getMousePosition(dom: HTMLElement, x: number, y: number) {

    var rect = dom.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];

  }

  public getIntersects(point: THREE.Vector2) {

    mouse.set((point.x * 2) - 1, - (point.y * 2) + 1);

    this.raycaster.setFromCamera(mouse, this.camera);
    const pickarr: Array<THREE.Object3D> = []
    _.each(this.context.Models.models.children, ThreeObject => {
      ThreeObject.traverseVisible(item => {
        if (item.visible) {
          pickarr.push(item)
        }
      })
    })
    return this.raycaster.intersectObjects(pickarr, true);

  }


  private onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if(event.button!==0) return;
    var array = this.getMousePosition(this.rootDom, event.clientX, event.clientY);
    onDownPosition.fromArray(array);
    this.context.renderer.domElement.addEventListener('pointerup', this.onMouseUp);

  }

  private onMouseUp = (event: MouseEvent) => {
    console.log("onMouseUp")

    var array = this.getMousePosition(this.rootDom, event.clientX, event.clientY);
    onUpPosition.fromArray(array);

    this.handleClick(event);

    this.context.renderer.domElement.removeEventListener('pointerup', this.onMouseUp);

  }

  private onDoubleClick = (event: MouseEvent) => {
    console.log("onDoubleClick")

    var array = this.getMousePosition(this.rootDom, event.clientX, event.clientY);
    onDoubleClickPosition.fromArray(array);

    var intersects = this.getIntersects(onDoubleClickPosition);

    this.onEventTrigger('dbClick', intersects, event);

    // if (intersects.length > 0) {
    //     var intersect = intersects[0];
    // }

  }

  handleClick(event: MouseEvent) {

    if (onDownPosition.distanceTo(onUpPosition) === 0) {

      var intersects = this.getIntersects(onUpPosition);

      this.onEventTrigger('click', intersects, event);

      // if (intersects.length > 0) {
      //     var object = intersects[0].object;
      //     if (object.userData.object !== undefined) {
      //         // helper
      //         // this.editor.selectObject( object.userData.object );
      //         this.context.selectObject(object.userData.object);
      //     } else {
      //         this.context.selectObject(object);
      //     }
      // } else {
      //     this.context.selectObject(null);
      // }

    }

  }

}


