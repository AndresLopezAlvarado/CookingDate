import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const UserImageGallery = ({ user }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: user.id });
    
  const style = {
    backgroundImage: `url(${user.backgroundImage})`,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="text-lime-900 h-[150px] w-[115px] lg:h-[300px] lg:w-[250px] bg-center m-2 rounded-md"
    >
      {user.title}
    </div>
  );
};

export default UserImageGallery;
