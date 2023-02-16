// @ts-ignore
import * as THREE from 'three';
import Camera from './camera';
import Controls from './controls';
import Lights from './lights';
import Raycaster from './raycaster';
import TransformControls from './transformControls';
import type { ConfigTypes } from './index.d';
import { CameraOptions } from './camera';
import { ControlsOptions } from './controls';
import { LightsOptions } from './lights';

class Scene {
    /** 画布宽度 */
    public width: number;
    /** 画布高度 */
    public height: number;
    /** 场景容器 */
    public rootDom: HTMLElement;
    /** 场景 */
    public scene: THREE.Scene;
    /** 相机 */
    public Camera: Camera;
    /** 灯光 */
    public Lights: Lights;
    /** 渲染器 */
    public renderer: THREE.WebGLRenderer;
    /** 轨道控制器 */
    public Controls: Controls;

    constructor(params: ConfigTypes) {
        const { options = {} } = params;
        this.width = params.width;
        this.height = params.height;
        this.rootDom = params.rootDom;
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0xcfcfcf);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, //抗锯齿
            alpha: true,
            logarithmicDepthBuffer: true,
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.toneMapping = THREE.LinearToneMapping; // NoToneMapping  LinearToneMapping  ReinhardToneMapping  CineonToneMapping  ACESFilmicToneMapping
        this.renderer.outputEncoding = THREE.sRGBEncoding;  // LinearEncoding sRGBEncoding
        this.renderer.toneMappingExposure = 1;
        this.renderer.toneMappingWhitePoint = 1;

        this.rootDom.appendChild(this.renderer.domElement);
        this.Camera = new Camera(this, options.camera as CameraOptions);
        this.Controls = new Controls(this, options.controls as ControlsOptions);
        this.Lights = new Lights(this, options.lights as LightsOptions[]);
        this.addObject();
        this.animate();
    }

    public addObject() {
        const geo = new THREE.BoxGeometry(40, 40,40)
        const mat = new THREE.MeshBasicMaterial({color: 0xff0000})
        const mesh = new THREE.Mesh(geo, mat)
        this.scene.add(mesh)
    }

    public animate() {

        this.Controls.controls.update();
        this.renderer.render(this.scene, this.Camera.camera)
        requestAnimationFrame(() => this.animate());
    }

    /**
     * @description 场景宽高变化时调用此方法更新
     * @memberof Scene
     */
    public onResize() {
        setTimeout(() => {
            const width = this.rootDom.offsetWidth;
            const height = this.rootDom.offsetHeight;
            if (width !== this.width || height !== this.height) {
                this.width = width;
                this.height = height;
                this.Camera.camera.aspect = this.width / this.height;
                this.Camera.camera.updateProjectionMatrix();
                this.renderer.setSize(this.width, this.height);
                this.onResize();
            }
        }, 50)
    }
}

export {
    Scene
}