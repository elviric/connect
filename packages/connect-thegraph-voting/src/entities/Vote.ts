import { SubscriptionHandler } from '@aragon/connect-types'
import { VoteData } from '../types'
import VotingConnectorTheGraph from '../connector'
import Cast from './Cast'

export default class Vote {
  #connector: VotingConnectorTheGraph

  readonly id: string
  readonly creator: string
  readonly metadata: string
  readonly executed: boolean
  readonly startDate: string
  readonly snapshotBlock: string
  readonly supportRequiredPct: string
  readonly minAcceptQuorum: string
  readonly yea: string
  readonly nay: string
  readonly votingPower: string
  readonly script: string

  constructor(data: VoteData, connector: VotingConnectorTheGraph) {
    this.#connector = connector

    this.id = data.id
    this.creator = data.creator
    this.metadata = data.metadata
    this.executed = data.executed
    this.startDate = data.startDate
    this.snapshotBlock = data.snapshotBlock
    this.supportRequiredPct = data.supportRequiredPct
    this.minAcceptQuorum = data.minAcceptQuorum
    this.yea = data.yea
    this.nay = data.nay
    this.votingPower = data.votingPower
    this.script = data.script
  }

  async casts({ first = 1000, skip = 0 } = {}): Promise<Cast[]> {
    return this.#connector.castsForVote(this.id, first, skip)
  }

  onCasts(callback: Function): SubscriptionHandler {
    return this.#connector.onCastsForVote(this.id, callback)
  }
}
