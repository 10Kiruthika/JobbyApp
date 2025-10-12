import './index.css'
import {Component} from 'react'

class SpecificJobSkills extends Component {
  render() {
    const {details} = this.props
    const {name, imageUrl} = details

    return (
      <li className="skills_page">
        <div className="skills_container">
          <img className="skill_image" src={imageUrl} alt={name} />
          <p className="skill_para">{name}</p>
        </div>
      </li>
    )
  }
}
export default SpecificJobSkills
