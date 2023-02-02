export const convertNodeIdToCursor = (node): any => {
  return new Buffer(typeof node + node.id, 'binary').toString('base64');
};

export const convertCursorToNodeId = (cursor) => {
  return new Buffer(cursor, 'base64').toString('binary');
};
