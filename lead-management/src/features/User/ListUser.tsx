import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type User = {
  id: number;
  username: string;
  role: string;
  email: string;
};

// Dummy data for demonstration
const dummyUsers: User[] = [
  { id: 1, username: "JohnDoe", role: "Admin", email: "johndoe@example.com" },
  { id: 2, username: "JaneSmith", role: "Editor", email: "janesmith@example.com" },
  { id: 3, username: "BobBrown", role: "Viewer", email: "bobbrown@example.com" },
  { id: 4, username: "AliceJones", role: "Admin", email: "alicejones@example.com" },
  { id: 5, username: "TomWhite", role: "Viewer", email: "tomwhite@example.com" },
  { id: 6, username: "LindaGreen", role: "Editor", email: "lindagreen@example.com" },
  { id: 7, username: "NancyBlue", role: "Admin", email: "nancyblue@example.com" },
  { id: 8, username: "OscarGray", role: "Viewer", email: "oscargray@example.com" },
  { id: 9, username: "PaulaBlack", role: "Editor", email: "paulablack@example.com" },
  { id: 10, username: "DavidBrown", role: "Admin", email: "davidbrown@example.com" },
];

const UserTable: React.FC = () => {
  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleEdit = (id: number) => {
    console.log("Edit user with ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete user with ID:", id);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(dummyUsers.length / rowsPerPage);
  const paginatedData = dummyUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handle page change
  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
    <Paper style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "16px" }}>
      <TableContainer>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>User Role</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>User Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
     
    </Paper>
    <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      />
    </div>
  );
};

export default UserTable;
