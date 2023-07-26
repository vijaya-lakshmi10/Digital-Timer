// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component{
    state={timeElapsedInSec:0,initialTimerLimit:25,isTimerRunning:false}

    componentWillUnMount(){
        clearInterval(this.timerId)
    }

    onResetTimer=()=>{
        clearInterval(this.timerId)
        this.setState({timeElapsedInSec:0,initialTimerLimit:25,isTimerRunning:false})
    }

    onDecreaseTimeLimit=()=>{
        const {initialTimerLimit}=this.state
        if(initialTimerLimit>1){
            this.setState(prevState=>({initialTimerLimit:prevState.initialTimerLimit-1}))
        }
    }

    onIncreaseTimeLimit=()=>{
        this.setState(prevState=>({initialTimerLimit:prevState.initialTimerLimit+1}))
    }

    onStartOrPauseTimer=()=>{
        const {timeElapsedInSec,initialTimerLimit,isTimerRunning}=this.state
        const hasTimerCompleted=timeElapsedInSec===initialTimerLimit*60
        if(hasTimerCompleted){
            this.setState({timeElapsedInSec:0})
        }
        if(isTimerRunning){
            clearInterval(this.timerId)
        }
        else{
            this.timerId=setInterval(this.increaseTimeElapsedInSec,1000)
        }
        this.setState(prevState=>({isTimerRunning:!prevState.isTimerRunning}))
    }

    setTimeLimit=()=>{
        const {initialTimerLimit,timeElapsedInSec}=this.state
        const btnDisabled=timeElapsedInSec>0
        return(
            <div className="set-time-container">
            <p className="set-time">Set Timer Limit</p>
            <div className="timer-sub-container">
            <button type="button" className="symbol" onClick={this.onDecreaseTimeLimit} disabled={btnDisabled}>-</button>
            <div className="time-interval">
            <p className="set-timer">{initialTimerLimit}</p>
            </div>
            <button type="button" className="symbol" onClick={this.onIncreaseTimeLimit} disabled={btnDisabled}>+</button>
            </div>
            </div>
        )
    }

    increaseTimeElapsedInSec=()=>{
        const {initialTimerLimit,timeElapsedInSec}=this.state
        const hasTimerCompleted=timeElapsedInSec===initialTimerLimit*60
        if(hasTimerCompleted){
            clearInterval(this.timerId)
            this.setState({isTimerRunning:false})
        }
        else{
            this.setState(prevState=>({timeElapsedInSec:prevState.timeElapsedInSec+1}))
        }
    }

    getTimeFormat=()=>{
        const {timeElapsedInSec,initialTimerLimit}=this.state
        const remainingTime=initialTimerLimit*60-timeElapsedInSec
        const inMinutes=Math.floor(remainingTime/60)
        const inSeconds=Math.floor(remainingTime%60)
        const timeInMinutes=inMinutes > 9 ? inMinutes : `0${inMinutes}`
        const timeInSeconds=inSeconds > 9 ? inSeconds : `0${inSeconds}`
        return `${timeInMinutes}:${timeInSeconds}`
    }
    
    onClickPlayOrPause=()=>{
        const {isTimerRunning}=this.state
        const playPauseImgUrls=isTimerRunning ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png" : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
        const altNames=isTimerRunning ? "pause icon" : "play icon"
        return(
            <div className="play-pause-container">
            <button className="play-pause-btn" type="button" onClick={this.onStartOrPauseTimer}>
            <img src={playPauseImgUrls} alt={altNames} className="play-pause-img"/>
            <p className="play-pause">{isTimerRunning ? "Pause" : "Start"}</p>
            </button>
            <button className="reset-btn" type="button" onClick={this.onResetTimer}>
            <img src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png" alt="reset icon" className="reset-image"/>
            <p className="reset-time">Reset</p>
            </button>
            </div>
        )
    }

    render(){
        const {isTimerRunning}=this.state
        const timerStatus = isTimerRunning ? "Running" : "Paused"
        return(
            <div className="bg-container">
            <h1 className="heading">Digital Timer</h1>
            <div className="sub-container">
            <div className="timer-container">
            <div className="timer">
            <h1 className="time">{this.getTimeFormat()}</h1>
            <p className="status">{timerStatus}</p>
            </div>
            </div>
            <div className="responsive">
            {this.onClickPlayOrPause()}
            {this.setTimeLimit()}
            </div>
            </div>
            </div>
        )
    }
}
export default DigitalTimer
