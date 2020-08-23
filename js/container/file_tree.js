// 文件树内容
var fileStructure = [
    {
        text: "Project1",
        nodes: [
            {
                text: "RS images",
                nodes: [
                    {
                        text: "1.png"
                    },
                    {
                        text: "2.png"
                    }
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
                text: "Results"
            }
        ]
    }
];

$('#tree').treeview({ data: fileStructure });