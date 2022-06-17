import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import Profile from '../Profile'
import AddFilterSection from '../AddFilterSection'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: '',
    minimumPackage: '',
  }

  componentDidMount() {
    this.getTheDetails()
  }

  getTheDetails = async () => {
    const {employmentType, minimumPackage, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    const {jobs} = data
    if (response.ok) {
      const jobDetails = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: jobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  theSuccessStatus = () => {
    const {jobsList} = this.state
    if (jobsList.length !== 0) {
      return (
        <ul className="job-details-section">
          {jobsList.map(each => (
            <JobItem jobItemDetails={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchJobs = () => {
    this.getTheDetails()
  }

  changingSalaryPreference = value => {
    this.setState({minimumPackage: value}, this.getTheDetails)
  }

  changingEmploymentPreference = employmentList => {
    const trueListDetails = employmentList.filter(each => each.checked === true)
    const includedEmploymentType = trueListDetails.map(
      each => each.employmentTypeId,
    )
    const includedEmploymentTypeString = includedEmploymentType.join(',')
    this.setState(
      {employmentType: includedEmploymentTypeString},
      this.getTheDetails,
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page-background">
          <div>
            <Profile />
            <AddFilterSection
              changingSalaryPreference={this.changingSalaryPreference}
              changingEmploymentPreference={this.changingEmploymentPreference}
            />
          </div>
          <div>
            <div className="search-container">
              <input
                type="search"
                className="search-bar"
                onChange={this.onChangeSearchInput}
              />
              <button type="button" testid="searchButton">
                <AiOutlineSearch
                  className="search-icon"
                  onClick={this.searchJobs}
                />
              </button>
            </div>
            {this.renderTheDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
