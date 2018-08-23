# CSS Reload
Reload the current pages' CSS stylesheets using customizable hotkey, context menu or page action. All three optional - visit the options page.

## Why reload all heavy stylesheets?
If you want to omit a stylesheet from reloading (i.e. font foundry resources etc.) add "data-autoreload" attribute with value "false" like this:
<blockquote><code>&lt;link href="…" rel="stylesheet" type="text/css" <strong>data-autoreload="false"</strong>&gt;</code></blockquote>


## Road map
 - Options page optimizations
    - Handle the case when all three invocation methods are unchecked.
    - Visual feedback on options save.
    - General improvements.
 - General code improvements.

If you think something is missing and extension should have it just [rise an issue](https://github.com/StoyanDimitrov/css-reload/issues/new) in the tracker.

## Known issues
Does not refresh `@import`-ed styles. Follow [the progress](https://github.com/StoyanDimitrov/css-reload/issues/10).
