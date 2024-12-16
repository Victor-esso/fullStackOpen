
import { Icon } from "@iconify/react/dist/iconify.js"
import anecdotes from "./anecdotes"
import { useEffect, useState } from "react";
import tippy, {animateFill} from 'tippy.js';
import * as helper from "./functions";
function App() {
 

  let maxAnecdotes = anecdotes.length - 1;
  let minAnecdotes = 0;
  const [selected, setSelected] = useState(helper.getRandomNumber(minAnecdotes,maxAnecdotes));
  const [votes, setVotes] = useState({});


  useEffect(()=> {
    tippy('[data-tippy-content]',{
      arrow: false,
      animateFill: true,
      hideOnClick: false,
      inertia: true,
      theme: 'light-border',
      plugins: [animateFill],
    });
  },[])

  const handleNext = () => setSelected(helper.getRandomNumber(minAnecdotes,maxAnecdotes))
  
  const vote = (index) => {
    let initVotes = {...votes};
    initVotes[index] = initVotes[index] ? initVotes[index] + 1 : 1;
    
    setVotes(initVotes);
  }

  const dislike = (index) => {
    let initVotes = {...votes};
    initVotes[index] = initVotes[index] && initVotes[index] > 0 ? initVotes[index] - 1 : 0;
    setVotes(initVotes);
  }


  return (
    <div className="h-[100dvh] bg-neutral-800 horizontal justify-center gap-8 no-select">

      <div className="vertical gap-5 h-max w-full md:max-w-[600px] relative">
        <div className="w-full bg-neutral-900 md:aspect-[1/1.3] max-md:h-dvh rounded-2xl vertical justify-center items-center gap-6 text-center  max-md:p-8 p-10">
            <span className="text-white/[.6] font-poppins"><span className="text-emerald-500">{votes[selected] ? votes[selected] : 0}</span> - total votes</span>
            <p className="text-white font-poppins text-[2.2rem] max-sm:text-[1.8rem] font-extralight">{anecdotes[selected]}</p>
        </div>
        <div className="w-max h-[50px] absolute abs-center-x md:-bottom-[25px] bottom-8 rounded-xl">
          <button className="h-full md:w-[200px] w-[140px] text-2xl bg-emerald-700 rounded-xl text-white font-poppins" onClick={()=> handleNext()}>Next</button>
        </div>
        <button className="absolute bottom-10 right-10 max-md:bottom-8 max-md:right-8" data-tippy-content="Like" onClick={() => vote(selected)}><Icon icon="fluent-emoji:thumbs-up" className="text-[3rem]" /></button>
        <button className="absolute bottom-10 left-10 max-md:bottom-8 max-md:left-8" data-tippy-content="Dislike" onClick={() => dislike(selected)}><Icon icon="fluent-emoji:broken-heart" className="text-[3rem]" /></button>
      </div>

      {(helper.getKeyWithMaxValue(votes) && votes[helper.getKeyWithMaxValue(votes)] > 0) && 
        <div className="vertical gap-5 h-max w-full max-w-[450px]  relative max-md:hidden">
          <div className="w-full  bg-neutral-900 lg:aspect-[1/.5] rounded-2xl p-4 vertical justify-center items-center text-center">
            <p className="text-white font-poppins text-[1.3rem] font-extralight">{anecdotes[helper.getKeyWithMaxValue(votes)]}</p>
          </div>
          <div className="horizontal items-end w-max h-max absolute abs-center-x -top-24 gap-3">
            <Icon icon="fluent-emoji:crown" className="text-[6rem] " />
            <span className="text-white text-[2rem] font-bangers no-select">{votes[helper.getKeyWithMaxValue(votes)] ? votes[helper.getKeyWithMaxValue(votes)] : 0}</span>
          </div>
          <span className="absolute abs-center-x -bottom-9 font-poppins bg-stone-900 text-emerald-500 text-sm px-5 py-1 font-light w-max rounded-xl">Anecdotes with the most votes</span>
        </div>
      }
    </div>
  )
}

export default App
