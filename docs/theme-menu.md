# FsThemeMenu Documentation

The `FsThemeMenu` provides a user-friendly theme switcher for Angular Material applications, allowing users to toggle between light and dark themes.

> **Angular 20+**: This component uses standalone architecture, signals-based reactivity, and OnPush change detection for optimal performance.

---

## Features

- **Light/Dark theme toggle** with smooth transitions
- **Persistent theme storage** using localStorage
- **System preference detection** - Auto-detects user's OS theme preference
- **Signal-based state** for efficient reactivity
- **Accessibility** - Full ARIA support with keyboard navigation
- **Material 3 theming** - Seamless integration with Angular Material
- **Custom icons** - Lucide icons for modern look

---

## Installation

### Standalone Component (Angular 20+)

Import the component directly:

```typescript
import { FsThemeMenuComponent } from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-root',
  imports: [FsThemeMenuComponent]
})
export class AppComponent {}
```

---

## Component

- [`FsThemeMenuComponent`](../projects/ngx-mat-components/src/fs-theme-menu/fs-theme-menu.component.ts) - Theme switcher menu

---

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { FsThemeMenuComponent } from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-root',
  imports: [FsThemeMenuComponent],
  template: `
    <div class="toolbar">
      <h1>My Application</h1>
      <fs-theme-menu />
    </div>
  `
})
export class AppComponent {}
```

---

## Usage in Navigation Frame

```typescript
import { Component } from '@angular/core';
import {
  FsNavFrameComponent,
  FsNavFrameToolbarComponent,
  FsNavFrameToolbarStartDirective,
  FsNavFrameToolbarEndDirective,
  FsThemeMenuComponent
} from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-root',
  imports: [
    FsNavFrameComponent,
    FsNavFrameToolbarComponent,
    FsNavFrameToolbarStartDirective,
    FsNavFrameToolbarEndDirective,
    FsThemeMenuComponent,
  ],
  template: `
    <fs-nav-frame>
      <fs-nav-frame-toolbar>
        <fs-nav-frame-toolbar-start>
          My App
        </fs-nav-frame-toolbar-start>
        
        <fs-nav-frame-toolbar-end>
          <fs-theme-menu />
          <!-- Other toolbar actions -->
        </fs-nav-frame-toolbar-end>
      </fs-nav-frame-toolbar>
      
      <!-- Rest of nav frame -->
    </fs-nav-frame>
  `
})
export class AppComponent {}
```

---

## How It Works

### Theme Detection Priority

1. **User preference** (from localStorage) - If user has previously selected a theme
2. **System preference** (from `prefers-color-scheme`) - If no user preference exists
3. **Default theme** - Falls back to light theme

### Theme Persistence

The component automatically:
- Saves theme preference to `localStorage` with key `'theme'`
- Restores theme on app reload
- Applies theme changes to `document.documentElement.classList`

### Theme Classes

The component toggles these CSS classes on the `<html>` element:
- `'light-theme'` - Light theme active
- `'dark-theme'` - Dark theme active

---

## Advanced Usage

### Listening to Theme Changes

```typescript
import { Component, effect } from '@angular/core';
import { FsThemeMenuComponent } from '@fullstack-devops/ngx-mat-components';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [FsThemeMenuComponent],
  template: `
    <fs-theme-menu />
  `
})
export class AppComponent {
  private themeService = inject(ThemeService);
  
  constructor() {
    // React to theme changes
    effect(() => {
      const theme = this.getCurrentTheme();
      this.themeService.updateChartColors(theme);
      this.updateFavicon(theme);
    });
  }
  
  private getCurrentTheme(): 'light' | 'dark' {
    return document.documentElement.classList.contains('dark-theme') 
      ? 'dark' 
      : 'light';
  }
  
  private updateFavicon(theme: 'light' | 'dark') {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = `/favicon-${theme}.ico`;
    }
  }
}
```

### Custom Theme Service Integration

```typescript
import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Centralized theme state
  private _theme = signal<Theme>('light');
  theme = this._theme.asReadonly();
  
  constructor() {
    // Initialize from localStorage
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      this._theme.set(stored);
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this._theme.set(prefersDark ? 'dark' : 'light');
    }
    
    // Apply theme changes
    effect(() => {
      const theme = this._theme();
      document.documentElement.classList.remove('light-theme', 'dark-theme');
      document.documentElement.classList.add(`${theme}-theme`);
      localStorage.setItem('theme', theme);
    });
  }
  
  toggleTheme() {
    this._theme.update(current => current === 'light' ? 'dark' : 'light');
  }
  
  setTheme(theme: Theme) {
    this._theme.set(theme);
  }
}

// Usage in component
@Component({
  selector: 'app-root',
  imports: [FsThemeMenuComponent],
  template: `
    <div>
      <h1>Current Theme: {{ themeService.theme() }}</h1>
      <fs-theme-menu />
      
      <!-- Custom theme display -->
      @if (themeService.theme() === 'dark') {
        <p>🌙 Dark mode active</p>
      } @else {
        <p>☀️ Light mode active</p>
      }
    </div>
  `
})
export class AppComponent {
  themeService = inject(ThemeService);
}
```

### Programmatic Theme Control

```typescript
import { Component, ViewChild } from '@angular/core';
import { FsThemeMenuComponent } from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-settings',
  imports: [FsThemeMenuComponent],
  template: `
    <div class="settings">
      <h2>Settings</h2>
      
      <div class="theme-section">
        <h3>Theme</h3>
        <fs-theme-menu />
        
        <button (click)="resetToSystemPreference()">
          Reset to System Preference
        </button>
      </div>
    </div>
  `
})
export class SettingsComponent {
  resetToSystemPreference() {
    localStorage.removeItem('theme');
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
  }
}
```

---

## Accessibility

The theme menu includes:

- **ARIA label** - "Theme selection" for screen readers
- **Radio group semantics** - Proper `role="menuitemradio"` for theme options
- **Checked states** - `aria-checked` reflects current selection
- **Keyboard navigation** - Tab to focus, Enter/Space to toggle, Arrow keys to navigate options
- **Focus indicators** - Clear visual focus states

Example with custom ARIA label:

```html
<fs-theme-menu aria-label="Choose color theme" />
```

---

## Theming & Styling

### Material 3 Theme Integration

The component works seamlessly with Angular Material themes:

```scss
@use '@angular/material' as mat;
@use '@fullstack-devops/ngx-mat-components' as fsc;

// Define your light and dark themes
$light-theme: mat.define-theme((
  color: (
    theme-type: light,
    primary: mat.$azure-palette,
  ),
));

$dark-theme: mat.define-theme((
  color: (
    theme-type: dark,
    primary: mat.$azure-palette,
  ),
));

// Apply themes based on CSS class
:root {
  @include mat.all-component-themes($light-theme);
  @include fsc.core();
}

.dark-theme {
  @include mat.all-component-colors($dark-theme);
}
```

### Custom Theme Styles

```scss
// Example: Custom styles per theme
:root {
  --background-color: #ffffff;
  --text-color: #000000;
  --card-background: #f5f5f5;
}

.dark-theme {
  --background-color: #121212;
  --text-color: #ffffff;
  --card-background: #1e1e1e;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.card {
  background-color: var(--card-background);
}
```

---

## Icons

The component uses [Lucide Angular](https://lucide.dev/) icons:
- **Sun icon** (☀️) - Light theme
- **Moon icon** (🌙) - Dark theme

The icons automatically change based on the current theme.

---

## API Reference

### Component
- [`FsThemeMenuComponent`](../projects/ngx-mat-components/src/fs-theme-menu/fs-theme-menu.component.ts)

### Public API

```typescript
// No inputs or outputs - fully self-contained

// Theme is stored in localStorage with key 'theme'
localStorage.getItem('theme') // 'light' | 'dark'

// Theme class is applied to document root
document.documentElement.classList // 'light-theme' | 'dark-theme'
```

---

## Browser Support

- **localStorage** - Required for theme persistence
- **prefers-color-scheme** - Used for system theme detection (gracefully degrades)
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)

---

## See Also

- [Live Demo](https://fullstack-devops.github.io/ngx-mat-components)
- [Material 3 Theming Guide](https://material.angular.io/guide/theming)
- [CHANGELOG.md](../CHANGELOG.md) - Migration guide from NgModules
