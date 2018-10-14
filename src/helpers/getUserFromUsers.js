export function getUser(id, users) {
    return users.find(user => user.id === id)
}