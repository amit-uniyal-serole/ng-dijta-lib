import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { KeyValueModel } from 'projects/ng-dijta/src/public-api';
import {
  COMPONENT_CATEGORIES,
  ComponentInfo,
  ComponentProperty,
} from '../../component-explorer.data';

export interface EventLogEntry {
  timestamp: string;
  eventName: string;
  payload: string;
}

/** Components that always need [options] in their generated code snippet. */
const OPTIONS_COMPONENTS = new Set([
  'dx-select',
  'dx-autocomplete-select',
  'dx-chip-autocomplete',
  'dx-chip-select',
  'dx-radio-button',
]);

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit, OnDestroy {
  selector = '';
  activePanel: 'controls' | 'code' | 'types' | 'events' = 'controls';
  eventLog: EventLogEntry[] = [];
  currentMeta: ComponentInfo | null = null;
  overrides: Record<string, any> = {};
  generatedCode = '';
  copiedCode = false;

  readonly options: KeyValueModel[] = [
    { keyTt: 'New', valueTt: 'New' },
    { keyTt: 'In Progress', valueTt: 'In Progress' },
    { keyTt: 'Pending Approval', valueTt: 'Pending Approval' },
    { keyTt: 'Completed', valueTt: 'Completed' },
  ];

  fg = new FormGroup({
    normal: new FormControl(''),
    phone: new FormControl('', Validators.required),
  });

  // ─── Type definitions ──────────────────────────────────────────────────────

  readonly typeDefs: Record<string, string> = {
    'KeyValueModel[]': `interface KeyValueModel {
  keyTt: string;    // option value (sent to model)
  valueTt: string;  // display label shown to user
}`,
    'MultiActionDropDown': `interface MultiActionDropDown {
  show: boolean;
  label: string;
  isOnlyDropdown?: boolean;
  menuList: MultiActionMenuList[];
}

interface MultiActionMenuList {
  label: string;
  event: string;
  show: boolean;
}`,
    'ColumnDef[]': `interface ColumnDef {
  field: string;
  header: string;
  width?: number;
  sortable?: boolean;
  type?: 'text' | 'date' | 'currency' | 'action';
}`,
    'ActivityData[]': `interface ActivityData {
  date: string;   // 'YYYY-MM-DD'
  count: number;
}`,
    'CriteriaField[]': `interface CriteriaField {
  field: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: KeyValueModel[];
}`,
    'DxLookupModalConfig': `interface DxLookupModalConfig {
  idName: { id: string; name: string };
  lookupApiConfig: {
    method: 'GET' | 'POST';
    api: string;
    body?: Record<string, unknown>;
  };
  tableSettings?: {
    pageSize?: number;
    pagination?: boolean;
    singleRowSelect?: boolean;
    multiSelect?: boolean;
  };
}`,
  };

  private routeSub?: Subscription;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.selector = params['selector'] ?? '';
      this.activePanel = 'controls';
      this.eventLog = [];
      this.loadMeta();
      this.initOverrides();
      this.regenerateCode();
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  // ─── Override helpers ──────────────────────────────────────────────────────

  getVal<T>(prop: string, defaultVal: T): T {
    return prop in this.overrides ? this.overrides[prop] : defaultVal;
  }

  setVal(prop: string, value: any): void {
    this.overrides = { ...this.overrides, [prop]: value };

    if (prop === 'disabled') {
      const ctrl = this.fg.get('normal');
      const phone = this.fg.get('phone');
      if (value) {
        ctrl?.disable({ emitEvent: false });
        phone?.disable({ emitEvent: false });
      } else {
        ctrl?.enable({ emitEvent: false });
        phone?.enable({ emitEvent: false });
      }
    }

    this.regenerateCode();
  }

  resetOverrides(): void {
    this.initOverrides();
    this.regenerateCode();
  }

  // ─── Control-type detection ────────────────────────────────────────────────

  getControlType(
    type: string,
  ): 'boolean' | 'toggle-group' | 'text' | 'number' | 'readonly' {
    if (type === 'boolean') return 'boolean';
    if (type === 'number') return 'number';
    if (type === 'string') return 'text';
    if (/^'[^']*'(\s*\|\s*'[^']*')*$/.test(type.trim())) return 'toggle-group';
    return 'readonly';
  }

  getEnumOptions(type: string): string[] {
    const matches = type.match(/'([^']*)'/g);
    return matches ? matches.map(s => s.replace(/'/g, '')) : [];
  }

  getDefaultValue(prop: ComponentProperty): any {
    const d = prop.default;
    if (prop.type === 'boolean') return d === 'true';
    if (prop.type === 'number') return d === 'undefined' ? 0 : Number(d);
    const quoted = d.match(/^'(.*)'$/);
    return quoted ? quoted[1] : '';
  }

  // ─── Types panel ───────────────────────────────────────────────────────────

  complexProps(): ComponentProperty[] {
    return (
      this.currentMeta?.properties.filter(
        p => this.getControlType(p.type) === 'readonly',
      ) ?? []
    );
  }

  getTypeDef(type: string): string | null {
    return this.typeDefs[type] ?? null;
  }

  // ─── Event log ─────────────────────────────────────────────────────────────

  logEvent(name: string, payload: any): void {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const payloadStr =
      payload == null
        ? '—'
        : typeof payload === 'object'
          ? JSON.stringify(payload)
          : String(payload);

    this.eventLog.unshift({ timestamp, eventName: name, payload: payloadStr });
    if (this.eventLog.length > 80) this.eventLog.pop();

    // Auto-switch to events panel so user sees the log
    if (this.activePanel !== 'events') this.activePanel = 'events';
  }

  clearEvents(): void {
    this.eventLog = [];
  }

  // ─── Code generation ───────────────────────────────────────────────────────

  copyCode(): void {
    navigator.clipboard?.writeText(this.generatedCode).then(() => {
      this.copiedCode = true;
      setTimeout(() => (this.copiedCode = false), 2000);
    });
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private loadMeta(): void {
    this.currentMeta = null;
    for (const cat of COMPONENT_CATEGORIES) {
      const comp = cat.components.find(c => c.selector === this.selector);
      if (comp) {
        this.currentMeta = comp;
        return;
      }
    }
  }

  private initOverrides(): void {
    this.overrides = {};
    this.fg.get('normal')?.enable({ emitEvent: false });
    this.fg.get('phone')?.enable({ emitEvent: false });

    for (const prop of this.currentMeta?.properties ?? []) {
      this.overrides[prop.name] = this.getDefaultValue(prop);
    }
  }

  private regenerateCode(): void {
    if (!this.selector || !this.currentMeta) {
      this.generatedCode = '';
      return;
    }

    const attrLines: string[] = [];
    const needsOptions = OPTIONS_COMPONENTS.has(this.selector);

    if (needsOptions) {
      attrLines.push('  [options]="options"');
    }

    for (const prop of this.currentMeta.properties) {
      if (this.getControlType(prop.type) === 'readonly') continue;

      const current = this.overrides[prop.name];
      const def = this.getDefaultValue(prop);

      // Skip unchanged defaults
      if (current === def || current === null || current === undefined) continue;

      if (prop.type === 'boolean') {
        if (current === true) attrLines.push(`  [${prop.name}]="true"`);
      } else if (prop.type === 'number') {
        attrLines.push(`  [${prop.name}]="${current}"`);
      } else {
        attrLines.push(`  ${prop.name}="${current}"`);
      }
    }

    const tag = this.selector;
    const outlineVal: string = this.getVal('outline', '');
    const labelContent =
      outlineVal === 'outer-label'
        ? '  <div dxLabel>Label</div>'
        : '  <dx-label>Label</dx-label>';

    this.generatedCode =
      attrLines.length === 0
        ? `<${tag}>\n${labelContent}\n</${tag}>`
        : `<${tag}\n${attrLines.join('\n')}>\n${labelContent}\n</${tag}>`;
  }
}
