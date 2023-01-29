import {Actable} from "@/actuators/iocActuator";

export type DefaultRotationDeps = Record<string, never>

export interface DefaultRotation {
  (subcommand: string): string
}

export const defaultRotation: Actable<DefaultRotationDeps, DefaultRotation> = function (subcommand: string) {
  return `Error: \`${subcommand}\` is not a \`/onebot\` subcommand. See \`/onebot help\`.`
}
