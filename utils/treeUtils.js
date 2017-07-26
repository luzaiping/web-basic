function makePath(tree, target) {

  var result,
      done = false,
      path = {};

  function traverse(tree, target, root) {
    var keys = Object.keys(tree);
    forEach(keys, function(key) {
      if (!done) {
        if (key === target) {
          //if we found our target push it to the path
          path[root].push(target);
          //set result to the completed path
          result = path[root];
          //set done to true to exit the search
          done = true;
          return;
        } else {
          //if the node does not match we need to check for children
          var newRoot = tree[key];
          if(Object.keys(newRoot).length > 0) {
            //if node has children, push the key into our path and check the children for our target
            path[root].push(key);
            return traverse(tree[key], target, root);
          }
          //no children means our search of this branch is over
          return;
        }
      }
    });
    //if we leave our for loop but we are not done that means we failed to find our target
    //in this branch, as a result we need to pop each node out of our path before we return
    if (!done){
      path[root].pop();
    }
    return;
  };

  //set an array of the root nodes of our product tree. These are super-categories that are
  //not saved in the item schema, possibly representing types of items, i.e. different schemas.
  var roots = Object.keys(tree);
  roots.forEach(function (root) {
    path[root] = [];
    //traverse our tree, going through each root node until the target leaf is found in the
    //tree defined by that root node.
    traverse(tree[root], target, root);
  });

  return result;
};