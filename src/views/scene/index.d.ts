/*
 * @Date: 2022-07-26 13:27:28
 * @LastEditors: changgeee
 * @LastEditTime: 2023-01-17 17:56:33
 * @FilePath: \ipems-r\src\views\scene\scene.d.ts
 */

import { CameraOptions } from "./camera/index.d";
import { ControlsOptions } from "./controls/index.d";
import { LightsOptions } from "./lights/index.d";
import { TreeBranchTypes, ModelTypes, ModelAttrTypes, ModelStatusListTypes } from "./models/index.d";

export interface SceneOptions {
    camera?: CameraOptions;
    controls?: ControlsOptions;
    lights?: LightsOptions[];
    models?: ModelTypes[];
    dataConf?: any;
    events?: {
        [id: string]: Array<{
            type: "click" | "dbclick";
            name: string;
            id: string;
        }>
    };
    actions?: any;
    helpers?: any;
    /** 模型属性配置 */
    modelAttrs?: ModelAttrTypes;
    /**模型状态配置 */
    status?: ModelStatusListTypes;
    /** 全局数据源 */
    globalData?: Array<any>;
    /** 全局行为 */
    globalAction?: Array<any>;
    background?: any;
    bloom?: any;
    sprites?: any[];
}


export interface ConfigTypes {
    width: number;
    height: number;
    rootDom: HTMLElement;
    options: SceneOptions;
    /**
     * 蓝图编辑器配置详情
     */
    eventRelation?: {
        nodes: any;
        triggers: any;
        comments: any[];
        id: string | number;
    };
    onModelTreeChange?: (treeData: TreeBranchTypes[]) => void;
    onEventTrigger?: (nodeId: string, eventId: string, data: any) => void;
    onActionTrigger?: (nodeId: string, eventId: string, data: any) => void;
    onTransformChange?: (object: any) => void;
    onCloneModel?: any;
    onCloneAttr?: any;
}


export interface AttrTypes {
    name: string;
    // type: string;
    type?: "string" | "number" | "angle" | "boolean" | 'texture' | "Vector" | "Color" | "lookAt" | 'select';
    description?: string;
    defaultValue?: any;
    min?: number;
    max?: number;
}
