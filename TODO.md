# Role Reactor Website — TODO

> Task tracking for the Role Reactor website & dashboard.
> Format follows [TODO.md](https://todomd.org) spec.

---

### Todo

- [ ] Enable custom commands dashboard #feat
  - Dashboard is built but hidden behind `isComingSoon` flag in sidebar
- [ ] Error monitoring & alerting setup (Sentry or similar) #infra
- [ ] E2E test coverage for dashboard flows #test
  - Only `homepage.spec.ts` exists — no dashboard tests yet
- [ ] Add Patreon Checkout Integration #monetization
  - Redirect "Upgrade to Pro" buttons to Patreon / provide Patreon option alongside Plisio crypto.
- [ ] Update Pricing UI Limits #ui
  - Reflect tightened Free limits (100 giveaways, 3 scheduled roles, 15 tickets) on the dashboard and main website.

### In Progress

### Done ✓

- [x] Guild analytics dashboard — charts, export, premium gating
- [x] Welcome system dashboard with test functionality
- [x] Notification polling — smart backoff when user is idle
- [x] Dashboard loading state improvements — unified NodeLoader pattern
- [x] Payment transaction history — admin audit interface
- [x] Admin pages — convert to client-side with global state
- [x] Pricing — cache packages, fetch balance separately
- [x] Pro engine activation & balance precision fixes
- [x] Bot API 503 graceful error handling
- [x] LCP optimization — AvatarImage priority prop
- [x] botFetch security — pass userId via X-User-ID header
