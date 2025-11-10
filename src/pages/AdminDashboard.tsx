/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { Logout, Refresh } from "@mui/icons-material";

// Direct API call function (bypass Redux)

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teamRegs, setTeams] = useState<any[]>([]);
  const [individualRegs, setIndividuals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // determine greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    console.log('🔄 Fetching data directly from backend...');
    
    // Use direct backend URL instead of proxy
    const res = await fetch('http://localhost/goldstream-backend/api/get_registrations.php', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const text = await res.text();
    console.log('📄 Raw backend response:', text);
    
    const data = JSON.parse(text);
    console.log('🔍 Parsed backend data:', data);
    
    if (data.success) {
      const registrations = data.data || [];
      console.log('✅ Data loaded:', registrations.length, 'registrations');
      
      // Separate individual and team registrations
      const individuals = registrations.filter((r: any) => 
        !r.team_members || r.team_members.length === 0
      );
      const teams = registrations.filter((r: any) => 
        r.team_members && r.team_members.length > 0
      );
      
      console.log('👤 Individuals:', individuals.length);
      console.log('👥 Teams:', teams.length);
      
      setIndividuals(individuals);
      setTeams(teams);
    } else {
      setError(data.error || 'Failed to load data');
    }
  } catch (err: any) {
    console.error('❌ Fetch error:', err);
    setError("Failed to load registrations: " + err.message);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      alert('No data to export!');
      return;
    }
    
    const cleanData = data.map(row => {
      const cleanRow = { ...row };
      delete cleanRow.team_members;
      return cleanRow;
    });
    
    const headers = Object.keys(cleanData[0]);
    const csv = [
      headers.join(","),
      ...cleanData.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportAll = () => {
    const combined = [
      ...individualRegs.map((r) => ({ ...r, record_type: "Individual" })),
      ...teamRegs.map((r) => ({ ...r, record_type: "Team" })),
    ];
    
    if (combined.length === 0) {
      alert('No data to export!');
      return;
    }
    
    exportToCSV(combined, "all_registrations");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2
        }}
      >
        <CircularProgress />
        <Typography>Loading registrations...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with Logout */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Goldstream Academy Admin
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<Refresh />}
            onClick={handleRefresh}
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>
          <Button 
            color="inherit" 
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Welcome Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {greeting}, Admin! 👋
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Welcome to your dashboard
          </Typography>
          <Typography color="text.secondary">
            Total Registrations: {individualRegs.length + teamRegs.length} 
            (Individual: {individualRegs.length}, Team: {teamRegs.length})
          </Typography>
        </Box>

        {error && (
          <Box sx={{ textAlign: "center", mb: 3, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
            <Typography color="error" gutterBottom>{error}</Typography>
            <Button variant="contained" onClick={fetchData}>
              Retry
            </Button>
          </Box>
        )}

        {/* Show empty state if no data */}
        {individualRegs.length === 0 && teamRegs.length === 0 && !error && (
          <Box sx={{ textAlign: "center", mb: 3, p: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Registrations Found
            </Typography>
            <Typography color="text.secondary">
              There are currently no registrations in the database.
            </Typography>
          </Box>
        )}

        {/* ===== Individual Registrations ===== */}
        {individualRegs.length > 0 && (
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">
                  Individual Registrations ({individualRegs.length})
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => exportToCSV(individualRegs, "individual_registrations")}
                >
                  Export Individuals
                </Button>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Full Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>School</strong></TableCell>
                    <TableCell><strong>Event Category</strong></TableCell>
                    <TableCell><strong>Registered</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {individualRegs.map((r, i) => (
                    <TableRow key={i} hover>
                      <TableCell>{r.full_name}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.phone}</TableCell>
                      <TableCell>{r.school}</TableCell>
                      <TableCell>{r.event_category}</TableCell>
                      <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* ===== Team Registrations ===== */}
        {teamRegs.length > 0 && (
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">
                  Team Registrations ({teamRegs.length})
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => exportToCSV(teamRegs, "team_registrations")}
                >
                  Export Teams
                </Button>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Team/School</strong></TableCell>
                    <TableCell><strong>Event</strong></TableCell>
                    <TableCell><strong>Members</strong></TableCell>
                    <TableCell><strong>Registered</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamRegs.map((r, i) => (
                    <TableRow key={i} hover>
                      <TableCell>{r.team_name || r.school}</TableCell>
                      <TableCell>{r.event_title}</TableCell>
                      <TableCell>
                        {r.team_members && r.team_members.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {r.team_members.map((m: any, idx: number) => (
                              <li key={idx}>
                                {m.full_name} ({m.age}, {m.sex})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "No members"
                        )}
                      </TableCell>
                      <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* ===== Export All ===== */}
        {(individualRegs.length > 0 || teamRegs.length > 0) && (
          <Box sx={{ textAlign: "center", mt: 3, mb: 4 }}>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={exportAll}
            >
              Export All Data (Combined CSV)
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}