import { codeLineTrack } from '@yu/location-common';

export default function sourceLocation() {
  return {
    name: 'vite:source-location',
    transform(code: string, id: string) {
      const index = id.lastIndexOf('.');
      const ext = id.substr(index + 1);
      if (ext.toLowerCase() === 'vue') {
        return codeLineTrack(code, id);
      }

      return code;
    }
  };
}
