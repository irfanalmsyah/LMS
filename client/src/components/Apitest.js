import React from 'react'
import useFetch from '../useFetch';

const Apitest = () => {
    const {data:joke, loading, error, refetch} = useFetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous');

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error!</h1>;
  return (
    <div>
        <h1>{joke?.setup}</h1>
        <p>{joke?.delivery}</p>
        <p>{joke?.id}</p>

        <button onClick={refetch}> refetch </button>
    </div>
  )
}

export default Apitest