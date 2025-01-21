
import React, { useState,useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Bargraph from "../components/bargraph";
import Home from "../components/Dashboard";
import axios from "axios";
import { SidebarDemo } from "../components/Sidebar";

export function CA() {

  axios.defaults.baseURL = 'http://127.0.0.1:8000';

  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const [data, setData] = useState(null);

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
  
  // console.log(data);

  const logout = ()=>{
    console.log(jwtToken);
    localStorage.removeItem("jwtToken");
    <Navigate to="/login" />
  }

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/caprofile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    (<div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1   w-screen  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: data?.user_data?.first_name || "Default Name",
                href: "/profile",
                icon: (
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Prabhas"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      {data ? <Home data={data} /> : <div>Loading...</div>}
    </div>)
  );
}

export const Logo = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <img
        src="https://ead.ecell-iitkgp.org/static/Home/images/ecelllogodots.png" className="h-8 w-8 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre">
        Entreprenurship Cell,<br></br> IIT Kharagpur
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (
    <Link
      to="https://www.ecell-iitkgp.org/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <img
        src="https://ead.ecell-iitkgp.org/static/Home/images/ecelllogodots.png" className="h-7 w-7 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
    )
  );
};



