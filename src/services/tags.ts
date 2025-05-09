
function createTag(name: string) {
  const type = `${name}` as never
  return {
    get list() {
      return { type, id: "LIST" }
    },
    specific(id: string) {
      return { type, id }
    },
  }
}


export const usersTag = createTag("users")

