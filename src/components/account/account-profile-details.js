import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';


export const AccountProfileDetails = ({userInf}) => {
 


 

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
    >   
      <Card>
      <CardHeader
        subheader="The information can be edited"
        title="Profile"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              fullWidth
              helperText="Please specify the full name"
              label="Full name"
              onChange={handleChange}
              required
              value={userInf.name}
              variant="outlined"
            />
          </Grid>
         
       
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={userInf.email}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              onChange={handleChange}
              type="number"
              value={userInf.phone}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Address"
              name="address"
              required
              value={userInf.address}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            {/* <TextField
              fullWidth
              label="Select State"
              name="state"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.state}
              variant="outlined"
            >
              {states.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField> */}
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
        >
          Save details
        </Button>
      </Box>
    </Card>
      
    </form>
  );
};
