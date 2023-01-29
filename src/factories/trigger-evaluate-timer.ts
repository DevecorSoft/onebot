import { createActuator } from '@/actuators/iocActuator'
import { isTimeUp } from '@/actuators/trigger-evaluate-timer'
import {time} from "@/factories/CronTime";

export const stdEvaluateTimerActuator = createActuator(isTimeUp, { cronTime: time })
