import React, { useState } from "react";
import { ServiceData } from "../constants/index.js";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import UserImageGallery from "./UserImageGallery.jsx";

const ImageGallery = () => {
  const [people, setPeople] = useState(ServiceData);

  const handleOnDragEnd = (e) => {
    const { active, over } = e;

    setPeople((people) => {
      const oldIndex = people.findIndex((person) => person.id === active.id);
      const newIndex = people.findIndex((person) => person.id === over.id);

      return arrayMove(people, oldIndex, newIndex);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleOnDragEnd}>
      <SortableContext items={people} strategy={horizontalListSortingStrategy}>
        {people.map((user) => (
          <UserImageGallery user={user} key={user.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ImageGallery;
