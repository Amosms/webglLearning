/*
 * @Date: 2022-07-26 12:04:18
 * @LastEditors: changgeee
 * @LastEditTime: 2022-08-19 14:43:20
 * @FilePath: \ipems-r\src\views\scene\mock.ts
 */
import type { SceneOptions } from './scene.d';

const sceneConfig: SceneOptions = {
  camera: {
    type: "PerspectiveCamera",
    fov: 45,
    near: 1,
    far: 5000,
    position: {
      x: 10,
      y: 10,
      z: 1000,
    },
    lookAt: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  controls: {

  },
  lights: [
    {
      type: "AmbientLight",
      intensity: 1
    },
    // {
    //   type: "DirectionalLight",
    //   uuid: '2',
    //   intensity: 1,
    //   position: {
    //     x: 10,
    //     y: 10,
    //     z: 1000,
    //   },
    //   lookAt: {
    //     x: 0,
    //     y: 0,
    //     z: 0
    //   }
    // },
  ],
  models: [
    {
      name: "nurbs",
      type: "FBX",
      url: "/app/3d-resource/test/nurbs.fbx"
    },
    {
      name: "nurbs_copy",
      type: "CLONE",
      path: 'u_nurbs_',
    },
    {
      name: 'Object_1_copy',
      type: "CLONE",
      path: 'u_nurbs_copy_Object_1_'
    },
    // {
    //   name: 'lifangti_copy',
    //   type: "CLONE",
    //   path: 'u_multipleMaterial_lifangti_'
    // },
    {
      name: "立方体",
      type: "GEOMETRY",
      structure: 'BoxGeometry'
    },
    {
      name: "multipleMaterial",
      type: "FBX",
      url: "/app/3d-resource/multipleMaterial.fbx"
    },
    {
      name: "multipleMaterial_copy_1",
      type: "CLONE",
      path: "u_multipleMaterial_"
    },
    {
      name: "chinaMap",
      type: "FBX",
      url: "/app/3d-resource/chinaMap/model/chinaMap.fbx"
    },
    // {
    //   name: 'xinjiang_xinjiang_3_copy',
    //   type: 'CLONE',
    //   path: 'u_chinaMap_xinjiang_xinjiang_3_'
    // }
  ],
  dataConf: {},
  events: {},
  actions: {},
  modelAttrs: {
    "u_multipleMaterial_": {
      path: ['multipleMaterial'],
      copyIndex: 1
    },
    "u_nurbs_": {
      path: ['nurbs'],
      label: "模型nurbs啊",
      position: {
        x: 1,
        y: 1,
        z: 1
      }
    },
    "u_nurbs_Object_1_": {
      path: ['nurbs', "Object_1"],
      label: "模型nurbs啊_1",
      position: {
        x: -10,
        y: 0,
        z: 0
      }
    },
    "u_nurbs_copy_": {
      path: ['nurbs_copy'],
      label: "模型nurbs啊_copy",
      position: {
        x: 10,
        y: 1,
        z: 1
      },
      scale: {
        x: 0.1,
        y: 0.1,
        z: 0.1
      }
    },
    // "u_lifangti_copy_": {
    //   path: [],
    //   label: '立方体_copy',
    //   position: {
    //     x: 250,
    //     y: 0,
    //     z: 0
    //   }
    // },
    "u_chinaMap_jiuduan_": {
      path: ['chinaMap', 'jiuduan'],
      label: '九段线',
      materials: [
        {
          type: 'MeshLambertMaterial',
          map: '/app/3d-resource/chinaMap/texture/jiuduan.png',
          side: 2,
          transparent: true,
          opacity: 1.0,
          alphaMap: "/api/ipems-x/upload/img/2022-08-23/67a4b944b8c344b49f2126c02661cda3.png"
        }
      ]
    },
    "u_chinaMap_xinjiang_xinjiang_3_": {
      path: ['chinaMap', 'xinjiang', 'xinjiang_3'],
      materials: [
        {
          transparent: true,
          side: 2,
          opacity: 0.6,
          color: {
            b: 0.96,
            g: 0.66,
            isColor: true,
            r: 0.01
          }
        }
      ]
    },
    // "u_xinjiang_xinjiang_3_copy_": {
    //   path: ['chinaMap', 'xinjiang', 'xinjiang_3_copy'],
    //   position: {
    //     x: 0,
    //     y: 250,
    //     z: 0
    //   }
    // },
    "u_multipleMaterial_copy_1_lifangti_": {
      path: ['multipleMaterial_copy_1', 'lifangti'],
      position: {
        x: -250,
        y: 0,
        z: 0
      },
      materials: [
        {
          type: 'MeshLambertMaterial',
          transparent: true,
          side: 2,
          opacity: 0.9,
          color: {
            b: 0.21,
            g: 0.32,
            isColor: true,
            r: 1.
          }
        }
      ]
    },
    "u_multipleMaterial_lifangti_": {
      path: ['multipleMaterial', 'lifangti'],
      materials: [
        ,
        {
          type: 'MeshLambertMaterial',
          transparent: true,
          side: 2,
          opacity: 0.6,
          color: {
            b: 0.96,
            g: 0.66,
            isColor: true,
            r: 0.01
          }
        }
      ]
    }
  },
  globalData: [],
  globalAction: []
}


export default sceneConfig;
