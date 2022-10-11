export type EnvMode = 'development' | 'production';

export const bindEventForLocation = (envMode: EnvMode | string = 'production') => {
  if (envMode === 'development') {
    document.onmousedown = function _(e) {
      if (e.shiftKey && e.button === 0) {
        e.preventDefault();
        // eslint-disable-next-line no-use-before-define
        sendRequestToOpenFileInEditor(getFilePath(e as Partial<HTMLElement>));
      }
    };
  }
};

const getFilePath = (e: Partial<HTMLElement> | null | undefined): string | null => {
  let element = e;
  if ((e as Event).target) {
    element = (e as Event).target;
  }

  if (!element || !element.getAttribute) {
    return null;
  }

  if (element.getAttribute('code-location')) {
    return element.getAttribute('code-location');
  }

  const parentNode = element.parentNode;
  return getFilePath(parentNode as HTMLElement | null);
};

const sendRequestToOpenFileInEditor = (filePath: string | null) => {
  if (!filePath) {
    return;
  }

  const protocol = window.location.protocol ? window.location.protocol : 'http:';
  const hostname = window.location.hostname ? window.location.hostname : 'localhost';
  const port = window.location.port ? window.location.port : '80';
  const apiPath = 'open-ide';

  const url = `${protocol}//${hostname}:${port}/${apiPath}?filePath=${filePath}`;
  fetch(url).catch((error) => {
    console.log(error);
  });
};
