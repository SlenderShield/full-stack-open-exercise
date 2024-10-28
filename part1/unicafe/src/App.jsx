import {useState} from 'react'


const Button = ({text, handleClick}) => {
    return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({text, value, symbol}) => <p>{text} {value}{symbol}</p>

const Statistics = ({good, neutral, bad, total}) => {
    return (
        <div>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={total / 3}/>
            <StatisticLine text="positive" symbol="%" value={good / total * 100}/>
        </div>)
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const handleGood = () => {
        let value = good + 1;
        let val = total + 1;
        setGood(value)
        setTotal(val)
    }
    const handleNeutral = () => {
        let value = neutral + 1;
        let val = total + 1;
        setNeutral(value)
        setTotal(val)
    }
    const handleBad = () => {
        let value = bad + 1;
        let val = total + 1;
        setBad(value)
        setTotal(val)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={"good"} handleClick={handleGood}/>
            <Button text={"neutral"} handleClick={handleNeutral}/>
            <Button text={"bad"} handleClick={handleBad}/>
            <h1>statistics</h1>
            {!total
                ? <p>No feedback given</p>
                : <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
            }
        </div>
    )
}

export default App