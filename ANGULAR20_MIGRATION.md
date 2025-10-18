# ngx-mat-components - Angular 20 Migration Plan

> **Status**: 🔨 In Progress  
> **Target Version**: Angular 20.x  
> **Current Version**: Angular 19.2.14  
> **Start Date**: October 18, 2025

---

## 🎯 Migration Goals

1. **Upgrade to Angular 20** - Latest framework version
2. **Signal-Based Components** - Replace decorators with `input()`, `output()`, `computed()`
3. **Remove NgModules** - Full standalone component architecture
4. **Control Flow** - Replace `*ngIf`, `*ngFor`, `*ngSwitch` with `@if`, `@for`, `@switch`
5. **OnPush Everywhere** - Optimize change detection
6. **2-Level Navigation** - Enhance fs-nav-frame for sub-navigation support
7. **Modern Patterns** - Follow Angular 20 best practices

---

## 📦 Current Component Inventory

### **Main Components**

| Component | Location | Status | Priority |
|-----------|----------|--------|----------|
| `fs-nav-frame` | `/fs-nav-frame/fs-nav-frame.component.ts` | 🔴 Legacy | High |
| `fs-nav-frame-toolbar` | `/fs-nav-frame/nav-frame-toolbar/` | 🔴 Legacy | High |
| `fs-nav-frame-sidebar` | `/fs-nav-frame/components/` | 🔴 Legacy | High |
| `fs-nav-frame-sidebar-item` | `/fs-nav-frame/components/` | 🔴 Legacy | High |
| `fs-nav-user-profile` | `/fs-nav-frame/fs-nav-user-profile/` | 🔴 Legacy | High |
| `fs-theme-menu` | `/fs-theme-menu/` | 🔴 Legacy | Medium |
| `fs-calendar` | `/fs-calendar/` | 🔴 Legacy | Low |

### **Directives**

| Directive | Location | Status | Priority |
|-----------|----------|--------|----------|
| `FsNavFrameContentDirective` | `/fs-nav-frame/directives/` | 🔴 Legacy | High |
| `FsNavFrameToolbarStartDirective` | `/fs-nav-frame/nav-frame-toolbar/directives/` | 🔴 Legacy | High |
| `FsNavFrameToolbarCenterDirective` | `/fs-nav-frame/nav-frame-toolbar/directives/` | 🔴 Legacy | High |
| `FsNavFrameToolbarEndDirective` | `/fs-nav-frame/nav-frame-toolbar/directives/` | 🔴 Legacy | High |
| `FsNavUserProfileNameDirective` | `/fs-nav-frame/fs-nav-user-profile/directives/` | 🔴 Legacy | High |
| `FsNavUserProfileSubNameDirective` | `/fs-nav-frame/fs-nav-user-profile/directives/` | 🔴 Legacy | High |
| `FsNavUserProfileActionsDirective` | `/fs-nav-frame/fs-nav-user-profile/directives/` | 🔴 Legacy | High |

### **Services**

| Service | Location | Status | Notes |
|---------|----------|--------|-------|
| `FsNavFrameService` | `/fs-nav-frame/services/` | 🟡 Needs Signals | Convert to signal-based state |

---

## 🔧 Migration Steps

### **Phase 1: Framework Upgrade** ⚡

**Goal**: Angular 19.2 → 20.x

#### **Step 1.1: Update package.json**

```bash
# Update Angular packages
yarn add @angular/animations@^20.0.0 \
         @angular/common@^20.0.0 \
         @angular/compiler@^20.0.0 \
         @angular/core@^20.0.0 \
         @angular/forms@^20.0.0 \
         @angular/platform-browser@^20.0.0 \
         @angular/platform-browser-dynamic@^20.0.0 \
         @angular/router@^20.0.0

# Update Angular Material
yarn add @angular/cdk@^20.0.0 \
         @angular/material@^20.0.0 \
         @angular/material-date-fns-adapter@^20.0.0

# Update dev dependencies
yarn add -D @angular-devkit/build-angular@^20.0.0 \
            @angular-eslint/builder@^20.0.0 \
            @angular-eslint/eslint-plugin@^20.0.0 \
            @angular-eslint/eslint-plugin-template@^20.0.0 \
            @angular-eslint/schematics@^20.0.0 \
            @angular-eslint/template-parser@^20.0.0 \
            @angular/cli@^20.0.0 \
            @angular/compiler-cli@^20.0.0
```

#### **Step 1.2: Run Angular Update**

```bash
ng update @angular/core@20 @angular/cli@20 --allow-dirty --force
ng update @angular/material@20 --allow-dirty --force
```

#### **Step 1.3: Verify Build**

```bash
yarn build
yarn test
```

**Expected Issues**:
- Breaking changes in Material components
- Deprecated APIs removed
- TypeScript compatibility

**Resolution**: Check Angular 20 changelog and fix breaking changes

---

### **Phase 2: Remove NgModules** 🔥

**Goal**: Convert all components to standalone

#### **Step 2.1: Convert FsNavFrameComponent**

**Before** (`fs-nav-frame.component.ts`):
```typescript
@Component({
  selector: 'fs-nav-frame',
  templateUrl: './fs-nav-frame.component.html',
  styleUrls: ['./fs-nav-frame.component.scss'],
  standalone: false,  // ❌
})
export class FsNavFrameComponent { }
```

**After**:
```typescript
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// ... other imports

@Component({
  selector: 'fs-nav-frame',
  templateUrl: './fs-nav-frame.component.html',
  styleUrls: ['./fs-nav-frame.component.scss'],
  // standalone: true is default in Angular 20+
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    FsNavFrameToolbarComponent,
    FsNavFrameSidebarComponent,
    // ... other dependencies
  ],
})
export class FsNavFrameComponent { }
```

#### **Step 2.2: Remove NgModule files**

```bash
# Delete module files
rm projects/ngx-mat-components/src/fs-nav-frame/fs-nav-frame.module.ts

# Update public-api.ts to export components directly
```

#### **Step 2.3: Update public-api.ts**

**Before**:
```typescript
export * from './fs-nav-frame/fs-nav-frame.module';
```

**After**:
```typescript
// Components
export * from './fs-nav-frame/fs-nav-frame.component';
export * from './fs-nav-frame/nav-frame-toolbar/fs-nav-frame-toolbar.component';
export * from './fs-nav-frame/components/fs-nav-frame-sidebar';
// ... other exports

// Directives
export * from './fs-nav-frame/directives/fs-nav-frame-content.directive';
// ... other directives

// Services
export * from './fs-nav-frame/services/fs-nav-frame.service';

// Models
export * from './fs-nav-frame/fs-nav-frame.modules';
```

---

### **Phase 3: Signal-Based Components** 🚀

**Goal**: Replace decorators with signals

#### **Step 3.1: Convert @Input() to input()**

**Before**:
```typescript
@Component({ /* ... */ })
export class FsNavFrameComponent {
  @Input() navFrameConfig: NavFrameConfig = {
    appName: '',
  };
  @Input() sizing: NavFrameSizing = {
    toolbarHeight: 3,
    sidebarWidthClosed: 4,
    sidebarWidthOpened: 18,
  };
}
```

**After**:
```typescript
import { Component, input, computed } from '@angular/core';

@Component({ /* ... */ })
export class FsNavFrameComponent {
  // Required inputs
  readonly navFrameConfig = input<NavFrameConfig>({
    appName: '',
  });
  
  // Optional inputs with defaults
  readonly sizing = input<NavFrameSizing>({
    toolbarHeight: 3,
    sidebarWidthClosed: 4,
    sidebarWidthOpened: 18,
  });
  
  // Computed properties
  readonly toolbarHeight = computed(() => this.sizing().toolbarHeight);
  readonly sidebarWidthClosed = computed(() => this.sizing().sidebarWidthClosed);
  readonly sidebarWidthOpened = computed(() => this.sizing().sidebarWidthOpened);
}
```

#### **Step 3.2: Convert @Output() to output()**

**Before**:
```typescript
@Component({ /* ... */ })
export class FsNavFrameSidebarItemComponent {
  @Output() itemClicked = new EventEmitter<void>();
  
  handleClick() {
    this.itemClicked.emit();
  }
}
```

**After**:
```typescript
import { Component, output } from '@angular/core';

@Component({ /* ... */ })
export class FsNavFrameSidebarItemComponent {
  readonly itemClicked = output<void>();
  
  handleClick() {
    this.itemClicked.emit();
  }
}
```

#### **Step 3.3: Convert Services to Signals**

**Before** (`fs-nav-frame.service.ts`):
```typescript
@Injectable({ providedIn: 'root' })
export class FsNavFrameService {
  menuState: MenuState = MenuState.CLOSED;
  menuStateEvent = new Subject<MenuState>();
  
  toggleMenu() {
    this.menuState = this.menuState === MenuState.CLOSED 
      ? MenuState.OPENED 
      : MenuState.CLOSED;
    this.menuStateEvent.next(this.menuState);
  }
}
```

**After**:
```typescript
import { Injectable, signal, computed } from '@angular/core';

export enum MenuState {
  CLOSED = 'closed',
  OPENED = 'opened',
}

@Injectable({ providedIn: 'root' })
export class FsNavFrameService {
  // Private writable signal
  private readonly _menuState = signal<MenuState>(MenuState.CLOSED);
  
  // Public readonly signal
  readonly menuState = this._menuState.asReadonly();
  
  // Computed signals
  readonly isOpen = computed(() => this._menuState() === MenuState.OPENED);
  readonly isClosed = computed(() => this._menuState() === MenuState.CLOSED);
  
  // Actions
  toggleMenu(): void {
    this._menuState.update(state => 
      state === MenuState.CLOSED ? MenuState.OPENED : MenuState.CLOSED
    );
  }
  
  openMenu(): void {
    this._menuState.set(MenuState.OPENED);
  }
  
  closeMenu(): void {
    this._menuState.set(MenuState.CLOSED);
  }
}
```

---

### **Phase 4: Control Flow Migration** 🔄

**Goal**: Replace structural directives with native control flow

#### **Step 4.1: Replace *ngIf with @if**

**Before**:
```html
<div *ngIf="isClosed">Menu is closed</div>
<div *ngIf="!isClosed; else openMenu">
  Closed content
</div>
<ng-template #openMenu>
  Open content
</ng-template>
```

**After**:
```html
@if (isClosed()) {
  <div>Menu is closed</div>
}

@if (!isClosed()) {
  <div>Closed content</div>
} @else {
  <div>Open content</div>
}
```

#### **Step 4.2: Replace *ngFor with @for**

**Before**:
```html
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```

**After**:
```html
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}
```

#### **Step 4.3: Replace [ngSwitch] with @switch**

**Before**:
```html
<div [ngSwitch]="menuState">
  <span *ngSwitchCase="'opened'">Open</span>
  <span *ngSwitchCase="'closed'">Closed</span>
  <span *ngSwitchDefault>Unknown</span>
</div>
```

**After**:
```html
@switch (menuState()) {
  @case ('opened') { <span>Open</span> }
  @case ('closed') { <span>Closed</span> }
  @default { <span>Unknown</span> }
}
```

---

### **Phase 5: OnPush Change Detection** ⚡

**Goal**: Optimize performance

#### **Step 5.1: Add ChangeDetectionStrategy.OnPush**

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fs-nav-frame',
  templateUrl: './fs-nav-frame.component.html',
  styleUrls: ['./fs-nav-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,  // ✅
})
export class FsNavFrameComponent { }
```

#### **Step 5.2: Verify Signal Updates**

With signals, OnPush works automatically:
- Signals trigger change detection when updated
- No need for manual `ChangeDetectorRef.markForCheck()`

---

### **Phase 6: 2-Level Navigation Enhancement** 🎨

**Goal**: Add sub-navigation support to fs-nav-frame

#### **Step 6.1: Create SubNav Component**

```typescript
// fs-nav-frame-subnav.component.ts
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export interface SubNavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'fs-nav-frame-subnav',
  template: `
    <nav class="fs-nav-frame-subnav">
      @for (item of items(); track item.route) {
        <a 
          class="fs-nav-frame-subnav-item"
          [routerLink]="item.route"
          routerLinkActive="active"
        >
          @if (item.icon) {
            <i-lucide [img]="item.icon"></i-lucide>
          }
          <span>{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: [`
    .fs-nav-frame-subnav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      background: var(--mat-app-surface);
      border-right: 1px solid var(--mat-app-outline);
      width: 240px;
    }
    
    .fs-nav-frame-subnav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      color: var(--mat-app-on-surface);
      transition: background 0.2s;
      
      &:hover {
        background: var(--mat-app-surface-variant);
      }
      
      &.active {
        background: var(--mat-app-primary-container);
        color: var(--mat-app-on-primary-container);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsNavFrameSubnavComponent {
  readonly items = input.required<SubNavItem[]>();
}
```

#### **Step 6.2: Update FsNavFrame Layout**

```html
<!-- fs-nav-frame.component.html -->
<mat-drawer-container class="fs-nav-frame-container">
  <!-- Main Sidebar (Level 1) -->
  <mat-drawer mode="side" [opened]="true" class="fs-nav-frame-sidebar">
    <ng-content select="fs-nav-frame-sidebar"></ng-content>
  </mat-drawer>
  
  <!-- Sub Navigation (Level 2) -->
  @if (showSubNav()) {
    <mat-drawer mode="side" [opened]="true" class="fs-nav-frame-subnav-drawer">
      <ng-content select="fs-nav-frame-subnav"></ng-content>
    </mat-drawer>
  }
  
  <!-- Main Content -->
  <mat-drawer-content>
    <ng-content select="fs-nav-frame-toolbar"></ng-content>
    <ng-content select="fs-nav-frame-content"></ng-content>
  </mat-drawer-content>
</mat-drawer-container>
```

#### **Step 6.3: Add SubNav Service**

```typescript
// fs-nav-frame-subnav.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { SubNavItem } from './fs-nav-frame-subnav.component';

@Injectable({ providedIn: 'root' })
export class FsNavFrameSubnavService {
  private readonly _items = signal<SubNavItem[]>([]);
  private readonly _visible = signal(false);
  
  readonly items = this._items.asReadonly();
  readonly visible = this._visible.asReadonly();
  
  setItems(items: SubNavItem[]): void {
    this._items.set(items);
    this._visible.set(items.length > 0);
  }
  
  show(): void {
    this._visible.set(true);
  }
  
  hide(): void {
    this._visible.set(false);
  }
  
  clear(): void {
    this._items.set([]);
    this._visible.set(false);
  }
}
```

---

### **Phase 7: Testing & Validation** ✅

#### **Step 7.1: Unit Tests**

```typescript
// fs-nav-frame.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FsNavFrameComponent } from './fs-nav-frame.component';

describe('FsNavFrameComponent', () => {
  let component: FsNavFrameComponent;
  let fixture: ComponentFixture<FsNavFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FsNavFrameComponent],  // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(FsNavFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update toolbar height from sizing input', () => {
    fixture.componentRef.setInput('sizing', {
      toolbarHeight: 5,
      sidebarWidthClosed: 4,
      sidebarWidthOpened: 18,
    });
    fixture.detectChanges();
    
    expect(component.toolbarHeight()).toBe(5);
  });
});
```

#### **Step 7.2: Integration Tests**

```typescript
// Test 2-level navigation
describe('FsNavFrame with SubNav', () => {
  it('should show sub-navigation when items provided', () => {
    // Test setup
    const subNavItems = [
      { label: 'Overview', route: '/tenants' },
      { label: 'Domains', route: '/tenants/domains' },
    ];
    
    // Set items via service
    service.setItems(subNavItems);
    
    // Verify visibility
    expect(service.visible()).toBe(true);
  });
});
```

#### **Step 7.3: Visual Regression Tests**

```bash
# Take screenshots for comparison
yarn test:visual

# Review differences
yarn test:visual:approve
```

---

## 📊 Migration Checklist

### **Phase 1: Framework Upgrade**
- [ ] Update package.json to Angular 20
- [ ] Run `ng update` commands
- [ ] Fix breaking changes
- [ ] Verify build success
- [ ] Run tests

### **Phase 2: Remove NgModules**
- [ ] Convert FsNavFrameComponent to standalone
- [ ] Convert FsNavFrameToolbarComponent to standalone
- [ ] Convert FsNavFrameSidebarComponent to standalone
- [ ] Convert FsNavUserProfileComponent to standalone
- [ ] Convert FsThemeMenuComponent to standalone
- [ ] Convert FsCalendarComponent to standalone
- [ ] Convert all directives to standalone
- [ ] Delete NgModule files
- [ ] Update public-api.ts

### **Phase 3: Signal-Based Components**
- [ ] Convert @Input() to input() in FsNavFrameComponent
- [ ] Convert @Input() to input() in FsNavFrameToolbarComponent
- [ ] Convert @Input() to input() in FsNavFrameSidebarComponent
- [ ] Convert @Input() to input() in FsNavUserProfileComponent
- [ ] Convert @Output() to output() in all components
- [ ] Convert FsNavFrameService to signal-based
- [ ] Remove RxJS subscriptions (replace with effects)
- [ ] Update component lifecycle hooks

### **Phase 4: Control Flow Migration**
- [ ] Replace *ngIf with @if in all templates
- [ ] Replace *ngFor with @for in all templates
- [ ] Replace [ngSwitch] with @switch in all templates
- [ ] Remove unused <ng-template> blocks
- [ ] Verify template rendering

### **Phase 5: OnPush Change Detection**
- [ ] Add OnPush to all components
- [ ] Remove manual ChangeDetectorRef usage
- [ ] Verify signal updates trigger CD
- [ ] Performance testing

### **Phase 6: 2-Level Navigation**
- [ ] Create FsNavFrameSubnavComponent
- [ ] Create FsNavFrameSubnavService
- [ ] Update FsNavFrame layout
- [ ] Add responsive behavior
- [ ] Style sub-navigation
- [ ] Document usage

### **Phase 7: Testing & Validation**
- [ ] Update all unit tests
- [ ] Add integration tests
- [ ] Visual regression tests
- [ ] Accessibility testing (ARIA, keyboard)
- [ ] Performance benchmarks
- [ ] Documentation updates

---

## 🚧 Breaking Changes

### **For Library Consumers**

#### **Import Changes**
```typescript
// ❌ OLD
import { FsNavFrameModule } from '@fullstack-devops/ngx-mat-components';

@NgModule({
  imports: [FsNavFrameModule]
})

// ✅ NEW
import { 
  FsNavFrameComponent,
  FsNavFrameToolbarComponent,
  FsNavFrameSidebarComponent,
  // ... other components
} from '@fullstack-devops/ngx-mat-components';

@Component({
  imports: [
    FsNavFrameComponent,
    FsNavFrameToolbarComponent,
    // ...
  ]
})
```

#### **Template Changes**
```html
<!-- ❌ OLD -->
<div *ngIf="frameService.menuState === MenuState.OPENED">Open</div>

<!-- ✅ NEW -->
@if (frameService.menuState() === MenuState.OPENED) {
  <div>Open</div>
}
```

#### **Service API Changes**
```typescript
// ❌ OLD
frameService.menuStateEvent.subscribe(state => { /* ... */ });

// ✅ NEW
effect(() => {
  const state = frameService.menuState();
  // React to state changes
});
```

---

## 📚 Migration Resources

- [Angular 20 Migration Guide](https://angular.dev/update-guide)
- [Signals Documentation](https://angular.dev/guide/signals)
- [Control Flow Syntax](https://angular.dev/essentials/conditionals-and-loops)
- [Standalone Components](https://angular.dev/guide/components/importing)
- [OnPush Strategy](https://angular.dev/best-practices/runtime-performance)

---

## 🎯 Success Metrics

| Metric | Before | Target | Actual |
|--------|--------|--------|--------|
| **Bundle Size** | ~450KB | < 400KB | TBD |
| **Build Time** | ~30s | < 25s | TBD |
| **Test Coverage** | 75% | > 85% | TBD |
| **Performance Score** | 85 | > 90 | TBD |
| **Lighthouse Score** | 88 | > 95 | TBD |

---

## 📅 Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| **Phase 1: Framework Upgrade** | 2 days | 🔜 Pending |
| **Phase 2: Remove NgModules** | 3 days | 🔜 Pending |
| **Phase 3: Signal-Based** | 5 days | 🔜 Pending |
| **Phase 4: Control Flow** | 2 days | 🔜 Pending |
| **Phase 5: OnPush** | 1 day | 🔜 Pending |
| **Phase 6: 2-Level Nav** | 3 days | 🔜 Pending |
| **Phase 7: Testing** | 4 days | 🔜 Pending |
| **Total** | **~3 weeks** | 🔜 Pending |

---

## 🐛 Known Issues & Workarounds

### **Issue 1: Angular Material 20 Breaking Changes**
- **Problem**: Material components API changes
- **Workaround**: Check Material changelog, update usages
- **Reference**: https://github.com/angular/components/releases/tag/20.0.0

### **Issue 2: TypeScript Strict Mode**
- **Problem**: Stricter type checking in Angular 20
- **Workaround**: Fix type errors incrementally
- **Reference**: Use `// @ts-expect-error` as temporary fix

### **Issue 3: Zone.js Compatibility**
- **Problem**: Some RxJS patterns may not work with OnPush
- **Workaround**: Convert to signals, use `effect()` instead of `subscribe()`

---

## 📝 Post-Migration Tasks

- [ ] Update library version to 1.0.0
- [ ] Publish to npm
- [ ] Update GitHub README
- [ ] Create migration guide for consumers
- [ ] Update live demo (https://fullstack-devops.github.io/ngx-mat-components)
- [ ] Announce release (GitHub, Twitter)

---

**Next Steps**: Start with Phase 1 - Framework Upgrade

**Questions?** Open an issue on GitHub: https://github.com/fullstack-devops/ngx-mat-components/issues
