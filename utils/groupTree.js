export function getParentKeyPath(groups, targetParentId) {
    let path = ''

    groups.some(function getPath(item, index) {
        let { id, childNode } = item

        path = path ? `${path}.${index}` : `${index}`

        if (id === targetParentId) return true

        let hasChildren = childNode.length > 0
        if (hasChildren) {
            path = `${path}.childNode`
            let result = childNode.some(getPath)
            if (result) return result
        } else {
            path = ''
        }
        return false
    })
    return path
}

let groups = [
    { "id": "596ef0ab2430a1379f1f3389", 
      "tenant": 491036501742,
      "name": "雅域部门",
      "parent_id": "0", 
      "need_check": false, 
      "child_node": [{ 
          "id": "596ef1652430a1379f1f338a", 
          "tenant": 491036501742, 
          "name": "保洁部", 
          "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [{ "id": "59787edb45ced581b3979686", "tenant": 491036501742, "name": "保洁一组", "parent_id": "596ef1652430a1379f1f338a", "need_check": false, "child_node": [] }, { "id": "59787ee245ced581b3979687", "tenant": 491036501742, "name": "保洁二组", "parent_id": "596ef1652430a1379f1f338a", "need_check": false, "child_node": [] }] }, { "id": "596ef1752430a1379f1f338b", "tenant": 491036501742, "name": "安保部", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [{ "id": "59787eec45ced581b3979688", "tenant": 491036501742, "name": "安保一组", "parent_id": "596ef1752430a1379f1f338b", "need_check": false, "child_node": [{ "id": "59787f1845ced581b397968a", "tenant": 491036501742, "name": "安保特勤组", "parent_id": "59787eec45ced581b3979688", "need_check": false, "child_node": [] }, { "id": "59787f3a45ced581b397968b", "tenant": 491036501742, "name": "安保333", "parent_id": "59787eec45ced581b3979688", "need_check": false, "child_node": [] }, { "id": "59787f8045ced581b3979690", "tenant": 491036501742, "name": "5555", "parent_id": "59787eec45ced581b3979688", "need_check": false, "child_node": [] }, { "id": "59787f9645ced581b3979691", "tenant": 491036501742, "name": "6666", "parent_id": "59787eec45ced581b3979688", "need_check": false, "child_node": [] }, { "id": "5978805e45ced581b3979692", "tenant": 491036501742, "name": "得大典的", "parent_id": "59787eec45ced581b3979688", "need_check": false, "child_node": [] }, { "id": "5978808045ced581b3979693", "tenant": 491036501742, "name": "风格", "parent_id": "59787eec45ced581b3979688", "need_check": false, "child_node": [] }, { "id": "597881a745ced581b3979694", "tenant": 491036501742, "name": "否丰富发", "parent_id": "59787eec45ced581b3979688", "need_check": false, "child_node": [] }] }, { "id": "59787eed45ced581b3979689", "tenant": 491036501742, "name": "安保一组", "parent_id": "596ef1752430a1379f1f338b", "need_check": false, "child_node": [] }] }, { "id": "597874f645ce4a3d14d9ba58", "tenant": 491036501742, "name": "保安科", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "5978763945ced581b397967a", "tenant": 491036501742, "name": "公安厅", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "5978768845ced581b397967b", "tenant": 491036501742, "name": "教育局", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "597876bf45ced581b397967c", "tenant": 491036501742, "name": "交通部", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "597877ae45ced581b397967d", "tenant": 491036501742, "name": "小卖部", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "597878d345ced581b397967e", "tenant": 491036501742, "name": "音乐厅", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "597878ee45ced581b397967f", "tenant": 491036501742, "name": "美术部", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "597879d345ced581b3979680", "tenant": 491036501742, "name": "安全科", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "597879ed45ced581b3979681", "tenant": 491036501742, "name": "还有什么", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "59787b6445ced581b3979682", "tenant": 491036501742, "name": "工程院", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "59787d3245ced581b3979683", "tenant": 491036501742, "name": "经济部", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "59787ec645ced581b3979684", "tenant": 491036501742, "name": "再试一个看看", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }, { "id": "59787ece45ced581b3979685", "tenant": 491036501742, "name": "最后一个", "parent_id": "596ef0ab2430a1379f1f3389", "need_check": false, "child_node": [] }] }, { "id": "5975acfe45ce0c2c97c0d067", "tenant": 491036501742, "name": "雅域", "parent_id": "0", "need_check": false, "child_node": [{ "id": "59787f6845ced581b397968c", "tenant": 491036501742, "name": "1111", "parent_id": "5975acfe45ce0c2c97c0d067", "need_check": false, "child_node": [{ "id": "59787f6c45ced581b397968d", "tenant": 491036501742, "name": "2222", "parent_id": "59787f6845ced581b397968c", "need_check": false, "child_node": [{ "id": "59787f7145ced581b397968e", "tenant": 491036501742, "name": "3333", "parent_id": "59787f6c45ced581b397968d", "need_check": false, "child_node": [{ "id": "59787f7745ced581b397968f", "tenant": 491036501742, "name": "4444", "parent_id": "59787f7145ced581b397968e", "need_check": false, "child_node": [] }] }] }] }] }, { "id": "59769e5e45ceaa95196234dd", "tenant": 491036501742, "name": "雅域", "parent_id": "0", "need_check": false, "child_node": [] }, { "id": "59769f9e45ceaa95196234de", "tenant": 491036501742, "name": "雅域", "parent_id": "0", "need_check": false, "child_node": [] }]


let group2 = [
    {
        "name": "雅域部门",
        "id": "1",
        "parentId": "0",
        "childNode": [
            {
                "name": "安保部",
                "id": "1-1",
                "parentId": "1",
                "childNode": [
                    {
                        "name": "安保部安保部",
                        "id": "1-1-1",
                        "parentId": "1-1",
                        "childNode": [
                            {
                                "name": "安保部安保部11",
                                "parentId": "1-1-1",
                                "id": "1-1-1-1",
                                "childNode": []
                            },
                            {
                                "name": "安保部安保部12",
                                "parentId": "1-1-1",
                                "id": "1-1-1-2",
                                "childNode": []
                            }
                        ]
                    },
                    {
                        "name": "安保部本部",
                        "id": "1-1-2",
                        "parentId": "1-1",
                        "childNode": []
                    }
                ]
            },
            {
                "name": "保洁部",
                "id": "1-2",
                "parentId": "1",
                "childNode": [
                    {
                        "name": "保洁部1",
                        "parentId": "1-2",
                        "id": "1-2-1",
                        "childNode": []
                    },
                    {
                        "name": "保洁部2",
                        "parentId": "1-2",
                        "id": "1-2-2",
                        "childNode": []
                    }
                ]
            },
            {
                "name": "采购部",
                "parentId": "1",
                "id": "1-3",
                "childNode": []
            },
            {
                "name": "宣传部",
                "parentId": "1",
                "id": "1-4",
                "childNode": []
            },
            {
                "name": "策划部",
                "parentId": "1",
                "id": "1-5",
                "childNode": []
            }
        ]
    },
    {
        "name": "厦门分部",
        "id": "2",
        "parentId": "0",
        "childNode": [
            {
                "name": "安保部",
                "parentId": "2",
                "id": "2-1",
                "childNode": [
                    {
                        "name": "安保部安保部",
                        "parentId": "2-1",
                        "id": "2-1-1",
                        "childNode": []
                    },
                    {
                        "name": "安保部本部",
                        "parentId": "2-2",
                        "id": "2-1-2",
                        "childNode": []
                    }
                ]
            }
        ]
    }
]

