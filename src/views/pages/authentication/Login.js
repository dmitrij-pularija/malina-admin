// ** React Imports
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../../@core/components/spinner/Fallback-spinner'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, AlertTriangle, Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import Logo from '@components/logo'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  Modal,
  CardText,
  CardTitle,
  FormFeedback,
  UncontrolledTooltip
} from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'
// import logo from '@src/assets/images/logo/logo.png'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { roles } from '../../../configs/initial' 

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>Вы успешно вошли в CRM как {role}</span>
      </div>
    </div>
  )
}

const ToastError = ({  t, message }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='danger' icon={<AlertTriangle size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>Ошибка</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>{message}</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: '',
  loginEmail: ''
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const [loading, setLoading] = useState(false)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setLoading(true)
        useJwt
        .login({ login: data.loginEmail, password: data.password })
        .then(res => {
          const newAbility = [{action: "manage", subject: "all"}]
          const data = { ...res.data.user, role: roles[res.data.user.type], ability: newAbility, name: res.data.user.name ? res.data.user.name : res.data.user.login.split('@')[0], accessToken: res.data.access, refreshToken: res.data.refresh}
          dispatch(handleLogin(data))
          ability.update(newAbility)
 
          navigate(getHomeRouteForLoggedInUser(data.role))
          toast(t => (
            <ToastContent t={t} role={data.role || 'user'} name={data.name || 'User'} />
          ))
        })
        .catch(err => {setError('password', {
            type: 'manual',
            message: err.response.data.non_field_errors[0]
          })
          toast(t => (
            <ToastError t={t}  message={err.response.data.non_field_errors[0] || 'Не правильное имя пользователя или пароль'} />
          ))
        }
        )
        .finally(() => setLoading(false))
      // useJwt
      //   .login({ email: data.loginEmail, password: data.password })
      //   .then(res => {
      //     const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
      //     dispatch(handleLogin(data))
      //     ability.update(res.data.userData.ability)
      //     navigate(getHomeRouteForLoggedInUser(data.role))
      //     toast(t => (
      //       <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
      //     ))
      //   })
      //   .catch(err => setError('loginEmail', {
      //       type: 'manual',
      //       message: err.response.data.error
      //     })
      //   )
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <>
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
      <Logo />
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
            Вход
            </CardTitle>
            <CardText className='mb-2'>Для начала работы войдите в Ваш аккаунт</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Логин
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='Введите Login'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Пароль
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Забыл пароль?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Запомнить меня
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Войти
              </Button>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p> */}
          </Col>
        </Col>
      </Row>
    </div>
    {loading && <div className='loader'><Spinner /></div>}
    </>
  )
}

export default Login
