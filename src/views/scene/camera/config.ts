/*
 * @Date: 2022-08-15 15:54:16
 * @LastEditors: changgeee
 * @LastEditTime: 2022-08-16 17:52:26
 * @FilePath: \ipems-r\src\views\scene\camera\config.ts
 */
export default {
  name: "相机属性配置",
  key: "camera",
  children: [
    {
      name: "视角",
      key: "fov",
      path: "fov",
      description: "相机视角",
      type: "number",
      defaultValue: 45,
      min: 0,
      max: 90,
    },
    {
      name: "近端值",
      key: "near",
      path: "near",
      description: "相机近端面",
      type: "number",
      defaultValue: 1,
      min: 0,
    },
    {
      name: "远端值",
      key: "far",
      path: "far",
      description: "相机远端面",
      type: "number",
      defaultValue: 10000,
      min: 0,
    },
    {
      name: "位置",
      key: "position",
      description: "相机位置",
      type: "Vector",
      children: [
        {
          name: "x",
          key: "x",
          path: "position.x",
          description: "x",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "y",
          key: "y",
          path: "position.y",
          description: "y",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "z",
          key: "z",
          path: "position.z",
          description: "z",
          type: "number",
          defaultValue: 0,
        }
      ]
    },
    {
      name: "焦点",
      key: "lookAt",
      description: "相机的焦点",
      type: "lookAt",
      children: [
        {
          name: "x",
          key: "x",
          path: "lookAt.x",
          description: "x",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "y",
          key: "y",
          path: "lookAt.y",
          description: "y",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "z",
          key: "z",
          path: "lookAt.z",
          description: "z",
          type: "number",
          defaultValue: 0,
        }
      ]
    }
  ]
}

