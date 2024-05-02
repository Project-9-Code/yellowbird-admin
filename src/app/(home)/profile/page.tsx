import { getUser } from "@/requests/user";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import LogoutButton from "@/components/LogoutButton";
import { ProfilePic } from "@/components/ProfilePic";
import TextAreaField from "@/components/TextAreaField";

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="flex flex-col grow self-stretch items-center py-[48px]">
      <Card disableDrag className="mb-5" footer={<InfoFooter />}>
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

        <div className="flex flex-row flex-wrap justify-center gap-x-[32px] gap-y-[24px] mb-[90px]">
          <InputField
            id="displayName"
            label="Full Name"
            defaultValue={user?.full_name ?? ""}
            containerClass="w-[284px]"
            placeholder="Enter your full name here"
          />
          <InputField
            id="email"
            label="Email Address"
            defaultValue={user?.email ?? ""}
            containerClass="w-[284px]"
            placeholder="Enter your email address here"
          />
          <TextAreaField
            id="bio"
            label="Short Bio"
            containerClass="w-[284px]"
            rows={1}
            placeholder="Tell us about yourself"
          />
          <InputField
            id="phoneNumber"
            label="Phone (Optional)"
            defaultValue={user?.phone ?? ""}
            containerClass="w-[284px]"
            type="tel"
            placeholder="xxx-xxx-xxxx"
          />
        </div>
      </Card>

      <Card disableDrag className="mb-5">
        <h1 className="font-ginto text-[30px] text-headlineText font-bold mb-[24px]">
          Password
        </h1>

        <div className="flex flex-row justify-center gap-[32px]">
          <InputField
            id="currentPassword"
            label="Current Password"
            placeholder="Current Password"
            containerClass="w-[284px]"
          />
          <InputField
            id="newPassword"
            label="New Password"
            placeholder="New Password"
            containerClass="w-[284px]"
          />
        </div>
      </Card>

      <LogoutButton />
    </div>
  );
}

async function InfoFooter() {
  const user = await getUser();
  return (
    <div className="flex flex-row gap-[32px] justify-center">
      <InputField
        label="Business or Organization Name"
        containerClass="w-[284px]"
        id="organization"
        placeholder="What’s the name of your business?"
        defaultValue={user?.organization ?? ""}
      />

      <InputField
        id="website"
        label="Website"
        containerClass="w-[284px]"
        placeholder="http://"
        defaultValue={user?.website ?? ""}
      />
    </div>
  );
}
