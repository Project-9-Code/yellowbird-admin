import Card from "@/components/Card";
import LogoutButton from "@/components/LogoutButton";
import { ProfilePic } from "@/components/ProfilePic";

export default function Profile() {
  return (
    <div className="flex flex-col grow self-stretch items-center py-[48px]">
      <Card disableDrag className="mb-5">
        <h1 className="font-ginto text-[30px] text-headlineText font-bold mb-[24px]">
          Information
        </h1>

        <div className="flex flex-row items-center mb-[16px]">
          <ProfilePic />

          <div className="flex flex-col ml-[16px]">
            <h3 className="text-bodyText font-bold text-[14px]">Profile Photo</h3>
            <p className="text-bodyText text-[12px]">
              This photo will be used to identify you in Yellowbird. 
              It will be visible to anyone using the app. Use a photo or image instead of text.
            </p>
          </div>
        </div>

        <div className="">

        </div>
      </Card>

      <Card disableDrag className="mb-5">
        <h1 className="font-ginto text-[30px] text-headlineText font-bold mb-[24px]">
          Password
        </h1>
      </Card>

      <Card disableDrag className="mb-5">
        <h1 className="font-ginto text-[30px] text-headlineText font-bold mb-[24px]">
          Notifications
        </h1>
      </Card>

      <LogoutButton />
    </div>
  );
}

function EmptyProfileImage() {
  return (
    <div></div>
  );
}
