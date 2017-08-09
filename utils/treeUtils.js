/**
 * 根据目标节点id获取对应的path，path要求从根节点一直到目标节点：parent.childNode.0  类似这样的结构
 * @param {*} groups 
 * @param {*} targetId 
 */
function getKeyPath(groups, targetId) {
    let path = {}
    let done = false
    let result = ''

    groups.forEach(function (item, index) {
        path[index] = [index]
        traverse(item, index)
    })

    return result

    function traverse(item, rootKey) {
        if (done) return

        let { id, childNode = [] } = item

        // 找到目标id，设置done为true
        if (id === targetId) {
            done = true
            result = path[rootKey].join('.')
        } else {
            // 当前节点没有找到，有子节点，递归子节点, 同时添加子节点路径
            if (childNode.length > 0) {
                childNode.forEach(function (item, index) {
                    // 需先判断同级的前面节点是否已经找到，如果找到，就不往下继续了
                    if (!done) {
                        path[rootKey].push(`childNode.${index}`)
                        traverse(item, rootKey) // 递归子节点
                    }
                })
            }
        }
        // 如果当前节点没有找到targetId，则弹出之前添加的keypath
        if (!done) {
            path[rootKey].pop()
        }
    }
}