import {
  CollisionDetection,
  closestCenter,
  rectIntersection,
} from "@dnd-kit/core";

export const EDITOR_AREA_DROPPABLE_CONTAINER_ID = "editor-area-container";
const COLLISION_THRESHOLD = 600;

export const collisonDetection: CollisionDetection = ({
  droppableContainers,
  active,
  ...args
}) => {
  const activeId = active.id.toString();

  if (activeId.startsWith("element-card")) {
    // Detect if element-card is inside editor area or not
    const rectIntersectionCollisions = rectIntersection({
      ...args,
      droppableContainers: droppableContainers.filter(
        ({ id }) => id === EDITOR_AREA_DROPPABLE_CONTAINER_ID
      ),
      active,
    });

    // If not return empty collisions
    if (rectIntersectionCollisions.length === 0) {
      return [];
    }

    // Else detect closest center collision with other droppables except editor area droppable
    const collisions = closestCenter({
      ...args,
      droppableContainers: droppableContainers.filter(
        ({ id }) => id !== EDITOR_AREA_DROPPABLE_CONTAINER_ID
      ),
      active,
    });

    // Only return those collisions which are in range of collision threshold let say 600
    return collisions.filter(
      (collision) => collision.data?.value < COLLISION_THRESHOLD
    );
  }

  // Collision detection for sortable fields
  if (activeId.startsWith("sortable-field")) {
    const collision = rectIntersection({
      ...args,
      droppableContainers: droppableContainers.filter(({ id }) =>
        id.toString().startsWith("sortable-field")
      ),
      active,
    });
    return collision;
  }

  return [];
};
