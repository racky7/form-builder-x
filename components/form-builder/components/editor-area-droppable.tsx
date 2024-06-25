import { EDITOR_AREA_DROPPABLE_CONTAINER_ID } from "@/lib/dnd";
import { useDroppable } from "@dnd-kit/core";

type EditorAreaDroppableProps = {
  children: React.ReactNode;
  className: string;
  style?: React.CSSProperties;
};

export default function EditorAreaDroppable({
  children,
  className,
  style,
}: EditorAreaDroppableProps) {
  const { setNodeRef } = useDroppable({
    id: EDITOR_AREA_DROPPABLE_CONTAINER_ID,
  });

  return (
    <div ref={setNodeRef} className={className} style={style}>
      {children}
    </div>
  );
}
