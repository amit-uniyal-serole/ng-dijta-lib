import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Pipe({
    name: 'dxsafe'
})
export class DxSafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html':
                // Use DOMPurify to remove only unsafe content
                const sanitized = DOMPurify.sanitize(value, {
                    ALLOWED_TAGS: [
                        'b', 'i', 'u', 'strong', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup',
                        'p', 'br', 'hr', 'blockquote', 'code', 'pre', 'span',
                        'ul', 'ol', 'li', 'dl', 'dt', 'dd',
                        'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
                        'a', 'img'
                    ],
                    ALLOWED_ATTR: [
                        'href', 'src', 'alt', 'title', 'width', 'height'
                    ]
                });
                return this.sanitizer.bypassSecurityTrustHtml(sanitized);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
}
