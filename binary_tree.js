function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function maxDepth(root) {
  if (root === null) {
    return 0;
  } else {
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
  }
}

// Example usage:
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(maxDepth(root)); // Output: 3

//     3
//   9   20
//     15  7
