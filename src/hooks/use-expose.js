// @ts-check

import { useImperativeHandle } from "react";
import { useSanitize } from "./use-sanitize";

/**
 * @typedef {Object} Props
 * @property {React.Ref<any>} ref
 * @property {React.MutableRefObject<import('../text-input').Ref | null>} textInputRef
 * @property {(value: string) => void} setValue
 * @property {() => void} emitChange
 */

/**
 *
 * @param {Props} props
 */
export function useExpose({ ref, textInputRef, setValue, emitChange }) {
  const { sanitize, sanitizedTextRef } = useSanitize();

  useImperativeHandle(ref, () => ({
    get value() {
      return sanitizedTextRef.current;
    },
    set value(value) {
      setValue(value);
    },
    focus: () => {
      if (textInputRef.current === null) return
      textInputRef.current.focus();
    },
    blur: () => {
      if (textInputRef.current !== null) {
        sanitize(textInputRef.current.html);

      }

      emitChange();
    }
  }));
}
