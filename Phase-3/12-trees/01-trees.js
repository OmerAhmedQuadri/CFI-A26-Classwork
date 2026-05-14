class Node {
    constructor(value) {
        this.left = null;
        this.value = value;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    insert(value)   {
        if(value === null || value === undefined) {
            return;
        }
        
        const newNode = new Node(value);

        // check if tree is empty
        if(this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while(true) {
            // go left
            if(value < current.value) {
                if(current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } 
            
            // go right
            else {
                if(current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    search(value) {
        if(value === null || value === undefined) {
            return false;
        }

        let current = this.root;
        while(current) {
            if(value < current.value) {
                current = current.left;
            } else if(value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }
        return false;
    }
}


const tree = new Tree()
console.log(tree);
tree.insert(10);
console.log(tree);
tree.insert(12);
console.log(tree);
tree.insert(13);
console.log(tree);
tree.insert(14);
console.log(tree);
console.log(tree.search(24));
console.log(tree.search(14));