# Security Rules

**Scope:** Security best practices for ng-dijta Angular applications.

---

## Core Principle

Angular provides built-in security protections. **Trust them** unless you have a specific, documented reason to bypass.

---

## XSS Prevention (Built-in)

Angular automatically sanitizes untrusted values:

```typescript
// SAFE - Angular sanitizes automatically
<div [innerHTML]="userContent()">  // Sanitized HTML
<a [href]="userUrl()">             // Sanitized URL
<div [style.color]="userColor()">  // Sanitized style
```

---

## Avoid bypassSecurityTrust* Methods

**NEVER** use these unless absolutely necessary:

```typescript
// DANGEROUS - Only use when you trust the source completely
import { DomSanitizer } from '@angular/platform-browser';

private readonly sanitizer = inject(DomSanitizer);

// These bypass Angular's built-in protections:
bypassSecurityTrustHtml(value)        // XSS risk
bypassSecurityTrustStyle(value)       // CSS injection risk
bypassSecurityTrustScript(value)      // Script injection risk
bypassSecurityTrustUrl(value)         // URL injection risk
bypassSecurityTrustResourceUrl(value) // Resource injection risk
```

### When Bypass is Necessary (Rare)

1. Content from trusted CMS with sanitization
2. Embedding trusted third-party widgets
3. SVG content from verified sources

### Required Documentation

```typescript
/**
 * @security SVG content from trusted icon registry.
 * Icons are registered at app initialization from trusted source.
 * No user input is used in SVG generation.
 */
readonly trustedSvg = computed(() =>
  this.sanitizer.bypassSecurityTrustHtml(this.getSvg(this.name()))
);
```

---

## Template Injection Prevention

```typescript
// NEVER concatenate user input into templates
// NEVER use eval() or Function() with user input
// NEVER generate Angular templates from user input

// CORRECT - Use property binding
<div [textContent]="userInput()"></div>

// WRONG - String interpolation with HTML
{{ '<script>' + userInput + '</script>' }}  // FORBIDDEN
```

---

## URL Handling

```typescript
// Angular sanitizes URLs, but validate user URLs anyway
readonly userUrl = input<string>();

readonly safeUrl = computed(() => {
  const url = this.userUrl();
  if (!url) return null;

  // Block javascript: URLs
  if (url.startsWith('javascript:')) {
    return null;
  }

  // Allow only http/https
  if (!/^https?:\/\//i.test(url)) {
    return null;
  }

  return url;
});
```

---

## HTTP Security

### Use HttpClient

```typescript
// HttpClient automatically includes XSRF token
private readonly http = inject(HttpClient);

// Validate server responses
readonly data = toSignal(
  this.http.get<User[]>('/api/users').pipe(
    map(users => this.validateUserArray(users))
  ),
  { initialValue: [] }
);
```

### Validate Responses

```typescript
private validateUserArray(data: unknown): User[] {
  if (!Array.isArray(data)) {
    throw new Error('Expected array response');
  }

  return data.map(item => {
    if (!this.isValidUser(item)) {
      throw new Error('Invalid user data');
    }
    return item as User;
  });
}
```

---

## Sensitive Data Handling

```typescript
// NEVER log sensitive data
console.log(password);  // FORBIDDEN
console.log(token);     // FORBIDDEN

// Clear sensitive data after use
private clearSensitiveData(): void {
  this.password = '';
  this.token = '';
}

// Don't store in localStorage
localStorage.setItem('password', password);  // FORBIDDEN

// Use sessionStorage or secure cookies for tokens
```

---

## File Upload Security

```typescript
// Validate file type
private readonly allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

validateFile(file: File): boolean {
  // Check MIME type
  if (!this.allowedTypes.includes(file.type)) {
    return false;
  }

  // Check file size (e.g., 10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return false;
  }

  // Check extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!['png', 'jpg', 'jpeg', 'pdf'].includes(extension ?? '')) {
    return false;
  }

  return true;
}
```

---

## Third-Party Scripts

```typescript
// NEVER inject untrusted scripts
document.createElement('script');  // Use with caution

// If third-party scripts are needed:
// 1. Load from trusted CDN
// 2. Use integrity hashes
// 3. Configure CSP appropriately
```

---

## Authentication Patterns

```typescript
// Token storage - prefer HttpOnly cookies (server-set)
// If client-side storage needed, use sessionStorage
sessionStorage.setItem('token', token);

// Clear on logout
logout(): void {
  sessionStorage.clear();
  this.router.navigate(['/login']);
}

// Auto-logout on token expiry
private checkTokenExpiry(): void {
  const token = this.getToken();
  if (token && this.isTokenExpired(token)) {
    this.logout();
  }
}
```

---

## Security Rules Summary

| Category | Rule |
|----------|------|
| HTML binding | Trust Angular's automatic sanitization |
| `bypassSecurityTrust*` | Avoid; document thoroughly if required |
| User input in templates | Use property binding, never concatenation |
| External content | Sanitize before display |
| HTTP | Use HttpClient, validate responses |
| URLs | Angular sanitizes; still validate user URLs |
| File uploads | Validate type, size, extension |
| Sensitive data | Never log, clear after use |
| Third-party scripts | Use with extreme caution |

---

## Checklist

- [ ] No `bypassSecurityTrust*` without `@security` JSDoc tag
- [ ] User input uses property binding
- [ ] No `eval()` or `Function()` with user input
- [ ] URLs validated before use
- [ ] HTTP responses validated
- [ ] Sensitive data not logged
- [ ] File uploads validated (type, size, extension)
