import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
//   FormHelperText
} from '@mui/material';
import { events, type Event } from './events';

interface RegistrationFormProps {
  open: boolean;
  onClose: () => void;
  eventId: string | null;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  ageGroup: string;
  eventCategory: string;
  additionalInfo: string;
}

const RegistrationForm = ({ open, onClose, eventId }: RegistrationFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    school: '',
    ageGroup: '',
    eventCategory: '',
    additionalInfo: ''
  });

  useEffect(() => {
    if (eventId) {
      const foundEvent = events.find(e => e.id === eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId]);

  const handleClose = () => {
    setActiveStep(0);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      school: '',
      ageGroup: '',
      eventCategory: '',
      additionalInfo: ''
    });
    onClose();
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Registration submitted:', { event, formData });
    alert('Registration submitted successfully!');
    handleClose();
  };

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const steps = ['Personal Information', 'Event Details', 'Review & Submit'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.fullName}
              onChange={handleInputChange('fullName')}
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              required
            />
            <TextField
              fullWidth
              label="School Name"
              value={formData.school}
              onChange={handleInputChange('school')}
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Age Group</InputLabel>
              <Select
                value={formData.ageGroup}
                label="Age Group"
                onChange={(e) => setFormData(prev => ({ ...prev, ageGroup: e.target.value }))}
              >
                <MenuItem value="6-8">6-8 years</MenuItem>
                <MenuItem value="9-11">9-11 years</MenuItem>
                <MenuItem value="12-14">12-14 years</MenuItem>
                <MenuItem value="15-17">15-17 years</MenuItem>
              </Select>
            </FormControl>
            
            {event?.category === 'Sports' && (
              <FormControl fullWidth required>
                <InputLabel>Sport Category</InputLabel>
                <Select
                  value={formData.eventCategory}
                  label="Sport Category"
                  onChange={(e) => setFormData(prev => ({ ...prev, eventCategory: e.target.value }))}
                >
                  <MenuItem value="track-field">Track & Field</MenuItem>
                  <MenuItem value="table-tennis">Table Tennis</MenuItem>
                  <MenuItem value="lawn-tennis">Lawn Tennis</MenuItem>
                  <MenuItem value="football">Football</MenuItem>
                  <MenuItem value="basketball">Basketball</MenuItem>
                  <MenuItem value="swimming">Swimming</MenuItem>
                </Select>
              </FormControl>
            )}
            
            {event?.category === 'Arts' && (
              <FormControl fullWidth required>
                <InputLabel>Art Category</InputLabel>
                <Select
                  value={formData.eventCategory}
                  label="Art Category"
                  onChange={(e) => setFormData(prev => ({ ...prev, eventCategory: e.target.value }))}
                >
                  <MenuItem value="singing">Singing</MenuItem>
                  <MenuItem value="dancing">Dancing</MenuItem>
                  <MenuItem value="poetry">Poetry</MenuItem>
                  <MenuItem value="mc-dj">MC/DJ Skills</MenuItem>
                  <MenuItem value="instrumental">Instrumental Music</MenuItem>
                </Select>
              </FormControl>
            )}

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Information"
              value={formData.additionalInfo}
              onChange={handleInputChange('additionalInfo')}
              placeholder="Any special requirements or notes..."
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Registration</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography><strong>Event:</strong> {event?.title}</Typography>
              <Typography><strong>Date:</strong> {event?.date}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography><strong>Name:</strong> {formData.fullName}</Typography>
              <Typography><strong>Email:</strong> {formData.email}</Typography>
              <Typography><strong>Phone:</strong> {formData.phone}</Typography>
              <Typography><strong>School:</strong> {formData.school}</Typography>
              <Typography><strong>Age Group:</strong> {formData.ageGroup}</Typography>
              {formData.eventCategory && (
                <Typography><strong>Category:</strong> {formData.eventCategory}</Typography>
              )}
              {formData.additionalInfo && (
                <Typography><strong>Additional Info:</strong> {formData.additionalInfo}</Typography>
              )}
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" component="div" gutterBottom>
          Register for {event?.title}
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      
      <DialogContent>
        {getStepContent(activeStep)}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          color="primary"
        >
          {activeStep === steps.length - 1 ? 'Submit Registration' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationForm;