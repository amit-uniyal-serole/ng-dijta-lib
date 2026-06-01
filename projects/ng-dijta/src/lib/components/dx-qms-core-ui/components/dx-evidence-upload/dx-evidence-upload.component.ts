import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { KeyValueModel } from '../../../../core/UI/model/keyValue';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import  saveAs from 'file-saver';
import { SkeletonLoaderModel } from '../../../dx-skeleton-loader';
import { filter, finalize, first, Subscription } from 'rxjs';
import { ToastrService } from '../../../dx-toastr';
import { LookupModalService } from '../../../dx-lookup';
import { PaginationRequest } from '../../../dx-config-table';
export interface EvidenceModel extends KeyValueModel {
  fileObject?: any;
  statusCd?: string;
  comments?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  descriptionTt?: string;
  groupId?: string
  gEId?: number
  //statusCdNone?: boolean;
}
export type DxEvidenceActionPermission = 'EDIT' | 'SAVE' | 'UPLOAD' | 'DELETE' | 'DOWNLOAD';
@Component({
  selector: 'dx-evidence-upload',
  templateUrl: './dx-evidence-upload.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DxEvidenceUploadComponent implements OnInit, OnChanges, OnDestroy {
  @Input() initialEvidenceUploadStatus: string = 'TBVD';
  @Input() quoteNr!: string;
  @Input() showFilteredUploadedEvidenceList: boolean = true;
  @Input() disabledEvidenceUpload: boolean = false;
  @Input() disabledUploadLater: boolean = false;
  @Input() evidenceTitle: string = '';
  @Input() uploadLaterVisible: boolean = false;
  @Input() statusList!: KeyValueModel[];
  @Input() quote: any | undefined; //(quoteDto)
  @Input() evidenceList: EvidenceModel[] | undefined = []; // Master Evidences to be Uploaded
  @Input() rootUrl: string | undefined;
  @Input() fileSizeinByte: number = 10485760;
  @Input() isAgent: boolean = false;
  @Input() isSales: boolean = false;;
  @Input() loginUser: string | undefined;
  @Input() actions: DxEvidenceActionPermission[] | undefined;
  @Input() productCd: string | undefined;
  @Output() evidenceListEmit: EventEmitter<KeyValueModel[]> = new EventEmitter<
    KeyValueModel[]
  >();
  @Output() sendUploadCheckbox: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  public isBusy: boolean | undefined;
  reUploadStatusCode:string = 'RUPLD'
  public attachmentsForm!: FormGroup;
  public mobileRows = {
    "verificationItem":"Verification Item",
    "status":"Status",
    "comments":"Comments",
    "verifiedBy":"Verified By",
    "verifiedDate":"Verified Date",
    "attachedFile":"Attached File",
    "attachedFileSize":"Attached File Size"
  }
  public columns = [
    {
      field: 'inputKey',
      columnDef: 'inputKey',
      type: 'text',
      copyText: true,
      title: 'Verification Item',
    },
    {
      field: 'inputKey',
      columnDef: 'inputKey',
      type: 'text',
      copyText: true,
      title: 'Status',
    },
    {
      field: 'inputKey',
      columnDef: 'inputKey',
      type: 'text',
      copyText: true,
      title: 'Comments',
    },
    {
      field: 'inputKey',
      columnDef: 'inputKey',
      type: 'text',
      copyText: true,
      title: 'Verified By',
    },
    {
      field: 'inputKey',
      columnDef: 'inputKey',
      type: 'text',

      copyText: true,
      title: 'Verified Date',
    },
    {
      columnDef: 'action',
      field: 'action',
      type: 'menu',
      title: 'Action',
    },
  ];
  actionTitle = {
    edit:"Edit",
    download:"Download",
    upload:'Upload',
    close:'Close',
    save:'Save'
  }
  enableMultiUploadDownload:boolean = false
  evidenceForms: { [key: number]: FormGroup } = {};
  fileSizeText: string = '10';
  todayDate: string = moment(new Date()).format('YYYY-MM-DD');
  @Input() customNoEvidenceMsg?:string
  @Input() specialDocTypes!: string[] ;
  @Input() mandatoryDocTypes!: string[] ;
  public selectedIndex: number | undefined;
  public isEvidenceSaving: boolean = false;
  public isEvidenceDeleting: boolean = false;
  public isEvidenceUploading: boolean = false;
  public isEvidenceDownloading: boolean = false;
  public readonly lineTheme: SkeletonLoaderModel = {
    height: "20px",
    width: "100px",
    "border-radius": "5px",
    "margin-top": "2px"
  };
  public readonly statusTheme: SkeletonLoaderModel = {
    height: "30px",
    width: "100px",
    "border-radius": "20px",
    "margin-top": "2px"
  };
  private uploadedEvidences: any[] = []; // Uploaded Evidences to Quote (EvidenceDto)

  private _uploadEvidenceSubscription: Subscription | undefined;
  private _downloadEvidenceSubscription: Subscription | undefined;
  private _deleteEvidenceSubscription: Subscription | undefined;
  private _loadAllUploadedEvidences: Subscription | undefined;
  private _updateEvidenceSubscription: Subscription | undefined;
  groupedEvidenceList: { groupId: string | null; items: any[] }[] = [];
  constructor(
    private readonly fb: FormBuilder,
    //private readonly evidenceService: EvidenceService,
    private readonly toastrService: ToastrService,
    private readonly lookupModalService: LookupModalService<any>
  ) { }

  ngOnInit(): void {
  }

  private quoteDetails(): void {
    if (this.quote) {
      this.patchQuoteInfoToAttachmentForm(this.quote!);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
        changes?.['rootUrl']?.currentValue !==
        changes?.['rootUrl']?.previousValue &&  changes?.['quoteNr']?.currentValue !==
        changes?.['quoteNr']?.previousValue
      ) {
        this.loadUploadedEvidences();
        this.prepareAttachmentForm();
      }
    if (this.rootUrl) {
      if (
        changes?.['quote']?.currentValue !== changes?.['quote']?.previousValue
      ) {
        this.quoteDetails();
      }
      if (
        changes?.['statusList']?.currentValue !==
        changes?.['statusList']?.previousValue
      ) {
        this.statusList = changes?.['statusList']?.currentValue;
      }


      if (
        changes?.['disabledEvidenceUpload']?.currentValue !==
        changes?.['disabledEvidenceUpload']?.previousValue
      ) {
        setTimeout(() => {
          this.transformEvidenceList();
        }, 1000);
      }
      if (
        changes?.['showFilteredUploadedEvidenceList']?.currentValue !==
        changes?.['showFilteredUploadedEvidenceList']?.previousValue
      ) {
        setTimeout(() => {
          this.transformEvidenceList();
        }, 1000);
      }
       if (
        changes?.['evidenceList']?.currentValue !==
        changes?.['evidenceList']?.previousValue
      ) {
        setTimeout(() => {
          this.transformEvidenceList();
        }, 1000);
      }
      if (
        changes?.['actions']?.currentValue !==
        changes?.['actions']?.previousValue
      ) {
        this.actions = changes?.['actions']?.currentValue;
      }
    }
  }

  private prepareAttachmentForm(): void {
    this.attachmentsForm = this.fb.group({
      // paymentTypes: [], --> Not in use
      isUploadLater: [false],
      explanation: [undefined],
    });
  }

  trackByGEId(index: number, item: any): string {
  return item.gEId;
}

  private transformEvidenceList(): void {
    this.appendFileObjectsToEvidences();
    if ((this.isSales && this.showFilteredUploadedEvidenceList) || (this.isAgent && this.disabledEvidenceUpload)) {
      this.evidenceList = this.evidenceList?.filter(evidence => evidence.fileObject) ?? [];
    }
    if (this.evidenceList?.length! > 0) {
      this.evidenceList?.forEach((evidence, index) => {
        this.evidenceForms[evidence.gEId!] = this.fb.group({
          verificationItem: [evidence.valueTt],
          statusCd: [evidence.statusCd],
          comments: [evidence.comments],
          verifiedBy: [evidence.verifiedBy],
          verifiedDate: [evidence.verifiedDate],
        });
      });
    }
    this.groupedEvidenceList = this.groupEvidence(this.evidenceList!);
    this.evidenceListEmit.emit(this.evidenceList);
  }

  groupEvidence(list: any[]) {
    const map = new Map<string, any[]>();

    list.forEach(item => {
      const key = item.groupId ?? `__NO_GROUP__${item.keyTt}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(item);
    });

    return Array.from(map.entries()).map(([key, items]) => ({
      groupId: key.startsWith('__NO_GROUP__') ? null : key,
      items
    }));
  }

  private appendFileObjectsToEvidences(): void {
    if (this.evidenceList && this.evidenceList?.length > 0) {
      const evidenceTypesWithTBVD = new Set(
        this.uploadedEvidences
          ?.filter(e => e.statusCd === 'TBVD')
          .map(e => e.evidenceType)
      );
      this.evidenceList = this.evidenceList.map((_evidence: EvidenceModel,i) => {
        const savedFiles = this.uploadedEvidences?.filter(
          (_saved: any) => _saved.evidenceType === _evidence.valueTt
        );
        const hasTBVD = evidenceTypesWithTBVD.has(_evidence.valueTt);
        if (savedFiles?.length) {
          const fileObject = savedFiles.map(_saved => ({
            file_name: _saved.originalFileName,
            file_size: this.formatBytes(_saved.size),
            file_type: _saved.originalFileName?.split('.').pop(),
            pkId:_saved.pkId
          }));

          return {
            ..._evidence,
            groupId:_evidence.groupId,
            gEId: i,
            fileObject: fileObject,
            isEditing: false,
            ...savedFiles[0],
             statusCd: hasTBVD ? 'TBVD' : savedFiles[0].statusCd, 
          };
        }

        return {
          keyTt: _evidence.keyTt!,
          valueTt: _evidence.valueTt!,
          groupId:_evidence.groupId,
          gEId: i,
          isEditing: false!,
          fileSizeError: false!,
          fileObject: [],
          descriptionTt: _evidence.descriptionTt
        };
      });
    }
  }

  /**
   * @description formatting byte value
   * @param bytes
   * @param decimals
   * @returns
   */
  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  private patchQuoteInfoToAttachmentForm(quote: any): void {
    let quoteOptions = quote?.quoteOptions?.[0];
    this.attachmentsForm?.patchValue({
      isUploadLater: quoteOptions?.supportingDocumentFg === '1',
      explanation: quoteOptions?.supportingDocExplanation,
    });
  }

  uploadChkbx(isChecked: boolean): void {
    if (isChecked) {
      this.attachmentsForm
        ?.get('explanation')
        ?.setValidators(Validators.required);
    } else {
      this.attachmentsForm?.get('explanation')?.clearValidators();
      this.attachmentsForm?.get('explanation')?.patchValue('');
    }
    this.sendUploadCheckbox.emit(isChecked);
    this.attachmentsForm?.get('explanation')?.updateValueAndValidity();
  }

  // handle file from browsing
  public uploadEvidence(event: Event, evidenceRow, index: number, isSpecialDoc): void {
    const input: HTMLInputElement = event?.target as HTMLInputElement;

    // prevent file selection if maximum no of files count exceeded
    if(evidenceRow.fileObject.length === 5){
      event.preventDefault();
    }
    if (!input?.files || input.files.length === 0) return;
    const selectedFiles = Array.from(input.files);
    if ((selectedFiles.length + evidenceRow?.fileObject?.length) > 5) {
        input.value = ''; // Clear selection
        this.toastrService.error(
            'Please remove an existing file to upload a new one',
            'Maximum 5 files per document type',
          );
        return;
    }
        const validFiles: File[] = [];
        const invalidNameFiles: File[] = [];
        const invalidSizeFiles: File[] = [];

        selectedFiles.forEach(file => {
          if (file.name.length > 50) {
            invalidNameFiles.push(file);
          } else if (file.size > this.fileSizeinByte) {
            invalidSizeFiles.push(file);
          } else {
            validFiles.push(file);
          }
        });
      
      if (invalidNameFiles.length > 0) {
        this.toastrService.error(
          `${invalidNameFiles.length} file(s) have names exceeding 50 characters and won't be uploaded.`,
          'Invalid Filename'
        );
      }
      if (invalidSizeFiles.length > 0) {
        this.toastrService.error(`${invalidSizeFiles.length} file(s) exceed the 10 MB limit and won't be uploaded.`, 
          'File Too Large');
      }

      if (validFiles.length === 0) {
        input.value = '';
        return;
      }

      const finalValidFiles = validFiles.filter(file => {
      const type = file.type || '';
      return type.split('/')[0] !== 'video';
    });

    if (finalValidFiles.length > 0) {
      // replace input.files with only valid files
      const dataTransfer = new DataTransfer();
      validFiles.forEach(f => dataTransfer.items.add(f));
      input.files = dataTransfer.files;

      if (isSpecialDoc && validFiles.length > 1) {
        this.uploadMultipleEvidenceCall(input, evidenceRow, index);
      } else {
        this.uploadEvidenceCall(input, evidenceRow, index);
      }
    } else {
      this.toastrService.error('Video/Invalid files are not allowed', 'Invalid File Type');
    }
  }

  uploadEvidenceCall(input: HTMLInputElement, evidenceRow, i?: number): void {
    this.selectedIndex = i;
    this.isEvidenceUploading = true;
    const uploadedFile = (input?.files as FileList)[0];
    const uploadDto = {
      evidenceEntityId: this.quoteNr,
      evidenceVisibleType: 'public',
      evidenceType: evidenceRow.valueTt,
      evidenceEntityType: this.productCd === 'Endo' ? 'endo_evidence' :'quote_evidence',
      productCd: this.productCd,
      statusCd: this.isSales?'VERIF':this.initialEvidenceUploadStatus ?? 'TBVD',
      descriptionTt: evidenceRow?.descriptionTt,
      verifiedBy: this.isSales ? this.loginUser : undefined,
      verifiedDate: this.isSales ? this.todayDate : undefined,
      //statusCd: evidenceRow?.statusCdNone ? undefined : 'TBVD',
    };
    const payload: any = {
      evidence: JSON.stringify(uploadDto),
      multipartFile: uploadedFile as Blob,
    };

    this._uploadEvidenceSubscription = this.lookupModalService.getLookupServiceRequest(
      {
        api: `${this.rootUrl}/v1/evidence/uploadFile`,
        method: 'POST',
        body: this.prepareFormData(payload)
      }
    )?.pipe(
      filter((item: any) => !!item),
      first()
    ).subscribe({
      next: (response: any) => {
        if (response) {
          this.isEvidenceUploading = false;
          this.toastrService.success(
            `${uploadedFile?.name} uploaded successfully`,
            'Success'
          );
          this.loadUploadedEvidences();
        }
      },
      error: () => {
        this.isEvidenceUploading = false;
      }
    });
  }

  uploadMultipleEvidenceCall(input: HTMLInputElement, evidenceRow: any, i?: number): void {
  if (!input?.files || input?.files?.length === 0) return;

  this.selectedIndex = i;
  this.isEvidenceUploading = true;

  const files: File[] = Array.from(input.files);

  const uploadDto = {
    evidenceEntityId: this.quoteNr,
    evidenceVisibleType: 'public',
    evidenceType: evidenceRow.valueTt,
    evidenceEntityType: this.productCd === 'Endo' ? 'endo_evidence' :'quote_evidence',
    productCd: this.productCd,
    statusCd: this.isSales?'VERIF':'TBVD',
    verifiedBy: this.isSales ? this.loginUser : undefined,
    verifiedDate: this.isSales ? this.todayDate : undefined,
  };

  // Prepare single payload with all files
  const payload = {
    evidence: JSON.stringify(uploadDto),
    multipartFile: files,
  };

  this._uploadEvidenceSubscription = this.lookupModalService.getLookupServiceRequest({
    // api:'dx-endorsement-api/v1/evidence/uploadFiles',
    api:`${this.rootUrl}/v1/evidence/uploadFiles`,
    method: 'POST',
    body: this.prepareMultipleFormData(payload),
  })
    ?.pipe(
      filter((item: any) => !!item),
      first()
    )
    .subscribe({
      next: (response: any) => {
        this.toastrService.success(
          `All ${files?.length} files uploaded successfully`,
          'Success'
        );
        this.loadUploadedEvidences();
      },
      error: () => {
        this.toastrService.error(
          `File upload failed`,
          'Error'
        );
      },
      complete: () => {
        this.isEvidenceUploading = false;
      }
    });
}

prepareMultipleFormData(payload: any): FormData {
  const formData = new FormData();
  formData.append('evidence', payload.evidence);
  payload.multipartFile.forEach((file: File) => {
    formData.append('multipartFile', file);
  });
  return formData;
}


  private prepareFormData(payload): FormData {
    const formData = new FormData();
    if (payload !== null && payload !== undefined) {
      for (const key of Object.keys(payload)) {
        const val = payload[key];
        if (val instanceof Array) {
          for (const v of val) {
            const toAppend = this.formDataValue(v);
            if (toAppend !== null) {
              formData.append(key, toAppend);
            }
          }
        } else {
          const toAppend = this.formDataValue(val);
          if (toAppend !== null) {
            formData.set(key, toAppend);
          }
        }
      }
    }
    return formData;
  }
  private formDataValue(value: any): any {
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof Blob) {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  // Convert Files list to normal array list
  private prepareFilesList(event: HTMLInputElement, evidenceRow): void {
    const wholeFiles = event?.files as FileList;
    if (wholeFiles?.length > 0 && wholeFiles[0]) {
      for (let i = 0; i < (event?.files as FileList)?.length; i++) {
        const fileObject = {
          file_name: (event?.files as FileList)[i]?.name,
          file_size: this.formatBytes(
            (event?.files as FileList)[i]?.size
          ),
          file_type: (event?.files as FileList)[i]?.name?.split('.')[1],
        };
        evidenceRow.fileObject = fileObject;
      }
    }
  }

  public downloadEvidence(
    id: number,
    fileName: string,
    contentType: string,
    i: number,
    evidence: EvidenceModel,
    isSpecialDoc: boolean
  ): void {
    this.selectedIndex = i;
    this.isEvidenceDownloading = true;
    let params = (isSpecialDoc && evidence?.fileObject?.length > 1) ? {
      'evidenceEntityId': this.quoteNr,
      'evidenceType': evidence?.valueTt
    } : { 'id': id }
    let url = (isSpecialDoc && evidence?.fileObject?.length > 1) ? `${this.rootUrl}/v1/evidence/downloadMultipleZip` : `${this.rootUrl}/v1/evidence/download`
    this._downloadEvidenceSubscription = this.lookupModalService.getLookupServiceRequest(
      {
        api: url,
        method: 'GET',
        params: params,
        responseType: 'blob',
        observe: 'response'
      }
    )?.pipe(
      filter((item: any) => !!item),
      first()
    ).subscribe({
      next: (response: any) => {
        if (response) {
          this.isEvidenceDownloading = false;
          if ((isSpecialDoc && evidence?.fileObject?.length > 1)) {
            // Create blob
              const blob: Blob = new Blob([response], { type: 'application/zip' });
            saveAs(blob, 'evidence_files.zip');
          } else {
            const blob: Blob = new Blob([response], { type: contentType });
            saveAs(blob, fileName);
          }


        }
      },
      error: () => {
        this.isEvidenceDownloading = false;
      }
    });
  }

  public deleteEvidence(evidenceRow, input?: HTMLInputElement, i?: number, fileIndex?:number): void {
    this.selectedIndex = i;
    this.isEvidenceDeleting = true;
    let objIds:string ='';
    if(fileIndex !== undefined && fileIndex !== null && evidenceRow){
      objIds=evidenceRow?.fileObject?.[fileIndex]?.pkId
    }else{
      evidenceRow?.fileObject?.forEach((fileobj,io)=>{
        objIds+=(fileobj?.pkId)
        if(io<(evidenceRow?.fileObject?.length-1)){objIds+=','}
      })

    }
    this._deleteEvidenceSubscription = this.lookupModalService.getLookupServiceRequest(
      {
        api: `${this.rootUrl}/v1/evidence/deleteEvidences`,
        method: 'DELETE',
        params:{ids:objIds}
      }
    )?.pipe(
      filter((item: boolean | undefined) => !!item),
      first()
    ).subscribe({
      next: (response: boolean | undefined) => {
        this.isEvidenceDeleting = false;
        if (response) {
          if (input) {
            this.uploadEvidenceCall(input, evidenceRow);
          } else {
            this.loadUploadedEvidences();
          }
        }
      },
      error: () => {
        this.isEvidenceDeleting = false;
      }
    });
  }

  private loadUploadedEvidences(): void {
    this.isBusy = true;
    this._loadAllUploadedEvidences = this.lookupModalService.getLookupServiceRequest(
      {
        api: `${this.rootUrl}/v1/evidence/evidences`,
        method: 'GET',
        params: {entityId:this.quoteNr}
      }
    )?.pipe(
      filter((data: any) => !!data),
      finalize(() => (this.isBusy = false))
    ).subscribe({
      next: (data: any) => {
        this.isBusy = false;
        this.uploadedEvidences = data?.content ?? [];
        this.transformEvidenceList();
      },
      error: () => {
        this.isBusy = false;
      }
    });
  }

  toggleEdit(evidenceRow): void {
    evidenceRow.isEditing = !evidenceRow.isEditing;
  }

  saveEdit(evidenceRow, index: number): void {
    this.selectedIndex = index;
    const formGroup = this.evidenceForms[index];
    if (formGroup.valid) {
      let fileObjects: any[] = [];

      if (Array.isArray(evidenceRow.fileObjects)) {
        fileObjects = evidenceRow.fileObjects;
      } else if (evidenceRow.fileObject) {
        fileObjects = [...evidenceRow.fileObject];
      }
      const updatedEvidenceRows = fileObjects.map((file) => ({
        ...evidenceRow,
        originalFileName: file.file_name,
        pkId: file.pkId,
        keyTt: undefined,
        valueTt: undefined,
        isEditing: undefined,
        fileSizeError: undefined,
        fileObject: undefined,
        statusCd: formGroup.getRawValue().statusCd,
        comments: formGroup.getRawValue().comments,
        verifiedBy: this.loginUser,
        verifiedDate: this.todayDate,
      }));
      this.isEvidenceSaving = true;
      this._updateEvidenceSubscription = this.lookupModalService.getLookupServiceRequest(
        {
          api: `${this.rootUrl}/v1/evidence/updates`,
          method: 'POST',
          body: updatedEvidenceRows
        }
      )?.pipe(
        filter((item) => !!item),
        first()
      ).subscribe({
        next: (response) => {
          this.isEvidenceSaving = false;
          // Save data from form to row
          evidenceRow.statusCd = formGroup.getRawValue().statusCd;
          evidenceRow.comments = formGroup.getRawValue().comments;
          evidenceRow.verifiedBy = this.loginUser;
          evidenceRow.verifiedDate = this.todayDate;
          evidenceRow.isEditing = false;
          this.loadUploadedEvidences();
        },
        error: () => {
          this.isEvidenceSaving = false;
        }
      });
    } else {
      // Highlight errors or notify user
      formGroup.markAllAsTouched();
    }
  }

  cancelEdit(evidenceRow, index: number): void {
    // Reset form controls to their initial state
    const formGroup = this.evidenceForms[index];
    formGroup?.reset({
      verificationItem: evidenceRow.valueTt,
      statusCd: evidenceRow.statusCd,
      comments: evidenceRow.comments,
      verifiedBy: evidenceRow.verifiedBy,
      verifiedDate: evidenceRow.verifiedDate,
    });
    evidenceRow.isEditing = false;
  }

  ngOnDestroy(): void {
    this._uploadEvidenceSubscription?.unsubscribe();
    this._deleteEvidenceSubscription?.unsubscribe();
    this._downloadEvidenceSubscription?.unsubscribe();
    this._loadAllUploadedEvidences?.unsubscribe();
    this._updateEvidenceSubscription?.unsubscribe();
    this._uploadEvidenceSubscription?.unsubscribe();
  }
}
