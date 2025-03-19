import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categs = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        axios.get('/categories').then((response) => {
            setCategories(response.data.categories);
        });
    }, []);

    // Logic for displaying current categories
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Logic for page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(categories.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <ul>
                {currentCategories.map(category => (
                    <li key={category.id}>{category.title}</li>
                ))}
            </ul>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Categs;
