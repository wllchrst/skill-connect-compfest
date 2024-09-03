import CommunityFriend from "@/app/components/community/community-friend";
import CommunityGroup from "@/app/components/community/community-group";
import MainPageLayout from "@/app/layout/main-page-layout";

function CommunityPage() {
  return (
    <MainPageLayout>
      <div className="p-4">
        <CommunityFriend />
        <CommunityGroup />
      </div>
    </MainPageLayout>
  );
}

export default CommunityPage;
