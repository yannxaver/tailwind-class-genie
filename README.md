# Tailwind Class Genie

> Tired of manually typing out Tailwind classes until you find the right one? \
> Can't remember if `font-base` or `font-normal` comes after `font-light`? \
> What was the next spacing level after `mr-24` again?

This extension enables you to forget about class names and focus on the visual outcome instead.

![Example](https://pub-8dde1258b011475ab41024837b4c299a.r2.dev/tailwind-class-genie/example.gif)

## Key Bindings

`CTRL(^) + ALT(⌥) + ARROW UP or J`: \
Go one class up.

`CTRL(^) + ALT(⌥) + ARROW DOWN or K`: \
Go one class down.

You can change the key bindings in the settings.

```json
"keybindings": [
  {
    "command": "tailwind-class-genie.switchClassUp",
    "key": "ctrl+alt+up",
    "mac": "ctrl+alt+up",
    "when": "editorTextFocus"
  },
  {
    "command": "tailwind-class-genie.switchClassUp",
    "key": "ctrl+alt+j",
    "mac": "ctrl+alt+j",
    "when": "editorTextFocus"
  },
  {
    "command": "tailwind-class-genie.switchClassDown",
    "key": "ctrl+alt+down",
    "mac": "ctrl+alt+down",
    "when": "editorTextFocus"
  },
  {
    "command": "tailwind-class-genie.switchClassDown",
    "key": "ctrl+alt+k",
    "mac": "ctrl+alt+k",
    "when": "editorTextFocus"
  }
],
```

## Settings

Auto-save is enabled by default with a delay of 400 milliseconds. Change to your liking.

```json
"tailwind-class-genie.autoSave": {
    "type": "boolean",
    "default": true,
    "description": "Automatically save the file after switching the class."
},
"tailwind-class-genie.autoSaveDelay": {
    "type": "number",
    "default": 400,
    "description": "Delay in milliseconds before saving the file after switching the class."
},
"tailwind-class-genie.silent": {
  "type": "boolean",
  "default": false,
  "description": "Suppresses the error pop-up messages."
}
```
