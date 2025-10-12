import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class FilterElement extends Component {
  clickSalary = event => {
    const {onChangeSalaryRange} = this.props
    onChangeSalaryRange(event.target.value)
  }

  clickEmployType = event => {
    const {onChangeEmployType} = this.props
    onChangeEmployType(event.target.value, event.target.checked)
  }

  clickProfileRetry = () => {
    const {onClickProfileRetry} = this.props
    onClickProfileRetry()
  }

  renderSuccessView = () => {
    const {profileObj} = this.props
    const {name, profileUrl, shortBio} = profileObj
    return (
      <div className="profile_cont">
        <img src={profileUrl} alt="profile" />
        <h1 className="profile_head">{name}</h1>
        <p className="profile_para">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile_retry_container">
      <button
        className="profile_retry_button"
        onClick={this.clickProfileRetry}
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
    const {profileApiStatus} = this.props
    switch (profileApiStatus) {
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
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <div className="filter_page">
        {this.renderSwitchCase()}
        <hr className="line" />

        <h1 className="type_heading">Type of Employment</h1>
        <ul className="type_unorder_list">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId} className="employ_type_list_cont">
              <input
                onChange={this.clickEmployType}
                id={each.employmentTypeId}
                type="checkbox"
                value={each.employmentTypeId}
                className="checkbox_input"
              />
              <label className="type_label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="line" />

        <h1 className="type_heading">Salary Range</h1>
        <ul className="type_unorder_list">
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId} className="employ_type_list_cont">
              <input
                onChange={this.clickSalary}
                id={each.salaryRangeId}
                value={each.salaryRangeId}
                type="radio"
                name="salary"
                className="checkbox_input"
              />
              <label className="type_label" htmlFor={each.salaryRangeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default FilterElement
