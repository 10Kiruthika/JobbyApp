import './index.css'
import {Component} from 'react'
import {GoStar} from 'react-icons/go'
import {MdLocalPostOffice} from 'react-icons/md'
import {ImLocation} from 'react-icons/im'

class SimilarJobViews extends Component {
  render() {
    const {details} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = details
    return (
      <li className="similar_list_page">
        <div className="similar_logo_container">
          <img
            className="simialr_img"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div>
            <h1 className="similar_logo_title">{title}</h1>
            <div className="star_cont">
              <GoStar className="star_img" size={24} />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p className="similar_description">{jobDescription}</p>
        <div className="similar_location_container">
          <div className="employ_cont">
            <ImLocation className="icon-location" size={24} />
            <p className="similar_location">{location}</p>
          </div>
          <div className="employ_cont">
            <MdLocalPostOffice className="icon-location" size={24} />
            <p>{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }
}
export default SimilarJobViews
