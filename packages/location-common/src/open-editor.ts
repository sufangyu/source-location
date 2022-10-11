import os from 'os';
import childProcess from 'child_process';

export type EditorType = 'vscode' | 'webstorm';

export const openEditor = (req: any, editorType: EditorType | string = 'vscode') => {
  // childProcess.exec(`code -r -g ${path}`);
  const parsedUrl = (req as any)._parsedUrl;
  const [_, path] = parsedUrl.query ? parsedUrl.query.split('=') : ['', ''];
  if (path && path !== 'null') {
    if (editorType === 'webstorm') {
      const linePath = path.split(':')[1];
      const filePath = path.split(':')[0];
      const platform = formatOS();
      if (platform === 'MacOS') {
        childProcess.exec(`webstorm --line ${linePath} ${filePath}`);
      } else if (platform === 'Windows') {
        childProcess.exec(`webstorm64.exe  --line ${linePath} ${filePath}`);
      } else {
        childProcess.exec(`webstorm64  --line ${linePath} ${filePath}`);
      }
    } else {
      childProcess.exec(`code -r -g ${path}`);
    }
  }
};

function formatOS() {
  const platform = os.platform();
  switch (platform) {
    case 'darwin':
      return 'MacOS';
    case 'linux':
      return 'Linux';
    case 'win32':
      return 'Windows';
    default:
      return '无法确定操作系统!';
  }
}
