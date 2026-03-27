# Class Management Rules

## Class Management Rules (Tailwind + DaisyUI + BEM)

### 1) HTML must stay clean

- Use only BEM classes in templates (`block`, `block__element`, `block--modifier`).
- Avoid utility class lists in `.astro` files.
- Keep Daisy component classes out of HTML when possible and compose them in CSS with `@apply`.

### 2) One component/page, one CSS file

- Each `.astro` file should import its own CSS module-like file from `src/styles/...`.
- Suggested structure:
  - `src/pages/index.astro` -> `src/styles/pages/index-page.css`
  - `src/components/Post.astro` -> `src/styles/components/post-card.css`

### 3) Prefer `@apply` over custom CSS

- Build styles with Tailwind and Daisy utilities using `@apply` first.
- In style files, include:

```css
@reference '../app.css';

@layer components {
  .block {
    @apply ...;
  }
}
```

- This ensures Tailwind v4 and Daisy utilities are available in component CSS.

### 4) When custom CSS is allowed

Use direct CSS properties only if utility-based `@apply` is not possible:

- Unsupported utility in current setup.
- Complex selector/state not representable cleanly with utilities.
- Browser/media behavior that needs explicit declarations.

If custom CSS is used, keep it minimal and documented by intent in the selector name.

### 5) BEM naming convention

- `block`: standalone component (`post-card`).
- `block__element`: child part (`post-card__title`).
- `block--modifier`: variation (`post-card--featured`).
- Avoid deep chains and avoid styling by tag name.

### 6) State and interaction

- Prefer utility states in CSS: `hover:`, `focus-visible:`, `active:` through `@apply`.
- Keep keyboard accessibility visible (`focus-visible:ring-*`).
- Add `@media (prefers-reduced-motion: reduce)` for animated blocks.

### 7) Daisy token usage

- Prefer semantic Daisy utilities via `@apply`:
  - Surfaces: `bg-base-100`, `bg-base-200`
  - Text: `text-base-content`
  - Borders: `border-base-300`
  - Components: `card`, `badge`, `btn`
- Use color raw values only as fallback when utility application is not viable.

### 8) Code review checklist

- HTML uses BEM classes only.
- Styles are in the corresponding CSS file.
- `@reference '../app.css';` exists in style file.
- `@apply` is used first; custom CSS is justified and minimal.
- Hover/focus/reduced-motion states are present.
- Build passes with `bun astro build`.
