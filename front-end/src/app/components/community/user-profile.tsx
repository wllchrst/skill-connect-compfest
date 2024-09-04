import { IUser } from "@/app/interfaces/user-interface";
import { Badge } from "@/components/ui/badge";

interface I {
  user: IUser;
}

function UserProfile({ user }: I) {
  return (
    <>
      <div className="flex gap-1 flex-wrap items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6 font-bold">SKILL</p>
        {user.skill.map((value, index) => (
          <div key={index}>
            <Badge>{value}</Badge>
          </div>
        ))}
      </div>
      <div className="flex gap-1 flex-wrap items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6 font-bold">
          INTEREST
        </p>
        {user.interest.map((value, index) => (
          <div key={index}>
            <Badge variant={"outline"}>{value}</Badge>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserProfile;
