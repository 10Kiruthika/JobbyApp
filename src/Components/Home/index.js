import './index.css'
import {Component} from 'react'
import Header from '../Header'

class Home extends Component {
  movetoJobPage = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bottom_home_container">
          <div className="home_cont">
            <h1 className="homeHead">Find the Job That Fits Your Life</h1>
            <p className="homePara">
              Millions of people are searching for jobs, salary, information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <button
              className="home_button"
              onClick={this.movetoJobPage}
              type="button"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
