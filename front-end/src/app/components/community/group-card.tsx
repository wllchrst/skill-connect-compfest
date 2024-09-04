import { IGroup } from "@/app/interfaces/group-interface";

interface I {
  group: IGroup;
}
function GroupCard({ group }: I) {
  return (
    <>
      <div className="bg-white text-black rounded-lg shadow-md p-4 max-w-sm h-[130px] w-[300px]">
        <h2 className="text-xl font-semibold mb-1 line-clamp-1 ">
          {group.groupName}
        </h2>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {group.description}
        </p>
        <p className="text-xs text-gray-500">
          Created on: {new Date(group.createdAt).toLocaleDateString()}
        </p>
      </div>
    </>
  );
}
export default GroupCard;
