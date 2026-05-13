import * as Cause from 'effect/Cause';
import * as Effect from 'effect/Effect';
import * as Either from 'effect/Either';
import * as Option from 'effect/Option';
import { toast } from 'sonner';

type ToastOptions<
A,
    E extends { readonly message: string },
Args extends ReadonlyArray<unknown>,
> = {
    onWaiting: string | ((...args: Args) => string)
    onSuccess: string | ((a: A, ...args: Args) => string)
    onFailure?: string | ((error: E, ...args: Args) => string | undefined)
}

export const withToast =
    <A, E extends { readonly message: string }, Args extends ReadonlyArray<unknown>>(
        mutation: (...args: Args) => Promise<Either.Either<A, E>>,
        options: ToastOptions<A, E, Args>,
    ) =>
        async (...args: Args): Promise<void> => {
            const toastId = toast.loading(
                typeof options.onWaiting === 'string'
                    ? options.onWaiting
                    : options.onWaiting(...args),
            )
            const result = await mutation(...args)
            Either.match(result, {
                onLeft: (error) => {
                    const message =
                        typeof options.onFailure === 'function'
                            ? options.onFailure(error, ...args)
                            : options.onFailure
                    toast.error(message ?? error.message, { id: toastId })
                },
                onRight: (a) => {
                    toast.success(
                        typeof options.onSuccess === 'string'
                            ? options.onSuccess
                            : options.onSuccess(a, ...args),
                        { id: toastId },
                    )
                },
            })
        }