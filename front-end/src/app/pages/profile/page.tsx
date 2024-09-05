"use client";
import FriendCard from "@/app/components/community/friend-card";
import { useUserContext } from "@/app/contexts/user-context";
import { getFirstTwoInitials } from "@/app/helpers/helper";
import { IUser } from "@/app/interfaces/user-interface";
import MainPageLayout from "@/app/layout/main-page-layout";
import { AvatarFallback } from "@/components/ui/avatar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

function Profile() {
  const { user } = useUserContext();

  return (
    <MainPageLayout>
      {user != null && (
        <div className="min-h-screen">
          <div className="max-w-4xl p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <Avatar className="flex-shrink-0 w-32 h-32">
                <AvatarImage src={user.profilePictureLink} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {getFirstTwoInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-6">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-lg text-gray-400 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500">
                  {new Date(user.dateOfBirth).toDateString()}
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-300">{user.description}</p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <ul className="list-disc list-inside text-gray-400">
                {user.skill.map((skill: string, index: number) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              <p className="text-gray-400">{user.currentEducation}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Experience</h2>
              <p className="text-gray-400">{user.experienceYears} years</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <ul className="list-disc list-inside text-gray-400">
                {user.interest.map((interest: string, index: number) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Learning Resources</h2>
              <ul className="list-disc list-inside text-gray-400">
                {user.learningResource.map(
                  (resource: string, index: number) => (
                    <li key={index}>{resource}</li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Tools</h2>
              <ul className="list-disc list-inside text-gray-400">
                {user.tools.map((tool: string, index: number) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
            {user.filledInformation && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Friends</h2>
                <div className="flex flex-wrap gap-2">
                  {user.friends.map((friend: IUser) => (
                    <FriendCard friend={friend} isFriend={true} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </MainPageLayout>
  );
}

export default Profile;
