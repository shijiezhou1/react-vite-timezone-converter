import { useState } from 'react'
import './App.css'
import moment from 'moment-timezone';
import classNames from 'classnames';

const HRS_IN_DAY = 24;

const TimeRow = ({ timezone, timezoneIndex }: any) => {
  const rowClass = (index: number) => classNames({
    'each-item': true,
    'active': index === targetCityHour
  });

  const [cityName, setCityName] = useState(timezone);
  const targetCityHour: number = moment().tz(timezone).hours();

  let firstCityOffset: number;

  if (timezoneIndex === 0) {
    firstCityOffset = 0;
  } else {
    firstCityOffset = HRS_IN_DAY - moment().hours() - Math.abs(HRS_IN_DAY - targetCityHour);
  }

  if (firstCityOffset < 0) {
    firstCityOffset = firstCityOffset + HRS_IN_DAY;
  }

  const generate24Hours = () => {
    let template: any = [];
    const indexSubtract = (index: number) => index > 23 ? index - HRS_IN_DAY : index;

    for (let index = 0 + firstCityOffset; index < HRS_IN_DAY + firstCityOffset; index++) {
      template.push(<div className={rowClass(indexSubtract(index))} key={index}>{indexSubtract(index)}</div>)
    }
    return template;
  }

  return (
    <div className='row'>
      <div className='left'>{cityName}<span className="left-child">{cityName}</span></div>
      <div className='right'>{generate24Hours()}</div>
    </div>
  )
}

const ControlRow = ({ timezoneList, setTimezoneList }: any) => {
  const [cityName, setCityName] = useState(moment.tz.guess());
  const AddNewTimeZone = () => setTimezoneList([...timezoneList, ...[cityName]]);

  return (
    <div className='control-row'>
      <select value={cityName} onChange={(event: any) => setCityName(event.target.value)}>
        <option key="list-timezones" disabled>LIST TIMEZONES</option>
        {moment.tz.names().map((timezone) => <option key={timezone} value={timezone}>{timezone}</option>)}
      </select>
      <button onClick={AddNewTimeZone}>Add</button>
    </div>
  )
}

const App = () => {
  const [timezoneList, setTimezoneList] = useState([moment.tz.guess()]);

  return (
    <div className="card">
      <ControlRow timezoneList={timezoneList} setTimezoneList={setTimezoneList} />
      {timezoneList.map((tz, index) => <TimeRow key={tz} timezone={tz} timezoneIndex={index} />)}
    </div>
  )
}

export default App