export const getPbImageURL = (item, fileName = 'photo') =>
  `https://petbridge.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`