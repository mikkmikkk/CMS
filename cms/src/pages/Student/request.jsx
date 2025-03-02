import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../ui/ProfileContext";
import StudentNavbar from "../ui/studentnavbar";

export default function Request() {
  const navigate = useNavigate();
  const { openProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    consentGiven: false,
    studentName: "",
    dateTime: "",
    dateOfBirth: "",
    contactNo: "",
    courseYearSection: "",
    ageSex: "",
    presentAddress: "",
    emergencyContactPerson: "",
    emergencyContactNo: ""
  });

  const steps = [
    { label: "Consent", progress: 10 },
    { label: "Personal Information", progress: 25 },
    { label: "Self-Assesment", progress: 50 },
    { label: "Additional Information", progress: 75 },
    { label: "Concern", progress: 100 },
  ];

  const nextStep = () => {
    if (step === 0 && !formData.consentGiven) return;
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <StudentNavbar />
      
      <div className="max-w-2xl mx-auto mt-20 space-y-6">
        <h2 className="text-2xl font-bold text-center">Student Initial/Routine Interview</h2>

        <div className="relative w-full bg-gray-200 h-3 rounded-full mb-6 overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#3B021F] transition-all duration-500" style={{ width: `${steps[step].progress}%` }}></div>
        </div>

        <div className="flex justify-between mb-6">
          {steps.map((s, i) => (
            <div key={i} className={`flex flex-col items-center ${i <= step ? "text-[#3B021F]" : "text-gray-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${i <= step ? "bg-[#3B021F]" : "bg-gray-300"}`}>
                {i + 1}
              </div>
              <span className="text-xs mt-2 text-center w-20">{s.label}</span>
            </div>
          ))}
        </div>

        <div>
          {step === 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Consent Form</h3>
              <p className="mb-4">
                I hereby give my consent to the University of the Immaculate Conception to collect my data and information
                by filling out and submitting the Counseling/Routine Interview form for purposes of processing my
                psychological test, counseling, and other purposes about my will to study at the University of the
                Immaculate Conception.
              </p>
              <p className="mb-4">
                All information I provide shall be treated in confidentiality and shall not be shared with third persons
                without my permission or consent, except as laws may provide.
              </p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.consentGiven}
                  onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                  className="mr-2"
                />
                <span>I understand and agree to the terms above</span>
              </label>
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Date/Time</label>
              <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Contact No.</label>
              <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Course/Yr. & Section</label>
              <input type="text" name="courseYearSection" value={formData.courseYearSection} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Age/Sex</label>
              <input type="text" name="ageSex" value={formData.ageSex} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Present Address</label>
              <input type="text" name="presentAddress" value={formData.presentAddress} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Emergency Contact Person</label>
              <input type="text" name="emergencyContactPerson" value={formData.emergencyContactPerson} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
              <label className="block mb-2 font-semibold">Emergency Contact No.</label>
              <input type="text" name="emergencyContactNo" value={formData.emergencyContactNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
            </div>
          )}
        </div>

        {step === 2 && (
          <div>
    
          <label className="block mb-2">1. What do you think of yourself? How do you describe yourself?</label>
          <textarea
            placeholder="Enter your answer here..."
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <label className="block mb-2">2. What are the most important things to you?</label>
          <textarea
            placeholder="Enter your answer here..."
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <label className="block mb-2">3. Tell me about your friends. What are the things you like or dislike doing with them?</label>
          <textarea
            placeholder="Enter your answer here..."
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <label className="block mb-2">4. What do you like or dislike about your class? Describe your participation in class activities.</label>
          <textarea
            placeholder="Enter your answer here..."
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          
        </div>
        )}

          {step === 3 && (
            <div>
            <label className="block mb-2">5. Tell me about your family. How is your relationship with each member of the family? Who do you like or dislike among them? Why?</label>
          <textarea
            placeholder="Enter your answer here..."
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <label className="block mb-2">6. To whom do you feel comfortable sharing your problems? Why?</label>
          <textarea
            placeholder="Enter your answer here..."
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <label className="block mb-2">7. Is there anything I haven't asked that you like to tell me?</label>
          <textarea
            placeholder="Enter your answer here..."
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          
          </div>
        )} 

         {step === 4 && (
            <div>
            <h2 className="text-xl font-bold mb-4">Step 3: Areas of Concern</h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Personal</h3>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I do not feel confident about myself
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I have a hard time making decisions
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I have a problem with sleeping
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I have noticed that my mood is not stable
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Interpersonal</h3>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I am being bullied
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I cannot handle peer pressure
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I have difficulty getting along with others
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Academic</h3>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I am overly worried about my academic performance
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I am not motivated to study
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I have difficulty understanding the class lessons
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Family</h3>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I have a hard time dealing with my parents/guardian's expectations
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> I have difficulty opening up to family member/s
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Our family is having financial concerns
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )} 



  
        

        

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button onClick={prevStep} className="px-4 py-2 border border-gray-400 rounded-md">Back</button>
          )}
          <button onClick={step === steps.length - 1 ? () => console.log("Submit ", formData) : nextStep} className="px-4 py-2 bg-[#3B021F] text-white rounded-md flex items-center">
            {step === steps.length - 1 ? "Submit Referral" : "Next"}
            {step !== steps.length - 1 && <span className="ml-2">→</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
