import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItemDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobs-card-background">
        <div className="role-rating-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="discr-word">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
