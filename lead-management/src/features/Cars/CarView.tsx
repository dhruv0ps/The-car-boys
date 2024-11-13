import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Select,
    MenuItem,
    Paper,
    IconButton,
    Typography,
    Pagination,
    FormControl,
    InputLabel,
  } from "@mui/material";
  import { Edit, Delete } from "@mui/icons-material";
type Car = {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
};

const CarList: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [yearFilter, setYearFilter] = useState<any>("");
    const [cylindersFilter, setCylindersFilter] = useState<number | "">("");
    const [fuelTypeFilter, setFuelTypeFilter] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/cars?limit=100&model=camry", {
          headers: {
            "X-Api-Key": "gLd6bnE5Dym+mOmRGvhgDg==SeE2N2Y0AjXSENxO",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Car[] = await response.json();
        setCars(data);
        setFilteredCars(data);  // Initialize filtered data
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = cars;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(car =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (yearFilter) {
        filtered = filtered.filter(car => car.year.toString().includes(yearFilter));
      }
  

    // Apply cylinders filter
    if (cylindersFilter) {
      filtered = filtered.filter(car => car.cylinders === cylindersFilter);
    }

    // Apply fuel type filter
    if (fuelTypeFilter) {
      filtered = filtered.filter(car => car.fuel_type.toLowerCase() === fuelTypeFilter.toLowerCase());
    }

    setFilteredCars(filtered);
    setCurrentPage(1);  // Reset to first page on filter change
  }, [searchQuery, yearFilter, cylindersFilter, fuelTypeFilter, cars]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  // Data to display on the current page
  const paginatedData = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Paper className="container mx-auto p-4" elevation={3}>
      <Typography variant="h4" gutterBottom>
        Car List
      </Typography>

      {/* Search and Filter Controls */}
     <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px",
    justifyContent: "center",
  }}
>
  <TextField
    label="Search by Model"
    variant="outlined"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ minWidth: "200px", flex: "1 1 200px" }}
  />

  <TextField
    label="Filter by Year"
    type="number"
    variant="outlined"
    value={yearFilter}
    onChange={(e) => setYearFilter(e.target.value)}
    style={{ minWidth: "200px", flex: "1 1 200px" }}
  />

  <TextField
    label="Filter by Cylinders"
    type="number"
    variant="outlined"
    value={cylindersFilter}
    onChange={(e) => setCylindersFilter(e.target.value ? parseInt(e.target.value) : "")}
    style={{ minWidth: "200px", flex: "1 1 200px" }}
  />

  <FormControl variant="outlined" style={{ minWidth: "200px", flex: "1 1 200px" }}>
    <InputLabel>Fuel Type</InputLabel>
    <Select
      value={fuelTypeFilter}
      onChange={(e) => setFuelTypeFilter(e.target.value)}
      label="Fuel Type"
    >
      <MenuItem value="">All Fuel Types</MenuItem>
      <MenuItem value="gas">Gas</MenuItem>
      <MenuItem value="diesel">Diesel</MenuItem>
      <MenuItem value="electric">Electric</MenuItem>
      <MenuItem value="hybrid">Hybrid</MenuItem>
    </Select>
  </FormControl>
</div>

      {/* Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Cylinders</TableCell>
              <TableCell>Displacement</TableCell>
              <TableCell>Drive</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>City MPG</TableCell>
              <TableCell>Highway MPG</TableCell>
              <TableCell>Combined MPG</TableCell>
              <TableCell>Transmission</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((car, index) => (
              <TableRow key={index} hover>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.cylinders}</TableCell>
                <TableCell>{car.displacement}</TableCell>
                <TableCell>{car.drive}</TableCell>
                <TableCell>{car.fuel_type}</TableCell>
                <TableCell>{car.city_mpg}</TableCell>
                <TableCell>{car.highway_mpg}</TableCell>
                <TableCell>{car.combination_mpg}</TableCell>
                <TableCell>{car.transmission}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    // onClick={() => handleEdit(user.id)}
                    style={{ marginRight: "8px" }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="secondary" >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      />
    </Paper>
  );
};
export default CarList;