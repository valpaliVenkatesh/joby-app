import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {HiExternalLink} from 'react-icons/hi'
import {BsBriefcase} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobDetails: {},
    skills: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTheDetails()
  }

  getTheDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = formattedData
      const formattedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        title: jobDetails.title,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
      }
      const formattedSimilarJobDetails = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const {skills} = formattedJobDetails
      const formattedSkills = skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: formattedJobDetails,
        similarJobDetails: formattedSimilarJobDetails,
        skills: formattedSkills,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  theSuccessStatus = () => {
    const {jobDetails, skills, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      title,
      rating,
    } = jobDetails

    const formattedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    const {description, imageUrl} = formattedLifeAtCompany

    return (
      <li className="job-details-background">
        <div className="jobs-card-background">
          <div className="role-rating-section">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="title-name">{title}</h1>
              <div className="rating-class">
                <AiFillStar fill="yellow" />
                <p className="rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="package-class">
            <div className="location-type-section">
              <GoLocation />
              <p className="location">{location}</p>
              <BsBriefcase />
              <p className="location">{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="hl" />
          <div className="company-url-container">
            <h1 className="discr-word">Description</h1>
            <div className="company-url-container">
              <a className="link-button" href={companyWebsiteUrl}>
                Visit
                <HiExternalLink fill="white" className="link-icon" />
              </a>
            </div>
          </div>

          <p>{jobDescription}</p>
          <div>
            <h1>Skills</h1>
            <ul className="skills-list">
              {skills.map(each => (
                <li className="skill-list-item" key={each.name}>
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="company-logo"
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1>Life at Company</h1>
          <div className="company-description-container">
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similar-job-items-container">
          {similarJobDetails.map(each => (
            <SimilarJobItem similarJobDetails={each} key={each.id} />
          ))}
        </ul>
      </li>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getTheDetails}>
        Retry
      </button>
    </div>
  )

  renderTheDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.theSuccessStatus()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return 'none'
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderTheDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
