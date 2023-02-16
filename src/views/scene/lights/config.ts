export default {
  name: "光源配置",
  key: "light",
  children: [
    {
      name: "光源类型",
      key: "type",
      path: "type",
      description: "光源类型",
      type: "select",
      optionType: "STATIC",
      options: [
        { label: "环境光", value: "AmbientLight" },
        { label: "平行光", value: "DirectionalLight" },
      ],
      defaultValue: "AmbientLight",
    }, 
    // {
    //   name: "uuid",
    //   key: "id",
    //   path: "id",
    //   description: "光源uuid,前期调试放开，后续隐藏。",
    //   type: "string",
    // },
    {
      name: "光源名称",
      key: "name",
      path: "name",
      description: "光源名称",
      type: "string",
    },
    {
      name: "强度",
      key: "intensity",
      path: "intensity",
      description: "光源强度",
      type: "number",
      defaultValue: 1,
      min: 0,
    },
    {
      name: "位置",
      key: "position",
      path: "position",
      description: "光源位置",
      type: "Vector",
      children:[
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
      name: "光源焦点",
      key: "target",
      path: "target",
      description: "光源照向的点",
      type: "lookAt",
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

