import React, { useState, useEffect } from "react";
import { SidebarDemo } from "../components/Sidebar";
import { CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import PageTitle from "../components/ui/PageTitle";
import axios from "axios";

const ProfessionalProfile = () => {
  const [data, setData] = useState(null);

  axios.defaults.baseURL = "http://127.0.0.1:8000";

  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/dashboard/", {
          headers,
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const professional = data;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-200 border-r w-10 flex-shrink-0 lg:block">
        <SidebarDemo />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
          <PageTitle title="Professional Profile" className="text-center mb-6" />

          {/* Professional Details */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">
              {professional?.user_data?.first_name || "Professional Name"}
            </h2>
            <p className="text-lg text-gray-600">
              Industry: {professional?.professional_data?.industry || "N/A"}
            </p>
            <p className="text-lg text-gray-600">
              Profession: {professional?.professional_data?.proffession || "N/A"}
            </p>
          </div>

          <Separator className="my-4" />

          {/* Additional Details */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">
              Professional Details
            </h2>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Current Organization</p>
                  <p className="text-lg font-medium">
                    {professional?.professional_data?.curr_org || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Years of Experience</p>
                  <p className="text-lg font-medium">
                    {professional?.professional_data?.years_of_experience || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>

          <Separator className="my-4" />

          {/* Associated User */}
          <div>
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">
              Associated User
            </h2>
            <CardContent>
              <p className="text-sm text-gray-600">User</p>
              <p className="text-lg font-medium">
                {professional?.user_data?.username || "N/A"}
              </p>
            </CardContent>
            <CardContent className="flex items-center justify-between">
              {professional?.user_data?.payment_status ? (
                <p className="text-green-600 text-base font-medium">
                  Payment Completed
                </p>
              ) : (
                <>
                  <p className="text-gray-700 text-base">
                    To get your passes, please complete your payment.
                  </p>
                  <Button className="px-4 py-2">
                    Pay Now
                  </Button>
                </>
              )}
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;

