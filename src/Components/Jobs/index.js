import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import FilterElement from '../FilterElement'
import AllJobViews from '../AllJobViews'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    profileObj: {},
    jobsList: [],
    employmentTypeStatus: [],
    salaryRangeStatus: '',
    searchInput: '',
    jobApiStatus: constants.initial,
    profileApiStatus: constants.initial,
  }

  componentDidMount() {
    this.renderProfileApi()
    this.renderjobsApi()
  }

  renderProfileApi = async () => {
    this.setState({profileApiStatus: constants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileObj: updatedData,
        profileApiStatus: constants.success,
      })
    } else {
      this.setState({profileApiStatus: constants.failure})
    }
  }

  renderjobsApi = async () => {
    this.setState({jobApiStatus: constants.loading})
    const {employmentTypeStatus, salaryRangeStatus, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeStatus.join(
      ',',
    )}&minimum_package=${salaryRangeStatus}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: updatedData, jobApiStatus: constants.success})
    } else {
      this.setState({jobApiStatus: constants.failure})
    }
  }

  onChangeEmployType = (value, isChecked) => {
    this.setState(prev => {
      if (isChecked) {
        return {employmentTypeStatus: [...prev.employmentTypeStatus, value]}
      }
      return {
        employmentTypeStatus: prev.employmentTypeStatus.filter(
          each => each !== value,
        ),
      }
    }, this.renderjobsApi)
  }

  onChangeSalaryRange = id => {
    this.setState({salaryRangeStatus: id}, this.renderjobsApi)
  }

  onChangeSearchInput = val => {
    this.setState({searchInput: val})
  }

  onClickProfileRetry = () => {
    this.renderProfileApi()
  }

  onClickJobRetry = () => {
    this.renderjobsApi()
  }

  clickSearchButton = () => {
    this.renderjobsApi()
  }

  render() {
    const {profileObj, jobsList, jobApiStatus, profileApiStatus} = this.state

    return (
      <div className="jobs_page">
        <Header />
        <div className="jobs_container">
          <FilterElement
            profileObj={profileObj}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onChangeEmployType={this.onChangeEmployType}
            onChangeSalaryRange={this.onChangeSalaryRange}
            onClickProfileRetry={this.onClickProfileRetry}
            profileApiStatus={profileApiStatus}
          />
          <AllJobViews
            jobApiStatus={jobApiStatus}
            jobsList={jobsList}
            onChangeSearchInput={this.onChangeSearchInput}
            onClickJobRetry={this.onClickJobRetry}
            clickSearchButton={this.clickSearchButton}
          />
        </div>
      </div>
    )
  }
}
export default Jobs
