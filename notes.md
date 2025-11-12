# Functionnal requirements aand notes 

Light/Dark Mode toggle -- takes system preference by default, but allows user to 
override with a toggle switch

What HTML markup is needed (accessible) for the toggle switch?

Use fieldset and legend aand radio inputs for the toggle switch

Switching between light/dark mode via JavaScript and prefers-color-scheme media query --  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme#:~:text=The%20prefers%2Dcolor%2Dscheme%20CSS,or%20a%20user%20agent%20setting.

Three option toggle: light, dark, system   pref -- https://codepen.io/renddrew/pen/bRomab

CSS Variables (custom properties) -- https://css-tricks.com/updating-a-css-variable-with-javascript/

Accessibility considerations
- Use correct heading tags
- Screenreader-only text for card titles/username
