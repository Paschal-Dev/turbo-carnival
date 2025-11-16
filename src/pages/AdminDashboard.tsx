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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { Logout, Refresh, Delete, Edit } from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

/**
 * Admin Dashboard
 * - fetches registrations from backend
 * - separates individual and team registrations
 * - shows totals, gender counts, event distribution
 * - supports export CSV, delete and edit (basic)
 */

// helper to format date safely
const fmtDate = (d?: string) => {
  try {
    return d ? new Date(d).toLocaleString() : "-";
  } catch {
    return d || "-";
  }
};

// CSV exporter
const exportToCSVBlob = (rows: any[], filename: string) => {
  if (!rows || rows.length === 0) {
    alert("No data to export");
    return;
  }
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map(r => headers.map(h => {
      const v = r[h] ?? "";
      // escape double quotes
      return `"${String(v).replace(/"/g, '""')}"`;
    }).join(","))
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teamRegs, setTeams] = useState<any[]>([]);
  const [individualRegs, setIndividuals] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // edit dialog
  const [editing, setEditing] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  // determine greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const API_BASE = (import.meta.env.VITE_API_URL || "https://goldstreamacademy.com/goldstream-backend") + "/api";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const resp = await fetch(`${API_BASE}/get_registrations.php`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (resp.status === 401) {
        // unauthorized - send to login
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }

      const json = await resp.json();

      if (!json || json.success !== true) {
        throw new Error(json?.error || json?.message || "Invalid response");
      }

      const registrations = json.data || [];

      // separate individuals and teams
      const individuals = registrations.filter((r: any) => !r.team_members || r.team_members.length === 0);
      const teams = registrations.filter((r: any) => r.team_members && r.team_members.length > 0);

      setIndividuals(individuals);
      setTeams(teams);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err?.message || "Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Delete registration (and its team members)
  const handleDelete = async (registrationId: number) => {
    if (!confirm("Delete this registration? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/delete_registration.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: registrationId })
      });
      const j = await res.json();
      if (j?.ok) {
        alert("Deleted");
        fetchData();
      } else {
        alert("Delete failed: " + (j?.error || j?.message || JSON.stringify(j)));
      }
    } catch (e: any) {
      console.error(e);
      alert("Delete failed: " + e?.message);
    }
  };

  // open edit dialog
  const openEdit = (reg: any) => {
    setEditing(reg);
    // create a shallow copy for editing
    setEditForm({
      id: reg.id,
      full_name: reg.full_name,
      email: reg.email,
      phone: reg.phone,
      school: reg.school,
      event_title: reg.event_title,
      event_category: reg.event_category,
    });
  };

  // submit edit
  const submitEdit = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/edit_registration.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editForm)
      });
      const j = await res.json();
      if (j?.ok) {
        setEditing(null);
        fetchData();
        alert("Updated");
      } else {
        alert("Update failed: " + (j?.error || j?.message || JSON.stringify(j)));
      }
    } catch (e: any) {
      console.error(e);
      alert("Update failed: " + e?.message);
    }
  };

  // charts data
  const genderCounts = (() => {
    let male = 0, female = 0, other = 0;
    // from registrations
    const all = [...individualRegs, ...teamRegs];
    for (const r of all) {
      const s = (r.sex ?? "").toString().toLowerCase();
      if (s === "male" || s === "m") male++;
      else if (s === "female" || s === "f") female++;
      else other++;
      // add team_members sexes too
      if (r.team_members && Array.isArray(r.team_members)) {
        for (const m of r.team_members) {
          const ms = (m.sex ?? "").toString().toLowerCase();
          if (ms === "male" || ms === "m") male++;
          else if (ms === "female" || ms === "f") female++;
          else other++;
        }
      }
    }
    return [
      { name: "Male", value: male },
      { name: "Female", value: female },
      { name: "Other", value: other }
    ];
  })();

  const eventDistribution = (() => {
    const map: Record<string, number> = {};
    const all = [...individualRegs, ...teamRegs];
    for (const r of all) {
      // prefer event_name property, fallback to event_title or event_category
      const ev = (r.event_name || r.event_title || r.event_category || "Unknown").toString();
      map[ev] = (map[ev] || 0) + 1;
    }
    return Object.keys(map).map(k => ({ event: k, count: map[k] }));
  })();

  // colors for pie
  const COLORS = ["#1976d2", "#d32f2f", "#9e9e9e"];

  const totalCount = individualRegs.length + teamRegs.length;

  // Export helpers
  const exportIndividualsCSV = () => {
    // flatten members out of team, ensure schema consistency
    exportToCSVBlob(individualRegs.map(r => ({
      registration_number: r.registration_number,
      full_name: r.full_name,
      email: r.email,
      phone: r.phone,
      school: r.school,
      event: (r.event_name || r.event_title || r.event_category),
      created_at: r.created_at
    })), "individual_registrations");
  };

  const exportTeamsCSV = () => {
    // For teams - include team members in one CSV field (JSON)
    exportToCSVBlob(teamRegs.map(r => ({
      registration_number: r.registration_number,
      team_name: r.team_name || r.school || r.full_name,
      event: (r.event_name || r.event_title || r.event_category),
      member_count: (r.team_members || []).length,
      members: JSON.stringify((r.team_members || []).map((m: any) => ({ name: m.full_name, age: m.age, sex: m.sex }))),
      created_at: r.created_at
    })), "team_registrations");
  };

  const exportAll = () => {
    const combined = [
      ...individualRegs.map((r) => ({ type: "Individual", id: r.id, name: r.full_name, email: r.email, phone: r.phone, school: r.school, event: (r.event_name || r.event_title || r.event_category), created_at: r.created_at })),
      ...teamRegs.map((r) => ({ type: "Team", id: r.id, name: r.team_name || r.school || r.full_name, event: (r.event_name || r.event_title || r.event_category), members: JSON.stringify((r.team_members || []).map((m: any) => `${m.full_name} (${m.age}, ${m.sex})`)), created_at: r.created_at })),
    ];
    exportToCSVBlob(combined, "all_registrations");
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
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Goldstream Academy Admin
          </Typography>
          <Button color="inherit" startIcon={<Refresh />} onClick={handleRefresh} sx={{ mr: 2 }}>
            Refresh
          </Button>
          <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Welcome */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            {greeting}, Admin! 👋
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Welcome to your registrations dashboard
          </Typography>
          <Typography color="text.secondary">
            Total Registrations: {totalCount} (Individual: {individualRegs.length}, Team: {teamRegs.length})
          </Typography>
        </Box>

        {error && (
          <Box sx={{ textAlign: "center", mb: 3, p: 2, bgcolor: "error.light", borderRadius: 1 }}>
            <Typography color="error" gutterBottom>{error}</Typography>
            <Button variant="contained" onClick={fetchData}>Retry</Button>
          </Box>
        )}

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
          <Card sx={{ flex: 1, p: 1 }}>
            <CardContent>
              <Typography variant="h6">Gender Breakdown</Typography>
              <Box sx={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={genderCounts} dataKey="value" nameKey="name" outerRadius={80} label>
                      {genderCounts.map((_entry, idx) => (
                        <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 2, p: 1 }}>
            <CardContent>
              <Typography variant="h6">Event Distribution</Typography>
              <Box sx={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={eventDistribution}>
                    <XAxis dataKey="event" height={60} interval={0} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* Individuals */}
        {individualRegs.length > 0 && (
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">Individual Registrations ({individualRegs.length})</Typography>
                <Box>
                  <Button variant="outlined" onClick={exportIndividualsCSV} sx={{ mr: 1 }}>Export Individuals</Button>
                </Box>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Reg No</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>School</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>Registered</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {individualRegs.map((r, i) => (
                    <TableRow key={r.id || i} hover>
                      <TableCell>{r.registration_number}</TableCell>
                      <TableCell>{r.full_name}</TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.phone}</TableCell>
                      <TableCell>{r.school}</TableCell>
                      <TableCell>{r.event_name || r.event_title || r.event_category}</TableCell>
                      <TableCell>{fmtDate(r.created_at)}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => openEdit(r)}><Edit /></IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(r.id)}><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Teams */}
        {teamRegs.length > 0 && (
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">Team Registrations ({teamRegs.length})</Typography>
                <Box>
                  <Button variant="outlined" onClick={exportTeamsCSV} sx={{ mr: 1 }}>Export Teams</Button>
                </Box>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Reg No</TableCell>
                    <TableCell>Team/School</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell>Registered</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamRegs.map((r, i) => (
                    <TableRow key={r.id || i} hover>
                      <TableCell>{r.registration_number}</TableCell>
                      <TableCell>{r.team_name || r.school || r.full_name}</TableCell>
                      <TableCell>{r.event_name || r.event_title || r.event_category}</TableCell>
                      <TableCell>
                        {r.team_members && r.team_members.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: 18 }}>
                            {r.team_members.map((m: any, idx: number) => (
                              <li key={idx}>{m.full_name} ({m.age || "-"}, {m.sex || "-"})</li>
                            ))}
                          </ul>
                        ) : "No members"}
                      </TableCell>
                      <TableCell>{fmtDate(r.created_at)}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => openEdit(r)}><Edit /></IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(r.id)}><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {(individualRegs.length > 0 || teamRegs.length > 0) && (
          <Box sx={{ textAlign: "center", mt: 3, mb: 4 }}>
            <Button variant="outlined" size="large" onClick={exportAll}>Export All Data (Combined CSV)</Button>
          </Box>
        )}
      </Container>

      {/* Edit dialog */}
      <Dialog open={!!editing} onClose={() => setEditing(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Registration</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField label="Full name" value={editForm.full_name || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, full_name: e.target.value }))} />
            <TextField label="Email" value={editForm.email || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, email: e.target.value }))} />
            <TextField label="Phone" value={editForm.phone || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, phone: e.target.value }))} />
            <TextField label="School/Team" value={editForm.school || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, school: e.target.value }))} />
            <TextField label="Event Title" value={editForm.event_title || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, event_title: e.target.value }))} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button variant="contained" onClick={submitEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
