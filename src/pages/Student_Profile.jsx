import React, { useState, useEffect } from "react";
import { SidebarDemo } from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import PageTitle from "../components/ui/PageTitle";
import axios from "axios";

const StudentProfile = () => {
  const [data, setData] = useState(null);

  axios.defaults.baseURL = "http://127.0.0.1:8000";

  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/dashboard/", { headers });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const student = data;

  const handlePayment = () => {
    alert("Redirecting to payment gateway...");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-200 border-r w-10 flex-shrink-0 lg:block">
        <SidebarDemo />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div style={{transform: "translateX(-20px)"}} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
          <PageTitle title="Student Profile" className="text-center mb-6" />

          {/* Profile Picture and Name */}
          <div className="text-center mb-6">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src="" alt="Profile Picture" />
              <AvatarFallback className="bg-gray-800 text-white">
                {student?.user_data?.first_name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4">
              <h2 className="text-3xl font-bold">
                {student?.user_data?.first_name || "N/A"}
              </h2>
              <h2 className="text-lg font-semibold">
                {student?.user_data?.ges_id || "N/A"}
              </h2>
              <p className="text-lg text-gray-600">
                {student?.student_data?.insti || "N/A"}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Personal Details */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">
              Personal Details
            </h2>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="text-lg font-medium">
                    {student?.student_data?.city || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="text-lg font-medium">
                    {student?.student_data?.year || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="text-lg font-medium">
                    {student?.student_data?.dept || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shirt Size</p>
                  <p className="text-lg font-medium">
                    {student?.user_data?.shirt_size || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>

          <Separator className="my-4" />

          {/* Payment Section */}
          <div>
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">
              Complete Your Payment
            </h2>
            <CardContent className="flex items-center justify-between">
              {student?.user_data?.payment_status ? (
                <p className="text-green-600 text-base font-medium">
                  Payment Completed
                </p>
              ) : (
                <>
                  <p className="text-gray-700 text-base">
                    To get your passes, please complete your payment.
                  </p>
                  <Button onClick={handlePayment} className="px-4 py-2">
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

export default StudentProfile;
