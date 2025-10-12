import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GoStar} from 'react-icons/go'
import {MdLocalPostOffice} from 'react-icons/md'
import {ImLocation} from 'react-icons/im'
import Loader from 'react-loader-spinner'
import SimilarJobViews from '../SimilarJobViews'
import SpecificJobSkills from '../SpecificJobSkills'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SpecificJobView extends Component {
  state = {
    specificJobObject: {},
    lifeAtCompanyObj: {},
    similarJobList: [],
    apiStatus: constants.initial,
    skillList: [],
  }

  componentDidMount() {
    this.renderEachJobApi()
  }

  clickRetryButton = () => {
    this.renderEachJobApi()
  }

  renderEachJobApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: constants.loading})

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const jobData = data.job_details
      const similarData = data.similar_jobs
      const skillData = data.job_details.skills

      const jobUpdatedData = {
        companyLogoUrl: jobData.company_logo_url,
        companyWebsiteUrl: jobData.company_website_url,
        employmentType: jobData.employment_type,
        id: jobData.id,
        jobDescription: jobData.job_description,
        location: jobData.location,
        packagePerAnnum: jobData.package_per_annum,
        rating: jobData.rating,
        title: jobData.title,
      }
      const skillObj = skillData.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const lifeAtCompanyUpdatedData = {
        description: jobData.life_at_company.description,
        imageUrl: jobData.life_at_company.image_url,
      }

      const similarJobUpdatedData = similarData.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        specificJobObject: jobUpdatedData,
        lifeAtCompanyObj: lifeAtCompanyUpdatedData,
        similarJobList: similarJobUpdatedData,
        apiStatus: constants.success,
        skillList: skillObj,
      })
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      specificJobObject,
      lifeAtCompanyObj,
      similarJobList,
      skillList,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = specificJobObject

    const {description, imageUrl} = lifeAtCompanyObj
    return (
      <>
        <div className="specific_bottom">
          <div className="logo_Cont">
            <img
              className="logo_img"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title_cont">
              <h1 className="title_heading">{title}</h1>
              <div className="star_img_cont">
                <GoStar className="star_img" size={24} />
                <p>{rating}</p>
              </div>
            </div>
          </div>

          <div className="location_Container">
            <div className="location_Cont">
              <div className="location_icon">
                <ImLocation className="icon-location" size={24} />
                <p className="location_para">{location}</p>
              </div>
              <div className="location_icon">
                <MdLocalPostOffice className="icon-location" size={24} />
                <p>{employmentType}</p>
              </div>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>

          <hr className="line" />

          <div className="desciption_container">
            <h1>Description</h1>
            <a className="href_style" href={companyWebsiteUrl}>
              Visit
            </a>
          </div>
          <h1 className="paraDasc">{jobDescription}</h1>

          <h1>Skills</h1>
          <ul className="unorder_skill_cont">
            {skillList &&
              skillList.map(each => (
                <SpecificJobSkills details={each} key={each.name} />
              ))}
          </ul>

          <h1>Life at Company</h1>
          <div className="life_container">
            <h1 className="life_para">{description}</h1>
            <img className="life_img" src={imageUrl} alt="life at company" />
          </div>
        </div>

        <h1 className="similar_heading">Similar Jobs</h1>
        <ul className="similarJob_unorder_list">
          {similarJobList.map(each => (
            <SimilarJobViews details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="fail_view_page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        className="job_retry_button"
        onClick={this.clickRetryButton}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.renderSuccessView()
      case constants.failure:
        return this.renderFailureView()
      case constants.loading:
        return this.renderLoadView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="specific_bottom_page">{this.renderSwitchCase()}</div>
      </div>
    )
  }
}
export default SpecificJobView
