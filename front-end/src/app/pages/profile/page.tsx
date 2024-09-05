"use client";
import FriendCard from "@/app/components/community/friend-card";
import Vertical from "@/app/components/welcome/vertical";
import { useUserContext } from "@/app/contexts/user-context";
import { getFirstTwoInitials } from "@/app/helpers/helper";
import { IUser } from "@/app/interfaces/user-interface";
import MainPageLayout from "@/app/layout/main-page-layout";
import { AvatarFallback } from "@/components/ui/avatar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";

function Profile() {
  const { user } = useUserContext();

  return (
    <MainPageLayout>
      {user != null && (
        <div className="w-full h-full flex gap-3 items-start justify-around p-16">
          <div className="flex-shrink-0 w-60 h-60 overflow-hidden rounded-full m-8">
            <Avatar>
              <AvatarImage
                src={user.profilePictureLink}
                alt={user.name}
                className="object-cover w-full h-full"
              />
              <AvatarFallback>{getFirstTwoInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-center items-start w-full h-fit rounded-md border border-neutral-500 p-8 m-8">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Username</Label>
                <Label className="text-md font-normal">{user.name}</Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Description</Label>
                <Label className="text-md font-normal">
                  {user.description}
                </Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Skills</Label>
                <ul className="flex flex-wrap gap-2 list-disc">
                  {user.skill.map((skill: string, index: number) => (
                    <li key={index} className="ml-6">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Language</Label>
                <Label className="text-md font-normal">{user.language}</Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Experience</Label>
                <Label className="text-md font-normal">
                  {user.experienceYears > 1
                    ? `${user.experienceYears} years`
                    : `${user.experienceYears} year`}
                </Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">
                  Current Education
                </Label>
                <Label className="text-md font-normal">
                  {user.currentEducation}
                </Label>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Email</Label>
                <Label className="text-md font-normal">{user.email}</Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Date of Birth</Label>
                <Label className="text-md font-normal">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </Label>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Interests</Label>
                <ul className="flex flex-wrap gap-2 list-disc">
                  {user.interest.map((interest: string, index: number) => (
                    <li key={index} className="ml-6">
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Friends</Label>
                <div className="flex gap-2">
                  {user.friends.length == 0 ? (
                    <Label className="text-md font-normal">
                      No friends yet..
                    </Label>
                  ) : (
                    user.friends.map((friend: IUser) => (
                      <FriendCard
                        key={friend.id}
                        friend={friend}
                        isFriend={true}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">
                  Learning Resources
                </Label>
                <ul className="flex flex-wrap gap-2 list-disc">
                  {user.learningResource.map(
                    (resource: string, index: number) => (
                      <li key={index} className="ml-6">
                        {resource}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-lg font-semibold">Tools</Label>
                <ul className="flex flex-wrap gap-2 list-disc">
                  {user.tools.map((tool: string, index: number) => (
                    <li key={index} className="ml-6">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainPageLayout>
  );
}

export default Profile;
