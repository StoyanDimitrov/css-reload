# CSS Reload

Reload the linked CSS stylesheets in the current page using Ctrl+F9 or page action.

If you want to omit some style sheet from reloading (i.e. font foundry resources) add attribute "data-autoreload" with value "false" like this:
<blockquote><code>&lt;link href="" rel="stylesheet" type="text/css" <strong>data-autoreload="false"</strong>&gt;</code></blockquote>