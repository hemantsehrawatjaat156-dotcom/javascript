import React, { useEffect, useState } from 'react';

function Search() {
    const [query, setQuery] = useState('');
    useEffect(() => {
       const getdata = () => {
        console.log('Fetching data for query:', query);
        // Simulate an API call
        setTimeout(() => {
            console.log('Data fetched for query:', query);
        }, 1000);
       }
    }, [query]);

    return (
        <div>
            <input type='text' placeholder='Search' value={search} onChange={(e) => setQuery(e.target.value)} /> 
        </div>
    );
}   
export default Search;