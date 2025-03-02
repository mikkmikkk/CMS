import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../ui/ProfileContext"; // 
import StudentNavbar from "../ui/studentnavbar"; // 

// Reusable Button Component
const Button = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md bg-[#300020] hover:bg-[#220018] text-white transition-colors flex items-center justify-center gap-2 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

// Reusable Card Component
const Card = ({ children }) => (
  <div className="border border-gray-300 p-4 rounded-lg bg-white">{children}</div>
);

// Reusable Checkbox Component
const Checkbox = ({ id, checked, onChange }) => (
  <input type="checkbox" id={id} checked={checked} onChange={onChange} className="w-4 h-4" />
);

// Reusable Label Component
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="ml-2">
    {children}
  </label>
);

// Reusable Textarea Component
const Textarea = ({ id, placeholder }) => (
  <textarea id={id} placeholder={placeholder} className="w-full p-2 border rounded-md" />
);

export default function Request() {
  const navigate = useNavigate();
  const { openProfile } = useProfile(); // 
  const [step, setStep] = useState(0);
  const [consentGiven, setConsentGiven] = useState(false);

  const steps = ["Consent", "Initial Info", "Personal", "Interpersonal", "Academics", "Family"];

  const nextStep = () => step < steps.length - 1 && setStep(step + 1);
  const prevStep = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-white">
    
      <StudentNavbar />

     
      <div className="max-w-2xl mx-auto mt-20 space-y-6">
        <h2 className="text-2xl font-bold text-center">Student Initial/Routine Interview</h2>

        {/* ✅ Progress Bar */}
        <div className="flex justify-between">
          {steps.map((s, i) => (
            <div key={i} className={`text-sm ${i <= step ? "text-[#300020]" : "text-gray-400"}`}>
              {i <= step ? "✔" : i + 1}
              <div>{s}</div>
            </div>
          ))}
        </div>

     
        <Card>
          {step === 0 && (
            <div>
              <h3 className="font-bold text-lg">Consent</h3>
              <p>I hereby give my consent to UIC to collect my data...</p>
              <div className="flex items-center mt-2">
                <Checkbox id="consent" checked={consentGiven} onChange={() => setConsentGiven(!consentGiven)} />
                <Label htmlFor="consent">I consent to the collection of my information.</Label>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-bold text-lg">Initial Information</h3>
              <div className="flex items-center">
                <Checkbox id="walk-in" />
                <Label htmlFor="walk-in">Walk-in</Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="referral" />
                <Label htmlFor="referral">Referral</Label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-bold text-lg">Personal Assessment</h3>
              <div className="flex items-center">
                <Checkbox id="not-confident" />
                <Label htmlFor="not-confident">I do not feel confident.</Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="stress" />
                <Label htmlFor="stress">I struggle with stress.</Label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-bold text-lg">Interpersonal Relations</h3>
              <div className="flex items-center">
                <Checkbox id="bullied" />
                <Label htmlFor="bullied">I am being bullied.</Label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-bold text-lg">Academic Concerns</h3>
              <div className="flex items-center">
                <Checkbox id="academic-performance" />
                <Label htmlFor="academic-performance">I worry about my grades.</Label>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="font-bold text-lg">Family Relations</h3>
              <div className="flex items-center">
                <Checkbox id="financial-concerns" />
                <Label htmlFor="financial-concerns">We have financial concerns.</Label>
              </div>
              <Textarea id="notes" placeholder="Additional notes..." />
            </div>
          )}
        </Card>

       
        <div className="flex justify-between">
          <Button onClick={prevStep} disabled={step === 0}>◀ Previous</Button>
          <Button onClick={step === steps.length - 1 ? () => alert("Submitted!") : nextStep} disabled={step === 0 && !consentGiven}>
            {step === steps.length - 1 ? "Submit" : "Next ▶"}
          </Button>
        </div>

       
        <div className="flex justify-center">
          <button onClick={openProfile} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Open Profile
          </button>
        </div>
      </div>
    </div>
  );
}
