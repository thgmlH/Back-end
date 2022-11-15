import React, { createRef, memo, useState } from 'react';

const Page = memo(({ onSearch }) => {
    const inputRef = React.createRef();

    const handleSearch = (e) => {
        e.preventDefault();
        const keyword = inputRef.current.value;
        onSearch(keyword);
    };
    
    return (
        <>
            <form onSubmit={handleSearch}>
                <input ref={inputRef} type="text" placeholder="검색" />
                <button type="submit">*</button>
            </form>
        </>
    );
    
});

export default Page;