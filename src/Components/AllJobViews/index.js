import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {IoIosSearch} from 'react-icons/io'
import {GoStar} from 'react-icons/go'
import {MdLocalPostOffice} from 'react-icons/md'
import {ImLocation} from 'react-icons/im'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class AllJobViews extends Component {
  clickSearch = event => {
    const {onChangeSearchInput} = this.props
    onChangeSearchInput(event.target.value)
  }

  clickRetryButton = () => {
    const {onClickJobRetry} = this.props
    onClickJobRetry()
  }

  searchButton = () => {
    const {clickSearchButton} = this.props
    clickSearchButton()
  }

  renderSuccessView = () => {
    const {jobsList} = this.props

    const {length} = jobsList
    return (
      <>
        {length !== 0 ? (
          <ul className="unorder_container">
            {jobsList.map(each => (
              <Link
                to={`/jobs/${each.id}`}
                className="link_style"
                key={each.id}
              >
                <li className="list_cont">
                  <div className="logo_container">
                    <img
                      className="companyLogo_url"
                      src={each.companyLogoUrl}
                      alt="company logo"
                    />
                    <div className="name_container">
                      <h1 className="job_name">{each.title}</h1>
                      <div className="star_img_cont">
                        <GoStar className="star_img" size={24} />
                        <p className="rating">{each.rating}</p>
                      </div>
                    </div>
                  </div>

                  <div className="employ_cont">
                    <div className="employ_cont">
                      <div className="employ_cont">
                        <ImLocation className="icon-location" size={24} />
                        <p className="location_para">{each.location}</p>
                      </div>
                      <div className="employ_cont">
                        <MdLocalPostOffice
                          className="icon-location"
                          size={24}
                        />
                        <p className="location_para">{each.employmentType}</p>
                      </div>
                    </div>
                    <h1 className="package_head">{each.packagePerAnnum}</h1>
                  </div>

                  <hr className="line" />

                  <h1 className="Description_head">Description</h1>
                  <p className="Description_para">{each.jobDescription}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="nojobs_container">
            <img
              className="nojob_img"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure_view_cont">
      <img
        className="failure_img"
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

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchCase = () => {
    const {jobApiStatus} = this.props
    switch (jobApiStatus) {
      case constants.success:
        return this.renderSuccessView()
      case constants.failure:
        return this.renderFailureView()
      case constants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="allJobs_page">
        <div className="search_container">
          <input
            className="inputsearch"
            type="search"
            placeholder="Search"
            onChange={this.clickSearch}
          />
          <button
            className="search_icon_button"
            onClick={this.searchButton}
            type="button"
            data-testid="searchButton"
          >
            <IoIosSearch className="search_icon_img" />
          </button>
        </div>
        {this.renderSwitchCase()}
      </div>
    )
  }
}
export default AllJobViews
