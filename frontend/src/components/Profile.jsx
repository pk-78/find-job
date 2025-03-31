import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen ">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-2 bg-white shadow-lg rounded-xl border border-gray-300 p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border border-gray-300 rounded-full overflow-hidden shadow-md">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
            variant="outline"
          >
            <Pen size={16} className="mr-2" /> Edit Profile
          </Button>
        </div>
        <div className="mt-6 grid gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Mail className="text-gray-500" />
            <span className="text-gray-700">
              {user?.email || "Not available"}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Contact className="text-gray-500" />
            <span className="text-gray-700">
              {user?.phoneNumber || "Not available"}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>
        <div className="mt-6">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto my-6 p-6 bg-white shadow-lg rounded-xl border border-gray-300">
        <h2 className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
