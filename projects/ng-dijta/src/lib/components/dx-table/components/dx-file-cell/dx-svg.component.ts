import { Component, Input } from '@angular/core';
@Component({
  selector: 'dx-svg',
  template: `
    <ng-container [ngSwitch]="type">
      <ng-container *ngSwitchCase="'PDF'">
        <svg
          height="20px"
          width="20px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xml:space="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              style="fill:#E2E5E7;"
              d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"
            ></path>
            <path
              style="fill:#B0B7BD;"
              d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"
            ></path>
            <polygon
              style="fill:#CAD1D8;"
              points="480,224 384,128 480,128 "
            ></polygon>
            <path
              style="fill:#F15642;"
              d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16 V416z"
            ></path>
            <g>
              <path
                style="fill:#FFFFFF;"
                d="M101.744,303.152c0-4.224,3.328-8.832,8.688-8.832h29.552c16.64,0,31.616,11.136,31.616,32.48 c0,20.224-14.976,31.488-31.616,31.488h-21.36v16.896c0,5.632-3.584,8.816-8.192,8.816c-4.224,0-8.688-3.184-8.688-8.816V303.152z M118.624,310.432v31.872h21.36c8.576,0,15.36-7.568,15.36-15.504c0-8.944-6.784-16.368-15.36-16.368H118.624z"
              ></path>
              <path
                style="fill:#FFFFFF;"
                d="M196.656,384c-4.224,0-8.832-2.304-8.832-7.92v-72.672c0-4.592,4.608-7.936,8.832-7.936h29.296 c58.464,0,57.184,88.528,1.152,88.528H196.656z M204.72,311.088V368.4h21.232c34.544,0,36.08-57.312,0-57.312H204.72z"
              ></path>
              <path
                style="fill:#FFFFFF;"
                d="M303.872,312.112v20.336h32.624c4.608,0,9.216,4.608,9.216,9.072c0,4.224-4.608,7.68-9.216,7.68 h-32.624v26.864c0,4.48-3.184,7.92-7.664,7.92c-5.632,0-9.072-3.44-9.072-7.92v-72.672c0-4.592,3.456-7.936,9.072-7.936h44.912 c5.632,0,8.96,3.344,8.96,7.936c0,4.096-3.328,8.704-8.96,8.704h-37.248V312.112z"
              ></path>
            </g>
            <path
              style="fill:#CAD1D8;"
              d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"
            ></path>
          </g>
        </svg>
      </ng-container>
      <ng-container *ngSwitchCase="'PNG'">
        <ng-container *ngTemplateOutlet="image"></ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'GIF'">
        <ng-container *ngTemplateOutlet="image"></ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'JPG'">
        <ng-container *ngTemplateOutlet="image"></ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'JPEG'">
        <ng-container *ngTemplateOutlet="image"></ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'PJPEG'">
        <ng-container *ngTemplateOutlet="image"></ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'WEBP'">
        <ng-container *ngTemplateOutlet="image"></ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'SVG'">
        <ng-container *ngTemplateOutlet="image"></ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'TXT'">
      <svg width="20px" height="20px" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.151-.036c-2.803 0-5.074 2.272-5.074 5.074v53.841c0 2.803 2.271 5.074 5.074 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#F9CA06"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M56.008 20.316v1h-12.799s-6.312-1.26-6.129-6.708c0 0 .208 5.708 6.004 5.708h12.924z" fill="#F7BC04"></path> <path d="M37.106-.036v14.561c0 1.656 1.104 5.792 6.104 5.792h12.799l-18.903-20.353z" opacity=".5" fill="#ffffff"></path> </g> <path d="M18.763 43.045h-3.277v10.047c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.047h-3.259c-.36 0-.648-.288-.648-.684 0-.36.288-.648.648-.648h8.03c.36 0 .648.288.648.685 0 .359-.288.647-.648.647zm11.7 10.803c-.216 0-.415-.089-.541-.27l-3.727-4.97-3.745 4.97c-.126.181-.324.27-.54.27-.396 0-.72-.306-.72-.72 0-.144.036-.306.144-.432l3.889-5.131-3.619-4.826c-.09-.126-.144-.27-.144-.414 0-.343.288-.721.72-.721.216 0 .432.108.576.288l3.439 4.627 3.439-4.646c.126-.18.324-.27.541-.27.378 0 .738.306.738.721 0 .144-.036.288-.126.414l-3.619 4.808 3.89 5.149c.09.126.126.27.126.415 0 .396-.325.738-.721.738zm11.195-10.803h-3.277v10.047c0 .414-.323.738-.756.738-.414 0-.738-.324-.738-.738v-10.047h-3.259c-.36 0-.648-.288-.648-.684 0-.36.288-.648.648-.648h8.03c.36 0 .648.288.648.685.001.359-.287.647-.648.647z" fill="#ffffff"></path> </g></svg>
    </ng-container>
      <ng-container *ngSwitchCase="'PPT'">
      <svg width="20px" height="20px" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.112-.004c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#E34221"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#DC3119"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M14.964 49.011h-3.331v4.141c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.298c0-.594.486-1.081 1.08-1.081h3.745c2.413 0 3.763 1.657 3.763 3.619 0 1.963-1.387 3.619-3.763 3.619zm-.181-5.906h-3.15v4.573h3.15c1.423 0 2.395-.936 2.395-2.287 0-1.349-.972-2.286-2.395-2.286zm11.197 5.906h-3.332v4.141c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.298c0-.594.486-1.081 1.08-1.081h3.746c2.412 0 3.763 1.657 3.763 3.619 0 1.963-1.387 3.619-3.763 3.619zm-.18-5.906h-3.151v4.573h3.151c1.423 0 2.395-.936 2.395-2.287-.001-1.349-.972-2.286-2.395-2.286zm14.112 0h-3.277v10.047c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.047h-3.259c-.36 0-.647-.288-.647-.684 0-.361.287-.648.647-.648h8.03c.36 0 .648.288.648.685.001.359-.288.647-.648.647z" fill="#ffffff"></path> </g></svg>
    </ng-container>
      <ng-container *ngSwitchCase="'PPTX'">
      <svg width="20px" height="20px" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.112-.004c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#E34221"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#DC3119"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M14.964 49.011h-3.331v4.141c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.298c0-.594.486-1.081 1.08-1.081h3.745c2.413 0 3.763 1.657 3.763 3.619 0 1.963-1.387 3.619-3.763 3.619zm-.181-5.906h-3.15v4.573h3.15c1.423 0 2.395-.936 2.395-2.287 0-1.349-.972-2.286-2.395-2.286zm11.197 5.906h-3.332v4.141c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.298c0-.594.486-1.081 1.08-1.081h3.746c2.412 0 3.763 1.657 3.763 3.619 0 1.963-1.387 3.619-3.763 3.619zm-.18-5.906h-3.151v4.573h3.151c1.423 0 2.395-.936 2.395-2.287-.001-1.349-.972-2.286-2.395-2.286zm14.112 0h-3.277v10.047c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.047h-3.259c-.36 0-.647-.288-.647-.684 0-.361.287-.648.647-.648h8.03c.36 0 .648.288.648.685.001.359-.288.647-.648.647z" fill="#ffffff"></path> </g></svg>
    </ng-container>
      <ng-container *ngSwitchCase="'ODS'">
      <svg width="20px" height="20px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#999999" d="M 3,3 96,3 97,97 3,97 z"></path> <path style="fill:#EBEBDA" d="m 33,16 63,0 1,81 -64,0 z"></path> <path style="fill:none;stroke:#555555;stroke-width:1" d="m 65,3 0,94 M 33,3 33,97 M 96,16 3,16 M 97,29 3,29 M 97,42 3,42 M 97,55 3,55 M 97,69 3,69 M 97,83 3,83"></path> <path style="fill:none;stroke:#333333;stroke-width:3" d="M 3,3 96,3 97,97 3,97 z"></path> <path style="fill:#3D5B73;stroke:#222222;stroke-width:2" d="m 41,64 28,0 C 69,84 54,92 42,92 26,92 13,80 13,64 13,49 24,37 41,37 z"></path> <path style="fill:#4E9DFF;stroke:#0F3C59;stroke-width:2" d="m 45,60 27,0 C 72,44 62,33 45,33 z"></path> </g></svg>
    </ng-container>
      <ng-container *ngSwitchCase="'XLS'"> 
      <svg width="20px" height="20px" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.112.006c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#45B058"></path><path d="M19.429 53.938c-.216 0-.415-.09-.54-.27l-3.728-4.97-3.745 4.97c-.126.18-.324.27-.54.27-.396 0-.72-.306-.72-.72 0-.144.035-.306.144-.432l3.89-5.131-3.619-4.826c-.09-.126-.145-.27-.145-.414 0-.342.288-.72.721-.72.216 0 .432.108.576.288l3.438 4.628 3.438-4.646c.127-.18.324-.27.541-.27.378 0 .738.306.738.72 0 .144-.036.288-.127.414l-3.619 4.808 3.891 5.149c.09.126.125.27.125.414 0 .396-.324.738-.719.738zm9.989-.126h-5.455c-.595 0-1.081-.486-1.081-1.08v-10.317c0-.396.324-.72.774-.72.396 0 .721.324.721.72v10.065h5.041c.359 0 .648.288.648.648 0 .396-.289.684-.648.684zm6.982.216c-1.782 0-3.188-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.36.27-.756.702-.756.144 0 .306.036.433.144.828.738 1.98 1.314 3.367 1.314 2.143 0 2.826-1.152 2.826-2.071 0-3.097-7.111-1.386-7.111-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.468 3.853 1.278.162.144.253.342.253.54 0 .36-.307.72-.703.72-.145 0-.307-.054-.432-.162-.883-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636 0 1.748-1.188 3.53-4.43 3.53z" fill="#ffffff"></path><path d="M55.953 20.352v1h-12.801s-6.312-1.26-6.127-6.707c0 0 .207 5.707 6.002 5.707h12.926z" fill-rule="evenodd" clip-rule="evenodd" fill="#349C42"></path><path d="M37.049 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.801l-18.905-20.352z" opacity=".5" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path></g></svg>
    </ng-container>
      <ng-container *ngSwitchCase="'XLSX'">
      <svg width="20px" height="20px" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.112.006c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#45B058"></path><path d="M19.429 53.938c-.216 0-.415-.09-.54-.27l-3.728-4.97-3.745 4.97c-.126.18-.324.27-.54.27-.396 0-.72-.306-.72-.72 0-.144.035-.306.144-.432l3.89-5.131-3.619-4.826c-.09-.126-.145-.27-.145-.414 0-.342.288-.72.721-.72.216 0 .432.108.576.288l3.438 4.628 3.438-4.646c.127-.18.324-.27.541-.27.378 0 .738.306.738.72 0 .144-.036.288-.127.414l-3.619 4.808 3.891 5.149c.09.126.125.27.125.414 0 .396-.324.738-.719.738zm9.989-.126h-5.455c-.595 0-1.081-.486-1.081-1.08v-10.317c0-.396.324-.72.774-.72.396 0 .721.324.721.72v10.065h5.041c.359 0 .648.288.648.648 0 .396-.289.684-.648.684zm6.982.216c-1.782 0-3.188-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.36.27-.756.702-.756.144 0 .306.036.433.144.828.738 1.98 1.314 3.367 1.314 2.143 0 2.826-1.152 2.826-2.071 0-3.097-7.111-1.386-7.111-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.468 3.853 1.278.162.144.253.342.253.54 0 .36-.307.72-.703.72-.145 0-.307-.054-.432-.162-.883-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636 0 1.748-1.188 3.53-4.43 3.53z" fill="#ffffff"></path><path d="M55.953 20.352v1h-12.801s-6.312-1.26-6.127-6.707c0 0 .207 5.707 6.002 5.707h12.926z" fill-rule="evenodd" clip-rule="evenodd" fill="#349C42"></path><path d="M37.049 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.801l-18.905-20.352z" opacity=".5" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path></g></svg>
    </ng-container>
      <ng-container *ngSwitchCase="'DOC'">
        <svg
          width="20px"
          height="20px"
          viewBox="-4 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g fill-rule="evenodd">
              <path
                d="m5.11 0a5.07 5.07 0 0 0 -5.11 5v53.88a5.07 5.07 0 0 0 5.11 5.12h45.78a5.07 5.07 0 0 0 5.11-5.12v-38.6l-18.94-20.28z"
                fill="#107cad"
              ></path>
              <path
                d="m56 20.35v1h-12.82s-6.31-1.26-6.13-6.71c0 0 .21 5.71 6 5.71z"
                fill="#084968"
              ></path>
              <path
                d="m37.07 0v14.56a5.78 5.78 0 0 0 6.11 5.79h12.82z"
                fill="#90d0fe"
                opacity=".5"
              ></path>
            </g>
            <path
              d="m14.24 53.86h-3a1.08 1.08 0 0 1 -1.08-1.08v-9.85a1.08 1.08 0 0 1 1.08-1.08h3a6 6 0 1 1 0 12zm0-10.67h-2.61v9.34h2.61a4.41 4.41 0 0 0 4.61-4.66 4.38 4.38 0 0 0 -4.61-4.68zm14.42 10.89a5.86 5.86 0 0 1 -6-6.21 6 6 0 1 1 11.92 0 5.87 5.87 0 0 1 -5.92 6.21zm0-11.09c-2.7 0-4.41 2.07-4.41 4.88s1.71 4.88 4.41 4.88 4.41-2.09 4.41-4.88-1.72-4.87-4.41-4.87zm18.45.38a.75.75 0 0 1 .2.52.71.71 0 0 1 -.7.72.64.64 0 0 1 -.51-.24 4.06 4.06 0 0 0 -3-1.38 4.61 4.61 0 0 0 -4.63 4.88 4.63 4.63 0 0 0 4.63 4.88 4 4 0 0 0 3-1.37.7.7 0 0 1 .51-.24.72.72 0 0 1 .7.74.78.78 0 0 1 -.2.51 5.33 5.33 0 0 1 -4 1.69 6.22 6.22 0 0 1 0-12.43 5.26 5.26 0 0 1 4 1.72z"
              fill="#ffffff"
            ></path>
          </g>
        </svg>
      </ng-container>
      <ng-container *ngSwitchCase="'DOCX'">
        <svg
          width="20px"
          height="20px"
          viewBox="-4 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g fill-rule="evenodd">
              <path
                d="m5.11 0a5.07 5.07 0 0 0 -5.11 5v53.88a5.07 5.07 0 0 0 5.11 5.12h45.78a5.07 5.07 0 0 0 5.11-5.12v-38.6l-18.94-20.28z"
                fill="#107cad"
              ></path>
              <path
                d="m56 20.35v1h-12.82s-6.31-1.26-6.13-6.71c0 0 .21 5.71 6 5.71z"
                fill="#084968"
              ></path>
              <path
                d="m37.07 0v14.56a5.78 5.78 0 0 0 6.11 5.79h12.82z"
                fill="#90d0fe"
                opacity=".5"
              ></path>
            </g>
            <path
              d="m14.24 53.86h-3a1.08 1.08 0 0 1 -1.08-1.08v-9.85a1.08 1.08 0 0 1 1.08-1.08h3a6 6 0 1 1 0 12zm0-10.67h-2.61v9.34h2.61a4.41 4.41 0 0 0 4.61-4.66 4.38 4.38 0 0 0 -4.61-4.68zm14.42 10.89a5.86 5.86 0 0 1 -6-6.21 6 6 0 1 1 11.92 0 5.87 5.87 0 0 1 -5.92 6.21zm0-11.09c-2.7 0-4.41 2.07-4.41 4.88s1.71 4.88 4.41 4.88 4.41-2.09 4.41-4.88-1.72-4.87-4.41-4.87zm18.45.38a.75.75 0 0 1 .2.52.71.71 0 0 1 -.7.72.64.64 0 0 1 -.51-.24 4.06 4.06 0 0 0 -3-1.38 4.61 4.61 0 0 0 -4.63 4.88 4.63 4.63 0 0 0 4.63 4.88 4 4 0 0 0 3-1.37.7.7 0 0 1 .51-.24.72.72 0 0 1 .7.74.78.78 0 0 1 -.2.51 5.33 5.33 0 0 1 -4 1.69 6.22 6.22 0 0 1 0-12.43 5.26 5.26 0 0 1 4 1.72z"
              fill="#ffffff"
            ></path>
          </g>
        </svg>
      </ng-container>
      <!--default case when there are no matches -->
      <ng-container *ngSwitchDefault>
        <svg
          width="20px"
          height="20px"
          viewBox="-4 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g fill-rule="evenodd">
              <path
                d="m5.11 0a5.07 5.07 0 0 0 -5.11 5v53.88a5.07 5.07 0 0 0 5.11 5.12h45.78a5.07 5.07 0 0 0 5.11-5.12v-38.6l-18.94-20.28z"
                fill="#107cad"
              ></path>
              <path
                d="m56 20.35v1h-12.82s-6.31-1.26-6.13-6.71c0 0 .21 5.71 6 5.71z"
                fill="#084968"
              ></path>
              <path
                d="m37.07 0v14.56a5.78 5.78 0 0 0 6.11 5.79h12.82z"
                fill="#90d0fe"
                opacity=".5"
              ></path>
            </g>
            <path
              d="m14.24 53.86h-3a1.08 1.08 0 0 1 -1.08-1.08v-9.85a1.08 1.08 0 0 1 1.08-1.08h3a6 6 0 1 1 0 12zm0-10.67h-2.61v9.34h2.61a4.41 4.41 0 0 0 4.61-4.66 4.38 4.38 0 0 0 -4.61-4.68zm14.42 10.89a5.86 5.86 0 0 1 -6-6.21 6 6 0 1 1 11.92 0 5.87 5.87 0 0 1 -5.92 6.21zm0-11.09c-2.7 0-4.41 2.07-4.41 4.88s1.71 4.88 4.41 4.88 4.41-2.09 4.41-4.88-1.72-4.87-4.41-4.87zm18.45.38a.75.75 0 0 1 .2.52.71.71 0 0 1 -.7.72.64.64 0 0 1 -.51-.24 4.06 4.06 0 0 0 -3-1.38 4.61 4.61 0 0 0 -4.63 4.88 4.63 4.63 0 0 0 4.63 4.88 4 4 0 0 0 3-1.37.7.7 0 0 1 .51-.24.72.72 0 0 1 .7.74.78.78 0 0 1 -.2.51 5.33 5.33 0 0 1 -4 1.69 6.22 6.22 0 0 1 0-12.43 5.26 5.26 0 0 1 4 1.72z"
              fill="#ffffff"
            ></path>
          </g>
        </svg>
      </ng-container>
    </ng-container>
    <ng-template #image>
      <svg width="20px" height="20px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M25.6 0H6.4C2.86538 0 0 2.86538 0 6.4V25.6C0 29.1346 2.86538 32 6.4 32H25.6C29.1346 32 32 29.1346 32 25.6V6.4C32 2.86538 29.1346 0 25.6 0Z" fill="url(#paint0_linear_103_1789)"></path> <path d="M5.9577 24.8845C5.42578 25.9483 6.19937 27.2 7.38878 27.2H18.2111C19.4005 27.2 20.1741 25.9483 19.6422 24.8845L14.231 14.0622C13.6414 12.8829 11.9585 12.8829 11.3688 14.0622L5.9577 24.8845Z" fill="white"></path> <path d="M15.5577 24.8845C15.0258 25.9483 15.7994 27.2 16.9888 27.2H24.6111C25.8005 27.2 26.5741 25.9483 26.0422 24.8845L22.231 17.2622C21.6414 16.0829 19.9585 16.0829 19.3688 17.2622L15.5577 24.8845Z" fill="white" fill-opacity="0.6"></path> <path d="M24.0002 11.2C25.7675 11.2 27.2002 9.76726 27.2002 7.99995C27.2002 6.23264 25.7675 4.79995 24.0002 4.79995C22.2329 4.79995 20.8002 6.23264 20.8002 7.99995C20.8002 9.76726 22.2329 11.2 24.0002 11.2Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_103_1789" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse"> <stop stop-color="#00E676"></stop> <stop offset="1" stop-color="#00C853"></stop> </linearGradient> </defs> </g></svg>
    </ng-template>
  `,
})
export class DxSVGCellComponent {
  @Input() type: string | undefined;
}
