import {computed, Signal, useSignal} from "@preact/signals";

export function useCustomSignal<T>(initialValue: T): [signal: Signal<T>, value: Readonly<T>] {
    const signal = useSignal<T>(initialValue);
    const value= computed(() => signal.value).value;

    return [signal, value];
}