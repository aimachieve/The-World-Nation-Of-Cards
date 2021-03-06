import { capitalCase } from 'change-case'
import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@material-ui/core/styles'
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
  Button,
} from '@material-ui/core'
// routes
import { PATH_AUTH, PATH_USER } from '../../routes/paths'
// hooks
import useAuth from '../../hooks/useAuth'
// layouts
import AuthLayout from '../../layouts/AuthLayout'
// components
import Page from '../../components/Page'
import { MHidden } from '../../components/@material-extend'
import { LoginForm } from '../../components/authentication/login'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    backgroundImage: 'url(/images/auth-background.png)',
    height: '100vh',
  },
}))

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3, 6),
  backgroundColor: '#202125',
  color: 'white',
}))

// ----------------------------------------------------------------------

export default function Login() {
  const { method, login } = useAuth()

  const handleLoginAuth0 = async () => {
    try {
      await login()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <RootStyle title="Login | Minimal-UI">
      <Container maxWidth="sm" sx={{ margin: 'auto' }}>
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 0 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h2"
                sx={{ textAlign: 'center', fontWeight: '400' }}
              >
                LOGIN
              </Typography>
            </Box>
          </Stack>

          <LoginForm />
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don???t have an account?&nbsp;
            <Link
              sx={{ color: '#2fc557' }}
              component={RouterLink}
              to={PATH_AUTH.register}
            >
              Sign Up
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link
              sx={{ color: '#2fc557' }}
              component={RouterLink}
              to={PATH_USER.home}
            >
              Go home
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
