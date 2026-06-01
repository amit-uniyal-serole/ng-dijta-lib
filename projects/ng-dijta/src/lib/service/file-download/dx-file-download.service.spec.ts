import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DxFileDownloadService } from './dx-file-download.service';

describe('DxFileDownloadService', () => {
  let service: DxFileDownloadService;
  let httpMock: HttpTestingController;
  let createObjectURLSpy: jasmine.Spy;
  let revokeObjectURLSpy: jasmine.Spy;
  let anchorStub: { href: string; download: string; click: jasmine.Spy };
  let createElementOrig: <K extends keyof HTMLElementTagNameMap>(tagName: K) => HTMLElementTagNameMap[K];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DxFileDownloadService],
    });
    service = TestBed.inject(DxFileDownloadService);
    httpMock = TestBed.inject(HttpTestingController);

    createObjectURLSpy = spyOn(URL, 'createObjectURL').and.returnValue('blob:fake');
    revokeObjectURLSpy = spyOn(URL, 'revokeObjectURL');
    anchorStub = { href: '', download: '', click: jasmine.createSpy('click') };
    createElementOrig = document.createElement.bind(document);
    spyOn(document, 'createElement').and.callFake(((tag: string) =>
      tag === 'a' ? (anchorStub as unknown as HTMLAnchorElement) : createElementOrig(tag as any)
    ) as typeof document.createElement);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('uses options.fileName when provided (highest priority)', () => {
    service.download({ url: 'https://example.com/v1/site/sample-file', fileName: 'explicit.csv' })
      .subscribe();

    const req: TestRequest = httpMock.expectOne('https://example.com/v1/site/sample-file');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(new Blob(['x']), {
      headers: new HttpHeaders({ 'Content-Disposition': 'attachment; filename="from-header.csv"' }),
    });

    expect(anchorStub.download).toBe('explicit.csv');
    expect(anchorStub.click).toHaveBeenCalled();
  });

  it('falls back to Content-Disposition filename when options.fileName is absent (quoted form)', () => {
    service.download({ url: 'https://example.com/v1/site/sample-file' }).subscribe();

    const req: TestRequest = httpMock.expectOne('https://example.com/v1/site/sample-file');
    req.flush(new Blob(['x']), {
      headers: new HttpHeaders({ 'Content-Disposition': 'attachment; filename="server.csv"' }),
    });

    expect(anchorStub.download).toBe('server.csv');
  });

  it('parses RFC-5987 Content-Disposition filename* (UTF-8 percent-encoded)', () => {
    service.download({ url: 'https://example.com/file' }).subscribe();

    const req: TestRequest = httpMock.expectOne('https://example.com/file');
    req.flush(new Blob(['x']), {
      headers: new HttpHeaders({
        'Content-Disposition': "attachment; filename*=UTF-8''r%C3%A9sum%C3%A9.pdf",
      }),
    });

    expect(anchorStub.download).toBe('résumé.pdf');
  });

  it('falls back to URL last path segment when no fileName and no Content-Disposition', () => {
    service.download({ url: '/dx-lcnc-sdr-api/v1/site/sample-file' }).subscribe();

    const req: TestRequest = httpMock.expectOne('/dx-lcnc-sdr-api/v1/site/sample-file');
    req.flush(new Blob(['x']));

    expect(anchorStub.download).toBe('sample-file');
  });

  it('falls back to literal "download" when URL has no path segments', () => {
    service.download({ url: 'https://example.com/' }).subscribe();

    const req: TestRequest = httpMock.expectOne('https://example.com/');
    req.flush(new Blob(['x']));

    expect(anchorStub.download).toBe('download');
  });

  it('appends defaultExtension when resolved name has no extension', () => {
    service.download({ url: '/v1/site/sample-file', defaultExtension: '.csv' }).subscribe();

    const req: TestRequest = httpMock.expectOne('/v1/site/sample-file');
    req.flush(new Blob(['x']));

    expect(anchorStub.download).toBe('sample-file.csv');
  });

  it('does NOT append defaultExtension when resolved name already has an extension', () => {
    service.download({ url: '/v1/sample.csv', defaultExtension: '.txt' }).subscribe();

    const req: TestRequest = httpMock.expectOne('/v1/sample.csv');
    req.flush(new Blob(['x']));

    expect(anchorStub.download).toBe('sample.csv');
  });

  it('normalises defaultExtension that lacks a leading dot', () => {
    service.download({ url: '/v1/site/sample-file', defaultExtension: 'csv' }).subscribe();

    const req: TestRequest = httpMock.expectOne('/v1/site/sample-file');
    req.flush(new Blob(['x']));

    expect(anchorStub.download).toBe('sample-file.csv');
  });

  it('merges options.headers onto the HttpClient request', () => {
    service.download({ url: '/v1/file', headers: { 'X-Token': 'abc' } }).subscribe();

    const req: TestRequest = httpMock.expectOne('/v1/file');
    expect(req.request.headers.get('X-Token')).toBe('abc');
    req.flush(new Blob(['x']));
  });

  it('triggers blob download via anchor click with the resolved fileName', () => {
    service.download({ url: '/v1/sample.csv' }).subscribe();

    const req: TestRequest = httpMock.expectOne('/v1/sample.csv');
    const blob = new Blob(['payload'], { type: 'text/csv' });
    req.flush(blob);

    expect(createObjectURLSpy).toHaveBeenCalledWith(blob);
    expect(anchorStub.href).toBe('blob:fake');
    expect(anchorStub.download).toBe('sample.csv');
    expect(anchorStub.click).toHaveBeenCalled();
  });

  it('defers URL.revokeObjectURL via setTimeout(0) — not called synchronously', fakeAsync(() => {
    service.download({ url: '/v1/sample.csv' }).subscribe();

    const req: TestRequest = httpMock.expectOne('/v1/sample.csv');
    req.flush(new Blob(['x']));

    expect(revokeObjectURLSpy).not.toHaveBeenCalled();
    tick(0);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:fake');
  }));

  it('emits a DxFileDownloadResult with fileName + blob on success', () => {
    let result: { fileName: string; blob: Blob } | undefined;
    service.download({ url: '/v1/sample.csv' }).subscribe(r => (result = r));

    const req: TestRequest = httpMock.expectOne('/v1/sample.csv');
    const blob = new Blob(['payload'], { type: 'text/csv' });
    req.flush(blob);

    expect(result?.fileName).toBe('sample.csv');
    expect(result?.blob).toBe(blob);
  });

  it('errors observable on HTTP failure; does not click anchor', () => {
    const errorSpy = jasmine.createSpy('error');
    service.download({ url: '/v1/file' }).subscribe({ next: () => {}, error: errorSpy });

    const req: TestRequest = httpMock.expectOne('/v1/file');
    req.flush('nope', { status: 401, statusText: 'Unauthorized' });

    expect(errorSpy).toHaveBeenCalled();
    expect(anchorStub.click).not.toHaveBeenCalled();
    expect(createObjectURLSpy).not.toHaveBeenCalled();
  });

  it('errors observable when response body is empty; does not click anchor', () => {
    const errorSpy = jasmine.createSpy('error');
    service.download({ url: '/v1/file' }).subscribe({ next: () => {}, error: errorSpy });

    const req: TestRequest = httpMock.expectOne('/v1/file');
    req.flush(null);

    expect(errorSpy).toHaveBeenCalled();
    expect(anchorStub.click).not.toHaveBeenCalled();
    expect(createObjectURLSpy).not.toHaveBeenCalled();
  });
});
