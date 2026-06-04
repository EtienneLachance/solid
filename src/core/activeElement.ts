import { createSignal } from 'solid-js';
import type { ElementNode } from './elementNode.js';

/**
 * Generic active-element signal — intentionally decoupled from the focus
 * manager so consumers can drive focus from their own focus-management logic.
 *
 * `setActiveElementSignal` is the *raw* signal setter: it only updates the
 * reactive value. It does NOT move focus state, fire `onFocus`/`onBlur`, or
 * touch the focus path — that is the focus manager's job.
 *
 * The built-in focus manager applies focus via `setActiveElement`
 * (see {@link ./focusManager.ts}) and publishes the result through
 * `Config.setActiveElement`, which defaults to this setter. A library shipping
 * its own focus manager can read {@link activeElement}, reassign
 * `Config.setActiveElement` (e.g. to inject a Solid owner context), or call
 * `setActiveElementSignal` directly — without depending on `focusManager.ts`.
 */
export const [activeElement, setActiveElementSignal] = createSignal<
  ElementNode | undefined
>(undefined);
