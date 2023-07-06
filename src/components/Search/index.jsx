import { useRef } from 'react';
import PubSub from 'pubsub-js';

export default function Search() {
  const myRef = useRef();
  function search() {
    if (myRef.current.value.trim() === '') {
      alert('Search word could not be empty!')
      return;
    }
    PubSub.publish('keyword', { keyword: myRef.current.value.trim() })
  }
  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">News Browser</h3>
      <div>
        <input ref={myRef} type="text" placeholder="Enter keyword" />&nbsp;<button onClick={search}>Search</button>
      </div>
    </section>
  )
}