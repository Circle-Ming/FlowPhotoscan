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
                text: "Results"
            },
            {
                text: "Configuration File",
                nodes: [
                    {
                        text: "task.json"
                    },
                    {
                        text: "settings.json"
                    }
                ]
            }
        ]
    }
];

$('#file-tree').treeview({data: fileStructure});