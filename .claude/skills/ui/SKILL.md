---
name: ui-skills
description: Opinionated constraints for building better interfaces with agents.
---

# UI Skills

Opinionated constraints for building better interfaces with agents.

## Stack

- MUST use Tailwind CSS defaults (spacing, radius, shadows) before custom values
- MUST use `motion/react` (formerly `framer-motion`) when JavaScript animation or interactive animation is required
- MUST use `cn` utility (`clsx` + `tailwind-merge`) for class logic

## Transition

- NEVER add animation unless it is explicitly requested
- MUST animate only compositor props (`transform`, `opacity`)
- NEVER animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`)
- SHOULD avoid animating paint properties (`background`, `color`) except for small, local UI (text, icons)
- SHOULD use `ease-out` on entrance
- NEVER exceed `200ms` for interaction feedback
- MUST pause looping animations when off-screen
- MUST respect `prefers-reduced-motion`
- NEVER introduce custom easing curves unless explicitly requested
- SHOULD avoid animating large images or full-screen surfaces
- NEVER add transitions to `font-weight`

## Interactive Animation

- Added or removed elements should not change their own size, as this creates visual distraction
- Be careful with spring animations unless you want to reward momentum
- Do not use or overly criticize `ease-in` curves
- Interactive elements should disable `user-select` to avoid text selection
- Pure decorative elements (like gradients, overlays) should disable `pointer-events` or `visibility` to prevent event hijacking
- Avoid dead zones between interactive elements in lists (even if there is visual spacing), increase their padding

## Interface

- Enable `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` to improve font legibility
- Enable `-webkit-text-size-adjust: 100%`

## Layout

- MUST use a fixed `z-index` scale (no arbitrary `z-x`)
- SHOULD use `size-x` for square elements instead of `w-x` + `h-x`

## Performance

- NEVER animate large `blur()` or `backdrop-filter` surfaces
- NEVER apply `will-change` outside an active animation
- NEVER use `useEffect` for anything that can be expressed as render logic
- NEVER animate `filter` on `SVG` elements

## Design

- NEVER use gradients unless explicitly requested
- NEVER use purple or multicolor gradients
- NEVER use glow effects as primary affordances
- SHOULD use Tailwind CSS default shadow scale unless explicitly requested
- MUST give empty states one clear next action
- SHOULD limit accent color usage to one per view
- SHOULD use existing theme or Tailwind CSS color tokens before introducing new ones

## Debug

- iOS Safari may not display `background` gradient elements, try `translateZ(0)` or `backface-visibility: hidden` to fix.

- iOS Safari may not respect `overflow: hidden`, try `mask-image: linear-gradient(transparent, transparent)` to fix.

- Older iOS Safari versions don't support the `gap` property, use `margin` instead.

- Older iOS Safari versions turn `linear-gradient(transparent)` black, change `transparent` to 0% of the adjacent color.

- Older iOS Safari versions don't support `background-clip`, add the `-webkit-` prefix.

## Tricks

- For autoplay video or audio, play it in the `getNetworkType` callback. It just works.  
  _Additional required attribute set: `x-webkit-airplay="true"`, `webkit-playsinline="true"`, `playsInline`._

- To track data when Webview closes, use the `pagehide` event on Android and the special API `on('reportOnLeaveForMP', () => {})` on iOS.

- To implement header color transitions, you must set transitions via JavaScript by repeatedly calling `setNavigationBarColor`.  
  _If other transitions need to sync with header color changes, abandon CSS `transition` and use this method uniformly. Note that it cannot guarantee complete synchronization between WeChat API and DOM changes._

- WeChat Webview may crash when requesting large amounts of sprite sheet images; batch loading is recommended. Also, avoid using `lottie` for sprite animation; use [this](https://github.com/wxad/react-sequence-frame-player) instead.

- `window.__wxWebEnv.getEnv()` can retrieve the user's font size settings and WeChat header height information. For specific types, [see here](https://github.com/wxad/wxad-vite-template/blob/main/typings/custom.d.ts#L40).

- Webview height changes in WeChat Video Number half-screen pages differ between Android and iOS. Android requires using the `onVisibleHeightChange` API, which is quite cumbersome.
