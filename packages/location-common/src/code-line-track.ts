/**
 * 每行代码埋数据
 *
 * @param code 文件内容
 * @param path 文件路径
 * @returns
 */
export const codeLineTrack = (code: string, path: string): string => {
  const lineList = code.split('\n');
  const newList: string[] = [];
  lineList.forEach((item, index) => {
    const lineCode = getLineCode(item, index + 1, path);
    newList.push(lineCode);
  });

  return newList.join('\n');
};

/**
 * 获取增加行信息属性后的行代码
 *
 * @param lineCode 当前行的代码内容
 * @param index 行号
 * @param path 文件路径
 * @returns
 */
const getLineCode = (lineCode: string, line: number, path: string): string => {
  let newLineCode = lineCode;

  if (!/^\s+</.test(lineCode)) {
    // 非 html 标签
    return newLineCode;
  }

  const reg = /((((^(\s)+\<))|(^\<))[\w-]+)|(<\/template)/g;
  let leftTagList = lineCode.match(reg);
  // console.log("leftTagList: ", leftTagList);

  if (leftTagList) {
    // 是 template 的标签
    leftTagList = Array.from(new Set(leftTagList));
    leftTagList.forEach((item) => {
      const skip = [
        'KeepAlive',
        'template',
        'keep-alive',
        'transition',
        'router-view',
        // 'el-',
        // 'El',
        // 'van-',
        // 'Van',
        'use'
      ];
      const isIgnoreTag = skip.some((i) => item.indexOf(i) > -1);
      if (item && !isIgnoreTag) {
        const regAttr = new RegExp(`${item}`);
        const location = `${item} code-location="${path}:${line}"`;
        newLineCode = lineCode.replace(regAttr, location);
      }
    });
  }

  return newLineCode;
};
