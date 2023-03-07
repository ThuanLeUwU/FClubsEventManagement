import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  selectedOption,
  TextField,
  InputAdornment,
  MenuItem,
  SvgIcon, Typography, Select
} from '@mui/material';


import { Search as SearchIcon } from '../../icons/search';


export const CustomerListToolbar = (props) => {
  const options = [
    { label: 'Xavalo',value: 1 },
    { label: 'Hola', value: 2 },
    { label: 'Fuda', value: 3 },
  ];

  const handleChange = (event)  =>{
    // setSelected(event.target.value);
  }

  
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Clubs
        </Typography>
        <Box sx={{ m: 1, paddingRight: '10px' }}>
          <FormControl>
            <Select value={selectedOption} 
            defaultValue={1} 
            onChange={handleChange}>
              {options.map(option => (
                <MenuItem key={option.value} 
                value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};
