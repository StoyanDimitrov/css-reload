# CSS Reload

Reload the current page CSS stylesheets using hot key, context menu or page action. All three optional - visit the options page.

**Note**: Currently the hotkey is Ctrl+F9 and can not be changed. If you are interrested please follow [the issue](https://github.com/StoyanDimitrov/css-reload/issues/2).

## Why reload all heavy stylesheets?
If you want to omit a stylesheet from reloading (i.e. font foundry resources etc.) add "data-autoreload" attribute with value "false" like this:
<blockquote><code>&lt;link href="" rel="stylesheet" type="text/css" <strong>data-autoreload="false"</strong>&gt;</code></blockquote>


## Road map
 - Options page optimization
    - Handle the case when all three invocation methods are unchecked.
    - Feedback on options save.
    - General improvements.
 - General code improvements.

If you thing something is missing and extension should have it just [rise an issue](https://github.com/StoyanDimitrov/css-reload/issues) in the tracker.
