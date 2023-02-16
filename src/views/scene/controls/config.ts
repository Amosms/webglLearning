import { number } from "echarts";

export default {
  name: "控制器属性配置",
  children: [
    {
        name: "启用",
        key: "enabled",
        path: "enabled",
        description: "是否启用控制器",
        type: "switch",
        defaultValue: true,
    },
    {
      name: "自动旋转",
        key: "autoRotate",
        path: "autoRotate",
        description: "自动围绕目标旋转",
        type: "switch",
        defaultValue: false,
    },
    {
      name: "水平旋转上限",
        key: "maxAzimuthAngle",
        path: "maxAzimuthAngle",
        description: "水平旋转的角度上限，范围[-180，180]",
        type: "angle",
        defaultValue: 180,
        max:180,
        min:-180,
    },
    {
      name: "水平旋转下限",
        key: "minAzimuthAngle",
        path: "minAzimuthAngle",
        description: "水平旋转的角度下限，范围[-180，-180]",
        type: "angle",
        defaultValue: 0,
        max:180,
        min:-180,
    },
    {
      name: "垂直旋转上限",
        key: "maxPolarAngle",
        path: "maxPolarAngle",
        description: "垂直旋转上限，范围[0，180]",
        type: "angle",
        defaultValue: 180,
        max:180,
        min:0,
    },
    {
      name: "垂直旋转下限",
        key: "minPolarAngle",
        path: "minPolarAngle",
        description: "垂直旋转下限，范围[0，180]",
        type: "angle",
        defaultValue: 0,
        max:180,
        min:0,
    },
    {
      name: "控制器焦点",
      key: "target",
      path: "target",
      description: "控制器的焦点",
      type: "Vector",
      children:[
        {
          name: "x",
          key: "x",
          path: "target.x",
          description: "x",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "y",
          key: "y",
          path: "target.y",
          description: "y",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "z",
          key: "z",
          path: "target.z",
          description: "z",
          type: "number",
          defaultValue: 0,
        }
      ]
    }
  ]
}

