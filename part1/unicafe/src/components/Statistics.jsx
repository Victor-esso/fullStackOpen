import Statisticsline from "./Statisticsline"

const Statistics = ({feedbackCount , statistics}) => {
  return (
    <div className="w-full h-full flex justify-center lg:items-center max-sm:pt-8">
        <div className=" aspect-square w-full max-w-[500px] vertical *:w-full gap-4 px-5">
            <Statisticsline icon="fluent-emoji:beaming-face-with-smiling-eyes" title="good" value={feedbackCount.good} />
            <Statisticsline icon="fluent-emoji:neutral-face" title="neutral" value={feedbackCount.neutral} />
            <Statisticsline icon="fluent-emoji:face-with-symbols-on-mouth" title="bad" value={feedbackCount.bad} />
            <Statisticsline icon="fluent-emoji:trident-emblem" title="all" value={statistics.all} />
            <Statisticsline icon="fluent-emoji:ok-hand-light" title="average" value={statistics.average.toFixed(4)} />
            <Statisticsline icon="fluent-emoji:thumbs-up-light" title="positive" value={statistics.positive.toFixed(4) + '%'} />
        </div>
    </div>
  )
}

export default Statistics