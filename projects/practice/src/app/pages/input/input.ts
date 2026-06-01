import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DxLookupModalConfig, KeyValueModel } from "projects/ng-dijta/src/public-api";

@Component({
    selector: "app-input",
    templateUrl: "./input.html"
})
export class Input implements OnInit{
    options: KeyValueModel[] = [
        {
            keyTt: 'New',
            valueTt: 'New'
        },
        {
            keyTt: 'In Progress',
            valueTt: 'In Progress'
        },
        {
            keyTt: 'Pending Approval',
            valueTt: 'Pending Approval'
        }
    ];
    config = {
                idName: {
                          id: 'siteCode',
                          name: 'siteCode'
                      },
                lookupApiConfig: {
                    method: 'POST',
                    rootUrl: 'dx-lcnc-rm-api',
                    api: `${'dx-lcnc-rm-api'}/v1/module/record`,
                    customSearchWithGenriceService: true,
                    body: {
                        module: 'Site',
                        action: 'View',
                        paginationRequest: {
                            sortOrder: 'desc',
                            sortBy: 'pkId',
                            pageNo: 0,
                            pageSize: 10,
                        }
                    },
                },
                tableSettings: {
                    leftActions: [
                        {
                            icon: 'refresh',
                            label: 'Refresh',
                            type: 'refresh',
                        },
                    ],
                    pageSize: 10,
                    pagination: true,
                    paginationFirstLastButtons: true,
                    singleRowSelect: true,
                    multiSelect: true
                },
                lookUpHeaderSettings: {
                    isServiceDefined: false
                },
                
            } as DxLookupModalConfig;
    fg = new FormGroup({
        input: new FormControl(),
        select: new FormControl(),
        autocomplete: new FormControl(),
        currency: new FormControl(),
        phone: new FormControl('',Validators.required),
        chipAutocomplete: new FormControl(),
        number: new FormControl(),
        tag: new FormControl(),
        serverAutocomplete: new FormControl(),
        chipSelect: new FormControl(),
        image: new FormControl(),
        coordinates: new FormControl(),
        datepicker: new FormControl(),
        daterange: new FormControl(),
        url: new FormControl(),
        radio: new FormControl(),
        checkbox: new FormControl(),
        datetime: new FormControl(),
        textarea: new FormControl(),
        timePicker: new FormControl()
    })

    ngOnInit(): void {
        //this.fg.get('timePicker')?.disable({ emitEvent: false });
    }
}