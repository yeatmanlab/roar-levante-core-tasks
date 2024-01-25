import "regenerator-runtime/runtime";
// setup
import store from "store2";
import {
  initTrialSaving,
  initTimeline,
  createPreloadTrials,
} from "../shared/helpers";
import { jsPsych, initializeCat } from "../taskSetup";
// trials
import { afcStimulus } from "../shared/trials/afcStimulus";
import { exitFullscreen, setupPractice, setupStimulus } from "../shared/trials";


export default function buildTROGTimeline(config, mediaAssets) {
  const preloadTrials = createPreloadTrials(mediaAssets).default
  // console.log({mediaAssets})

  initTrialSaving(config);
  const initialTimeline = initTimeline(config); 

  // does not matter if trial has properties that don't belong to that type
  const trialConfig = {
    trialType: 'audio',
    responseAllowed: true,
    promptAboveButtons: true,
    task: config.task
  }

  // const practiceBlock = {
  //   timeline: [
  //     setupPractice,
  //     afcStimulus(trialConfig)
  //   ],
  //   repetitions: config.numOfPracticeTrials
  // }

  const stimulusBlock = {
    timeline: [
      setupStimulus,
      afcStimulus(trialConfig)
    ],
    repetitions: store.session.get('maxStimulusTrials')
  }


  const timeline = [
    preloadTrials,
    initialTimeline,
    // practiceBlock,
    stimulusBlock,
  ];

  initializeCat();
  
  timeline.push(exitFullscreen);

  return { jsPsych, timeline };
}