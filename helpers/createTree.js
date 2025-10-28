let count =0;
const createTree= (arr, parentId = "")=> {
    const tree = [];
    arr.forEach(item => {
        if (item.parent_id === parentId) {
            count ++;
            let newItem = item;
            newItem.index = count;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    count =0;   
    return tree;
}
module.exports.tree= (arr)=>{
    return createTree(arr)
}