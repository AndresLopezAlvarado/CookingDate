import PersonCard from "./PersonCard";

const PeopleGrid = ({ people }) => {
  return (
    <div className="rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 cursor-pointer">
      {people.map((person) => (
        <PersonCard person={person} key={person._id} />
      ))}
    </div>
  );
};

export default PeopleGrid;
