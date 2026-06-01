import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DxFileDownloadOptions, DxFileDownloadResult } from './dx-file-download.model';

/**
 * Downloads files via `HttpClient` so the application's auth interceptor
 * (Authorization header, cookies, etc.) attaches automatically. Resolves a
 * sensible filename from caller input, the response's `Content-Disposition`
 * header, or the URL's last path segment, then triggers a browser download
 * via a blob-backed anchor.
 *
 * Use instead of a bare `<a href={url} download>` when the URL is protected
 * by Bearer-token auth — anchor clicks cannot attach custom headers.
 *
 * @example
 * ```ts
 * private readonly fileDownload = inject(DxFileDownloadService);
 *
 * downloadSample(): void {
 *   this.fileDownload
 *     .download({ url: '/api/v1/site/sample-file', defaultExtension: '.csv' })
 *     .subscribe();
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class DxFileDownloadService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches `options.url` as a blob, resolves a download filename, and
   * triggers a browser download. Returns an observable that emits once the
   * download has been triggered, or errors if the request fails / has an
   * empty body.
   */
  download(options: DxFileDownloadOptions): Observable<DxFileDownloadResult> {
    const headers: HttpHeaders = new HttpHeaders(options.headers ?? {});
    return this.http
      .get(options.url, { responseType: 'blob', observe: 'response', headers })
      .pipe(
        map((response: HttpResponse<Blob>) => {
          if (!response.body) {
            throw new Error('Empty download response body');
          }
          const fileName: string = this.resolveFilename(options, response);
          this.triggerBlobDownload(response.body, fileName);
          return { fileName, blob: response.body };
        })
      );
  }

  private resolveFilename(options: DxFileDownloadOptions, response: HttpResponse<Blob>): string {
    const fromOptions: string | undefined = options.fileName;
    const fromHeader: string | undefined = this.parseFilenameFromContentDisposition(
      response.headers.get('Content-Disposition')
    );
    const fromUrl: string | undefined = this.extractFilenameFromUrl(options.url);
    const resolved: string = fromOptions ?? fromHeader ?? fromUrl ?? 'download';
    return this.applyDefaultExtension(resolved, options.defaultExtension);
  }

  private applyDefaultExtension(name: string, defaultExtension: string | undefined): string {
    if (!defaultExtension) {
      return name;
    }
    if (this.hasExtension(name)) {
      return name;
    }
    const normalized: string = defaultExtension.startsWith('.')
      ? defaultExtension
      : `.${defaultExtension}`;
    return `${name}${normalized}`;
  }

  private hasExtension(name: string): boolean {
    const lastDot: number = name.lastIndexOf('.');
    return lastDot > 0 && lastDot < name.length - 1;
  }

  private parseFilenameFromContentDisposition(header: string | null): string | undefined {
    if (!header) {
      return undefined;
    }
    const utf8Match: RegExpExecArray | null = /filename\*\s*=\s*UTF-8''([^;]+)/i.exec(header);
    if (utf8Match?.[1]) {
      try {
        return decodeURIComponent(utf8Match[1].trim());
      } catch {
        // fall through to the standard form
      }
    }
    const standardMatch: RegExpExecArray | null = /filename\s*=\s*"?([^";]+)"?/i.exec(header);
    return standardMatch?.[1]?.trim();
  }

  private extractFilenameFromUrl(rawUrl: string): string | undefined {
    try {
      const origin: string = typeof location !== 'undefined' ? location.origin : 'http://localhost';
      const url: URL = new URL(rawUrl, origin);
      const last: string | undefined = url.pathname.split('/').filter(Boolean).pop();
      return last ? decodeURIComponent(last) : undefined;
    } catch {
      return undefined;
    }
  }

  private triggerBlobDownload(blob: Blob, fileName: string): void {
    const objectUrl: string = URL.createObjectURL(blob);
    const anchor: HTMLAnchorElement = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  }
}
