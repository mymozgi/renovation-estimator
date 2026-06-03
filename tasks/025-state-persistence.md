# STATE PERSISTENCE

Goal:

Persist wizard state across page reloads and browser tab restores using sessionStorage, so users do not lose their estimate if they accidentally refresh.

Business logic:

Users spend 8–10 minutes configuring rooms. If they refresh the page, accidentally close the tab, or navigate back — all data is lost. This is a direct drop-off point that kills conversion. SessionStorage (not localStorage) ensures data lasts the session but clears when the tab is closed.

---

## Activities

* add Zustand `persist` middleware with `sessionStorage` as storage:

```typescript
import { persist, createJSONStorage } from 'zustand/middleware'

export const useEstimatorStore = create<EstimatorStore>()(
  persist(
    (set) => ({ ... }),
    {
      name: 'estimator-session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
```

* verify serialization works for all store fields (Room[] with nested objects)
* add store version + migration:
  * if schema changes, increment version + provide migration function
  * prevents stale data from old sessions causing runtime errors
* test: fill wizard → refresh → state restored → estimate matches original
* test: close tab → open new tab → state cleared (sessionStorage behavior)
* add "Start over" button on landing page that calls `store.reset()` and clears session

---

Output:

Zustand store persisted to sessionStorage, store version with migration, start-over button

Validation:

wizard state survives page refresh; state clears on new tab; estimates before and after refresh produce identical results
