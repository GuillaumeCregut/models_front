import logsType from '../../../feature/logsInfos';
import './Logs.scss';
import LogsItem from './logsitems/LogsItem';

const Logs = () => {
    const logType=logsType;
    return (
        <div className='logs'>
            <h1>Logs serveur</h1>
            <div className="log-container">
                <LogsItem logType={logType.error} />
            </div>
            <div className="log-container">
                <LogsItem logType={logType.warnings} />
            </div>
            <div className="log-container">
                <LogsItem logType={logType.info} />
            </div>
        </div>
    )
}

export default Logs
