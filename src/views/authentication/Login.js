// ** React Imports
import { useContext, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import CustomButton from "@customComponents/CustomButton"
import CustomInput from "@customComponents/CustomInput"
import FormikProvider from "@src/context/formik"
import { useFormik } from "formik"
import * as Yup from "yup"

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title fw-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)


const Login = () => {
  // ** Hooks
  const { skin } = useSkin()

  const loginSchema = Yup.object().shape({
    email: Yup.string()
    .required("Required")
    .email("Invalid Email"),
    password: Yup.string()
    .required("Required")
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {

    }
  })

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <h2 className='brand-text text-primary ms-1'>Vuexy</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={""} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Vuexy! 👋
            </CardTitle>
            {/* <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}
            <FormikProvider formik={{...formik, isLoading: ""}} >
            <Form className='auth-login-form mt-2'>
              <div className='mb-1'>
               <CustomInput 
               name="email"
               label="Email"
               placeholder="example@example.com"
               />
              </div>
              <div className='mb-1'>
              <CustomInput
              type="password" 
               name="password"
               label="Password"
               placeholder="********"
               />
               <div className='d-flex justify-content-end'>
               <Link style={{textAlign: "right", marginTop: 10, fontSize: "0.9rem"}} to={"/forgot-password"} >
                Forgot Password ?
               </Link>
               </div>
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <CustomButton type='submit' color='primary' block>
                Sign in
              </CustomButton>
            </Form>
            </FormikProvider>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
