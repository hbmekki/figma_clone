import { useBroadcastEvent, useEventListener, useMyPresence} from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import LiveCursors from "./cursors/LiveCursors";
import CursorChat from "./cursors/CursorChat";
import { CursorMode, CursorState, Reaction } from "@/types/type";
import ReactionSelector from "./reactions/ReactionButton";
import FlyingReaction from "./reactions/FlyingReaction";
import useInterval from "@/hooks/useInterval";
import { Comments } from "./comments/Comments";
import { shortcuts } from "@/constants";

interface Props {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    undo: () => void;
    redo: () => void;
}
const Live = ({ canvasRef, undo, redo }: Props) => {

    const [{ cursor }, updateMyPresence] = useMyPresence();

    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden
    })

    const [reactions, setReactions] = useState<Reaction[]>([])

    const handlePointerMove = useCallback(
        (evt: React.PointerEvent) => {
            evt.preventDefault();
            if (cursor && cursorState.mode == CursorMode.ReactionSelector) {
                return;
            }
            const x = evt.clientX - evt.currentTarget.getBoundingClientRect().x
            const y = evt.clientY - evt.currentTarget.getBoundingClientRect().y
            updateMyPresence({ cursor: { x, y } })
        },
        [updateMyPresence, cursor, cursorState],
    )

    const handlePointerUp = useCallback(
        (evt: React.PointerEvent) => {
            setCursorState((state: CursorState) => cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state)
        },
        [cursorState],
    )

    const handlePointerDown = useCallback(
        (evt: React.PointerEvent) => {
            const x = evt.clientX - evt.currentTarget.getBoundingClientRect().x
            const y = evt.clientY - evt.currentTarget.getBoundingClientRect().y
            updateMyPresence({ cursor: { x, y } })

            setCursorState((state: CursorState) => cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state)
        },
        [updateMyPresence, cursorState],
    )

    const handlePointerLeave = useCallback(
        (evt: React.PointerEvent) => {
            setCursorState({
                mode: CursorMode.Hidden
            })
            updateMyPresence({ cursor: null, message: null })
        },
        [updateMyPresence],
    )

    const setReaction = useCallback((reaction: string) => {
        setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
    }, [])

    const broadcast = useBroadcastEvent();

    useInterval(() => {
        setReactions((reactions) => reactions.filter(r => r.timestamp > Date.now() - 4000))
    }, 1000)

    useInterval(() => {
        if (cursor && cursorState.mode === CursorMode.Reaction && cursorState.isPressed) {
            setReactions((reactions) => reactions.concat([{
                point: { x: cursor.x, y: cursor.y },
                value: cursorState.reaction,
                timestamp: Date.now()
            }]))

            broadcast({
                x: cursor.x,
                y: cursor.y,
                value: cursorState.reaction
            })
        }
    }, 100)

    useEventListener(eventData => {
        const event = eventData.event;
        setReactions((reactions) => reactions.concat([{
            point: { x: event[0].x, y: event[0].y },
            value: event[0].value,
            timestamp: Date.now()
        }]))
    })

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === '/') {
                setCursorState({
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: ''
                })
            } else if (e.key === 'Escape') {
                updateMyPresence({ message: '' })
                setCursorState({ mode: CursorMode.Hidden })
            } else if (e.key === 'e') {
                setCursorState({ mode: CursorMode.ReactionSelector })
            }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                e.preventDefault()
            }
        }
        window.addEventListener('keyup', onKeyUp)
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keyup', onKeyUp)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [updateMyPresence])

    const handleContextMenuClick = useCallback((key: string) => {
        switch (key) {
            case 'Chat':
                setCursorState({
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: ''
                })
                break;
            case 'Reactions':
                setCursorState({
                    mode: CursorMode.ReactionSelector
                })
                break;
            case 'Undo':
                undo();
                break;
            case 'Redo':
                redo();
                break;
            default:
                break;
        }
    }, [])

    return (
        <ContextMenu>
            <ContextMenuTrigger
                id="canvas" onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                className="relative h-full w-full flex flex-1 justify-center items-center"
            >
                <canvas ref={canvasRef} />

                {
                    reactions.map(r => (
                        <FlyingReaction
                            key={r.timestamp.toString()}
                            x={r.point.x}
                            y={r.point.y}
                            timestamp={r.timestamp}
                            value={r.value}
                        />
                    ))
                }
                {cursor && (
                    <CursorChat
                        cursor={cursor}
                        cursorState={cursorState}
                        setCursorState={setCursorState}
                        updateMyPresence={updateMyPresence}
                    />
                )}
                {cursorState.mode === CursorMode.ReactionSelector && (
                    <ReactionSelector
                        setReaction={setReaction}
                    />
                )
                }
                <LiveCursors />
                <Comments />
            </ContextMenuTrigger>
            <ContextMenuContent className='right-menu-content'>
                {shortcuts.map(item => (

                    <ContextMenuItem
                        key={item.key}
                        onClick={() => handleContextMenuClick(item.name)}
                        className="right-menu-item"
                    >
                        <p>{item.name}</p>
                        <p className="text-xs text-primary-grey-300">
                            {item.shortcut}
                        </p>
                    </ContextMenuItem>
                ))}
            </ContextMenuContent>
        </ContextMenu>
    )
};

export default Live;
