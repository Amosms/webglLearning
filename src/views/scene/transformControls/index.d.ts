/*
 * @Date: 2022-08-02 11:24:48
 * @LastEditors: changgeee
 * @LastEditTime: 2022-08-02 11:24:48
 * @FilePath: \ipems-r\src\views\scene\transformControls\index.d.ts
 */


export interface TransControlsOptions {
    type:'TransformControls';
    /** 是否启用控制器 */
    enabled?:boolean;
    /** 渲染场景的相机 */
    camera?:any;
    /** HTMLDOMElement用于监听鼠标/触摸事件 */
    domElement:HTMLElement;

}
