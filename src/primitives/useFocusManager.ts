import {
  createEffect,
  on,
  createSignal,
  onCleanup,
  getOwner,
  runWithOwner,
} from 'solid-js';
import type { ElementNode } from '../core/index.js';
import {
  activeElement,
  useFocusManager as useFocusManagerCore,
  type KeyMap,
  type KeyHoldOptions,
} from '../core/focusManager.js';

const [focusPath, setFocusPath] = createSignal<ElementNode[]>([]);
export { focusPath };

export const useFocusManager = (
  userKeyMap?: Partial<KeyMap>,
  keyHoldOptions?: KeyHoldOptions,
) => {
  const owner = getOwner();
  const ownerContext = runWithOwner.bind(this, owner);

  const { cleanup, focusPath: focusPathCore } = useFocusManagerCore({
    userKeyMap,
    keyHoldOptions,
    ownerContext,
  });

  createEffect(
    on(
      activeElement,
      () => {
        setFocusPath([...focusPathCore()]);
      },
      { defer: true },
    ),
  );

  onCleanup(cleanup);
};
