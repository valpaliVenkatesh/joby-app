import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileDetailsOfUser: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTheDetails()
  }

  getTheDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = data.profile_details
    const formattedProfileDetails = {
      profileImageUrl: profileDetails.profile_image_url,
      name: profileDetails.name,
      shortBio: profileDetails.short_bio,
    }
    if (response.ok) {
      this.setState({
        profileDetailsOfUser: formattedProfileDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  theSuccessStatus = () => {
    const {profileDetailsOfUser} = this.state
    const {profileImageUrl, name, shortBio} = profileDetailsOfUser
    return (
      <div className="profile-card-background">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="user-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
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
    return <div>{this.renderTheDetails()}</div>
  }
}

export default Profile
