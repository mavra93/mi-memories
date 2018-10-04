export function createdBy(memory, users) {
    return users.find(user => user.id === memory.createdBy)
}