"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveMap } from "@liveblocks/client";
import Loader from "@/components/Loader";

export function Room({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider
{/*             publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!} */}
            publicApiKey={'pk_dev_gG_0RqyQC71uD0Bn__1aiWOm58JjjBL2EuBSc75J38-1HKEVZ3NEEwqz1WRUtYpv'}
        >
            <RoomProvider
                id="my-room"
                initialPresence={{ cursor: null, message: null}}
                initialStorage={{ canvasObjects: new LiveMap<string,any>() }}
            >
                <ClientSideSuspense fallback={<Loader />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
