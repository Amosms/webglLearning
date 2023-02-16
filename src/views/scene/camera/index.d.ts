/*
 * @Date: 2022-08-02 10:36:48
 * @LastEditors: changgeee
 * @LastEditTime: 2022-08-19 10:30:24
 * @FilePath: \ipems-r\src\views\scene\camera\index.d.ts
 */

export interface CameraOptions {
  type?: 'PerspectiveCamera' | ''
  /** 摄像机视锥体垂直视野角度 */
  fov?: number;
  /** 摄像机视锥体近端面 */
  near?: number;
  /** 摄像机视锥体远端面 */
  far?: number;
  position?: {
    x?: number;
    y?: number;
    z?: number;
  };
  lookAt?: {
    x?: number;
    y?: number;
    z?: number;
  };
}


export interface CameraAnimationParamTypes {
  position?: {
    x?: number;
    y?: number;
    z?: number;
  };
  target?: {
    x?: number;
    y?: number;
    z?: number;
  };
}
