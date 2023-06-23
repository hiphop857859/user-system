
export const addRegex = (param, search) => {
  const result = {
    $or: []
  }
  for (const key of param) {
    const query = { [`${key}`]: { $regex: search, $options: 'i' } }
    result.$or.push(query)
  }
  return result
}
