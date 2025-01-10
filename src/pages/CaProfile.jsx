import React, { useState, useEffect } from "react";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from "react-share";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Button } from "../components/ui/button";
import PageTitle from "../components/ui/PageTitle";
import axios from "axios";
import { SidebarDemo } from "../components/Sidebar";



const CAProfile = () => {

    const [data, setData] = useState(null);
    axios.defaults.baseURL = 'http://127.0.0.1:8000';

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        Authorization: `Bearer ${jwtToken}`,
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("/api/v1/ca_dashboard/", { headers });
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, []);

    const profile = data;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <PageTitle title="Profile" />

            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-600">
                            {profile?.user_data?.first_name?.charAt(0) || "A"}
                        </span>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-700">
                            {profile?.user_data?.first_name || "Anonymous"} {profile?.user_data?.last_name || "User"}
                        </h1>
                        <p className="text-gray-500">{profile?.user_data?.email}</p>
                        <p className="text-gray-500">
                            Referral Code: <span className="font-semibold text-blue-500">{profile?.contingent_data?.referral_code || "N/A"}</span>
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Personal Details</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-gray-500">City</p>
                            <p className="font-semibold text-gray-700">{profile?.contingent_data?.city || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Year</p>
                            <p className="font-semibold text-gray-700">{profile?.contingent_data?.year || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Department</p>
                            <p className="font-semibold text-gray-700">{profile?.contingent_data?.dept || "N/A"}</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-700 mb-4">Statistics</h2>
                    <div className="mb-6">
                        <p className="text-gray-500">Number of Registrations</p>
                        <div className="relative w-full h-4 bg-gray-200 rounded-full mt-2">
                            <div
                                className="absolute top-0 left-0 h-4 bg-blue-500 rounded-full"
                                style={{ width: `${Math.min(profile?.contingent_data?.no_of_regs || 0, 100)}%` }}
                            ></div>
                        </div>
                        <p className="text-gray-700 font-semibold mt-2">
                            {profile?.contingent_data?.no_of_regs || 0} registrations
                        </p>
                    </div>

                    <h2 className="text-xl font-bold text-gray-700 mb-4">Referral</h2>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            readOnly
                            value={profile?.contingent_data?.link || "N/A"}
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-600"
                        />

                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button onClick={() => navigator.clipboard.writeText(profile?.contingent_data?.link || "N/A")}>Share</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Share the referral link</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div className="flex gap-4">
                                            <FacebookShareButton url={profile?.contingent_data?.link || "N/A"}>
                                                <FacebookIcon size={40} round />
                                            </FacebookShareButton>
                                            <TwitterShareButton url={profile?.contingent_data?.link || "N/A"}>
                                                <TwitterIcon size={40} round />
                                            </TwitterShareButton>
                                            <LinkedinShareButton url={profile?.contingent_data?.link || "N/A"}>
                                                <LinkedinIcon size={40} round />
                                            </LinkedinShareButton>
                                            <WhatsappShareButton url={profile?.contingent_data?.link || "N/A"}>
                                                <WhatsappIcon size={40} round />
                                            </WhatsappShareButton>
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button onClick={() => navigator.clipboard.writeText(profile?.contingent_data?.link || "N/A")}>
                                            Copy
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CAProfile;



