import styles from './index.module.css'
import EventsCard from 'components/EventsCard'
import { times, weekdays } from 'utils/values'
import eventData from 'data/events.json'

interface Props {
  events: any[]
  startOfWeek: Date
}

const ScheduleCalendar = ({ events, startOfWeek }: Props) => {
  const startDate = new Date(startOfWeek)
  const days: any = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    days.push(currentDate.getDate())
  }

  return (
    <div className="">
      <table id="weekday" className={styles.weekdays}>
        <tbody>
          <tr>
            <td></td>
            {weekdays.map((weekday, index) => (
              <td key={index}>
                <p className={styles.date}>{days[index]}</p>
                <p className={styles.weekday}>{weekday}</p>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="flex">
        <div className="w-[9%]">
          <table id="time" className={styles.times}>
            <tbody>
              <tr>
                {times.map((time, index) => (
                  <td key={index}>
                    <p>{time}</p>
                  </td>
                ))}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex-1">
          <div id="dateCells" className={styles.dateCells}>
            {times.map((time, timeKey) => (
              <div className={styles.weekRow} key={timeKey}>
                {weekdays.map((weekday, weekKey) => (
                  <div
                    id={`${timeKey + 1}-${weekKey}`}
                    className={styles.dateCell}
                    key={weekKey}
                  ></div>
                ))}
              </div>
            ))}
            <div className={styles.weekRow}>
              {weekdays.map((weekday, weekKey) => (
                <div
                  id={`24-${weekKey}`}
                  className={styles.dateCell}
                  key={weekKey}
                ></div>
              ))}
            </div>
            <EventsCard data={eventData} />
          </div>
        </div>
      </div>
      {/* <Scheduler events={events} view="week" day={null} month={null} agenda={false} /> */}
    </div>
  )
}

export default ScheduleCalendar
