import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  COMPONENT_CATEGORIES,
  ComponentCategory,
  ComponentInfo,
} from './component-explorer.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  searchQuery = '';
  activeTab: 'preview' | 'code' = 'preview';
  selectedComponent: ComponentInfo | null = null;
  copiedSnippet: 'module' | 'html' | null = null;

  expandedCategories: Record<string, boolean> = {};
  filteredCategories: ComponentCategory[] = COMPONENT_CATEGORIES;

  private readonly allCategories: ComponentCategory[] = COMPONENT_CATEGORIES;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.allCategories.forEach(cat => {
      this.expandedCategories[cat.name] = true;
    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.syncSelectedFromRoute());

    this.syncSelectedFromRoute();
  }

  onSearch(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.filteredCategories = this.allCategories;
      return;
    }
    this.filteredCategories = this.allCategories
      .map(cat => ({
        ...cat,
        components: cat.components.filter(
          c =>
            c.name.toLowerCase().includes(q) ||
            c.selector.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        ),
      }))
      .filter(cat => cat.components.length > 0);

    this.filteredCategories.forEach(cat => {
      this.expandedCategories[cat.name] = true;
    });
  }

  toggleCategory(name: string): void {
    this.expandedCategories[name] = !this.expandedCategories[name];
  }

  selectComponent(comp: ComponentInfo): void {
    this.selectedComponent = comp;
    this.activeTab = 'preview';
    if (comp.routeIsPreview) {
      this.router.navigate(['preview', comp.selector]);
    } else {
      this.router.navigate([comp.route]);
    }
  }

  isActive(comp: ComponentInfo): boolean {
    return this.selectedComponent === comp;
  }

  // ── Code generation ────────────────────────────────────────────────────────

  isDesignToken(comp: ComponentInfo): boolean {
    return !comp.moduleImport;
  }

  generateModuleSnippet(comp: ComponentInfo): string {
    if (!comp.moduleImport) return '';
    const path = comp.packagePath ?? '@ngdx/dijta';
    return [
      `import { ${comp.moduleImport} } from '${path}';`,
      ``,
      `@NgModule({`,
      `  imports: [`,
      `    ${comp.moduleImport}`,
      `  ]`,
      `})`,
      `export class AppModule {}`,
    ].join('\n');
  }

  generateHtmlSnippet(comp: ComponentInfo): string {
    if (!comp.moduleImport) return this.generateCssSnippet(comp);

    const tag = comp.selector;
    const attrLines: string[] = [];

    for (const prop of comp.properties) {
      if (prop.type === 'CSS class' || prop.type === 'CSS var') continue;
      if (prop.required) {
        if (prop.type === 'boolean') {
          attrLines.push(`  [${prop.name}]="true"`);
        } else if (prop.type === 'number') {
          attrLines.push(`  [${prop.name}]="0"`);
        } else {
          attrLines.push(`  ${prop.name}="${prop.name}"`);
        }
      }
    }

    const attrs = attrLines.length ? '\n' + attrLines.join('\n') + '\n' : '';
    return `<${tag}${attrs}></${tag}>`;
  }

  generateCssSnippet(comp: ComponentInfo): string {
    if (comp.selector === 'dx-typography') {
      return [
        `<!-- Wrap in dx-typography context (set on <body>) -->`,
        ``,
        `<!-- Heading levels -->`,
        `<h1 class="heading-1">Page title</h1>`,
        `<h2 class="heading-2">Section title</h2>`,
        `<h3 class="heading-3">Sub-section</h3>`,
        ``,
        `<!-- Body text -->`,
        `<p class="body">Regular body copy.</p>`,
        `<p class="subbody">Secondary text.</p>`,
        `<span class="paragraph">Caption / footnote</span>`,
        ``,
        `<!-- Combine level + weight modifier -->`,
        `<p class="heading-4 fw-semibold">Bold heading</p>`,
        `<p class="body fw-medium">Medium body copy</p>`,
      ].join('\n');
    }

    if (comp.selector === 'dx-shadow') {
      return [
        `// ── Utility class usage ───────────────────────────────────────────────`,
        `<div class="dx-shadow-sm">…</div>   // card`,
        `<div class="dx-shadow-md">…</div>   // default`,
        `<div class="dx-shadow-lg">…</div>   // modal / dropdown`,
        `<div class="dx-shadow-none">…</div> // remove shadow`,
        ``,
        `// ── CSS token usage in SCSS ───────────────────────────────────────────`,
        `.dx-card   { box-shadow: var(--dx-shadow-md); }`,
        `.dx-modal  { box-shadow: var(--dx-shadow-xl); }`,
        `.dx-chip   { box-shadow: var(--dx-shadow-xs); }`,
        ``,
        `// ── Scale ────────────────────────────────────────────────────────────`,
        `// --dx-shadow-none  0 0 #0000`,
        `// --dx-shadow-2xs   0 1px 1px 0 rgba(17,24,39,.05)`,
        `// --dx-shadow-xs    0 1px 2.5px 0 rgba(17,24,39,.05)`,
        `// --dx-shadow-sm    0 1px 3px … + 0 1px 2px …   (2 layers)`,
        `// --dx-shadow-md    0 4px 6px … + 0 2px 4px …   (2 layers)`,
        `// --dx-shadow-lg    0 10px 15px … + 0 4px 6px … (2 layers)`,
        `// --dx-shadow-xl    0 20px 25px … + 0 8px 10px … (2 layers)`,
        `// --dx-shadow-2xl   0 25px 50px 0 rgba(17,24,39,.10)`,
      ].join('\n');
    }

    if (comp.selector === 'dx-border-radius') {
      return [
        `// ── Utility class usage (generated from $dx-radii) ──────────────────`,
        `<div class="dx-rounded-sm">…</div>       // border-radius:  5px`,
        `<div class="dx-rounded-md">…</div>       // border-radius: 10px`,
        `<div class="dx-rounded-lg">…</div>       // border-radius: 20px`,
        `<div class="dx-rounded-circle">…</div>   // border-radius: 50%`,
        `<div class="dx-rounded-0">…</div>        // border-radius:  0`,
        `<div class="dx-rounded-top-md">…</div>   // top corners only`,
        `<div class="dx-rounded-end-lg">…</div>   // right corners only`,
        ``,
        `// ── CSS token usage in SCSS ───────────────────────────────────────────`,
        `.dx-chip   { border-radius: var(--dx-radius-sm); }     //  5px`,
        `.dx-button { border-radius: var(--dx-radius-md); }     // 10px`,
        `.dx-card   { border-radius: var(--dx-radius-lg); }     // 20px`,
        `.dx-avatar { border-radius: var(--dx-radius-circle); } // 50%`,
        ``,
        `// ── Scale (at 20px root font-size) ───────────────────────────────────`,
        `// --dx-radius-sm      0.25rem   5px   chips · small inputs`,
        `// --dx-radius-md      0.5rem   10px   cards · buttons`,
        `// --dx-radius-lg      1rem     20px   modals · large surfaces`,
        `// --dx-radius-circle  50%       —     avatars · icon buttons · dots`,
      ].join('\n');
    }

    if (comp.selector === 'dx-spacing') {
      return [
        `// ── SCSS $spacers map (override Bootstrap before import) ──────────────`,
        `$spacers: (`,
        `  0: 0,`,
        `  1: 0.25rem,  //  5px · --dx-spacing-xs`,
        `  2: 0.5rem,   // 10px · --dx-spacing-sm`,
        `  3: 1rem,     // 20px · --dx-spacing-md`,
        `  4: 1.5rem,   // 30px · --dx-spacing-lg`,
        `  5: 2rem      // 40px · --dx-spacing-xl`,
        `);`,
        ``,
        `// ── Bootstrap utility classes (generated automatically) ───────────────`,
        `.my-card  { padding: 1rem; }         // p-3`,
        `.my-card  { margin-bottom: 1.5rem; } // mb-4`,
        `.my-grid  { gap: 0.5rem; }           // gap-2`,
        ``,
        `// ── CSS token usage in component SCSS ────────────────────────────────`,
        `.dx-my-component {`,
        `  padding: var(--dx-spacing-md);   // 1rem  (step 3)`,
        `  margin-bottom: var(--dx-spacing-lg); // 1.5rem (step 4)`,
        `  gap: var(--dx-spacing-sm);       // 0.5rem (step 2)`,
        `}`,
      ].join('\n');
    }

    if (comp.selector === 'dx-colors') {
      return [
        `/* Use CSS custom properties directly */`,
        ``,
        `.my-element {`,
        `  color: var(--dx-on-surface);`,
        `  background: var(--dx-surface-card);`,
        `  border-color: var(--dx-outline);`,
        `}`,
        ``,
        `.success-badge {`,
        `  color: var(--dx-on-surface);`,
        `  background: var(--alert-success);`,
        `}`,
      ].join('\n');
    }

    return '';
  }

  copySnippet(text: string, kind: 'module' | 'html'): void {
    navigator.clipboard?.writeText(text).then(() => {
      this.copiedSnippet = kind;
      setTimeout(() => (this.copiedSnippet = null), 2000);
    });
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private syncSelectedFromRoute(): void {
    const url = this.router.url.replace(/^\//, '');
    const previewMatch = url.match(/^preview\/(.+)$/);

    for (const cat of this.allCategories) {
      for (const comp of cat.components) {
        if (previewMatch && comp.routeIsPreview && comp.selector === previewMatch[1]) {
          this.selectedComponent = comp;
          this.expandedCategories[cat.name] = true;
          return;
        }
        if (!previewMatch && !comp.routeIsPreview && comp.route === url) {
          this.selectedComponent = comp;
          this.expandedCategories[cat.name] = true;
          return;
        }
      }
    }

    if (!this.selectedComponent) {
      const first = this.allCategories[0]?.components[0];
      if (first) this.selectComponent(first);
    }
  }
}
