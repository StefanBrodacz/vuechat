const getters = {
    findUser: (state) => (id) => {
        let found = null
        for (let currentNode of state.usersTree) {
            found = findNode(id, currentNode)
            if (found !== false)
                return found

        }
        return false
    }
}

function findNode(id, currentNode) {
    if (!('id' in currentNode))
        return false
    if (currentNode.id === id)
        return currentNode

    for (let i = 0; i < currentNode.children.length; i += 1) {
        let currentChild = currentNode.children[i]

        // Search in the current child
        let result = findNode(id, currentChild)

        // Return the result if the node has been found
        if (result !== false) {
            return result
        }
    }
    return false
}

export default getters
