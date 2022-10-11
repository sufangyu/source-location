import { codeLineTrack } from '@yu/location-common';

export default function sourceLocationLoader(content: string) {
  return codeLineTrack(content, this.resourcePath);
}
