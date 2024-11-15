import React, { useEffect, useState } from "react";
import {
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
import axios from "axios";
import debounce from 'lodash/debounce';

type Lead = {
  leadId?: string;
  id?: string;
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

const ListOfLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [leadSourceFilter, setLeadSourceFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [priorityFilter, _setPriorityFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Lead>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leads`);
        setLeads(response.data.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Debounced function for live search
  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  }, 500);

  // Filter, sort, and paginate leads data locally
  const filteredLeads = leads
    .filter((lead) => {
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;
      const matchesLeadSource = leadSourceFilter ? lead.leadSource === leadSourceFilter : true;
      const matchesMinPrice = minPrice !== "" ? lead.budget >= minPrice : true;
      const matchesMaxPrice = maxPrice !== "" ? lead.budget <= maxPrice : true;
      const matchesPriority = priorityFilter ? lead.priorityLevel === priorityFilter : true;
      const matchesSearchQuery = searchQuery
        ? lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.leadId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phoneNumber.includes(searchQuery)
        : true;

      return matchesStatus && matchesLeadSource && matchesMinPrice && matchesMaxPrice && matchesPriority && matchesSearchQuery;
    })
    .sort((a, b) => {
      const aField = a[sortField] as string | number;
      const bField = b[sortField] as string | number;

      if (aField < bField) return sortOrder === "asc" ? -1 : 1;
      if (aField > bField) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Paginate filtered data
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>List of Leads</h2>

      {/* Search and Filter Controls */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
        
        {/* Search Field */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: "200px" }}>
          <label htmlFor="search" className="text-gray-700 font-medium mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search..."
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ flex: "0 1 200px", display: "flex", flexDirection: "column" }}>
          <label htmlFor="status" className="text-gray-700 font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Hot">Hot</option>
            <option value="Cold">Cold</option>
            <option value="Warm">Warm</option>
            <option value="Lost">Lost</option>
            <option value="Closed">Closed</option>
            <option value="Pending Approval">Pending Approval</option>
          </select>
        </div>

        {/* Lead Source Filter */}
        <div style={{ flex: "0 1 200px", display: "flex", flexDirection: "column" }}>
          <label htmlFor="leadSource" className="text-gray-700 font-medium mb-1">
            Lead Source
          </label>
          <select
            id="leadSource"
            value={leadSourceFilter}
            onChange={(e) => setLeadSourceFilter(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          >
           <option value="">All Lead Sources</option>
  <option value="Walk-in">Walk-in</option>
  <option value="Instagram">Instagram</option>
  <option value="Facebook">Facebook</option>
  <option value="Marketplace">Marketplace</option>
  <option value="Referral">Referral</option>
  <option value="Ad">Ad</option>
  <option value="Car Gurus">Car Gurus</option>
  <option value="Web">Web</option>
          </select>
        </div>

        {/* Min Price Filter */}
        <div style={{ flex: "0 1 200px", display: "flex", flexDirection: "column" }}>
          <label htmlFor="minPrice" className="text-gray-700 font-medium mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Min Price"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>

        {/* Max Price Filter */}
        <div style={{ flex: "0 1 200px", display: "flex", flexDirection: "column" }}>
          <label htmlFor="maxPrice" className="text-gray-700 font-medium mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Max Price"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow style={{ backgroundColor: 'black', color: 'white' }}>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleSort("leadId")}>ID</TableCell>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleSort("name")}>Name</TableCell>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleSort("status")}>Status</TableCell>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleSort("manager")}>Manager</TableCell>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleSort("phoneNumber")}>Phone Number</TableCell>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleSort("leadSource")}>Lead Source</TableCell>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }} onClick={() => handleSort("budget")}>Budget</TableCell>
  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
</TableRow>

          </TableHead>
          <TableBody>
            {paginatedLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.leadId}</TableCell>
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
