import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
export interface Values {
  id: number;
  value: string;
}[]
@Component({
  selector: 'dx-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.scss'],
})
export class EmailComposeComponent implements OnInit {
  newEmailForm!: FormGroup;
  atValues = [
    { id: 1, value: 'admin@serole.com', denotationChar: ' ', data: 'Admin' },
    { id: 2, value: 'hr@serole.com', denotationChar: ' ', data: 'HR Team' },
    { id: 2, value: 'User@gmail.com', denotationChar: ' ', data: 'User' },
    { id: 2, value: 'Test@gmail.com', denotationChar: ' ', data: 'Test' },
  ];
  hashValues = [
    { id: 3, value: 'hashRef1' },
    { id: 4, value: 'hashRef2' },
  ];
  toQuillConfigModel = {
    toolbar: {
      container: [],
    },
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@'],
      source: (searchTerm: any, renderList: any, mentionChar: any) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches: Values[] = [];
          for (var i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
  };
  QuillConfigModel = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'], // toggled buttons
        ['blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button

        ['link', 'image'], // link and image, video
        ['emoji'],
      ],
    },
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm: any, renderList: any, mentionChar: any) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches: Values[] = [];
          for (var i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  };
  emailBody: any;
  newEmail!: {
    from: any;
    subject: string;
    body: any;
    content: any;
    img: string;
    cc: string[];
    bcc: string[];
    date: Date;
  };
  isCc: boolean = false;
  isBcc: boolean = false;
  styles = {
    height: '120px',
  };
  listOfEmails: any = [];
  listOfCcEmails: any = [];
  listOfBccEmails: any = [];
  toEmailContent: any;
  validEmail: boolean = false;
  inValidEmail: any = false;
  EditorData: any;
  editorData: any;
  ccEmails: any;
  bccEmails: any;
  constructor(
    private readonly dialogRef: MatDialogRef<EmailComposeComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newEmailForm = this.fb.group({
      subject: [''],
    });
  }

  onClickSendOption(event: string) {
    if (event == 'Cc') {
      this.isCc = true;
    } else {
      this.isBcc = true;
    }
  }
  toQuillContent(event: any) {
    this.toEmailContent = event?.content?.ops;
  }
  ccQuillContent(event: any) {
    this.ccEmails = event?.content?.ops;
  }
  bccQuillContent(event: any) {
    this.bccEmails = event?.content?.ops;
  }
  // `${
  // moment(new Date()).format('MMM') + ' ' + moment(new Date()).format('DD')
  // }`,
  ContentChanged(event: any) {
    this.editorData = event;
    // this.emailBody = event.html;
  }
  sendMail() {
    const email = this.newEmailForm.value;
    if (this.emails(this.toEmailContent).length > 0) {
      this.inValidEmail = false;
      this.newEmail = {
        from: this.emails(this.toEmailContent, true),
        subject: email.subject,
        body: this.editorData?.html ?? '',
        content: this.editorData?.text ?? '',
        img: `http://angular-material.fusetheme.com/assets/images/avatars/female-01.jpg`,
        cc: this.emails(this.ccEmails),
        bcc: this.emails(this.bccEmails),
        date: new Date(),
      };
      this.dialogRef.close(this.newEmail);
    } else {
      this.inValidEmail = true;
    }
  }

  emails(list: any, isFrom?: boolean): string[] {
    const emails: any = [];
    let email: any;
    list?.forEach((item: any) => {
      if (item?.insert?.mention) {
        email = {
          name: item?.insert?.mention?.data,
          email: item?.insert?.mention?.value,
        };

        emails.push(email);
      }
    });
    return isFrom ? email : emails;
  }
  close() {
    this.dialogRef.close();
  }
}
