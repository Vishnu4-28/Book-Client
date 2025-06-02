// import React, { useState } from 'react';
// import { 
//   AppBar, 
//   Toolbar, 
//   Button, 
//   Typography, 
//   Container, 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   CardActions, 
//   TextField, 
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Slide,
//   Fade,
//   Paper
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import { 
//   Mail as MailIcon, 
//   Phone as PhoneIcon, 
//   LocationOn as LocationIcon, 
//   Menu as MenuIcon, 
//   Close as CloseIcon,
//   Facebook as FacebookIcon,
//   Instagram as InstagramIcon,
//   Twitter as TwitterIcon,
//   CheckCircle as CheckCircleIcon
// } from '@mui/icons-material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import './Login.css';

// // Custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#d32f2f', // Deep red
//     },
//     secondary: {
//       main: '#388e3c', // Green
//     },
//     background: {
//       default: '#fff9f5', // Soft peach
//     }
//   },
//   typography: {
//     fontFamily: "'Montserrat', sans-serif",
//     h1: {
//       fontWeight: 700,
//       fontSize: '3.5rem',
//     },
//     h2: {
//       fontWeight: 700,
//       fontSize: '2.5rem',
//       marginBottom: '1.5rem',
//     },
//     h3: {
//       fontWeight: 600,
//       fontSize: '1.8rem',
//     }
//   }
// });

// // Menu items data
// const menuItems = [
//   {
//     id: 1,
//     title: "Corporate Events",
//     description: "Professional catering for business meetings, conferences, and corporate gatherings.",
//     price: "$25 per person",
//     image: "corporate"
//   },
//   {
//     id: 2,
//     title: "Wedding Banquets",
//     description: "Elegant wedding receptions with customizable menus and impeccable service.",
//     price: "$45 per person",
//     image: "wedding"
//   },
//   {
//     id: 3,
//     title: "Social Gatherings",
//     description: "Casual catering for birthdays, anniversaries, and family celebrations.",
//     price: "$20 per person",
//     image: "social"
//   },
//   {
//     id: 4,
//     title: "Gourmet Boxed Lunches",
//     description: "Delicious and convenient boxed lunches for meetings and events.",
//     price: "$15 per person",
//     image: "boxed"
//   },
// ];

// function BookInventoryLogin() {
//  const [activeSection, setActiveSection] = useState('home');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     eventType: '',
//     guests: '',
//     message: ''
//   });
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name as string]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setSnackbarOpen(true);
//     setFormData({
//       name: '',
//       email: '',
//       eventType: '',
//       guests: '',
//       message: ''
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div className="app">
//         {/* AppBar and Toolbar remain the same */}

//         {/* Hero Section - Fixed */}
//         {activeSection === 'home' && (
//           <div className="hero-section">
//             <Container>
//               <div className="hero-content">
//                 <Fade in={true} timeout={1000}>
//                   <div>
//                     <Typography variant="h1" className="hero-title">
//                       Exquisite Catering for <br />Every Occasion
//                     </Typography>
//                     <Button 
//                       variant="contained" 
//                       color="secondary" 
//                       size="large" 
//                       className="hero-btn"
//                       onClick={() => setActiveSection('contact')}
//                     >
//                       Request a Quote
//                     </Button>
//                   </div>
//                 </Fade>
//               </div>
//             </Container>
//           </div>
//         )}

//         {/* Main Content - Fixed Grid usage */}
//         <Container className="main-content">
//           {activeSection === 'home' ? (
//             <>
//               {/* Services Section - Fixed Grid */}
//               <section className="section services-section">
//                 <Typography variant="h2" align="center" gutterBottom>
//                   Our Catering Services
//                 </Typography>
                
//                 <Grid container spacing={4} className="services-grid">
//                   {menuItems.map((item) => (
//                     // Removed item={true} prop
//                     <Grid item xs={12} sm={6} md={3} key={item.id}>
//                       <Card className="service-card">
//                         <div className={`card-image ${item.image}`}></div>
//                         <CardContent>
//                           <Typography gutterBottom variant="h5">
//                             {item.title}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {item.description}
//                           </Typography>
//                         </CardContent>
//                         <CardActions className="card-actions">
//                           <Typography variant="body1" color="primary">
//                             {item.price}
//                           </Typography>
//                           <Button size="small" color="primary">
//                             Learn More
//                           </Button>
//                         </CardActions>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </section>
              
//               {/* About Section - Fixed Grid */}
//               <section className="section about-section">
//                 <Grid container spacing={6} alignItems="center">
//                   <Grid item xs={12} md={6}>
//                     <div className="about-image"></div>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="h2" gutterBottom>
//                       About Our Catering
//                     </Typography>
//                     {/* ... content ... */}
//                   </Grid>
//                 </Grid>
//               </section>
              
//               {/* Testimonials - Fixed Grid */}
//               <section className="section testimonials-section">
//                 <Typography variant="h2" align="center" gutterBottom>
//                   What Our Clients Say
//                 </Typography>
//                 <Grid container spacing={4}>
//                   <Grid item xs={12} md={4}>
//                     <Paper className="testimonial">
//                       {/* ... content ... */}
//                     </Paper>
//                   </Grid>
//                   {/* ... other testimonials ... */}
//                 </Grid>
//               </section>
//             </>
//           ) : (
//             /* Contact Us Section - Fixed Grid */
//             <section className="section contact-section">
//               <Typography variant="h2" align="center" gutterBottom>
//                 Contact Us
//               </Typography>
              
//               <Grid container spacing={6}>
//                 <Grid item xs={12} md={6}>
//                   <Paper className="contact-form" elevation={3}>
//                     {/* ... form content ... */}
//                   </Paper>
//                 </Grid>
                
//                 <Grid item xs={12} md={6}>
//                   <Paper className="contact-info" elevation={3}>
//                     {/* ... contact info ... */}
//                   </Paper>
//                 </Grid>
//               </Grid>
//             </section>
//           )}
//         </Container>

//         {/* Footer - Fixed Grid */}
//         <footer className="footer">
//           <Container>
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={4}>
//                 {/* ... content ... */}
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 {/* ... content ... */}
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 {/* ... content ... */}
//               </Grid>
//             </Grid>
//           </Container>
//         </footer>
        
//         {/* ... Snackbar ... */}
//       </div>
//     </ThemeProvider>
//   );
// }
// export default BookInventoryLogin;