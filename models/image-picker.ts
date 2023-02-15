export interface ImagePickerConf {
    width?: string;
    height?: string;
    borderRadius?: string;
    aspectRatio?: number | null;
    objectFit?: 'cover' | 'contain' | 'fill' | 'revert' | 'scale-down';
    compressInitial?: number; // Range from [1-100]
    language?: string;
    hideDeleteBtn?: boolean;
    hideDownloadBtn?: boolean;
    hideEditBtn?: boolean;
    hideAddBtn?: boolean;
  }