# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
A little shop page for the bracelets I make

Additional details provided by the user:
- What's the name of your shop?: AJ jewels
- What types of bracelets do you sell?: Mixed — a bit of everything

## Goal
Build AJ Jewels — a warm, boutique handmade bracelet shop with a homepage, product detail page, and cart page using static data and a coral-amber/plum-rose design system.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--background: #FDF6EF`, `--card: #FFFFFF`, `--foreground: #2C1A0E`, `--muted-foreground: #7A5C42`, `--border: #E8D5C0`, `--primary: #C9845A`, `--accent: #A0527A`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`cart`, `cta`, `footer`, `hero`, `nav`, `product`, `productDetail`, `reviews`, `shop`, `values`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
