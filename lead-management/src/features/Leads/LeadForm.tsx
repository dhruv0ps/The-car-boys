import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { Label, TextInput, Select, Textarea, Checkbox } from 'flowbite-react';
import MultiSelectDropdown from '../../components/Multipleselect';
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
    priority: string;
    comments?: string;
    tradeIn: boolean;
    tradeInDetails?: string;
    downPayment? : number;
    lastFollowUp? : string,
    nextFollowUp?: string;
  assignedTo?: string;

  };

const LeadForm: React.FC<LeadFormProps> = ({ onSave }) => {
  const [lead, setLead] = useState<Partial<Lead>>({
    status: 'New',
    month: new Date().toISOString().slice(0, 7),
    tradeIn: false,
    priority: 'Medium',
  });

  const handleChange = (name: string, value: string | boolean | string[]) => {
    setLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(lead as Lead);
  };
  const models = ['Mustang', 'Civic', 'Accord', 'Camry', 'Corolla'];
  return (
    
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
                <MultiSelectDropdown options={models} placeholder="Select models" />

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
          <div className='space-y-2'>
          <Label htmlFor="downPayment" value="Down Payment Amount (optional)" />
          <TextInput id="downPayment" value={lead.downPayment || ""}  placeholder="Down payment amount" type="number" onChange={(e) => handleChange('downPayment',(e.target.value))} />
       
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
          <Label htmlFor="priority">Priority Level</Label>
          <Select
            id="priority"
            value={lead.priority || 'Medium'}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            <option>Select priority</option>
            {['High', 'Medium', 'Low'].map((priority) => (
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
            id="tradeIn"
            checked={lead.tradeIn || false}
            onChange={(e) => handleChange('tradeIn', e.target.checked)}
          />
          <Label htmlFor="tradeIn">Trade-In</Label>
        </div>

        {/* Trade-In Details (conditional) */}
        {lead.tradeIn && (
          <div className="space-y-2 col-span-full">
            <Label htmlFor="tradeInDetails">Trade-In Details</Label>
            <Textarea
              id="tradeInDetails"
              name="tradeInDetails"
              value={lead.tradeInDetails || ''}
              onChange={(e) => handleChange('tradeInDetails', e.target.value)}
              placeholder="Provide details about the trade-in vehicle"
              rows={4}
            />
          </div>
        )}
      </div>

      {/* Save Button */}
      <Button type="submit" color="dark" className="w-full">
        Save Lead
      </Button>
    </form>
    </div>
  );
};

export default LeadForm;
