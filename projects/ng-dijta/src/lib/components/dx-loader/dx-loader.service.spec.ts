import { TestBed } from "@angular/core/testing";

import { DxLoaderService } from "./dx-loader.service";

describe("DxLoaderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DxLoaderService = TestBed.get(DxLoaderService);
    expect(service).toBeTruthy();
  });
});
