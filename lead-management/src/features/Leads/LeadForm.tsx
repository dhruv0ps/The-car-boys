import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { Label, TextInput, Select, Textarea, Checkbox,Spinner } from 'flowbite-react';
import MultiSelectDropdown from '../../components/Multipleselect';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { FaChevronLeft } from 'react-icons/fa';
type LeadFormProps = {
  onSave: (lead: Lead) => void;
};

type Lead = {
    id: string;
    status: string;
    month: string;
    manager: string;
    name: string;
    phoneNumber: string;
    email?: string;
    leadSource: string;
    interestedModels: string[];
    budget?: number;
    paymentPlan: string;
    creditScore? : number;
    priorityLevel: string;
    comments?: string;
    tradeInOption: boolean;
    tradeInVehicleDetails?: string;
    downPaymentAmount? : number;
    lastFollowUp? : string,
    nextFollowUp?: string;
  assignedTo?: string;

  };

const LeadForm: React.FC<LeadFormProps> = ({ onSave }) => {
  const [lead, setLead] = useState<Partial<Lead>>({
    status: 'New',
    month: new Date().toISOString().slice(0, 7),
    tradeInOption: false,
    priorityLevel: 'Medium',
    interestedModels: [] 
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (name: string, value: string | boolean | string[] | number) => {
    setLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
   setIsLoading(true);
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addlead`,lead)
      console.log(response)
      if(response.status === 201) {
        toast.success("Lead saved successfully")
        navigate("/leads/view")
        onSave(lead as Lead);
        setLead({
          status: 'New',
          month: new Date().toISOString().slice(0, 7),
          tradeInOption: false,
          priorityLevel: 'Medium',
          interestedModels: [] 
        });
      }
      
    }
    catch (error) {
      console.error('Error saving lead:', error);
      toast.error("Failed to save lead. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after submission completes
    }
  };
  const models = ['Mustang', 'Civic', 'Accord', 'Camry', 'Corolla'];
  const priorities = ['High', 'Medium', 'Low'];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
    {/* <Button  onClick={() => navigate(-1)} className="flex items-center gap-2">
      <FaChevronLeft /><span style={{color:"black"}}>Back</span> 
    </Button>
    */}
  </div>
 
 <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">

 
<form onSubmit={handleSave} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Add New Lead</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            onChange={(e) => handleChange("status", e.target.value)}
            required
          >
            <option value="New">New</option>
            <option value="Hot">Hot</option>
            <option value="Cold">Cold</option>
            <option value="Warm">Warm</option>
            <option value="Lost">Lost</option>
            <option value="Closed">Closed</option>
            <option value="Pending Approval">Pending Approval</option>
          </Select>
        </div>

        {/* Month */}
        <div className="space-y-2">
          <Label htmlFor="month">Month</Label>
          <TextInput
            type="month"
            id="month"
            value={lead.month || ''}
            onChange={(e) => handleChange("month", e.target.value)}
          />
        </div>

        {/* Manager */}
        <div className="space-y-2">
          <Label htmlFor="manager">Manager</Label>
          <Select
            id="manager"
            onChange={(e) => handleChange("manager", e.target.value)}
            required
          >
            <option value="">Select Manager</option>
            <option value="Rajat">Rajat</option>
            <option value="Tanveer">Tanveer</option>
            <option value="Vipash">Vipash</option>
            

          </Select>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <TextInput
            type="text"
            id="name"
            value={lead.name || ''}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Lead’s full name"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <TextInput
            type="tel"
            id="phoneNumber"
            value={lead.phoneNumber || ''}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="Lead’s contact number"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email (optional)</Label>
          <TextInput
            type="email"
            id="email"
            value={lead.email || ''}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email address"
          />
        </div>

        {/* Lead Source */}
        <div className="space-y-2">
          <Label htmlFor="leadSource">Lead Source</Label>
          <Select
            id="leadSource"
            value={lead.leadSource || ''}
            onChange={(e) => handleChange('leadSource', e.target.value)}
            required
          >
            <option>Select lead source</option>
            {['Walk-in', 'Instagram', 'Facebook', 'Marketplace', 'Referral', 'Ad', 'Car Gurus', 'Web'].map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </Select>
        </div>

        {/* Interested Models */}
        <div className="space-y-2 col-span-full">
          <Label htmlFor="interestedModels">Interested Models</Label>
          {/* <Select
            id="interestedModels"
            value={lead.interestedModels || []}
            onChange={(e) => handleChange('interestedModels', Array.isArray(e.target.value) ? e.target.value : [e.target.value])}
            multiple
          >
            <option>Select models</option>
            {['Mustang', 'Civic', 'Accord'].map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </Select> */}
                <MultiSelectDropdown options={models} value={lead.interestedModels || []}  placeholder="Select models"    onChange={(selectedModels) => handleChange('interestedModels', selectedModels)}/>

        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (optional)</Label>
          <TextInput
            type="number"
            id="budget"
            name="budget"
            value={lead.budget || ''}
            onChange={(e) => handleChange('budget', e.target.value)}
            placeholder="Expected budget"
          />
        </div>

        {/* Payment Plan */}
        <div className="space-y-2">
          <Label htmlFor="paymentPlan">Payment Plan</Label>
          <Select
            id="paymentPlan"
            value={lead.paymentPlan || ''}
            onChange={(e) => handleChange('paymentPlan', e.target.value)}
          >
            <option>Select payment plan</option>
            {['Bi-weekly', 'Monthly', 'Cash Deal'].map((plan) => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="creditScore">Credit Score (optional)</Label>
            <TextInput
              type="number"
              id="creditScore"
              value={lead.creditScore || ''}
              onChange={(e) => handleChange('creditScore', (e.target.value))}
              placeholder="Credit score"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="downPaymentAmount">Down Payment Amount</Label>
            <TextInput
              id="downPaymentAmount"
              type="number"
              value={lead.downPaymentAmount || ''}
              onChange={(e) => handleChange('downPaymentAmount', (e.target.value))}
              placeholder="Enter down payment amount"
            />
          </div>
        {/* <div>
          <Label htmlFor="lastFollowUp" value="Last Follow-up Date" />
          <TextInput id="lastFollowUp" type="date" {...register('lastFollowUp', { required: 'Last follow-up date is required' })} />
         
        </div> */}
<div className='space-y-2'>
    <Label htmlFor='lastFollowUp'>Last Follow-up Date</Label>
    <TextInput type='date' id='lastFollowUp' value={lead.lastFollowUp || ''} onChange={(e) => handleChange("lastFollowUp",e.target.value)}/>
</div>
<div className="space-y-2">
            <Label htmlFor="nextFollowUp">Next Follow-up Date</Label>
            <TextInput
              type="date"
              id="nextFollowUp"
              value={lead.nextFollowUp || ''}
              onChange={(e) => handleChange('nextFollowUp', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select
              id="assignedTo"
              value={lead.assignedTo || ''}
              onChange={(e) => handleChange('assignedTo', e.target.value)}
            >
              <option>Select sales representative</option>
              {['Rep1', 'Rep2', 'Rep3'].map((rep) => (
                <option key={rep} value={rep}>{rep}</option>
              ))}
            </Select>
          </div>
          
    
          <div className="space-y-2">
            <Label htmlFor="priorityLevel">Priority Level</Label>
            <Select
              id="priorityLevel"
              value={lead.priorityLevel || 'Medium'}
              onChange={(e) => handleChange('priorityLevel', e.target.value)}
              required
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </Select>
          </div>

   
        <div className="space-y-2 col-span-full">
          <Label htmlFor="comments">General Comments</Label>
          <Textarea
            id="comments"
            name="comments"
            value={lead.comments || ''}
            onChange={(e) => handleChange('comments', e.target.value)}
            placeholder="Additional notes or comments"
            rows={4}
          />
        </div>

        {/* Trade-In Checkbox */}
        <div className="flex items-center space-x-2 col-span-full">
            <Checkbox
              id="tradeInOption"
              checked={lead.tradeInOption|| false}
              onChange={(e) => handleChange('tradeInOption', e.target.checked)}
            />
            <Label htmlFor="tradeIn">Trade-In</Label>
          </div>

          {/* Trade-In Details (conditional) */}
          {lead.tradeInOption && (
            <div className="space-y-2 col-span-full">
              <Label htmlFor="tradeInVehicleDetails">Trade-In Details</Label>
              <Textarea
                id="tradeInVehicleDetails"
                name="tradeInVehicleDetails"
                value={lead.tradeInVehicleDetails || ''}
                onChange={(e) => handleChange('tradeInVehicleDetails', e.target.value)}
                placeholder="Provide details about the trade-in vehicle"
                rows={4}
              />
            </div>
          )}
      </div>

      {/* Save Button */}
      <Button type="submit" color="dark" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner aria-label="Loading..." className="mr-2" /> Saving...
            </div>
          ) : (
            "Save Lead"
          )}
        </Button>
    </form>
    </div>
    </div>
  );
};

export default LeadForm;
