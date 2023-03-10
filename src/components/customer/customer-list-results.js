// import { useState } from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import {
//   Avatar,
//   Box,
//   Card,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography
// } from '@mui/material';
// import { getInitials } from '../../utils/get-initials';

// export const CustomerListResults = ({ club, ...rest }) => {
//   const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(0);



  

//   const handleLimitChange = (event) => {
//     setLimit(event.target.value);
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <Card {...rest}>
//       <PerfectScrollbar>
//         <Box sx={{ minWidth: 1050 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
             
//                 <TableCell>
//                   Club Name
//                 </TableCell>
//                 <TableCell>
//                   Email of President
//                 </TableCell>
//                 <TableCell>
//                   Phone of President
//                 </TableCell>
//                 <TableCell>
//                   Phone
//                 </TableCell>
//                 <TableCell>
//                   Registration date
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//           </Table>
//         </Box>
//       </PerfectScrollbar>
//       {/* <TablePagination
//         component="div"
//         onPageChange={handlePageChange}
//         onRowsPerPageChange={handleLimitChange}
//         page={page}
//         rowsPerPage={limit}
//         rowsPerPageOptions={[5, 10, 25]}
//       /> */}
//     </Card>
//   );
// };

// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired
// };
