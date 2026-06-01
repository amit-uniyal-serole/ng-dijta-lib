Starting from version 3.4.0:

- `HttpClientModule` is mandatory in order to fetch the avatar from external sources (Gravatar, Google, ...).

```html
<ngx-avatar></ngx-avatar>
```

## Examples

```html
<ngx-avatar facebookId="1508319875"></ngx-avatar>
<ngx-avatar googleId="1508319875"></ngx-avatar>
<ngx-avatar twitterId="1508319875"></ngx-avatar>
<ngx-avatar instagramId="dccomics" size="70"></ngx-avatar>
<ngx-avatar skypeId="1508319875"></ngx-avatar>
<ngx-avatar gravatarId="adde9b2b981a8083cf084c63ad86f753"></ngx-avatar>
<ngx-avatar gravatarId="user@gmail.com"></ngx-avatar>
<ngx-avatar src="assets/avatar.jpg"></ngx-avatar>
<ngx-avatar name="John Doe"></ngx-avatar>
<ngx-avatar value="75%"></ngx-avatar>

<ngx-avatar
  facebookId="userFacebookID"
  skypeId="userSkypeID"
  googleId="google"
  name="Haithem Mosbahi"
  src="assets/avatar.jpg"
  value="28%"
  twitterId="twitter"
  gravatarId="adde9b2b981a8083cf084c63ad86f753"
  size="100"
  [round]="true"
>
</ngx-avatar>
```

## usage

> `<ndx-avatar [avatar]="avatar" value="12" name="name" src="assets/1.jpg"></ndx-avatar>`

`avatar: NgDxAvatarSettings`

Note:`Avatar priority order`**src > name > value**
