export function debounce<C extends () => unknown>(
  callback: C,
  wait = 0
): C & { flush: () => void; cancel: () => void } {
  let debounceTimer: number;
  let triggerArgs: unknown[];
  let triggerThis: unknown;

  function trigger(...arg: unknown[]) {
    triggerArgs = arg;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    triggerThis = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      return callback.apply(triggerThis, triggerArgs as unknown);
    }, wait);
  }

  trigger.cancel = () => clearTimeout(debounceTimer);
  trigger.flush = () => {
    clearTimeout(debounceTimer);
    callback.apply(triggerThis, triggerArgs as unknown);
  };

  return trigger as unknown;
}
