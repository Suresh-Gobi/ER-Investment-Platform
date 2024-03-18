import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUploadNicCopy = (event) => {
    // Handle NIC copy upload logic here
  };

  const handleUploadBankBookCopy = (event) => {
    // Handle bank book copy upload logic here
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Account Verification" {...a11yProps(1)} />
          <Tab label="Account Setting" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Content for General tab */}
        <Typography>General Information</Typography>
        {/* Add more fields as needed */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* Content for Account Verification tab */}
        <Typography>Account Verification</Typography>
        <TextField label="Full Name" variant="outlined" />
        <TextField label="Address" variant="outlined" />
        <TextField label="Phone Number" variant="outlined" />
        {/* Add more text fields for other details */}
        <Button variant="outlined" component="label">
          Upload NIC Copy
          <input type="file" hidden onChange={handleUploadNicCopy} />
        </Button>
        <Button variant="outlined" component="label">
          Upload Bank Book Copy
          <input type="file" hidden onChange={handleUploadBankBookCopy} />
        </Button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* Content for Account Setting tab */}
        <Typography>Account Settings</Typography>
        {/* Add account setting options */}
      </CustomTabPanel>
    </Box>
  );
}
