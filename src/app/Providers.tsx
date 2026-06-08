'use client';

import { RegistryProvider } from '@effect-atom/atom-react';
import HydrateAtoms from "@/lib/HydrateAtoms";
import {ConvexClientProvider} from "@/lib/ConvexClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <ConvexClientProvider>
            <RegistryProvider defaultIdleTTL={1000 * 60 * 5} timeoutResolution={1000}>
                <HydrateAtoms>
                    {children}
                </HydrateAtoms>
            </RegistryProvider>
        </ConvexClientProvider>
    );
}