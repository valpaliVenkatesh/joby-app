import './index.css'

import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs,salary
          <br />
          information,company reviews.Find the job that fits your
          <br />
          abilities and potential.
        </p>
        <Link to="/Jobs">
          <button type="button" className="login-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
