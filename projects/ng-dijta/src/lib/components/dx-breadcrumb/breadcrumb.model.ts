/** A single breadcrumb entry. */
export interface DxBreadcrumb {
  /** Visible label. May contain `{{paramName}}` tokens resolved from route params or `DxBreadcrumbService.updateBreadcrumbLabels`. */
  label: string;
  /** Router link for the entry. An empty string marks the current (last, non-linked) page. May contain `:param` route tokens. */
  url: string;
}
