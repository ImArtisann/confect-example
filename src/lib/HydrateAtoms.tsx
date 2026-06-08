'use client';

import { Hydration, Registry } from '@effect-atom/atom-react';
import * as ReactHydration from '@effect-atom/atom-react/ReactHydration';
import type React from 'react';

interface HydrateAtomsProps {
    children: React.ReactNode;
}

export default function HydrateAtoms({ children }: HydrateAtomsProps) {
    const registry = Registry.make();
    const state = Hydration.dehydrate(registry, { encodeInitialAs: 'promise' });

    return (
        <ReactHydration.HydrationBoundary state={state}>{children}</ReactHydration.HydrationBoundary>
    );
}