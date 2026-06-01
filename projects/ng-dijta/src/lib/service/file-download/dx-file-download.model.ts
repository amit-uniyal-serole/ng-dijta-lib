/**
 * Options accepted by `DxFileDownloadService.download()`.
 */
export interface DxFileDownloadOptions {
  /** Absolute or app-relative URL. Requests go through HttpClient so the app's auth interceptor attaches. */
  url: string;
  /** Highest-priority filename. Overrides Content-Disposition and URL segment. */
  fileName?: string;
  /** Appended to the resolved filename when it has no extension. Example: '.csv'. Opt-in. */
  defaultExtension?: string;
  /** Optional extra request headers (merged onto the interceptor chain). */
  headers?: Record<string, string>;
}

/**
 * Result emitted by `DxFileDownloadService.download()` once the browser
 * download has been triggered.
 */
export interface DxFileDownloadResult {
  /** Filename that was passed to the anchor's `download` attribute. */
  fileName: string;
  /** Blob that was downloaded. Exposed for callers that want to inspect or re-use it. */
  blob: Blob;
  
}
