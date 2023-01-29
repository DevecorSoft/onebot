import { createActuator } from "@/actuators/iocActuator";
import { defaultRotation } from "@/actuators/rotation-default";

describe('Given user types an unknown subcommand', () => {
    it('Then should tell user the subcommand is not supported', () => {
      const subcommand = ['something', 'unknown']

      const result = createActuator(defaultRotation, {}).act(...subcommand as [string])

      expect(result).toEqual('Error: `something` is not a `/onebot` subcommand. See `/onebot help`.')
    })
  })
