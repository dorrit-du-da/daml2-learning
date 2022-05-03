import React from "react";
import { makeStyles, createStyles } from '@mui/styles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { StrictTransitionGroupProps } from "semantic-ui-react";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';


type Props = {
  link: string;
  title: string;
  description: string;
  logo: string;
};

const Module: React.FC<Props> = ({ link, title, description, logo}) => {
  const classes = useStyles();

  return (
    <Link to={link}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className={classes.image}
            component="img"
            height="140"
            image={logo}
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Module;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    fixed: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "240px",
    },
    maincontent: {
      flexGrow: 1,
      padding: 20,
    },
    titlepad: {
      paddingBottom: 20,
    },
    image :{
      background: "black"
    }
  })
);
