'use client';

import React from 'react';

export const usePending = () => {
    const [pendingActions, setPendingActions] = React.useState<Set<string>>(new Set());

    const withPending = React.useCallback(
        async <T>(key: string, action: () => Promise<T>): Promise<T> => {
            setPendingActions((prev) => new Set(prev).add(key));
            try {
                return await action();
            } finally {
                setPendingActions((prev) => {
                    const next = new Set(prev);
                    next.delete(key);
                    return next;
                });
            }
        },
        []
    );

    const isPending = React.useCallback((key: string) => pendingActions.has(key), [pendingActions]);

    return { withPending, isPending };
};