// material-ui
import { styled, Theme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

// ==============================|| Loader ||============================== //

const Loader = (): JSX.Element => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

export default Loader;
