export function GET_FILE_CATEGORY_TYPE(fileExtension: string): string {
  if (fileExtension.includes('image')) {
    return 'image';
  } else if (fileExtension.includes('video')) {
    return 'video';
  } else {
    return 'other';
  }
}

export function GET_FILE_TYPE(name: string): string {
  if (name) {
    return name?.split('.').pop()?.toUpperCase() ?? '';
  }
  return ''

}

export function IS_IMAGE_FILE(fileType: string): boolean {
  const IMAGE_TYPES = ['PNG', 'JPG', 'JPEG', 'BMP', 'WEBP', 'JFIF', 'TIFF'];
  return (IMAGE_TYPES as any).includes(fileType.toUpperCase());
}
