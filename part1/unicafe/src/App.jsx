import { useState } from "react"

import Feedback from "./components/Feedback"
import { Icon } from "@iconify/react/dist/iconify.js"
import Statistics from "./components/Statistics"

function App() {
  const feedbackScore = {
      good    : 1,
      neutral : 0,
      bad     : -1
  }

  const [feedbackCount , setFeedbackCount] = useState(
    {
      good    : 0,
      neutral : 0,
      bad     : 0
    }
  )

  const [statistics , setStatistics] = useState(
    {
      all       : 0,
      average   : 0,
      positive  : 0
    }
  )

  const feedbackClicked = (feedback) => {
      let updatedFeedbackCount = feedbackCount;
      // check if feedback exist
      if(Object.keys(updatedFeedbackCount).includes(feedback)){
        updatedFeedbackCount[feedback] +=1
        // update state 
        setFeedbackCount(updatedFeedbackCount);
        // update summary
        updateFeedbackSummary(updatedFeedbackCount);
      }
  }

  const updateFeedbackSummary = (feedbacks) =>{
    let all = Object.values(feedbacks).reduce((sum, value)=> sum + value ,0);
    let average = ((feedbacks.good * 1) + (feedbacks.bad * -1))/all;
    let positive = ((feedbacks.good) / all) * 100;

    // updateState
    setStatistics({
      all: all,
      average : average,
      positive : positive
    })

  }


  return (
    <div className="h-[100dvh] vertical">
      <Feedback handleClick={feedbackClicked} />
      {statistics.all <= 0 ? 
          <div className="grid-center w-full h-full">
            <span className="capitalize vertical justify-center *:text-center">
              <Icon icon="fluent-emoji:sleeping-face" className="text-[20rem] animate-pulse"/>
              <span className="vertical font-parkinsans items-center">
                <span className="font-parkinsans text-[2rem] font-semibold">No feedback given</span>
                <span className="text-neutral-500">We are awaiting your response</span>
              </span>
            </span> 
          </div>
        :  
        <Statistics statistics={statistics} feedbackCount={feedbackCount} />
      }
    </div>
  )
}

export default App
