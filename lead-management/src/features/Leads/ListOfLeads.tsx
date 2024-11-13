import React, { useState } from "react";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Pagination
  } from "@mui/material";
  import { Edit, Delete } from "@mui/icons-material";
type Lead = {
  id: string;
  status: string;
  month: string;
  manager: string;
  name: string;
  phoneNumber: string;
  leadSource: string;
  budget: number;
  paymentPlan: string;
  lastFollowUp: string;
  nextFollowUp: string;
  createdDate: string;
  updatedDate: string;
  priorityLevel: string;
};

const dummyLeadsData: Lead[] = [
    {
      id: "LD001",
      status: "New",
      month: "2023-11",
      manager: "Rajat",
      name: "John Doe",
      phoneNumber: "123-456-7890",
      leadSource: "Walk-in",
      budget: 20000,
      paymentPlan: "Monthly",
      lastFollowUp: "2023-11-01",
      nextFollowUp: "2023-11-10",
      createdDate: "2023-10-15",
      updatedDate: "2023-11-05",
      priorityLevel: "High",
    },
    {
      id: "LD002",
      status: "Hot",
      month: "2023-10",
      manager: "Tanveer",
      name: "Jane Smith",
      phoneNumber: "234-567-8901",
      leadSource: "Facebook",
      budget: 30000,
      paymentPlan: "Bi-weekly",
      lastFollowUp: "2023-10-15",
      nextFollowUp: "2023-11-15",
      createdDate: "2023-10-10",
      updatedDate: "2023-10-20",
      priorityLevel: "Medium",
    },
    {
      id: "LD003",
      status: "Cold",
      month: "2023-09",
      manager: "Vipash",
      name: "Alice Johnson",
      phoneNumber: "345-678-9012",
      leadSource: "Marketplace",
      budget: 15000,
      paymentPlan: "Cash Deal",
      lastFollowUp: "2023-09-10",
      nextFollowUp: "2023-09-20",
      createdDate: "2023-09-01",
      updatedDate: "2023-09-15",
      priorityLevel: "Low",
    },
    {
      id: "LD004",
      status: "Warm",
      month: "2023-10",
      manager: "Rajat",
      name: "Michael Brown",
      phoneNumber: "456-789-0123",
      leadSource: "Referral",
      budget: 25000,
      paymentPlan: "Monthly",
      lastFollowUp: "2023-10-12",
      nextFollowUp: "2023-10-22",
      createdDate: "2023-10-05",
      updatedDate: "2023-10-15",
      priorityLevel: "Medium",
    },
    {
      id: "LD005",
      status: "Pending Approval",
      month: "2023-08",
      manager: "Tanveer",
      name: "Emily Davis",
      phoneNumber: "567-890-1234",
      leadSource: "Ad",
      budget: 18000,
      paymentPlan: "Bi-weekly",
      lastFollowUp: "2023-08-15",
      nextFollowUp: "2023-08-25",
      createdDate: "2023-08-01",
      updatedDate: "2023-08-10",
      priorityLevel: "High",
    },
    {
      id: "LD006",
      status: "Lost",
      month: "2023-07",
      manager: "Vipash",
      name: "Chris Wilson",
      phoneNumber: "678-901-2345",
      leadSource: "Car Gurus",
      budget: 22000,
      paymentPlan: "Cash Deal",
      lastFollowUp: "2023-07-20",
      nextFollowUp: "2023-07-30",
      createdDate: "2023-07-05",
      updatedDate: "2023-07-15",
      priorityLevel: "Low",
    },
    {
      id: "LD007",
      status: "Closed",
      month: "2023-06",
      manager: "Rajat",
      name: "Sophia Martinez",
      phoneNumber: "789-012-3456",
      leadSource: "Web",
      budget: 27000,
      paymentPlan: "Monthly",
      lastFollowUp: "2023-06-15",
      nextFollowUp: "2023-06-25",
      createdDate: "2023-06-01",
      updatedDate: "2023-06-10",
      priorityLevel: "High",
    },
    {
      id: "LD008",
      status: "New",
      month: "2023-11",
      manager: "Tanveer",
      name: "Oliver Garcia",
      phoneNumber: "890-123-4567",
      leadSource: "Instagram",
      budget: 24000,
      paymentPlan: "Monthly",
      lastFollowUp: "2023-11-05",
      nextFollowUp: "2023-11-15",
      createdDate: "2023-10-20",
      updatedDate: "2023-11-01",
      priorityLevel: "High",
    },
    {
      id: "LD009",
      status: "Hot",
      month: "2023-10",
      manager: "Vipash",
      name: "Ava Lee",
      phoneNumber: "901-234-5678",
      leadSource: "Walk-in",
      budget: 32000,
      paymentPlan: "Bi-weekly",
      lastFollowUp: "2023-10-05",
      nextFollowUp: "2023-10-15",
      createdDate: "2023-10-01",
      updatedDate: "2023-10-10",
      priorityLevel: "Medium",
    },
    {
      id: "LD010",
      status: "Timepass",
      month: "2023-09",
      manager: "Rajat",
      name: "Liam White",
      phoneNumber: "012-345-6789",
      leadSource: "Marketplace",
      budget: 12000,
      paymentPlan: "Cash Deal",
      lastFollowUp: "2023-09-10",
      nextFollowUp: "2023-09-20",
      createdDate: "2023-09-01",
      updatedDate: "2023-09-05",
      priorityLevel: "Low",
    },
    {
      id: "LD011",
      status: "Hot",
      month: "2023-08",
      manager: "Vipash",
      name: "Amelia Brown",
      phoneNumber: "234-987-6543",
      leadSource: "Referral",
      budget: 28000,
      paymentPlan: "Monthly",
      lastFollowUp: "2023-08-20",
      nextFollowUp: "2023-08-30",
      createdDate: "2023-08-01",
      updatedDate: "2023-08-15",
      priorityLevel: "High",
    },
    {
      id: "LD012",
      status: "Cold",
      month: "2023-07",
      manager: "Rajat",
      name: "Lucas Green",
      phoneNumber: "876-543-2109",
      leadSource: "Web",
      budget: 18000,
      paymentPlan: "Bi-weekly",
      lastFollowUp: "2023-07-05",
      nextFollowUp: "2023-07-20",
      createdDate: "2023-07-01",
      updatedDate: "2023-07-10",
      priorityLevel: "Medium",
    },
    {
      id: "LD013",
      status: "New",
      month: "2023-06",
      manager: "Tanveer",
      name: "Grace Lee",
      phoneNumber: "321-654-0987",
      leadSource: "Instagram",
      budget: 22000,
      paymentPlan: "Cash Deal",
      lastFollowUp: "2023-06-12",
      nextFollowUp: "2023-06-22",
      createdDate: "2023-06-01",
      updatedDate: "2023-06-10",
      priorityLevel: "High",
    },
    {
      id: "LD014",
      status: "Pending Approval",
      month: "2023-05",
      manager: "Vipash",
      name: "David Parker",
      phoneNumber: "210-987-6543",
      leadSource: "Ad",
      budget: 25000,
      paymentPlan: "Monthly",
      lastFollowUp: "2023-05-10",
      nextFollowUp: "2023-05-20",
      createdDate: "2023-05-01",
      updatedDate: "2023-05-15",
      priorityLevel: "Medium",
    },
    {
      id: "LD015",
      status: "Warm",
      month: "2023-04",
      manager: "Rajat",
      name: "Hannah Moore",
      phoneNumber: "456-789-3210",
      leadSource: "Facebook",
      budget: 29000,
      paymentPlan: "Bi-weekly",
      lastFollowUp: "2023-04-18",
      nextFollowUp: "2023-04-28",
      createdDate: "2023-04-05",
      updatedDate: "2023-04-20",
      priorityLevel: "Low",
    },
  ];
  


  const ListOfLeads: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [leadSourceFilter, setLeadSourceFilter] = useState<string>("");
    const [minPrice, _setMinPrice] = useState<number | "">("");
    const [maxPrice, _setMaxPrice] = useState<number | "">("");
    const [priorityFilter, _setPriorityFilter] = useState<string>("");
    const [sortField, setSortField] = useState<keyof Lead>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage = 5;
    // const [startDate, setStartDate] = useState<string>("");
    // const [endDate, setEndDate] = useState<string>("");
  
    // Handle sorting when a column header is clicked
    const handleSort = (field: keyof Lead) => {
      if (sortField === field) {
        // Toggle sort order if clicking the same field
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    };
  
    // Filter and sort data
    const filteredData = dummyLeadsData
    .filter((lead) => {
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;
      const matchesLeadSource = leadSourceFilter ? lead.leadSource === leadSourceFilter : true;
      const matchesMinPrice = minPrice !== "" ? lead.budget >= minPrice : true;
      const matchesMaxPrice = maxPrice !== "" ? lead.budget <= maxPrice : true;
      const matchesPriority = priorityFilter ? lead.priorityLevel === priorityFilter : true;
      const matchesSearchQuery =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phoneNumber.includes(searchQuery);

      return matchesStatus && matchesLeadSource && matchesMinPrice && matchesMaxPrice && matchesPriority && matchesSearchQuery;
    })
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
      );
    
      const handlePageChange = (_event: unknown, newPage: number) => {
        setCurrentPage(newPage);
      };
  
    return (
        <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>List of Leads</h2>
  
        {/* Search and Filter Controls */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ minWidth: "200px" }}
          />
  
          <FormControl variant="outlined" style={{ minWidth: "200px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Hot">Hot</MenuItem>
              <MenuItem value="Cold">Cold</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
  
          <FormControl variant="outlined" style={{ minWidth: "200px" }}>
            <InputLabel>Lead Source</InputLabel>
            <Select
              value={leadSourceFilter}
              onChange={(e) => setLeadSourceFilter(e.target.value)}
              label="Lead Source"
            >
              <MenuItem value="">All Lead Sources</MenuItem>
              <MenuItem value="Walk-in">Walk-in</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </div>
  
        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort("id")}>ID</TableCell>
                <TableCell onClick={() => handleSort("name")}>Name</TableCell>
                <TableCell onClick={() => handleSort("status")}>Status</TableCell>
                <TableCell onClick={() => handleSort("manager")}>Manager</TableCell>
                <TableCell onClick={() => handleSort("phoneNumber")}>Phone Number</TableCell>
                <TableCell onClick={() => handleSort("leadSource")}>Lead Source</TableCell>
                <TableCell onClick={() => handleSort("budget")}>Budget</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.id}</TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.manager}</TableCell>
                  <TableCell>{lead.phoneNumber}</TableCell>
                  <TableCell>{lead.leadSource}</TableCell>
                  <TableCell>${lead.budget.toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Pagination */}
       <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      />
      </div>
    );
  };
  
  export default ListOfLeads;