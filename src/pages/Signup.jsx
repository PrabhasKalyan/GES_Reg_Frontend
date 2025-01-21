import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import {Button} from "../components/ui/button";
import { ToastAction } from "../components/ui/toast";
import { useToast } from "../hooks/use-toast";
import {Toaster} from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const Signup = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    username: "",
    payment_status:"False",
    ca_code:""
  });

  const login ={
    username:formData.email,
    password:formData.password
  }

  const { toast } = useToast();

  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [roleData, setRoleData] = useState({});


  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validator.isEmpty(formData.first_name)) {
      setMessage("First Name is required.");
      toast({
        title: "Error",
        description: message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }
    if (validator.isEmpty(formData.last_name)) {
      setMessage("Last Name is required.");
      toast({
        title: message,
        description: message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }
    if (!validator.isEmail(formData.email)) {
      setMessage("Invalid email address.");
      toast({
        title: "Error",
        description: message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }
    if (!validator.isStrongPassword(formData.password, { minSymbols: 0 })) {
      setMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, and numbers."
      );
      toast({
        title:  "Error",
        description: message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }
    if (
      !validator.isNumeric(formData.phone_number) ||
      !validator.isLength(formData.phone_number, { min: 10, max: 10 })
    ) {
      setMessage("Phone number must be exactly 10 digits.");
      toast({
        title:  "Error",
        description: message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }
    if (validator.isEmpty(formData.role)) {
      setMessage("Role is required.");
      toast({
        title:  "Error",
        description: message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      return;
    }

    try{
      const response= await axios.post('/api/v1/users',formData);
      console.log(response);
      console.log(formData);
    }catch(err){
      var error =err;
    }

    try {
      axios.post("/api/v1/token/", login)
        .then(response => {
          const accessToken = response.data.access;  // Extract the access token
          // console.log('Access Token:', accessToken);
          localStorage.setItem('jwtToken', accessToken); // Save the token in local storage
        })
        .catch(err => {
          console.error('Error during login:', err);
          setMessage("Unexpected Error Occured");
        });
    } catch (err) {
      console.error('Unexpected error:', err);
    }
    

    if (step === 1) {
      if (!formData.role) {
        setMessage("Please select a role.");
        toast({
          title:  "Error",
          description: message,
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
        return;
      }
      if(error){
        setMessage("Unexpected Error Occured");
      }
      setStep(2); // Move to the next form
    } else {
      // Handle the submission of the second form
      setMessage("Form submitted successfully!");
      console.log("Final Form Data:", formData);
      toast({
        title: "Success",
        description: message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
    }
    setMessage("Signup Successful!");
  };


  const handleRoleFormSubmit = (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    try {
      switch (formData.role) {
        case "Student":
          axios.post("/api/v1/student_reg/", roleData, { headers })
            .then(res => console.log(res))
            .catch(() => setMessage("Unexpected Occurred"));
          break;
        case "CA":
          axios.post("/api/v1/ca_reg/", roleData, { headers })
            .then(res => console.log(res))
            .catch(() => setMessage("Unexpected Occurred"));
          break;
        case "Startup":
          axios.post("/api/v1/startup_reg/", roleData, { headers })
            .then(res => console.log(res))
            .catch(() => setMessage("Unexpected Occurred"));
          break;
        case "Professional":
          axios.post("/api/v1/proff_reg/", roleData, { headers })
            .then(res => console.log(res))
            .catch(() => setMessage("Unexpected Occurred"));
          break;
        case "Contingent":
          axios.post("/api/v1/contingent/",roleData,{headers})
            .then(res=>{console.log(res)})
            .catch(()=>setMessage("Unexpected Occurred"));
            console.log(roleData);
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
      
    } catch {
      setMessage("Unexpected Occurred");
    }
};


const ca_code=()=>{
  switch (formData.role) {
    case "Student":
      return(
      <div>
        <label htmlFor="ca_code" className="block text-sm font-medium text-gray-700">
          Referral Code
        </label>
        <input
          type="text"
          id="ca_code"
          name="ca_code"
          value={formData.ca_code}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
    </div>)
  
    default:
        return(<></>);
  }
}



  const renderRoleForm = () => {
    switch (formData.role) {
      case "Student":
        return (
          <form onSubmit={handleRoleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="insti" className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                id="insti"
                name="insti"
                value={roleData.insti || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={roleData.city || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={roleData.year || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="dept" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                id="dept"
                name="dept"
                value={roleData.dept || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Submit Student Details
            </Button>
          </form>
        );
      case "Professional":
        return (
          <form onSubmit={handleRoleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="proffession" className="block text-sm font-medium text-gray-700">
                Profession
              </label>
              <input
                type="text"
                id="proffession"
                name="proffession"
                value={roleData.proffession || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={roleData.industry || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                id="years_of_experience"
                name="years_of_experience"
                value={roleData.years_of_experience || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="curr_org" className="block text-sm font-medium text-gray-700">
                Current Organization
              </label>
              <input
                type="text"
                id="curr_org"
                name="curr_org"
                value={roleData.curr_org || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Submit Professional Details
            </Button>
          </form>
        );
      case "Startup":
        return (
          <form onSubmit={handleRoleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="startup_name" className="block text-sm font-medium text-gray-700">
                Startup Name
              </label>
              <input
                type="text"
                id="startup_name"
                name="startup_name"
                value={roleData.startup_name || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={roleData.industry || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="year_of_establishment"
                className="block text-sm font-medium text-gray-700"
              >
                Year of Establishment
              </label>
              <input
                type="number"
                id="year_of_establishment"
                name="year_of_establishment"
                value={roleData.year_of_establishment || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="stage_of_startup" className="block text-sm font-medium text-gray-700">
                Stage of Startup
              </label>
              <select
                id="stage_of_startup"
                name="stage_of_startup"
                value={roleData.stage_of_startup || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="Preseed">Preseed</option>
                <option value="Seed">Seed</option>
                <option value="Funding">Funding</option>
              </select>
            </div>
            <div>
              <label htmlFor="cofounders" className="block text-sm font-medium text-gray-700">
                Co-founders
              </label>
              <input
                type="text"
                id="cofounders"
                name="cofounders"
                value={roleData.cofounders || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Submit Startup Details
            </Button>
          </form>
        );
      case "CA":
        return (
          <form onSubmit={handleRoleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="insti" className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                id="insti"
                name="insti"
                value={roleData.insti || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={roleData.city || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={roleData.year || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="dept" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                id="dept"
                name="dept"
                value={roleData.dept || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="target_regs" className="block text-sm font-medium text-gray-700">
                Target of No. of Regs
              </label>
              <input
                type="number"
                id="target_regs"
                name="target_regs"
                value={roleData.target_regs || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Submit Campus Ambassador Details
            </Button>
          </form>
        );
      case "Contingent":
        return (
          <form onSubmit={handleRoleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="insti" className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                id="insti"
                name="insti"
                value={roleData.insti || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={roleData.city || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="no_of_people"
                className="block text-sm font-medium text-gray-700"
              >
                Number of People
              </label>
              <input
                type="number"
                id="no_of_people"
                name="no_of_people"
                value={roleData.no_of_people || ""}
                onChange={handleRoleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Submit Contingent Details
            </Button>
            
          </form>
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="bg-gray-100 flex flex-col md:flex-row items-center justify-center min-h-screen">
  {/* Image Section (Visible on Desktop) */}
  <div style={{padding:"20px"}} className="hidden md:block w-1/2">
    <img 
      src="src/assets/E-Cell Logo Black_Original.png" 
      alt="Signup Illustration" 
      className="object-cover h-full w-full"
    />
  </div>

  {/* Form Section */}
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md md:w-1/2">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
    {message && <p className="text-center text-red-500 mb-4">{message}</p>}
    <Toaster />

    { step === 1 ? (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name */}
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="Student">Student</option>
          <option value="CA">Campus Ambassador</option>
          <option value="Professional">Professional</option>
          <option value="Contingent">Contingent</option>
          <option value="Startup">Startup</option>
        </select>
      </div>

      {ca_code()}
      <div className="flex justify-start">
            <Button
            type="submit"
            // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Signp
          </Button>
        </div>
      <div>
      <div>
        <div>
          <p>Already Have an account?</p>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </div>
      </div>
    </form> ):

// Step2

    (
      // renderRoleForm()
      renderRoleForm()
    )

    }
  </div>
</div>

  );
};


export default Signup;


