import { Component } from '@angular/core';
import { CalendarSettings } from 'projects/ng-dijta/src/public-api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
})
export class Calendar {
  scheduleList = [
    {
      "calendarId": "Completed",
      "category": "time",
      "isVisible": true,
      "title": "Multi site - A2BX - A2BX - Every Day",
      "id": "1926663",
      "start": "Wed Feb 11 2026 09:00:00 GMT+0530",
      "end": "Wed Feb 11 2026 20:00:00 GMT+0530",
      "raw": {
        "pkId": 1926663,
        "createdBy": {
          "name": "Anurag Pathak",
          "email": "anurag.pathak@serole.com",
          "id": 1691,
          "pkId": 1
        },
        "changedBy": {
          "name": "Anurag Pathak",
          "email": "anurag.pathak@serole.com",
          "id": 1691,
          "pkId": 1
        },
        "name": "Multi site - {siteCode} - {siteNumber} - Every Day",
        "templateName": "Multi site",
        "moduleName": "CustomModule1762335790723",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-11",
        "startFrequency": "2026-02-10",
        "endFrequency": "2026-02-11",
        "startTime": "09:00:00",
        "endTime": "20:00:00",
        "inspectionScheduleId": 239,
        "siteId": 86242,
        "dueStartDate": "2026-02-11",
        "siteDueEndDate": "2026-02-11",
        "completedBy": {
          "name": "Anurag Pathak",
          "email": "anurag.pathak@serole.com",
          "id": 1691,
          "pkId": 1
        },
        "inspectionStatus": "Completed",
        "scheduleStatus": "Active",
        "title": "Multi site - A2BX - A2BX - Every Day",
        "routineId": 89622,
        "siteCode": "A2BX",
        "completedOn": "2026-02-11",
        "canStartInspection": "2026-02-11",
        "allowedCompletionDate": "2026-02-11",
        "assignType": "User",
        "siteNumber": "A2BX",
        "allowMissedRoutines": false,
        "country": "Australia",
        "state": "NSW",
        "status": "Completed",
        "color": "#29AB14",
        icon:'info'
      },
      "color": "#ffffff",
      "bgColor": "#29AB14",
      "borderColor": "#19670c",
      "dragBgColor": "#19670c",      
    },
    {
      "calendarId": "Scheduled",
      "category": "allday",
      "isVisible": true,
      "title": "Multi site - A2BX - A2BX - Every Day",
      "id": "1926662",
      "start": "Tue Feb 10 2026 09:00:00 GMT+0530",
      "end": "Tue Feb 10 2026 20:00:00 GMT+0530",
      "raw": {
        icon:'info',
        "pkId": 1926662,
        "createdBy": {
          "name": "Anurag Pathak",
          "email": "anurag.pathak@serole.com",
          "id": 1691,
          "pkId": 1
        },
        "changedBy": {
          "name": "Anurag Pathak",
          "email": "anurag.pathak@serole.com",
          "id": 1691,
          "pkId": 1
        },
        "name": "Multi site - {siteCode} - {siteNumber} - Every Day",
        "templateName": "Multi site",
        "moduleName": "CustomModule1762335790723",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-10",
        "startFrequency": "2026-02-10",
        "endFrequency": "2026-02-11",
        "startTime": "09:00:00",
        "endTime": "20:00:00",
        "inspectionScheduleId": 239,
        "siteId": 86242,
        "dueStartDate": "2026-02-10",
        "siteDueEndDate": "2026-02-10",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "Multi site - A2BX - A2BX - Every Day",
        "siteCode": "A2BX",
        "canStartInspection": "2026-02-10",
        "allowedCompletionDate": "2026-02-10",
        "assignType": "User",
        "siteNumber": "A2BX",
        "allowMissedRoutines": false,
        "country": "Australia",
        "state": "NSW",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f"
    },
    {
      "calendarId": "Scheduled",
      "category": "allday",
      "isVisible": true,
      "title": "Multi site - A2BX - A2BX - Every Week",
      "id": "1926661",
      "start": "Tue Feb 17 2026 09:00:00 GMT+0530",
      "end": "Tue Feb 17 2026 17:00:00 GMT+0530",
      "raw": {
        icon:"schedule",
        "pkId": 1926661,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "Multi site - {siteCode} - {siteNumber} - Every Week",
        "templateName": "Multi site",
        "moduleName": "CustomModule1762335790723",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "week",
        "interval": 1,
        "dueDate": "2026-02-17",
        "startFrequency": "2026-02-10",
        "endFrequency": "2026-02-27",
        "startTime": "09:00:00",
        "endTime": "17:00:00",
        "inspectionScheduleId": 238,
        "siteId": 86242,
        "dueStartDate": "2026-02-17",
        "siteDueEndDate": "2026-02-17",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "Multi site - A2BX - A2BX - Every Week",
        "siteCode": "A2BX",
        "canStartInspection": "2026-02-17",
        "allowedCompletionDate": "2026-02-17",
        "assignType": "User",
        "siteNumber": "A2BX",
        "allowMissedRoutines": true,
        "country": "Australia",
        "state": "NSW",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f"
    },
    {
      "calendarId": "Completed",
      "category": "allday",
      "isVisible": true,
      "title": "Multi site - A2BX - A2BX - Every Week",
      "id": "1926660",
      "start": "Tue Feb 10 2026 09:00:00 GMT+0530",
      "end": "Tue Feb 10 2026 17:00:00 GMT+0530",
      "raw": {
        icon:"pending_actions",
        "pkId": 1926660,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "Multi site - {siteCode} - {siteNumber} - Every Week",
        "templateName": "Multi site",
        "moduleName": "CustomModule1762335790723",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "week",
        "interval": 1,
        "dueDate": "2026-02-10",
        "startFrequency": "2026-02-10",
        "endFrequency": "2026-02-27",
        "startTime": "09:00:00",
        "endTime": "17:00:00",
        "inspectionScheduleId": 238,
        "siteId": 86242,
        "dueStartDate": "2026-02-10",
        "siteDueEndDate": "2026-02-10",
        "completedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "inspectionStatus": "Completed",
        "scheduleStatus": "Active",
        "title": "Multi site - A2BX - A2BX - Every Week",
        "routineId": 89621,
        "siteCode": "A2BX",
        "completedOn": "2026-02-10",
        "canStartInspection": "2026-02-10",
        "allowedCompletionDate": "2026-02-10",
        "assignType": "User",
        "siteNumber": "A2BX",
        "allowMissedRoutines": true,
        "country": "Australia",
        "state": "NSW",
        "status": "Completed",
        "color": "#29AB14"
      },
      "color": "#ffffff",
      "bgColor": "#29AB14",
      "borderColor": "#19670c",
      "dragBgColor": "#19670c"
    },
    {
      "calendarId": "Scheduled",
      "category": "time",
      "isVisible": true,
      "title": "PROD TESTING - B4LP - B4LP - Every Day",
      "id": "1926656",
      "start": "Mon Feb 09 2026 09:00:00 GMT+0530",
      "end": "Mon Feb 09 2026 17:00:00 GMT+0530",
      "raw": {
        "pkId": 1926656,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "PROD TESTING - {siteCode} - {siteNumber} - Every Day",
        "templateName": "PROD TESTING",
        "moduleName": "CustomModule1754973098297",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-09",
        "startFrequency": "2026-02-09",
        "endFrequency": "2026-02-09",
        "startTime": "09:00:00",
        "endTime": "17:00:00",
        "inspectionScheduleId": 237,
        "siteId": 86241,
        "dueStartDate": "2026-02-09",
        "siteDueEndDate": "2026-02-09",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "PROD TESTING - B4LP - B4LP - Every Day",
        "siteCode": "B4LP",
        "canStartInspection": "2026-02-09",
        "allowedCompletionDate": "2026-02-09",
        "assignType": "User",
        "siteNumber": "B4LP",
        "allowMissedRoutines": false,
        "country": "Australia",
        "state": "QLD",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f",
      location:true
    },
    {
      "calendarId": "Scheduled",
      "category": "allday",
      "isVisible": true,
      "title": "xyzz - A2BX - A2BX - Every Day",
      "id": "1926655",
      "start": "Mon Feb 09 2026 09:00:00 GMT+0530",
      "end": "Mon Feb 09 2026 17:00:00 GMT+0530",
      "raw": {
        "pkId": 1926655,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "xyzz - {siteCode} - {siteNumber} - Every Day",
        "templateName": "xyzz",
        "moduleName": "CustomModule1761890070289",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-09",
        "startFrequency": "2026-02-09",
        "endFrequency": "2026-02-09",
        "startTime": "09:00:00",
        "endTime": "17:00:00",
        "inspectionScheduleId": 236,
        "siteId": 86242,
        "dueStartDate": "2026-02-09",
        "siteDueEndDate": "2026-02-09",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "xyzz - A2BX - A2BX - Every Day",
        "siteCode": "A2BX",
        "canStartInspection": "2026-02-09",
        "allowedCompletionDate": "2026-02-09",
        "assignType": "User",
        "siteNumber": "A2BX",
        "allowMissedRoutines": true,
        "country": "Australia",
        "state": "NSW",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f"
    },
    {
      "calendarId": "Scheduled",
      "category": "allday",
      "isVisible": true,
      "title": "Multi site - B4LP - B4LP - Every Day",
      "id": "1926654",
      "start": "Tue Feb 10 2026 09:00:00 GMT+0530",
      "end": "Tue Feb 10 2026 17:00:00 GMT+0530",
      "raw": {
        "pkId": 1926654,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "Multi site - {siteCode} - {siteNumber} - Every Day",
        "templateName": "Multi site",
        "moduleName": "CustomModule1762335790723",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-10",
        "startFrequency": "2026-02-09",
        "endFrequency": "2026-02-10",
        "startTime": "09:00:00",
        "endTime": "17:00:00",
        "inspectionScheduleId": 235,
        "siteId": 86241,
        "dueStartDate": "2026-02-10",
        "siteDueEndDate": "2026-02-10",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "Multi site - B4LP - B4LP - Every Day",
        "siteCode": "B4LP",
        "canStartInspection": "2026-02-10",
        "allowedCompletionDate": "2026-02-10",
        "assignType": "User",
        "siteNumber": "B4LP",
        "allowMissedRoutines": true,
        "country": "Australia",
        "state": "QLD",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f"
    },
    {
      "calendarId": "Scheduled",
      "category": "allday",
      "isVisible": true,
      "title": "Multi site - B4LP - B4LP - Every Day",
      "id": "1926653",
      "start": "Mon Feb 09 2026 09:00:00 GMT+0530",
      "end": "Mon Feb 09 2026 17:00:00 GMT+0530",
      "raw": {
        "pkId": 1926653,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "Multi site - {siteCode} - {siteNumber} - Every Day",
        "templateName": "Multi site",
        "moduleName": "CustomModule1762335790723",
        "assignedTo": [
          {
            "name": "Toby Nanson",
            "email": "toby.nanson@mua.com",
            "id": 2272,
            "pkId": 254
          }
        ],
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-09",
        "startFrequency": "2026-02-09",
        "endFrequency": "2026-02-10",
        "startTime": "09:00:00",
        "endTime": "17:00:00",
        "inspectionScheduleId": 235,
        "siteId": 86241,
        "dueStartDate": "2026-02-09",
        "siteDueEndDate": "2026-02-09",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "Multi site - B4LP - B4LP - Every Day",
        "siteCode": "B4LP",
        "canStartInspection": "2026-02-09",
        "allowedCompletionDate": "2026-02-09",
        "assignType": "User",
        "siteNumber": "B4LP",
        "allowMissedRoutines": true,
        "country": "Australia",
        "state": "QLD",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f"
    },
    {
      "calendarId": "Scheduled",
      "category": "allday",
      "isVisible": true,
      "title": "FILTERS REP OM 5200 - B4LP - B4LP - Every Day",
      "id": "1926652",
      "start": "Fri Feb 06 2026 09:00:00 GMT+0530",
      "end": "Fri Feb 06 2026 21:00:00 GMT+0530",
      "raw": {
        "pkId": 1926652,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "FILTERS REP OM 5200 - {siteCode} - {siteNumber} - Every Day",
        "templateName": "FILTERS REP OM 5200",
        "moduleName": "CustomModule1754461978999",
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-06",
        "startFrequency": "2026-02-05",
        "endFrequency": "2026-02-06",
        "startTime": "09:00:00",
        "endTime": "21:00:00",
        "inspectionScheduleId": 234,
        "siteId": 86241,
        "dueStartDate": "2026-02-06",
        "siteDueEndDate": "2026-02-06",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "FILTERS REP OM 5200 - B4LP - B4LP - Every Day",
        "siteCode": "B4LP",
        "canStartInspection": "2026-02-06",
        "allowedCompletionDate": "2026-02-06",
        "siteNumber": "B4LP",
        "allowMissedRoutines": true,
        "country": "Australia",
        "state": "QLD",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f"
    },
    {
      "calendarId": "Scheduled",
      "category": "allday",
      "isVisible": true,
      "title": "FILTERS REP OM 5200 - B4LP - B4LP - Every Day",
      "id": "1926651",
      "start": "Thu Feb 05 2026 09:00:00 GMT+0530",
      "end": "Thu Feb 05 2026 21:00:00 GMT+0530",
      "raw": {
        "pkId": 1926651,
        "createdBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "changedBy": {
          "name": "Toby Nanson",
          "email": "toby.nanson@mua.com",
          "id": 2272,
          "pkId": 254
        },
        "name": "FILTERS REP OM 5200 - {siteCode} - {siteNumber} - Every Day",
        "templateName": "FILTERS REP OM 5200",
        "moduleName": "CustomModule1754461978999",
        "frequency": "days",
        "interval": 1,
        "dueDate": "2026-02-05",
        "startFrequency": "2026-02-05",
        "endFrequency": "2026-02-06",
        "startTime": "09:00:00",
        "endTime": "21:00:00",
        "inspectionScheduleId": 234,
        "siteId": 86241,
        "dueStartDate": "2026-02-05",
        "siteDueEndDate": "2026-02-05",
        "inspectionStatus": "Scheduled",
        "scheduleStatus": "Active",
        "title": "FILTERS REP OM 5200 - B4LP - B4LP - Every Day",
        "siteCode": "B4LP",
        "canStartInspection": "2026-02-05",
        "allowedCompletionDate": "2026-02-05",
        "siteNumber": "B4LP",
        "allowMissedRoutines": true,
        "country": "Australia",
        "state": "QLD",
        "status": "Scheduled",
        "color": "#35C8D4"
      },
      "color": "#000000",
      "bgColor": "#35C8D4",
      "borderColor": "#20787f",
      "dragBgColor": "#20787f"
    }
  ];
  calendersList = [
    {
      "isChecked": true,
      "id": "Scheduled",
      "name": "Scheduled",
      "status": "Scheduled",
      "color": "#000000",
      "bgColor": "#35C8D4",
      "dragBgColor": "#20787f",
      "borderColor": "#20787f"
    },
    {
      "isChecked": true,
      "id": "In-progress",
      "name": "In-progress",
      "status": "In-progress",
      "color": "#000000",
      "bgColor": "#D4CA35",
      "dragBgColor": "#7f7920",
      "borderColor": "#7f7920"
    },
    {
      "isChecked": true,
      "id": "Completed",
      "name": "Completed",
      "status": "Completed",
      "color": "#ffffff",
      "bgColor": "#29AB14",
      "dragBgColor": "#19670c",
      "borderColor": "#19670c"
    },
    {
      "isChecked": true,
      "id": "Missed",
      "name": "Missed",
      "status": "Missed",
      "color": "#ffffff",
      "bgColor": "#D43568",
      "dragBgColor": "#7f203e",
      "borderColor": "#7f203e"
    },
    {
      "isChecked": true,
      "id": "Skipped",
      "name": "Skipped",
      "status": "Skipped",
      "color": "#ffffff",
      "bgColor": "#D45935",
      "dragBgColor": "#7f3520",
      "borderColor": "#7f3520"
    }
  ];
  calendarSettings: CalendarSettings = {
    enableSettingsAction: false,
    defaultView: 'month',
    dateFormat: 'YYYY-MM-DD',
    dayStartAt: 0,
    startDayOfWeek: 0,
    timeFormat: 12,
    enableCalendarsMenu: true,
    useDetailPopup: false,

  };
}
