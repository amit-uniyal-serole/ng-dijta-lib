import { ComponentRef } from '@angular/core';
import { BasePortalHost, ComponentPortal } from '../portal/portal';

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class OverlayRef {
  constructor(private _portalHost: BasePortalHost) { }


  // we need to pass component for ComponentPortal<any>,currently we dont have  interface for component.
  attach(
    portal: ComponentPortal<any>,
    newestOnTop: boolean = true,
  ): ComponentRef<any> {
    return this._portalHost?.attach(portal, newestOnTop);
  }

  /**
   * Detaches an overlay from a portal.
   * @returns Resolves when the overlay has been detached.
   */
  detach(): void {
    return this._portalHost?.detach();
  }
}
