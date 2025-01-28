import { EventEmitter } from 'eventemitter3'

const eventEmitter = new EventEmitter()

export type EventName = 'REFRESH_EVENT' | 'REFRESH_FEED'

export type EventParams =
  | {
      eventName: 'REFRESH_EVENT'
      payload: {
        eventId: string
      }
    }
  | {
      eventName: 'REFRESH_FEED'
      payload: null
    }

const Emitter = {
  on: (event: EventName, fn: (param: EventParams) => void) =>
    eventEmitter.on(event, fn),
  once: (event: EventName, fn: (param: EventParams) => void) =>
    eventEmitter.once(event, fn),
  off: (event: EventName, fn: (param: EventParams) => void) =>
    eventEmitter.off(event, fn),
  emit: (event: EventName, payload: EventParams) =>
    eventEmitter.emit(event, payload),
}

Object.freeze(Emitter)

export default Emitter
