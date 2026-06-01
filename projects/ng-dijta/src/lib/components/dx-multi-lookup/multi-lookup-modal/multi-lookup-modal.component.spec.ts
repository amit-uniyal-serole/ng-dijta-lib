import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

import { LookupModalService } from '../../dx-lookup';
import { ToastrService } from '../../dx-toastr';
import { DxFileDownloadService } from '../../../service/file-download/dx-file-download.service';
import { DxGlobalConfigService } from '../../../service/global-config/dx-global-config.service';
import { MultiLookupModalComponent } from './multi-lookup-modal.component';
import { MultiLookupModalHelperService } from './multi-lookup-modal.service';

describe('MultiLookupModalComponent', () => {
  let component: MultiLookupModalComponent<any>;
  let fixture: ComponentFixture<MultiLookupModalComponent<any>>;
  let lookupModalServiceSpy: jasmine.SpyObj<LookupModalService<any>>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let fileDownloadServiceSpy: jasmine.SpyObj<DxFileDownloadService>;

  beforeEach(async () => {
    lookupModalServiceSpy = jasmine.createSpyObj('LookupModalService', ['getLookupServiceRequest']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    fileDownloadServiceSpy = jasmine.createSpyObj('DxFileDownloadService', ['download']);

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const globalConfigSpy = jasmine.createSpyObj('DxGlobalConfigService', ['getPageSize', 'getConfigDetails']);
    globalConfigSpy.getPageSize.and.returnValue(undefined);

    await TestBed.configureTestingModule({
      declarations: [MultiLookupModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: LookupModalService, useValue: lookupModalServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: DxGlobalConfigService, useValue: globalConfigSpy },
        { provide: DxFileDownloadService, useValue: fileDownloadServiceSpy },
        MultiLookupModalHelperService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLookupModalComponent);
    component = fixture.componentInstance;
    component.setting = { pageSize: 10, totalItems: 0, pageIndex: 0 } as any;
    component.multiRowSelection = { key: 'pkId', value: [] };
    component.multiRecordSelectionListPkIds = [{ data: [], isPageUnknown: true }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFileSelected (Step 1: pick)', () => {
    beforeEach(() => {
      component.fileUploadConfig = {
        apiConfig: { method: 'POST', api: '/api/upload' },
        accept: '.csv',
        maxSize: 1024,
      };
    });

    it('rejects file with wrong extension and does NOT store the file', () => {
      const file = new File(['hello'], 'oops.txt', { type: 'text/plain' });
      const input = { files: [file], value: 'oops.txt' } as unknown as HTMLInputElement;

      (component as any).onFileSelected(input);

      expect(component.fileError).toMatch(/Invalid file type/);
      expect(component.selectedFile).toBeUndefined();
      expect(lookupModalServiceSpy.getLookupServiceRequest).not.toHaveBeenCalled();
    });

    it('rejects oversize file and does NOT store the file', () => {
      const blob = new Blob([new ArrayBuffer(2049)], { type: 'text/csv' });
      const file = new File([blob], 'big.csv', { type: 'text/csv' });
      const input = { files: [file], value: 'big.csv' } as unknown as HTMLInputElement;

      (component as any).onFileSelected(input);

      expect(component.fileError).toMatch(/File too large/);
      expect(component.selectedFile).toBeUndefined();
      expect(lookupModalServiceSpy.getLookupServiceRequest).not.toHaveBeenCalled();
    });

    it('drag-and-drop: dropped file routes through the same validation', () => {
      const file = new File(['a,b,c'], 'sites.csv', { type: 'text/csv' });
      const dropEvent = {
        preventDefault: jasmine.createSpy('preventDefault'),
        stopPropagation: jasmine.createSpy('stopPropagation'),
        dataTransfer: { files: [file] },
      } as unknown as DragEvent;

      (component as any).onFileDropped(dropEvent);

      expect(dropEvent.preventDefault).toHaveBeenCalled();
      expect(component.selectedFile).toBe(file);
      expect(component.isDragOver).toBeFalse();
      expect(lookupModalServiceSpy.getLookupServiceRequest).not.toHaveBeenCalled();
    });

    it('valid file: stores in selectedFile, clears table, does NOT call the API', () => {
      const file = new File(['a,b,c'], 'sites.csv', { type: 'text/csv' });
      const input = { files: [file], value: 'sites.csv' } as unknown as HTMLInputElement;

      component.dataSource = [{ data: { pkId: 99 } } as any];
      component.setting.totalItems = 1;

      (component as any).onFileSelected(input);

      expect(component.selectedFile).toBe(file);
      expect(component.dataSource.length).toBe(0);
      expect(component.setting.totalItems).toBe(0);
      expect(lookupModalServiceSpy.getLookupServiceRequest).not.toHaveBeenCalled();
      expect(component.fileUploadLoading).toBeFalse();
    });

    it('without fileUploadConfig: returns early, no state change', () => {
      component.fileUploadConfig = undefined;
      const file = new File(['a'], 'sites.csv', { type: 'text/csv' });
      const input = { files: [file], value: 'sites.csv' } as unknown as HTMLInputElement;

      (component as any).onFileSelected(input);

      expect(component.selectedFile).toBeUndefined();
      expect(lookupModalServiceSpy.getLookupServiceRequest).not.toHaveBeenCalled();
    });
  });

  describe('onUploadFile (Step 2: submit)', () => {
    beforeEach(() => {
      component.fileUploadConfig = {
        apiConfig: { method: 'POST', api: '/api/upload' },
      };
      component.selectedFile = new File(['a,b,c'], 'sites.csv', { type: 'text/csv' });
    });

    it('on success (paginated wrapper): populates dataSource and selectAll=true', () => {
      lookupModalServiceSpy.getLookupServiceRequest.and.returnValue(
        of({
          content: [
            { pkId: 1, siteCode: 'A1' },
            { pkId: 2, siteCode: 'A2' },
          ],
        })
      );

      (component as any).onUploadFile();

      expect(lookupModalServiceSpy.getLookupServiceRequest).toHaveBeenCalled();
      expect(component.selectAll).toBeTrue();
      expect(component.dataSource.length).toBe(2);
      expect(component.fileUploadLoading).toBeFalse();
    });

    it('on success (flat array response): populates dataSource', () => {
      lookupModalServiceSpy.getLookupServiceRequest.and.returnValue(
        of([
          { pkId: 486589, siteCode: 'S2RG', siteName: 'Rozelle North' },
          { pkId: 487551, siteCode: 'YWAC', siteName: 'CONCORD WEST SC3' },
          { pkId: 539125, siteCode: '32YU', siteName: 'Jerrabomberra' },
        ])
      );

      (component as any).onUploadFile();

      expect(component.dataSource.length).toBe(3);
      expect(component.selectAll).toBeTrue();
    });

    it('on error: toasts, clears loading flag', () => {
      lookupModalServiceSpy.getLookupServiceRequest.and.returnValue(
        throwError(() => new Error('boom'))
      );

      (component as any).onUploadFile();

      expect(toastrServiceSpy.error).toHaveBeenCalledWith(jasmine.stringMatching(/Failed to process/));
      expect(component.fileUploadLoading).toBeFalse();
    });

    it('without selectedFile: returns early, no API call', () => {
      component.selectedFile = undefined;

      (component as any).onUploadFile();

      expect(lookupModalServiceSpy.getLookupServiceRequest).not.toHaveBeenCalled();
    });
  });

  describe('onRemoveFile', () => {
    it('clears selectedFile + dataSource + selection, but stays in CSV mode', () => {
      component.mode = 'file';
      component.selectedFile = new File(['x'], 'x.csv', { type: 'text/csv' });
      component.dataSource = [{ data: { pkId: 1 } } as any];
      component.setting.totalItems = 1;
      component.selectedRecords = [{ data: { pkId: 1 } } as any];

      (component as any).onRemoveFile();

      expect(component.selectedFile).toBeUndefined();
      expect(component.dataSource.length).toBe(0);
      expect(component.setting.totalItems).toBe(0);
      expect(component.selectedRecords.length).toBe(0);
      expect(component.mode).toBe('file');
      expect(lookupModalServiceSpy.getLookupServiceRequest).not.toHaveBeenCalled();
    });
  });

  describe('onTabChange while mode === "file"', () => {
    it('resets to manual mode and clears selected file', () => {
      component.tabs = [
        { title: 'A', lookupApiConfig: { method: 'POST', api: '/a' }, fileUploadConfig: { apiConfig: { method: 'POST', api: '/upload' } } },
        { title: 'B', lookupApiConfig: { method: 'POST', api: '/b' } },
      ];
      component.mode = 'file';
      component.selectedFile = new File(['x'], 'x.csv');
      component.lookUpHeaderSettings = {} as any;
      lookupModalServiceSpy.getLookupServiceRequest.and.returnValue(of(null));

      component.onTabChange({ index: 1 } as any);

      expect(component.mode).toBe('manual');
      expect(component.selectedFile).toBeUndefined();
      expect(component.fileUploadConfig).toBeUndefined();
    });
  });

  describe('sample download', () => {
    it('without sampleFile: does not call the file-download service', () => {
      component.fileUploadConfig = { apiConfig: { method: 'POST', api: '/u' } };
      (component as any).onDownloadSample();
      expect(fileDownloadServiceSpy.download).not.toHaveBeenCalled();
    });

    it('sampleFile without url: does not call the file-download service', () => {
      component.fileUploadConfig = {
        apiConfig: { method: 'POST', api: '/u' },
        sampleFile: { url: '' } as any,
      };
      (component as any).onDownloadSample();
      expect(fileDownloadServiceSpy.download).not.toHaveBeenCalled();
    });

    it('delegates to DxFileDownloadService with url, fileName, and defaultExtension derived from accept', () => {
      fileDownloadServiceSpy.download.and.returnValue(of({ fileName: 'site-codes-sample.csv', blob: new Blob() }));
      component.fileUploadConfig = {
        apiConfig: { method: 'POST', api: '/u' },
        accept: '.csv',
        sampleFile: {
          url: 'https://example.com/v1/site/sample-file',
          fileName: 'site-codes-sample.csv',
        },
      };

      (component as any).onDownloadSample();

      expect(fileDownloadServiceSpy.download).toHaveBeenCalledWith({
        url: 'https://example.com/v1/site/sample-file',
        fileName: 'site-codes-sample.csv',
        defaultExtension: '.csv',
      });
      expect(component.fileUploadLoading).toBeFalse();
    });

    it('omits defaultExtension when fileUploadConfig.accept is absent', () => {
      fileDownloadServiceSpy.download.and.returnValue(of({ fileName: 'sample-file', blob: new Blob() }));
      component.fileUploadConfig = {
        apiConfig: { method: 'POST', api: '/u' },
        sampleFile: { url: '/v1/site/sample-file' },
      };

      (component as any).onDownloadSample();

      expect(fileDownloadServiceSpy.download).toHaveBeenCalledWith({
        url: '/v1/site/sample-file',
        fileName: undefined,
        defaultExtension: undefined,
      });
    });

    it('picks the first dotted token when accept is a comma-separated list', () => {
      fileDownloadServiceSpy.download.and.returnValue(of({ fileName: 'sample-file.tsv', blob: new Blob() }));
      component.fileUploadConfig = {
        apiConfig: { method: 'POST', api: '/u' },
        accept: '.tsv,.csv,text/plain',
        sampleFile: { url: '/v1/site/sample-file' },
      };

      (component as any).onDownloadSample();

      expect(fileDownloadServiceSpy.download).toHaveBeenCalledWith(jasmine.objectContaining({
        defaultExtension: '.tsv',
      }));
    });

    it('on service error: toasts error message and clears loading flag', () => {
      fileDownloadServiceSpy.download.and.returnValue(throwError(() => new Error('boom')));
      component.fileUploadConfig = {
        apiConfig: { method: 'POST', api: '/u' },
        sampleFile: { url: 'https://example.com/sample.csv' },
      };

      (component as any).onDownloadSample();

      expect(toastrServiceSpy.error).toHaveBeenCalledWith(jasmine.stringMatching(/Failed to download the sample/));
      expect(component.fileUploadLoading).toBeFalse();
    });

  });
});
