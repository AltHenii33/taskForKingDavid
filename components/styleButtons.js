import { makeStyles, createStyles } from '@material-ui/core/styles';
import Theme from './theme'

export const useStyles = makeStyles((Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: Theme.spacing(1),
      },
    },
  }),
);  