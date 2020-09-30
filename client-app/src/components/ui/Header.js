import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { Link as RouterLink} from 'react-router-dom';

import { useAuth } from '../auth/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();

  console.log('rendering header...');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} >
            <Link color="inherit" to="/" component={RouterLink} >Client App</Link>
          </Typography>
          {
            isAuthenticated()
            ? <>
              <Button color="inherit" to="/claims" component={RouterLink} >
                claims
              </Button>
              <Button color="inherit" to="/logout" component={RouterLink} >
                logout
              </Button>
              < />
            : <Button color="inherit" to="/login" component={RouterLink} >
                login
              </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;