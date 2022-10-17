import React from 'react'
import { useInput } from '../hooks/useInput';

function SearchForm({ value, onSearch }) {
  const [name, setName] = useInput(value);

  const submit = (e) => {
    console.log(name.value);
    e.preventDefault();
    onSearch(name.value);
  }

  return (
    <form onSubmit={submit}>
      <input type="text" {...name} />
      <button>Search</button>
    </form>
  )
}

export default SearchForm