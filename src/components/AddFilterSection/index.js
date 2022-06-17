import './index.css'
import {Component} from 'react'

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

class AddFilterSection extends Component {
  state = {employmentList: employmentTypesList}

  componentDidMount() {
    const updatedEmploymentTypesList = employmentTypesList.map(each => ({
      ...each,
      checked: false,
    }))
    this.setState({employmentList: updatedEmploymentTypesList})
  }

  changeTheSalary = event => {
    const {changingSalaryPreference} = this.props
    changingSalaryPreference(event.target.value)
  }

  changeTheEmployment = async event => {
    this.setState(prevState => ({
      employmentList: prevState.employmentList.map(each => {
        if (each.employmentTypeId === event.target.value) {
          return {...each, checked: !each.checked}
        }
        return {...each}
      }),
    }))
    const {changingEmploymentPreference} = await this.props
    const {employmentList} = await this.state
    changingEmploymentPreference(employmentList)
  }

  render() {
    return (
      <div className="filter-page">
        <h1>Type of Employment</h1>
        <ul className="employmentTypesList-class">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId}>
              <input
                type="checkbox"
                id={each.employmentTypeId}
                value={each.employmentTypeId}
                onClick={this.changeTheEmployment}
                checked={each.checkedStatus}
              />
              <label htmlFor={each.employmentTypeId}>{each.label}</label>
            </li>
          ))}
        </ul>
        <br />
        <h1>Salary Range</h1>
        <ul className="salaryRangesList-class">
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId}>
              <input
                type="radio"
                name="salaryRange"
                id={each.salaryRangeId}
                value={each.salaryRangeId}
                onClick={this.changeTheSalary}
              />
              <label htmlFor={each.salaryRangeId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default AddFilterSection
