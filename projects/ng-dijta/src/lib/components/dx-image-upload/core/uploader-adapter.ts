import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpParams,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { FilePickerAdapter, UploadResponse, UploadStatus } from "./file-picker.adapter";
import { FilePreviewModel } from "./file-preview.model";
import { AdapterDataModel } from '../model/dx-image-upload.model';
export const UPLOAD_URL = "/dx-lcnc-api/v1/settings/images/upload"

export class UploaderAdapter extends FilePickerAdapter {
  constructor(private http: HttpClient, private data: AdapterDataModel) {
    super();
  }
  public uploadFile(
    fileItem: FilePreviewModel
  ): Observable<UploadResponse | undefined> {

    const form: FormData = new FormData();
    form.append('files', fileItem?.file!);
    if (this.data?.payload) {
      Object.keys(this.data?.payload).forEach((key: string) => {
        if (this.data?.payload) {
          form.append(key, JSON.stringify(this.data?.payload[key]));
        }
      })
    };

    let queryParams: HttpParams = new HttpParams();
    if (this.data?.params) {
      queryParams = queryParams?.appendAll(this.data?.params!);
    }

    const api: string = this.data?.uploadUrl;
    const req: HttpRequest<FormData> = new HttpRequest('POST', api, form, {
      reportProgress: true,
      params: queryParams
    });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          const responseFromBackend = res.body;
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED,
          };
        } else if (res.type === HttpEventType.UploadProgress && res.total) {
          /** Compute and show the % done: */
          const uploadProgress = +Math.round((100 * res.loaded) / res.total);
          return {
            status: UploadStatus.IN_PROGRESS,
            progress: uploadProgress,
          };
        } else {
          return undefined;
        }
      }),
      catchError((er) => {
        return of({ status: UploadStatus.ERROR, body: er });
      })
    );
  }
  public removeFile(id: number): Observable<any> {
    const removeApi: string =
      `${this.data?.removeFileUrl}?id=${id}`;
    return this.http.delete(removeApi, {
      responseType: ('text' as any),
    });
  }
  public downloadFile(): Observable<any> {
    const downloadApi: string =
      `${this.data?.downloadUrl}`;
    return this.http.get(downloadApi, {
      responseType: ('blob' as any),
    });
  }
}
