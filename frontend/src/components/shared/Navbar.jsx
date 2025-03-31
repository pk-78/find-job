import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Find<span className="text-red-600">JOB</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-red-600">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-red-600">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-red-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-red-600">
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-700 hover:bg-gray-200"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-gray-300 hover:border-gray-400">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-lg rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <Avatar className="cursor-pointer border-gray-300">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User Profile"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 text-gray-700">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                        <User2 />
                        <Link to="/profile" className="font-medium">
                          View Profile
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                      <LogOut />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="text-gray-700"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
