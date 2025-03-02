import { useState } from "react";

export default function Forms() {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    courseYear: "",
    date: "",
  });

  const steps = [
    { title: "Basic Info", progress: 0 },
    { title: "Personal/Social", progress: 33 },
    { title: "Academic", progress: 66 },
    { title: "Additional Info", progress: 100 },
  ];

  const nextStep = () => step < steps.length - 1 && setStep(step + 1);
  const prevStep = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">UIC Faculty Portal</h1>
        <nav className="flex space-x-4">
          <button className="text-white">Home</button>
          <button className="text-white">Profile</button>
          <button className="text-white">Logout</button>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h2 className="text-2xl font-bold text-center">Student Referral Form</h2>

        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all"
            style={{ width: `${steps[step].progress}%` }}
          />
        </div>

        <div className="border p-6 rounded shadow bg-white">
          {step === 0 && (
            <div>
              <h3 className="text-lg font-bold">Basic Information</h3>
              <input className="border p-2 w-full mt-2" placeholder="Enter student's name" />
              <input className="border p-2 w-full mt-2" placeholder="e.g., BSIT-3" />
              <input className="border p-2 w-full mt-2" type="date" />
            </div>
          )}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold">Personal/Social Concerns</h3>
              <div className="flex items-center"><input type="checkbox" /> Adjustment to college life</div>
              <div className="flex items-center"><input type="checkbox" /> Attitudes toward studies</div>
              <div className="flex items-center"><input type="checkbox" /> Financial problems</div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold">Academic Concerns</h3>
              <div className="flex items-center"><input type="checkbox" /> Unmet subject requirement</div>
              <div className="flex items-center"><input type="checkbox" /> Attendance issues</div>
              <div className="flex items-center"><input type="checkbox" /> Failing grade</div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-bold">Additional Information</h3>
              <textarea className="border p-2 w-full" placeholder="Other Concerns"></textarea>
              <textarea className="border p-2 w-full mt-2" placeholder="Observations/Remarks"></textarea>
              <input className="border p-2 w-full mt-2" placeholder="Referred by" />
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button className="p-2 border rounded bg-gray-300" onClick={prevStep} disabled={step === 0}>
            Previous
          </button>
          <button
            className="p-2 border rounded bg-blue-600 text-white"
            onClick={step === steps.length - 1 ? () => console.log("Submit") : nextStep}
          >
            {step === steps.length - 1 ? "Submit Referral" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

