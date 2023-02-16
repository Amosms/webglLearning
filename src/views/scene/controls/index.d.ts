/*
 * @Date: 2022-08-02 11:24:36
 * @LastEditors: changgeee
 * @LastEditTime: 2022-08-16 11:56:22
 * @FilePath: \ipems-r\src\views\scene\controls\index.d.ts
 */


export interface ControlsOptions {
    type?:'OrbitControls';
    /** 自动围绕目标旋转 */
    autoRotate?: boolean;
    /** 围绕目标旋转的速度 */
    autoRotateSpeed?: number;
    /** 阻尼惯性 */
    dampingFactor?: number;
    /** HTMLDOMElement用于监听鼠标/触摸事件 */
    domElement?:HTMLElement;
    /** 是否启用控制器 */
    enabled?:boolean;
    /** 水平旋转的角度上限 */
    maxAzimuthAngle?: number,
    /** 水平旋转的角度下限 */
    minAzimuthAngle?: number,
    /** 垂直旋转的角度上限 */
    maxPolarAngle?: number,
    /** 垂直旋转的角度下限 */
    minPolarAngl?: number,

    /** 控制器焦点 */
    target?:{
        x?:number,
        y?:number,
        z?:number,
    }
}

