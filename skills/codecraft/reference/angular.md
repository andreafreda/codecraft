# codecraft examples: Angular

This is an extension file, not a full Core. The eight Core principles (naming,
guard clauses, visible contract, honest errors, side effects at the edges,
clarity beats DRY, explicit beats magic, Dependency Inversion) apply to Angular
code through TypeScript. For the typed-contract Core read
`reference/typescript.md`. The rules themselves live in `SKILL.md`.

Below are the Angular-specific shapes those principles take. Examples use
standalone components, signals, `inject()`, and the built-in control flow
(Angular 17 and later), which are the current defaults.

## Component contract: typed inputs, fully named (principles 2, 8)

```ts
// before: an untyped input and a boolean trap; the call site reads
// <app-card [data]="x" [flag]="true" [other]="false">
@Component({ selector: 'app-card', template: '...' })
export class CardComponent {
  @Input() data: any;
  @Input() flag = false;
}

// after: signal inputs are the component's contract; a variant union beats flags
type CardVariant = 'default' | 'highlighted';

/** A content card. `variant` controls emphasis; `dismissible` shows a close button. */
@Component({ selector: 'app-card', templateUrl: './card.component.html' })
export class CardComponent {
  readonly title = input.required<string>();
  readonly variant = input<CardVariant>('default');
  readonly dismissible = input(false);
}
```

## Guard clauses for loading and error states (principle 4)

```html
<!-- before: nested *ngIf with ng-template buries the happy path -->
<app-spinner *ngIf="query.isLoading(); else maybeError" />
<ng-template #maybeError>
  <app-error *ngIf="query.error() as e; else profile" [message]="e.message" />
  <ng-template #profile><app-profile [user]="query.data()!" /></ng-template>
</ng-template>

<!-- after: @if / @else if / @else branches read top to bottom, like guard clauses -->
@if (query.isLoading()) {
  <app-spinner />
} @else if (query.error(); as error) {
  <app-error [message]="error.message" />
} @else {
  <app-profile [user]="query.data()!" />
}
```

## Keep logic out of the template (principles 4, 10)

```ts
// before: a method call in the template; it re-runs on every change detection,
// and the total is computed where it is hard to see.
// template: <td>{{ total(order()) }}</td>
total(order: Order): number {
  return order.items.reduce((s, i) => s + i.price * i.qty, 0);
}

// after: a named computed signal; the template reads a value, not a call
readonly order = input.required<Order>();
readonly total = computed(() =>
  this.order().items.reduce((sum, item) => sum + item.price * item.qty, 0),
);
// template: <td>{{ total() }}</td>
```

## Explicit beats magic: derive with computed(), do not sync in an effect (tie-break)

An `effect()` that mirrors one signal into another hides the data flow and can
hold a stale value for a tick. If a value can be computed from other signals,
compute it with `computed()`.

```ts
// before: an effect keeps fullName in sync; the flow is invisible
readonly first = input('');
readonly last = input('');
readonly fullName = signal('');
constructor() {
  effect(() => this.fullName.set(`${this.first()} ${this.last()}`));
}

// after: derive it directly; there is nothing to keep in sync
readonly first = input('');
readonly last = input('');
readonly fullName = computed(() => `${this.first()} ${this.last()}`);
```

## Extract a service only when it names a real concept (principle 6, and clarity beats DRY)

```ts
// before: a "MiscService" grab-bag that hides unrelated logic behind one name
@Injectable({ providedIn: 'root' })
export class MiscService {
  getUser(id: string) { /* ... */ }
  currentTheme() { /* ... */ }
  toggleSidebar() { /* ... */ }
}

// after: inject focused, named collaborators; keep local UI state local, and
// extract a service only when it wraps one real, reusable concept
@Component({ /* ... */ })
export class UserMenuComponent {
  private readonly users = inject(UserService);
  private readonly theme = inject(ThemeService);
  readonly open = signal(false);
  toggle(): void {
    this.open.update((isOpen) => !isOpen);
  }
}
```
