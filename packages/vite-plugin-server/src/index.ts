import { openEditor } from '@yu/location-common';

export interface VitePlugin {
  name: string;
  apply: 'build' | 'serve' | undefined;
  configureServer(server: any): void;
}

export interface SourceLocationServerOptions {
  // 编辑器类型. 默认是 vscode, 支持 vscode、webstorm
  editor: 'vscode' | 'webstorm';
}

export default function sourceLocationServer(
  options: SourceLocationServerOptions = { editor: 'vscode' }
): VitePlugin {
  return {
    name: 'vite:source-location-server',
    apply: 'serve',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const parsedUrl = (req as any)._parsedUrl;
        if (parsedUrl.pathname === '/open-ide') {
          openEditor(req, options.editor);
        }

        next();
      });
    }
  };
}
