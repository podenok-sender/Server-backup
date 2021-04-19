const {
  AppBar,
  colors,
  Avatar,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  createMuiTheme,
  Box,
  Grid,
  makeStyles,
  Button,
  SvgIcon,
  FormControlLabel,
  Checkbox,
  TextField,
  Link } =
MaterialUI;

// Create a theme instance.

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6" },

    secondary: {
      main: "#19857b" },

    error: {
      main: colors.red.A400 },

    background: {
      default: "#fff" } } });




const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center" },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3) },

  submit: {
    margin: theme.spacing(3, 0, 2) } }));



function ProTip() {
  const classes = useStyles();
  return /*#__PURE__*/(
    React.createElement(Typography, { className: classes.root, color: "textSecondary" }, /*#__PURE__*/
    React.createElement(LightBulbIcon, { className: classes.lightBulb }), "Pro tip: See more",
    " ", /*#__PURE__*/
    React.createElement(Link, { href: "https://material-ui.com/getting-started/templates/" }, "templates"),

    " ", "on the Material-UI documentation."));



}

function Copyright() {
  return /*#__PURE__*/(
    React.createElement(Typography, { variant: "body2", color: "textSecondary", align: "center" },
    "Copyright © ", /*#__PURE__*/
    React.createElement(Link, { color: "inherit", href: "https://material-ui.com/" }, "Your Website"),

    " ",
    new Date().getFullYear(),
    "."));


}

function App() {
  const classes = useStyles();

  return /*#__PURE__*/(
    React.createElement(Container, { component: "main", maxWidth: "xs" }, /*#__PURE__*/
    React.createElement(CssBaseline, null), /*#__PURE__*/
    React.createElement("div", { className: classes.paper }, /*#__PURE__*/
    React.createElement(Avatar, { className: classes.avatar }), /*#__PURE__*/
    React.createElement(Typography, { component: "h1", variant: "h5" }, "Sign up"), /*#__PURE__*/


    React.createElement("form", { className: classes.form, noValidate: true }, /*#__PURE__*/
    React.createElement(Grid, { container: true, spacing: 2 }, /*#__PURE__*/
    React.createElement(Grid, { item: true, xs: 12, sm: 6 }, /*#__PURE__*/
    React.createElement(TextField, {
      autoComplete: "fname",
      name: "firstName",
      variant: "outlined",
      required: true,
      fullWidth: true,
      id: "firstName",
      label: "First Name",
      autoFocus: true })), /*#__PURE__*/


    React.createElement(Grid, { item: true, xs: 12, sm: 6 }, /*#__PURE__*/
    React.createElement(TextField, {
      variant: "outlined",
      required: true,
      fullWidth: true,
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      autoComplete: "lname" })), /*#__PURE__*/


    React.createElement(Grid, { item: true, xs: 12 }, /*#__PURE__*/
    React.createElement(TextField, {
      variant: "outlined",
      required: true,
      fullWidth: true,
      id: "email",
      label: "Email Address",
      name: "email",
      autoComplete: "email" })), /*#__PURE__*/


    React.createElement(Grid, { item: true, xs: 12 }, /*#__PURE__*/
    React.createElement(TextField, {
      variant: "outlined",
      required: true,
      fullWidth: true,
      name: "password",
      label: "Password",
      type: "password",
      id: "password",
      autoComplete: "current-password" })), /*#__PURE__*/


    React.createElement(Grid, { item: true, xs: 12 }, /*#__PURE__*/
    React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Checkbox, { value: "allowExtraEmails", color: "primary" }),
      label: "I want to receive inspiration, marketing promotions and updates  via email." }))), /*#__PURE__*/



    React.createElement(Button, {
      type: "submit",
      fullWidth: true,
      variant: "contained",
      color: "primary",
      className: classes.submit }, "Sign Up"), /*#__PURE__*/



    React.createElement(Grid, { container: true, justify: "flex-end" }, /*#__PURE__*/
    React.createElement(Grid, { item: true }, /*#__PURE__*/
    React.createElement(Link, { href: "#", variant: "body2" }, "Already have an account? Sign in"))))), /*#__PURE__*/






    React.createElement(Box, { mt: 5 }, /*#__PURE__*/
    React.createElement(Copyright, null))));



}

ReactDOM.render( /*#__PURE__*/
React.createElement(ThemeProvider, { theme: theme }, /*#__PURE__*/

React.createElement(CssBaseline, null), /*#__PURE__*/
React.createElement(App, null)),

document.querySelector("#root"));