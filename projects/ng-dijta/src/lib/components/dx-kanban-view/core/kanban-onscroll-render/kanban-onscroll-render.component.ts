import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { KanbanCardActionEvent, KanbanViewColumnContent, KanbanViewColumnsModel } from '../../model/dx-kanban-view.model';
import { LookupModalService } from '../../../dx-lookup';
import { Subscription } from 'rxjs';
@Component({
  selector: 'dx-kanban-onscroll-render',
  templateUrl: './kanban-onscroll-render.component.html',
  styleUrl: './kanban-onscroll-render.component.scss'
})
export class KanbanOnscrollRenderComponent implements OnInit, OnDestroy {
  @Input() column!: KanbanViewColumnsModel;
  @Input() height: number = 200;
  @Output() onKanbanCardAction = new EventEmitter<KanbanCardActionEvent>();
  isBusy: boolean = false;
  error: boolean = false;
  subscription: Subscription = new Subscription();
  totalAmount: number | undefined;
  constructor(
    private readonly lookupModalService: LookupModalService<any>
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.totalAmountMethod()
      this.onScroll(true);
    }, 500);
  }


  getContrastColor(color: string): string {
    // Convert color to RGB format
    const hex: string = color.replace("#", "");
    const r: number = parseInt(hex.substr(0, 2), 16);
    const g: number = parseInt(hex.substr(2, 2), 16);
    const b: number = parseInt(hex.substr(4, 2), 16);

    // Calculate perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Determine contrast color
    return brightness > 128 ? "#000000" : "#ffffff";
  }

  headerBackgroundColor(color: string) {
    return {
      backgroundColor: color,
      color: this.getContrastColor(color)
    }
  }

  columnContentCountBackgroundColor(color: string) {
    return {
      backgroundColor: this.getContrastColor(color),
      color: color
    }
  }
 totalAmountMethod(): void {
  const totalAmountUrl = this.column?.totalAmountUrl;
  const config = totalAmountUrl?.config;
  if (!config) return;
  let updatedConfig = { ...config };
  if (config.paginationRequest) {
    updatedConfig = {
      ...updatedConfig,
      paginationRequest: {
        ...config.paginationRequest,
      }
    };
  }
  if (config.body?.paginationRequest) {
    updatedConfig = {
      ...updatedConfig,
      body: {
        ...config.body,
        paginationRequest: {
          ...config.body.paginationRequest,
        }
      }
    };
  }
  this.column.totalAmountUrl = {
    ...totalAmountUrl,
    config: updatedConfig
  };

  this.isBusy = true;
  this.error = false;
  this.lookupModalService.getLookupServiceRequest(updatedConfig).subscribe({
    next: (data) => {
      this.totalAmount = data;
      this.isBusy = false;
    },
    error: () => {
      this.isBusy = false;
      this.error = true;
    }
  });
}

  onScroll(isInitial?: boolean): void {
    if (this.column.apiConfig) {
      if (this.column.apiConfig.paginationRequest) {
        this.column.apiConfig = {
          ...this.column.apiConfig,
          paginationRequest: {
            ...this.column.apiConfig.paginationRequest,
            pageNo: isInitial ? 0 : (this.column.apiConfig.paginationRequest?.pageNo ?? 0) + 1
          }
        }
      } else if (this.column.apiConfig?.body?.paginationRequest) {
        this.column.apiConfig = {
          ...this.column.apiConfig,
          body: {
            ...this.column.apiConfig.body,
            paginationRequest: {
              ...this.column.apiConfig?.body?.paginationRequest,
              pageNo: isInitial ? 0 : (this.column.apiConfig?.body?.paginationRequest?.pageNo ?? 0) + 1
            }
          }
        }
      }
      this.isBusy = true;
      this.error = false;
      this.subscription = this.lookupModalService.getLookupServiceRequest(this.column.apiConfig).subscribe({
        next: (data) => {
          let convertData =  [];
          if (this.column.apiConfig?.transformRecord !== undefined) {
            convertData = this.column.apiConfig?.transformRecord(data)
          } 
          this.column = {
            ...this.column,
            content: [
              ...this.column.content,
              ...convertData
            ]
          }
        },
        error: () => {
          this.isBusy = false;
          this.error = true;
        },
        complete: () => {
          this.isBusy = false;
        }
      })
    }
  }
  onClickAction(event: string, content: KanbanViewColumnContent): void {
    let eventData: KanbanCardActionEvent = {
      type: event,
      data: content
    }
    this.onKanbanCardAction.emit(eventData);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
