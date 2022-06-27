import { alice, usePerson } from '@mikerippon/immer-test';
import produce from 'immer';
import { useImmer } from 'use-immer';
import './App.css';

function App() {
  const person = usePerson()
  const [person4, mutatePerson4] = useImmer(alice)

  const increaseAgePerson4Nested = () => {
    mutatePerson4(draft => produce(draft, draft2 => {
      draft2.age++
    }))
  }

  const increaseAgePerson2NestedThisRepo = () => {
    person.mutatePerson2(draft => produce(draft, draft2 => {
      draft2.age++
    }))
  }

  return <div style={{
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  }}>

    <h4>Person 1: {person.person1.age} years old</h4>
    <button onClick={() => person.increaseAgePerson1Nested()}>
      Increase age (no bug - setState + explicit produce)
    </button>

    <h4>Person 2: {person.person2.age} years old</h4>
    <button onClick={() => person.increaseAgePerson2Nested()}>
      BUG! (useImmer, nested mutation in library)
    </button>
    <button onClick={() => increaseAgePerson2NestedThisRepo()}>
      Increase age (nested mutation code in this codebase)
    </button>
    <button onClick={() => person.increaseAgePerson2()}>
      Increase age (useImmer - no nesting)
    </button>

    <h4>Person 3: {person.person3.age} years old</h4>
    <button onClick={() => person.increaseAgePerson3Nested()}>
      No bug (useImmer replica)
    </button>

    <h4>Person 4: {person4.age} years old</h4>
    <button onClick={() => increaseAgePerson4Nested()}>
      No bug (useImmer, in same repo)
    </button>
  </div>
}

export default App;
