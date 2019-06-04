export default function() {
  return {
    visitor: {
      Identifier(path, state) {
        const name = path.node.name;
        path.node.name = name.split('').reverse().join('');
      }
    }
  }
}