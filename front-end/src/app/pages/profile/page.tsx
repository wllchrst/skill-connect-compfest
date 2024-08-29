"use client";

import ProfileDetailInformation from "@/app/components/profile/profile-detail-information";
import ProfileUpper from "@/app/components/profile/profile-upper";
import { useUserContext } from "@/app/contexts/user-context";
import MainPageLayout from "@/app/layout/main-page-layout";

function Profile() {
  const { user } = useUserContext();

  return (
    <MainPageLayout>
      {user ? (
        <div className="p-4">
          <ProfileUpper user={user} />
          <ProfileDetailInformation user={user} />
        </div>
      ) : (
        <></>
      )}
    </MainPageLayout>
  );
}

export default Profile;
