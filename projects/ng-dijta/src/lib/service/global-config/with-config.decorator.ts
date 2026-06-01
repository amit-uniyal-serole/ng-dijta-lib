import { Inject } from "@angular/core";
import { switchMap } from "rxjs";
import { DxGlobalAppConfigService } from "./global-config.service";

export function WithTableConfig() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      const configService = Inject(DxGlobalAppConfigService)
  
      descriptor.value = function (...args: any[]) {
        // Ensure 'this' has access to configService
        if (!configService) {
          throw new Error(`ConfigService is not available in ${target.constructor.name}. Make sure it's injected.`);
        }
  
        return configService.getConfig().pipe(
          switchMap(config => {
            args.unshift(config); // Pass config as the first argument
            return originalMethod.apply(this, args);
          })
        );
      };
  
      return descriptor;
    };
  }
  