import { interpret } from 'xstate'
import promiseMachine from './machines/promiseMachine'

const DOM = {
  promise: {
    stateInput: null,
    resolveBtn: null,
    rejectBtn: null,
  },
}

window.addEventListener('DOMContentLoaded', () => {
  DOM.promise.stateInput = document.getElementById('promiseState')
  DOM.promise.resolveBtn = document.getElementById('promiseResolveBtn')
  DOM.promise.rejectBtn = document.getElementById('promiseRejectBtn')

  const promiseService = interpret(promiseMachine).onTransition((state) => {
    DOM.promise.stateInput.value = state.value
  })

  DOM.promise.resolveBtn.addEventListener('click', (e) => {
    promiseService.send({ type: 'RESOLVE' })
  })

  DOM.promise.rejectBtn.addEventListener('click', (e) => {
    promiseService.send({ type: 'REJECT' })
  })

  promiseService.start('pending')
})
