// 文件树内容
var fileStructure = [
    {
        text: "Project1",
        nodes: [
            {
                text: "RS images",
                nodes: [
                    {
                        text: "05-11-1.raw",
                        nodes:[
                            {
                                text: "05-11-1_new-1.raw"
                            },
                            {
                                text: "05-11-1_new-1.tif"
                            },
                            {
                                text: "05-11-1_new-2.raw"
                            },
                            {
                                text: "05-11-1_new-2.tif"
                            }
                        ]
                    },
                    // {
                    //     text: "05-11-2.raw"
                    // }
                ]
            },
            {
                text: "Configuration File",
                nodes: [
                    {
                        text: "task.json"
                    },
                    {
                        text: "settings.json"
                    },
                    {
                        text: "CMV2K-SSM5x5-600_1000-5.5.18.6-NEW.xml"
                    }
                ]
            },
            {
                text: "Results",
                nodes: [
                    {
                        text: "反射率曲线"
                    }
                ]
            }
        ]
    }
];

$('#tree').treeview({ data: fileStructure });