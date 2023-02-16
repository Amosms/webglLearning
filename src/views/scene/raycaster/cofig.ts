export default {
  name: "相机属性配置",
  children: [
    {
        name: "视角",
        key: "fov",
        description: "相机视角",
        type: "number",
        defaultValue: 45,
        min: 0,
        max:90,
    },
    {
        name: "近端值",
        key: "near",
        description: "相机近端面",
        type: "number",
        defaultValue: 45,
        min: 0,
    },
    {
        name: "远端值",
        key: "far",
        description: "相机远端面",
        type: "number",
        defaultValue: 1000,
        min: 0,
    },
    {
      name: "位置",
      key: "position",
      description: "相机位置",
      type: "Vector",
      children:[
        {
          name: "x",
          key: "x",
          description: "x",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "y",
          key: "y",
          description: "y",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "z",
          key: "z",
          description: "z",
          type: "number",
          defaultValue: 0,
        }
      ]
    },
    // {
    //   name: "target",
    //   key: "target",
    //   description: "控制器的焦点",
    //   type: "Vector",
    //   children:[
    //     {
    //       name: "x",
    //       key: "x",
    //       description: "x",
    //       type: "number",
    //       defaultValue: 0,
    //     },
    //     {
    //       name: "y",
    //       key: "y",
    //       description: "y",
    //       type: "number",
    //       defaultValue: 0,
    //     },
    //     {
    //       name: "z",
    //       key: "z",
    //       description: "z",
    //       type: "number",
    //       defaultValue: 0,
    //     }
    //   ]
    // }
  ]
}

