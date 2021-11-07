import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import makeStyles from '@mui/styles/makeStyles';

import styles from "./styles";

export default function Footer() {
    const classes = makeStyles(styles);

    return (
        <div className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="https://www.aggrostudios.games/">
                    Aggro Studios
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </div>
    );
}
