import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-job-item-background">
      <div className="role-rating-section">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="location-type-section">
        <GoLocation />
        <p className="location">{location}</p>
        <BsBriefcase />
        <p className="location">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
