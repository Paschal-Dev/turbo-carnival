/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, Box, Stepper, Step, StepLabel,
  FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAppDispatch } from '../store/hooks';
import { submitRegistration } from '../store/registrationSlice';
import { teamEvents, individualEvents, events, type Event } from '../data/events';

const MySwal = withReactContent(Swal);

interface RegistrationFormProps {
  open: boolean;
  onClose: () => void;
  eventId: string | null;
}

interface TeamMember {
  id: string;
  fullName: string;
  age: string;
  sex: string;
}

interface FormData {
  fullName: string;
  dob: string;
  age: string;
  sex: string;
  address: string;
  nationality: string;
  guardianName: string;
  guardianEmail: string;
  email: string;
  phone: string;
  school: string;
  eventType: 'Team' | 'Individual' | '';
  eventName: string;
  additionalInfo: string;
  teamMembers: TeamMember[];
}

export default function RegistrationForm({ open, onClose, eventId }: RegistrationFormProps) {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [event, setEvent] = useState<Event | null>(null);

  const emptyForm: FormData = {
    fullName: '',
    dob: '',
    age: '',
    sex: '',
    address: '',
    nationality: '',
    guardianName: '',
    guardianEmail: '',
    email: '',
    phone: '',
    school: '',
    eventType: '',
    eventName: '',
    additionalInfo: '',
    teamMembers: [],
  };

  const [formData, setFormData] = useState<FormData>(emptyForm);

  // generate unique ID
  const genId = () =>
    typeof crypto !== 'undefined' && (crypto as any).randomUUID
      ? (crypto as any).randomUUID()
      : `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  // Debug logging
  console.log('=== REGISTRATION FORM DEBUG ===');
  console.log('Event ID:', eventId);
  console.log('Event:', event);
  console.log('Current formData:', formData);
  console.log('Active step:', activeStep);

  // Load event info and set initial form data
  useEffect(() => {
    if (eventId) {
      const found = events.find(e => String(e.id) === String(eventId));
      setEvent(found || null);
      
      if (found) {
        console.log('=== EVENT FOUND ===');
        console.log('Found event:', found);
        
        // Check if this is a team event
        const isTeamEvent = teamEvents.some(te => String(te.id) === String(found.id));
        const isIndividualEvent = individualEvents.some(ie => String(ie.id) === String(found.id));
        
        console.log('Is team event:', isTeamEvent);
        console.log('Is individual event:', isIndividualEvent);
        
        const eventType = isTeamEvent ? 'Team' : 'Individual';
        
        console.log('Setting event type to:', eventType);
        
        setFormData(prev => ({
          ...prev,
          eventType: eventType,
          eventName: found.name || ''
        }));
      }
    } else {
      setEvent(null);
    }
  }, [eventId]);

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      setFormData(emptyForm);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (field: keyof FormData) => (e: any) => {
    const val = e.target.value;
    console.log(`Field ${field} changed to:`, val);
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  // TEAM MEMBER HANDLERS
  const handleAddMember = () => {
    console.log('Adding new team member');
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { id: genId(), fullName: '', age: '', sex: '' }],
    }));
  };

  const handleRemoveMember = (id: string) => {
    console.log('Removing team member:', id);
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m.id !== id),
    }));
  };

  const handleMemberChange = (id: string, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(m =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  // VALIDATION
  const validateStep = () => {
    console.log('Validating step:', activeStep);
    
    if (activeStep === 0 && !formData.eventType) {
      MySwal.fire({ icon: 'warning', title: 'Please select an event type first' });
      return false;
    }

    if (activeStep === 1) {
      if (formData.eventType === 'Team') {
        if (!formData.school) {
          MySwal.fire({ icon: 'warning', title: 'Please enter your Team/School name' });
          return false;
        }
        if (formData.teamMembers.length === 0) {
          MySwal.fire({ icon: 'warning', title: 'Please add at least one team member' });
          return false;
        }
        for (const member of formData.teamMembers) {
          if (!member.fullName || !member.age || !member.sex) {
            MySwal.fire({ icon: 'warning', title: 'All team members need full name, age, and sex' });
            return false;
          }
        }
      } else {
        if (!formData.fullName || !formData.email || !formData.phone || !formData.guardianName) {
          MySwal.fire({
            icon: 'warning',
            title: 'Please fill all required fields for individual registration',
          });
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) setActiveStep(s => s + 1);
  };

  const handleBack = () => setActiveStep(s => s - 1);

  const handleSubmit = async () => {
    console.log('=== SUBMITTING FORM ===');
    console.log('Current formData:', formData);
    console.log('Team members:', formData.teamMembers);

    // CRITICAL: Make sure eventType is set correctly
    let finalEventType = formData.eventType;
    
    console.log('Initial eventType from form:', finalEventType);

    // If still not set, determine from context
    if (!finalEventType) {
      console.log('Event type not set in form, determining from context...');
      
      // Check if we have team members
      if (formData.teamMembers.length > 0) {
        finalEventType = 'Team';
        console.log('Setting to Team because we have team members');
      } 
      // Check if event is predefined as team event
      else if (event && teamEvents.some(te => String(te.id) === String(event.id))) {
        finalEventType = 'Team';
        console.log('Setting to Team because event is a team event');
      }
      // Default to Individual
      else {
        finalEventType = 'Individual';
        console.log('Setting to Individual as default');
      }
    }

    // FINAL SAFETY CHECK: If we have team members, it MUST be team event
    if (formData.teamMembers.length > 0 && finalEventType !== 'Team') {
      console.log('FORCING Team event type because we have team members');
      finalEventType = 'Team';
    }

    console.log('Final eventType being sent:', finalEventType);

    // Determine the main name for registration
    let finalFullName = '';
    if (finalEventType === 'Team') {
      finalFullName = formData.school || 'Unnamed Team';
      console.log('Team registration - using team name:', finalFullName);
    } else {
      finalFullName = formData.fullName || 'Anonymous';
      console.log('Individual registration - using person name:', finalFullName);
    }

    const payload = {
      event_id: event?.id ?? null,
      event_title: event?.title ?? '',
      event_name: formData.eventName || event?.name || '',
      event_type: finalEventType,
      full_name: finalFullName,
      email: formData.email ?? '',
      phone: formData.phone ?? '',
      school: formData.school ?? '',
      dob: formData.dob ?? '',
      address: formData.address ?? '',
      sex: formData.sex ?? '',
      nationality: formData.nationality ?? '',
      guardian_name: formData.guardianName ?? '',
      guardian_email: formData.guardianEmail ?? '',
      additional_info: formData.additionalInfo ?? '',
      team_members: formData.teamMembers.map(m => ({
        full_name: m.fullName || '',
        age: m.age || '',
        sex: m.sex || '',
      })),
    };

    console.log('=== FINAL PAYLOAD TO SERVER ===');
    console.log(JSON.stringify(payload, null, 2));

    try {
      const res = await dispatch(submitRegistration(payload)).unwrap();
      console.log('=== SERVER RESPONSE ===');
      console.log(res);

      if (res?.registration_number) {
        MySwal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          html: `
            <div>
              <p>Your registration has been submitted successfully!</p>
              <p><strong>Registration Number:</strong> ${res.registration_number}</p>
              <p><strong>Event Type:</strong> ${res.event_type}</p>
              ${res.team_id ? `<p><strong>Team ID:</strong> ${res.team_id}</p>` : ''}
              ${res.debug ? `<p><strong>Debug Info:</strong><br/>
                Received: ${res.debug.received_event_type}<br/>
                Final: ${res.debug.final_event_type}<br/>
                Team Members: ${res.debug.team_members_count}
              </p>` : ''}
            </div>
          `,
        });
        onClose();
        setActiveStep(0);
        setFormData(emptyForm);
      } else {
        MySwal.fire({ icon: 'error', title: 'Registration failed' });
      }
    } catch (err: any) {
      console.log('=== REGISTRATION ERROR ===');
      console.log(err);
      MySwal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: err?.message || 'Please try again later',
      });
    }
  };

  const steps = ['Event Type', 'Details', 'Review & Submit'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Select Event Type</Typography>
            <FormControl fullWidth required>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={formData.eventType}
                label="Event Type"
                onChange={e => {
                  const newEventType = e.target.value as 'Team' | 'Individual' | '';
                  console.log('User manually selected event type:', newEventType);
                  setFormData(prev => ({
                    ...prev,
                    eventType: newEventType,
                    teamMembers: newEventType === 'Team' ? prev.teamMembers : [],
                  }));
                }}
              >
                <MenuItem value="Team">Team Event</MenuItem>
                <MenuItem value="Individual">Individual Event</MenuItem>
              </Select>
            </FormControl>
            {formData.eventType && (
              <Typography color="primary" sx={{ mt: 1, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                Selected: <strong>{formData.eventType} Event</strong>
                {event && (
                  <><br/>Event: <strong>{event.title}</strong></>
                )}
              </Typography>
            )}
            {!formData.eventType && event && (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Event: <strong>{event.title}</strong>
              </Typography>
            )}
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" color="primary">
              {formData.eventType === 'Team' ? 'Team Registration' : 'Individual Registration'}
            </Typography>
            
            {formData.eventType === 'Team' ? (
              <>
                <TextField 
                  fullWidth 
                  label="Team/School Name" 
                  value={formData.school} 
                  onChange={handleChange('school')} 
                  required 
                  helperText="This will be your team name"
                />
                <TextField fullWidth label="Contact Email" value={formData.email} onChange={handleChange('email')} />
                <TextField fullWidth label="Contact Phone" value={formData.phone} onChange={handleChange('phone')} />
                
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                  Team Members ({formData.teamMembers.length})
                </Typography>
                
                {formData.teamMembers.map((m) => (
                  <Box key={m.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
                    <TextField 
                      label="Full Name" 
                      value={m.fullName} 
                      onChange={e => handleMemberChange(m.id, 'fullName', e.target.value)} 
                      fullWidth 
                      required 
                    />
                    <TextField 
                      label="Age" 
                      value={m.age} 
                      onChange={e => handleMemberChange(m.id, 'age', e.target.value)} 
                      sx={{ width: 100 }} 
                      required 
                    />
                    <FormControl sx={{ width: 120 }} required>
                      <InputLabel>Sex</InputLabel>
                      <Select value={m.sex} label="Sex" onChange={e => handleMemberChange(m.id, 'sex', e.target.value)}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton color="error" onClick={() => handleRemoveMember(m.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button startIcon={<Add />} onClick={handleAddMember} variant="outlined">
                  Add Team Member
                </Button>
              </>
            ) : (
              <>
                <TextField fullWidth label="Full Name" value={formData.fullName} onChange={handleChange('fullName')} required />
                <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange('dob')} />
                <TextField fullWidth label="Age" value={formData.age} onChange={handleChange('age')} />
                <FormControl fullWidth>
                  <InputLabel>Sex</InputLabel>
                  <Select value={formData.sex} label="Sex" onChange={handleChange('sex')}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField fullWidth label="Address" value={formData.address} onChange={handleChange('address')} />
                <TextField fullWidth label="Nationality" value={formData.nationality} onChange={handleChange('nationality')} />
                <TextField fullWidth label="Email" value={formData.email} onChange={handleChange('email')} required />
                <TextField fullWidth label="Phone" value={formData.phone} onChange={handleChange('phone')} required />
                <TextField fullWidth label="School" value={formData.school} onChange={handleChange('school')} />
                <TextField fullWidth label="Parent/Guardian Name" value={formData.guardianName} onChange={handleChange('guardianName')} required />
                <TextField fullWidth label="Guardian Email" value={formData.guardianEmail} onChange={handleChange('guardianEmail')} />
              </>
            )}
            
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Event</InputLabel>
              <Select value={formData.eventName} label="Select Event" onChange={handleChange('eventName')}>
                {(formData.eventType === 'Team' ? teamEvents : individualEvents).map((ev: any) => (
                  <MenuItem key={ev.id} value={ev.name}>{ev.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField 
              fullWidth 
              multiline 
              rows={3} 
              label="Additional Information" 
              value={formData.additionalInfo} 
              onChange={handleChange('additionalInfo')} 
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ lineHeight: 1.8 }}>
            <Typography variant="h6" gutterBottom>Review Your Registration</Typography>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography><strong>Event Type:</strong> {formData.eventType}</Typography>
              <Typography><strong>Event:</strong> {formData.eventName}</Typography>
              {formData.eventType === 'Team' ? (
                <>
                  <Typography><strong>Team Name:</strong> {formData.school}</Typography>
                  <Typography><strong>Contact Email:</strong> {formData.email}</Typography>
                  <Typography><strong>Contact Phone:</strong> {formData.phone}</Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}><strong>Team Members:</strong></Typography>
                  {formData.teamMembers.map((m, index) => (
                    <Typography key={m.id} sx={{ ml: 2 }}>
                      {index + 1}. {m.fullName} (Age: {m.age}, Sex: {m.sex})
                    </Typography>
                  ))}
                </>
              ) : (
                <>
                  <Typography><strong>Name:</strong> {formData.fullName}</Typography>
                  <Typography><strong>Date of Birth:</strong> {formData.dob}</Typography>
                  <Typography><strong>Age:</strong> {formData.age}</Typography>
                  <Typography><strong>Sex:</strong> {formData.sex}</Typography>
                  <Typography><strong>Phone:</strong> {formData.phone}</Typography>
                  <Typography><strong>Email:</strong> {formData.email}</Typography>
                  <Typography><strong>School:</strong> {formData.school}</Typography>
                  <Typography><strong>Guardian:</strong> {formData.guardianName}</Typography>
                </>
              )}
              {formData.additionalInfo && (
                <Typography sx={{ mt: 1 }}><strong>Additional Info:</strong> {formData.additionalInfo}</Typography>
              )}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Register for {event?.title ?? 'Event'}
        {formData.eventType && (
          <Typography variant="subtitle2" color="primary">
            {formData.eventType} Registration
          </Typography>
        )}
      </DialogTitle>
      <Stepper activeStep={activeStep} sx={{ px: 3, pt: 2 }}>
        {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>
      <DialogContent sx={{ mt: 2 }}>{getStepContent(activeStep)}</DialogContent>
      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
        <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
          {activeStep === steps.length - 1 ? 'Submit Registration' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}