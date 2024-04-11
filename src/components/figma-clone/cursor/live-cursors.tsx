import Cursor from "."
import { COLORS } from "@/constants"
import { LiveCursorProps } from "@/types/figma-clone/type"

// display all other live cursors
const LiveCursors = ({ others }: LiveCursorProps) => {
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (!presence || !presence.cursor) {
          return null
        }

        return (
          <Cursor
            key={connectionId}
            color={COLORS[Number(connectionId) % COLORS.length]!}
            x={presence.cursor.x}
            y={presence.cursor.y}
            message={presence.message}
          />
        )
      })}
    </>
  )
}

export default LiveCursors
