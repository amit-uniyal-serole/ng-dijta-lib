import { animate, style, transition, trigger } from '@angular/animations';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

/** Severity of the alert — drives colour and the default icon. */
export type DxAlertType = 'success' | 'info' | 'warning' | 'error';

/** Material icon shown for each severity when no `iconType` override is given. */
const DEFAULT_ICONS: Record<DxAlertType, string> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

@Component({
  selector: 'dx-alert-message',
  templateUrl: './dx-alert-message.component.html',
  styleUrls: ['./dx-alert-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          '200ms ease-in-out',
          style({
            opacity: 0,
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
          })
        ),
      ]),
    ]),
  ],
})
/**
 * Inline status alert — a persistent, optionally closable banner that conveys
 * success / info / warning / error feedback. Modelled on ng-zorro's `nz-alert`
 * (Angular Material has no inline alert primitive). Supports an icon, a
 * secondary description, a closable affordance, banner mode, and a projected
 * action slot.
 *
 * @example
 * ```html
 * <dx-alert-message
 *   type="success"
 *   message="dx.toast.saveSucceeded"
 *   [showIcon]="true"
 *   [closeable]="true"
 *   (onClose)="dismissed()">
 * </dx-alert-message>
 * ```
 */
export class DxAlertMessageComponent {
  /** Severity of the alert. @default 'info' */
  @Input() type: DxAlertType = 'info';

  /** Primary message content (passed through Transloco — accepts a key or raw text). */
  @Input() message?: string;

  /**
   * Alias of {@link message}.
   * @deprecated Use `message` instead — kept for backward compatibility.
   */
  @Input()
  set msg(value: string | undefined) {
    this.message = value;
  }
  get msg(): string | undefined {
    return this.message;
  }

  /** Secondary description shown below the message (passed through Transloco). */
  @Input() description?: string;

  /** Whether to show the severity icon (always shown in banner mode). @default false */
  @Input({ transform: booleanAttribute }) showIcon = false;

  /** Override the Material icon name; effective when the icon is shown. */
  @Input() iconType?: string;

  /** Whether the alert shows a close affordance. @default false */
  @Input({ transform: booleanAttribute }) closeable = false;

  /** Custom close text (passed through Transloco); falls back to a close icon. */
  @Input() closeText?: string;

  /** Banner mode — full-width, no rounded corners, icon shown by default. @default false */
  @Input({ transform: booleanAttribute }) banner = false;

  /** Emitted when the user closes the alert. */
  @Output() readonly onClose = new EventEmitter<void>();

  protected closed = false;

  /** Whether the leading icon should render. */
  protected get displayIcon(): boolean {
    return this.showIcon || this.banner;
  }

  /** Resolved Material icon name for the current severity. */
  protected get iconName(): string {
    return this.iconType ?? DEFAULT_ICONS[this.type];
  }

  protected close(): void {
    this.closed = true;
    this.onClose.emit();
  }
}
